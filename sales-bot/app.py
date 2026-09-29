#!/usr/bin/env python3
# FREE RUS VPN: Telegram Stars sales bot. Run as an unprivileged system user.
import datetime as dt, hashlib, json, logging, os, sqlite3, tempfile, time, urllib.request, uuid
from contextlib import closing
from pathlib import Path

TOKEN=os.environ['FREE_RUS_BOT_TOKEN']; PROVISION_TOKEN=os.environ['FREE_RUS_PROVISIONER_TOKEN']
TG=f'https://api.telegram.org/bot{TOKEN}'; PROVISION=os.getenv('FREE_RUS_PROVISIONER_URL','http://127.0.0.1:8786')
WEB_APP_URL=os.getenv('FREE_RUS_WEB_APP_URL','https://vpn.freerus.site/client/').rstrip('/')
SUPPORT_URL=os.getenv('FREE_RUS_SUPPORT_URL','https://t.me/INTERNET_BEZ_GRANIC')
TERMS_URL=os.getenv('FREE_RUS_TERMS_URL','https://freerus.site/terms')
REFUNDS_URL=os.getenv('FREE_RUS_REFUNDS_URL','https://freerus.site/refunds')
DATA=Path(os.getenv('FREE_RUS_BOT_DATA','/var/lib/free-rus-sales-bot')); DB=DATA/'sales.sqlite3'
LOG=logging.getLogger('free-rus-bot')
PLANS={'trial':('Тест FREE RUS VPN — 3 дня',0,3),'month':('FREE RUS VPN — первый месяц',99,30),'renew':('FREE RUS VPN — 1 месяц',199,30),'year':('FREE RUS VPN — 1 год',1199,365)}

def api(method,data):
    req=urllib.request.Request(f'{TG}/{method}',data=json.dumps(data).encode(),headers={'Content-Type':'application/json'})
    with urllib.request.urlopen(req,timeout=35) as r: out=json.load(r)
    if not out.get('ok'): raise RuntimeError(str(out))
    return out['result']

def database():
    DATA.mkdir(parents=True,exist_ok=True,mode=0o700); con=sqlite3.connect(DB,timeout=15)
    con.execute('CREATE TABLE IF NOT EXISTS orders(payload TEXT PRIMARY KEY, telegram_id TEXT, plan TEXT, status TEXT, created_at TEXT, charge_id TEXT, client_id TEXT)')
    con.execute('CREATE TABLE IF NOT EXISTS trials(telegram_id TEXT PRIMARY KEY, client_id TEXT, issued_at TEXT)')
    con.execute('CREATE TABLE IF NOT EXISTS deliveries(client_id TEXT PRIMARY KEY,telegram_id TEXT NOT NULL,expires_at TEXT NOT NULL,file_id TEXT,state TEXT NOT NULL)')
    con.execute('CREATE TABLE IF NOT EXISTS bot_state(key TEXT PRIMARY KEY,value TEXT NOT NULL)')
    con.commit()
    return con

def message(chat,text,buttons=None):
    data={'chat_id':chat,'text':text}
    if buttons:data['reply_markup']={'inline_keyboard':buttons}
    return api('sendMessage',data)

def send_config(chat,config):
    boundary='----freeRus'+uuid.uuid4().hex; parts=[]
    for key,value in {'chat_id':str(chat),'caption':'Ваш персональный конфиг FREE RUS VPN. Не пересылайте его другим людям.'}.items():
        parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="{key}"\r\n\r\n{value}\r\n'.encode())
    parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="document"; filename="vpn-free-rus.conf"\r\nContent-Type: text/plain\r\n\r\n'.encode()+config.encode()+b'\r\n')
    parts.append(f'--{boundary}--\r\n'.encode())
    req=urllib.request.Request(f'{TG}/sendDocument',data=b''.join(parts),headers={'Content-Type':f'multipart/form-data; boundary={boundary}'})
    with urllib.request.urlopen(req,timeout=35) as r: out=json.load(r)
    if not out.get('ok'): raise RuntimeError('Telegram rejected document delivery')
    return out['result']

def provision(user,plan,days):
    body=json.dumps({'label':f'tg-{user}-{plan}','telegram_id':str(user),'ttl_days':days}).encode()
    req=urllib.request.Request(f'{PROVISION}/v1/clients',data=body,headers={'Content-Type':'application/json','Authorization':f'Bearer {PROVISION_TOKEN}'})
    with urllib.request.urlopen(req,timeout=35) as r:return json.load(r)

def pending_path(client_id):
    folder=DATA/'pending'
    folder.mkdir(parents=True,exist_ok=True,mode=0o700)
    folder.chmod(0o700)
    return folder/(hashlib.sha256(client_id.encode()).hexdigest()+'.conf')


def queue_delivery(user,result,trial_access=False,payload=None):
    config=result['config']; client_id=result['client_id']; expires=result['expires_at']
    if not isinstance(config,str) or not config or not client_id:
        raise ValueError('Incomplete provisioner response')
    destination=pending_path(client_id)
    # Private outbox only until Telegram confirms file delivery; never log the config.
    fd,name=tempfile.mkstemp(dir=destination.parent,prefix='.pending-')
    try:
        with os.fdopen(fd,'w') as stream:
            stream.write(config);stream.flush();os.fsync(stream.fileno())
        os.replace(name,destination)
    finally:
        if os.path.exists(name):os.unlink(name)
    with closing(database()) as con, con:
        con.execute('INSERT INTO deliveries VALUES(?,?,?,NULL,?)',(client_id,str(user),expires,'pending'))
        if trial_access:
            con.execute('INSERT INTO trials VALUES(?,?,?)',(str(user),client_id,dt.datetime.now(dt.timezone.utc).isoformat()))
        if payload:
            con.execute('UPDATE orders SET status=?,client_id=? WHERE payload=?',('delivery_pending',client_id,payload))


def deliver_config(chat,user,client_id):
    with closing(database()) as con:
        row=con.execute('SELECT expires_at,file_id FROM deliveries WHERE client_id=? AND telegram_id=?',(client_id,str(user))).fetchone()
    if not row:
        return message(chat,'Файл этого доступа не сохранён для повторной отправки. Напишите в поддержку.',[[{'text':'Поддержка','callback_data':'support'}]])
    if dt.datetime.fromisoformat(row[0])<=dt.datetime.now(dt.timezone.utc):
        pending_path(client_id).unlink(missing_ok=True)
        return message(chat,'Срок этого доступа завершён. Выберите тариф для нового подключения.',[[{'text':'Тарифы','callback_data':'menu'}]])
    if row[1]:
        sent=api('sendDocument',{'chat_id':chat,'document':row[1],'caption':'Ваш персональный конфиг FREE RUS VPN. Не пересылайте его другим людям.'})
    else:
        path=pending_path(client_id)
        if not path.exists():raise RuntimeError('Pending configuration unavailable')
        sent=send_config(chat,path.read_text())
    file_id=sent.get('document',{}).get('file_id')
    if not file_id:raise RuntimeError('Telegram did not confirm document delivery')
    with closing(database()) as con, con:
        con.execute('UPDATE deliveries SET file_id=?,state=? WHERE client_id=?',(file_id,'delivered',client_id))
        con.execute('UPDATE orders SET status=? WHERE client_id=?',('delivered',client_id))
    pending_path(client_id).unlink(missing_ok=True)
    return message(chat,f"✅ Конфигурация отправлена. Доступ до {format_date(row[0])}.\n\n1. Установите FREE RUS VPN для Android или Windows по ссылке ниже.\n2. Сохраните отправленный файл .conf.\n3. Откройте приложение, нажмите «+» и выберите импорт из файла.\n4. Выберите .conf и включите VPN.\n\nПовторно получить файл: /access. Не пересылайте конфигурацию другим людям.",[[{'text':'Приложения и инструкция','url':'https://freerus.site/#download'},{'text':'Поддержка','callback_data':'support'}]])


def retry_delivery(chat,user):
    with closing(database()) as con:
        row=con.execute("SELECT client_id FROM deliveries WHERE telegram_id=? AND expires_at>? ORDER BY expires_at DESC LIMIT 1",(str(user),dt.datetime.now(dt.timezone.utc).isoformat())).fetchone()
    if row:
        deliver_config(chat,user,row[0])
        return True
    return False


def support_menu(chat):
    return message(chat,'Поддержка и документы FREE RUS VPN',[
      [{'text':'💬 Написать в поддержку','url':SUPPORT_URL}],
      [{'text':'📄 Условия сервиса','url':TERMS_URL},{'text':'↩️ Возврат','url':REFUNDS_URL}]])

def has_paid_order(user):
    con=database(); row=con.execute("SELECT 1 FROM orders WHERE telegram_id=? AND status IN ('paid','delivered','delivery_pending','provisioning_failed') LIMIT 1",(str(user),)).fetchone(); con.close()
    return bool(row)

def format_date(value):
    try:return dt.datetime.fromisoformat(value).astimezone(dt.timezone.utc).strftime('%d.%m.%Y')
    except Exception:return '—'

def my_access(chat,user):
    if retry_delivery(chat,user):return
    now=dt.datetime.now(dt.timezone.utc); rows=[]
    con=database()
    trial_row=con.execute('SELECT issued_at FROM trials WHERE telegram_id=?',(str(user),)).fetchone()
    if trial_row:
        issued=dt.datetime.fromisoformat(trial_row[0]); rows.append(('Тестовый доступ',issued+dt.timedelta(days=3)))
    for plan,created in con.execute("SELECT plan,created_at FROM orders WHERE telegram_id=? AND status='delivered' ORDER BY created_at DESC",(str(user),)):
        days=PLANS.get(plan,('',0,0))[2]
        if days:
            issued=dt.datetime.fromisoformat(created); rows.append((PLANS[plan][0],issued+dt.timedelta(days=days)))
    con.close()
    if not rows:
        return message(chat,'📦 У вас пока нет активного доступа. Выберите тест или тариф.',[[{'text':'🆓 Тест 3 дня','callback_data':'trial'}]])
    active=[(title,expiry) for title,expiry in rows if expiry>now]
    if active:
        lines=['📦 Мой доступ']
        for title,expiry in active: lines.append(f'✅ {title}\nДо: {format_date(expiry.isoformat())}')
        lines.append('\nКонфиг выдаётся при создании доступа. Если файл потерян — напишите в поддержку.')
        return message(chat,'\n\n'.join(lines),[
          [{'text':'⭐ Продлить на месяц — 199 Stars','callback_data':'renew'}],
          [{'text':'💬 Поддержка','callback_data':'support'}]])
    return message(chat,'📦 Доступ завершён. Продлите VPN, чтобы получить новый конфиг.',[
      [{'text':'⭐ Продлить на месяц — 199 Stars','callback_data':'renew'}],
      [{'text':'💬 Поддержка','callback_data':'support'}]])

def show_menu(chat,user):
    monthly='⭐ Продлить на месяц — 199 Stars' if has_paid_order(user) else '⭐ Первый месяц — 99 Stars'
    action='renew' if has_paid_order(user) else 'month'
    message(chat,'FREE RUS VPN\n\n🆓 Тест — 3 дня бесплатно\n⭐ Первый месяц — 99 Stars\n⭐ Далее — 199 Stars/месяц\n⭐ Годовой — 1 199 Stars',[
      [{'text':'📱 Открыть приложение','web_app':{'url':WEB_APP_URL}}],
      [{'text':'📦 Мой доступ','callback_data':'access'}],
      [{'text':'🆓 Тест 3 дня','callback_data':'trial'}],
      [{'text':monthly,'callback_data':action}],
      [{'text':'⭐ Годовой — 1 199 Stars','callback_data':'year'}],
      [{'text':'🎁 Реферальная программа','callback_data':'ref'}],
      [{'text':'💬 Поддержка, условия и возврат','callback_data':'support'}]])

def send_invoice(chat,user,plan):
    title,stars,days=PLANS[plan]; payload=f'fr-{plan}-{uuid.uuid4().hex}'
    con=database();con.execute('INSERT INTO orders VALUES(?,?,?,?,?,?,?)',(payload,str(user),plan,'pending',dt.datetime.now(dt.timezone.utc).isoformat(),None,None));con.commit();con.close()
    api('sendInvoice',{'chat_id':chat,'title':title,'description':f'Персональный VPN-доступ на {days} дней.','payload':payload,'currency':'XTR','prices':[{'label':title,'amount':stars}]})

def trial(chat,user):
    con=database(); old=con.execute('SELECT client_id FROM trials WHERE telegram_id=?',(str(user),)).fetchone();con.close()
    if old:
        return deliver_config(chat,user,old[0])
    message(chat,'⏳ Создаю тестовый доступ. Конфигурация придёт отдельным файлом в этот чат.')
    result=provision(user,'trial',3)
    queue_delivery(user,result,trial_access=True)
    deliver_config(chat,user,result['client_id'])

def paid(chat,user,payment):
    payload=payment['invoice_payload']
    with closing(database()) as con:
        row=con.execute('SELECT plan,status,telegram_id,client_id,charge_id FROM orders WHERE payload=?',(payload,)).fetchone()
    if not row or row[2]!=str(user):
        raise ValueError('Payment owner or order mismatch')
    plan=row[0];title,stars,days=PLANS[plan]
    if payment.get('currency')!='XTR' or payment.get('total_amount')!=stars:
        raise ValueError('Payment amount mismatch')
    if row[1]!='pending':
        if row[4]!=payment.get('telegram_payment_charge_id'):
            raise ValueError('Payment charge mismatch')
        if row[3]:return deliver_config(chat,user,row[3])
        return message(chat,'Оплата уже учтена. Повторная оплата не нужна; выдачу доступа проверяет поддержка.',[[{'text':'Поддержка','callback_data':'support'}]])
    with closing(database()) as con, con:
        con.execute('UPDATE orders SET status=?,charge_id=? WHERE payload=?',('paid',payment['telegram_payment_charge_id'],payload))
    try:
        result=provision(user,plan,days)
        queue_delivery(user,result,payload=payload)
    except Exception as error:
        LOG.error('Paid provisioning failed: %s',type(error).__name__)
        with closing(database()) as con, con:
            con.execute('UPDATE orders SET status=? WHERE payload=?',('provisioning_failed',payload))
        return message(chat,'Оплата получена, но доступ пока не выдан. Не оплачивайте повторно. Номер заказа: '+payload,[[{'text':'Поддержка','callback_data':'support'}]])
    deliver_config(chat,user,result['client_id'])

def handle(update):
    if 'callback_query' in update:
        q=update['callback_query']; chat=q.get('message',{}).get('chat',{}).get('id'); user=q['from']['id']; action=q.get('data','')
        if chat!=user:return
        try:api('answerCallbackQuery',{'callback_query_id':q['id']})
        except Exception as error:LOG.warning('Callback acknowledgement failed: %s',type(error).__name__)
        if action=='trial':return trial(chat,user)
        if action in ('access','retry'):return my_access(chat,user)
        if action=='menu':return show_menu(chat,user)
        if action in ('month','year','renew'):return send_invoice(chat,user,action)
        if action=='ref':return message(chat,'🎁 После первой покупки бот выдаст персональную реферальную ссылку. Когда друг оплатит первый период, вам обоим добавится по 14 дней.')
        if action=='support':return support_menu(chat)
        return
    if 'pre_checkout_query' in update:
        q=update['pre_checkout_query']
        with closing(database()) as con:
            row=con.execute('SELECT status,telegram_id,plan FROM orders WHERE payload=?',(q['invoice_payload'],)).fetchone()
        valid=bool(row and row[0]=='pending' and row[1]==str(q['from']['id']) and q.get('currency')=='XTR' and q.get('total_amount')==PLANS[row[2]][1])
        answer={'pre_checkout_query_id':q['id'],'ok':valid}
        if not valid:answer['error_message']='Заказ не найден или его условия изменились. Выберите тариф заново.'
        return api('answerPreCheckoutQuery',answer)
    m=update.get('message',{}); chat=m.get('chat',{}).get('id');user=m.get('from',{}).get('id')
    if not chat or chat!=user:return
    if 'successful_payment' in m:return paid(chat,user,m['successful_payment'])
    text=m.get('text','').strip(); parts=text.split(maxsplit=1); command=parts[0].split('@')[0] if parts else ''; start=parts[1].strip() if command=='/start' and len(parts)>1 else ''
    if command in ('/support','/paysupport','/terms','/refunds'):return support_menu(chat)
    if command in ('/access','/myaccess','/retry') or start=='access':return my_access(chat,user)
    if command=='/trial':return trial(chat,user)
    if start in ('buy_month','month'):return send_invoice(chat,user,'renew' if has_paid_order(user) else 'month')
    if start in ('buy_year','year'):return send_invoice(chat,user,'year')
    if start=='trial':return trial(chat,user)
    show_menu(chat,user)

def process_update(update):
    try:
        handle(update)
    except Exception as error:
        # Exception text can contain Telegram tokens or configuration contents.
        LOG.error('Update %s failed: %s',update.get('update_id','unknown'),type(error).__name__)
        q=update.get('callback_query',{});m=update.get('message',q.get('message',{}))
        chat=m.get('chat',{}).get('id');user=q.get('from',m.get('from',{})).get('id')
        if chat and chat==user:
            try:
                message(chat,'Не удалось завершить выдачу доступа. Если конфигурация уже создана, отправьте /access — бот повторит отправку без нового заказа. Если это бесплатный тест и файл ещё не создавался, попробуйте /trial позже. При полученной оплате не оплачивайте повторно.',[[{'text':'Повторить отправку','callback_data':'retry'},{'text':'Поддержка','callback_data':'support'}]])
            except Exception as notify_error:
                LOG.error('Failure notification unavailable: %s',type(notify_error).__name__)


def main():
    logging.basicConfig(level=logging.INFO,format='%(asctime)s %(levelname)s %(message)s')
    os.umask(0o077)
    with closing(database()) as con:
        row=con.execute("SELECT value FROM bot_state WHERE key='offset'").fetchone()
    offset=int(row[0]) if row else 0
    try:
        api('setMyCommands',{'commands':[{'command':'start','description':'Меню и тарифы VPN'},{'command':'trial','description':'Получить тест на 3 дня'},{'command':'access','description':'Мой доступ и повторная отправка конфигурации'},{'command':'support','description':'Помощь с подключением'}]})
    except Exception as error:
        LOG.warning('Could not register commands: %s',type(error).__name__)
    while True:
        try:
            updates=api('getUpdates',{'offset':offset,'timeout':25,'allowed_updates':['message','callback_query','pre_checkout_query']})
            for update in updates:
                process_update(update)
                offset=update['update_id']+1
                with closing(database()) as con, con:
                    con.execute("INSERT OR REPLACE INTO bot_state VALUES('offset',?)",(str(offset),))
        except Exception as error:
            LOG.error('Polling failed: %s',type(error).__name__)
            time.sleep(3)


if __name__=='__main__':
    main()
