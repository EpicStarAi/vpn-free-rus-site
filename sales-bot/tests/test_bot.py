import datetime as dt
import importlib.util
import json
import os
from pathlib import Path
import sqlite3
import tempfile
import unittest
from unittest.mock import patch

os.environ.setdefault("FREE_RUS_BOT_TOKEN", "test-only")
os.environ.setdefault("FREE_RUS_PROVISIONER_TOKEN", "test-only")
spec=importlib.util.spec_from_file_location("sales_app",Path(__file__).parents[1]/"app.py")
bot=importlib.util.module_from_spec(spec);spec.loader.exec_module(bot)

class BotTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup)
        bot.DATA=Path(self.tmp.name);bot.DB=bot.DATA/'sales.sqlite3'
        bot.database().close()
        self.result={'client_id':'test-client','expires_at':(dt.datetime.now(dt.timezone.utc)+dt.timedelta(days=3)).isoformat(),'config':'TEST-CONFIG-NOT-A-REAL-KEY'}
        self.sent={'document':{'file_id':'telegram-test-file'}}

    def update(self,text,user=1,chat=1):
        return {'update_id':123,'message':{'chat':{'id':chat},'from':{'id':user},'text':text}}

    def order(self):
        con=bot.database();con.execute('INSERT INTO orders VALUES(?,?,?,?,?,?,?)',('invoice', '1', 'month', 'pending', dt.datetime.now(dt.timezone.utc).isoformat(),None,None));con.commit();con.close()

    def test_commands_and_start_access(self):
        with patch.object(bot,'my_access') as access,patch.object(bot,'trial') as trial:
            bot.handle(self.update('/start access'));access.assert_called_once_with(1,1)
            bot.handle(self.update('/trial@FREE_RUS_VPN_BOT'));trial.assert_called_once_with(1,1)

    def test_group_cannot_receive_configuration(self):
        with patch.object(bot,'trial') as trial:
            bot.handle(self.update('/trial',chat=-100));trial.assert_not_called()

    def test_ack_failure_does_not_drop_trial_callback(self):
        update={'callback_query':{'id':'callback','from':{'id':1},'message':{'chat':{'id':1}},'data':'trial'}}
        with patch.object(bot,'api',side_effect=RuntimeError('expired')),patch.object(bot,'trial') as trial:
            bot.handle(update);trial.assert_called_once_with(1,1)

    def test_provisioning_failure_gets_visible_response_without_consuming_trial(self):
        with patch.object(bot,'provision',side_effect=RuntimeError('private-token-must-not-be-logged')),patch.object(bot,'message') as message,self.assertLogs('free-rus-bot',level='ERROR') as logs:
            bot.process_update(self.update('/trial'))
            self.assertIn('Не удалось',message.call_args.args[1]);self.assertNotIn('private-token',str(logs.output))
        con=bot.database();self.assertEqual(con.execute('SELECT COUNT(*) FROM trials').fetchone()[0],0);con.close()

    def test_retry_delivery_does_not_create_second_peer(self):
        with patch.object(bot,'provision',return_value=self.result) as provision,patch.object(bot,'send_config',side_effect=[RuntimeError('temporary Telegram failure'),self.sent]),patch.object(bot,'message'):
            bot.process_update(self.update('/trial'))
            path=bot.pending_path('test-client');self.assertTrue(path.exists());self.assertEqual(path.stat().st_mode&0o777,0o600)
            bot.handle(self.update('/access'))
            self.assertEqual(provision.call_count,1);self.assertFalse(path.exists())
        con=bot.database();self.assertEqual(con.execute('SELECT state,file_id FROM deliveries').fetchone(),('delivered','telegram-test-file'));con.close()

    def test_repeated_trial_resends_existing_telegram_file(self):
        with patch.object(bot,'provision',return_value=self.result) as provision,patch.object(bot,'send_config',return_value=self.sent),patch.object(bot,'message'),patch.object(bot,'api',return_value=self.sent) as api:
            bot.trial(1,1);bot.trial(1,1)
            self.assertEqual(provision.call_count,1);self.assertEqual(api.call_args.args[0],'sendDocument');self.assertEqual(api.call_args.args[1]['document'],'telegram-test-file')

    def test_delivery_is_bound_to_owner(self):
        bot.queue_delivery(1,self.result)
        with patch.object(bot,'send_config') as send,patch.object(bot,'message'):
            bot.deliver_config(2,2,'test-client');send.assert_not_called()

    def test_expired_configuration_not_sent(self):
        self.result['expires_at']=(dt.datetime.now(dt.timezone.utc)-dt.timedelta(days=1)).isoformat();bot.queue_delivery(1,self.result)
        with patch.object(bot,'send_config') as send,patch.object(bot,'message'):
            bot.deliver_config(1,1,'test-client');send.assert_not_called();self.assertFalse(bot.pending_path('test-client').exists())

    def test_precheckout_rejects_wrong_user_amount_and_currency(self):
        self.order()
        for user,amount,currency in [(2,99,'XTR'),(1,1,'XTR'),(1,99,'USD')]:
            with self.subTest(user=user,amount=amount,currency=currency),patch.object(bot,'api') as api:
                bot.handle({'pre_checkout_query':{'id':'query','from':{'id':user},'invoice_payload':'invoice','total_amount':amount,'currency':currency}})
                data=api.call_args.args[1];self.assertFalse(data['ok']);self.assertIn('error_message',data)

    def test_precheckout_accepts_valid_invoice(self):
        self.order()
        with patch.object(bot,'api') as api:
            bot.handle({'pre_checkout_query':{'id':'query','from':{'id':1},'invoice_payload':'invoice','total_amount':99,'currency':'XTR'}})
            self.assertTrue(api.call_args.args[1]['ok'])

    def test_duplicate_successful_payment_never_creates_second_peer(self):
        self.order();payment={'invoice_payload':'invoice','currency':'XTR','total_amount':99,'telegram_payment_charge_id':'charge'}
        with patch.object(bot,'provision',return_value=self.result) as provision,patch.object(bot,'send_config',return_value=self.sent),patch.object(bot,'api',return_value=self.sent),patch.object(bot,'message'):
            bot.paid(1,1,payment);bot.paid(1,1,payment);self.assertEqual(provision.call_count,1)
        con=bot.database();self.assertEqual(con.execute('SELECT status FROM orders').fetchone()[0],'delivered');con.close()

    def test_paid_provision_failure_records_payment_without_second_invoice(self):
        self.order();payment={'invoice_payload':'invoice','currency':'XTR','total_amount':99,'telegram_payment_charge_id':'charge'}
        with patch.object(bot,'provision',side_effect=RuntimeError('offline')) as provision,patch.object(bot,'message') as message:
            bot.paid(1,1,payment);bot.paid(1,1,payment);self.assertEqual(provision.call_count,1);self.assertIn('Повторная оплата не нужна',message.call_args.args[1])
        con=bot.database();self.assertEqual(con.execute('SELECT status FROM orders').fetchone()[0],'provisioning_failed');con.close()

if __name__=='__main__':unittest.main()
