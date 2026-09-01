#!/usr/bin/env python3
# FREE RUS VPN: Telegram Stars sales bot. Run as an unprivileged system user.
import datetime as dt, json, os, sqlite3, time, urllib.request, uuid
from pathlib import Path

TOKEN=os.environ['FREE_RUS_BOT_TOKEN']; PROVISION_TOKEN=os.environ['FREE_RUS_PROVISIONER_TOKEN']
TG=f'https://api.telegram.org/bot{TOKEN}'; PROVISION=os.getenv('FREE_RUS_PROVISIONER_URL','http://127.0.0.1:8786')
WEB_APP_URL=os.getenv('FREE_RUS_WEB_APP_URL','https://vpn.freerus.site/client/').rstrip('/')
SUPPORT_URL=os.getenv('FREE_RUS_SUPPORT_URL','https://t.me/INTERNET_BEZ_GRANIC')
TERMS_URL=os.getenv('FREE_RUS_TERMS_URL','https://freerus.site/terms')
REFUNDS_URL=os.getenv('FREE_RUS_REFUNDS_URL','https://freerus.site/refunds')
DATA=Path(os.getenv('FREE_RUS_BOT_DATA','/var/lib/free-rus-sales-bot')); DB=DATA/'sales.sqlite3'
PLANS={'trial':('Тест VPN FREE RUS — 3 дня',0,3),'month':('VPN FREE RUS — первый месяц',99,30),'renew':('VPN FREE RUS — 1 месяц',199,30),'year':('VPN FREE RUS — 1 год',1199,365)}

def api(method,data):
    req=urllib.request.Request(f'{TG}/{method}',data=json.dumps(data).encode(),headers={'Content-Type':'application/json'})
    with urllib.request.urlopen(req,timeout=35) as r: out=json.load(r)
    if not out.get('ok'): raise RuntimeError(str(out))
    return out['result']

def database():
    DATA.mkdir(parents=True,exist_ok=True); con=sqlite3.connect(DB)
    con.execute('CREATE TABLE IF NOT EXISTS orders(payload TEXT PRIMARY KEY, telegram_id TEXT, plan TEXT, status TEXT, created_at TEXT, charge_id TEXT, client_id TEXT)')
    con.execute('CREATE TABLE IF NOT EXISTS trials(telegram_id TEXT PRIMARY KEY, client_id TEXT, issued_at TEXT)')
    return con

def message(chat,text,buttons=None):
    data={'chat_id':chat,'text':text}
    if buttons:data['reply_markup']={'inline_keyboard':buttons}
    return api('sendMessage',data)

def send_config(chat,config):
    boundary='----freeRus'+uuid.uuid4().hex; parts=[]
    for key,value in {'chat_id':str(chat),'caption':'Ваш персональный конфиг VPN FREE RUS. Не пересылайте его другим людям.'}.items():
        parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="{key}"\r\n\r\n{value}\r\n'.encode())
    parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="document"; filename="vpn-free-rus.conf"\r\nContent-Type: text/plain\r\n\r\n'.encode()+config.encode()+b'\r\n')
    parts.append(f'--{boundary}--\r\n'.encode())
    req=urllib.request.Request(f'{TG}/sendDocument',data=b''.join(parts),headers={'Content-Type':f'multipart/form-data; boundary={boundary}'})
    with urllib.request.urlopen(req,timeout=35) as r: json.load(r)

def provision(user,plan,days):
    body=json.dumps({'label':f'tg-{user}-{plan}','telegram_id':str(user),'ttl_days':days}).encode()
    req=urllib.request.Request(f'{PROVISION}/v1/clients',data=body,headers={'Content-Type':'application/json','Authorization':f'Bearer {PROVISION_TOKEN}'})
    with urllib.request.urlopen(req,timeout=35) as r:return json.load(r)

def support_menu(chat):
    return message(chat,'Поддержка и документы VPN FREE RUS',[
      [{'text':'💬 Написать в поддержку','url':SUPPORT_URL}],
      [{'text':'📄 Условия сервиса','url':TERMS_URL},{'text':'↩️ Возврат','url':REFUNDS_URL}]])

def has_paid_order(user):
    con=database(); row=con.execute("SELECT 1 FROM orders WHERE telegram_id=? AND status IN ('paid','delivered','provisioning_failed') LIMIT 1",(str(user),)).fetchone(); con.close()
    return bool(row)

def format_date(value):
    try:return dt.datetime.fromisoformat(value).astimezone(dt.timezone.utc).strftime('%d.%m.%Y')
    except Exception:return '—'

def my_access(chat,user):
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
    message(chat,'VPN FREE RUS\n\n🆓 Тест — 3 дня бесплатно\n⭐ Первый месяц — 99 Stars\n⭐ Далее — 199 Stars/месяц\n⭐ Годовой — 1 199 Stars',[
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
    if old:return message(chat,'Тестовый доступ уже был выдан для этого аккаунта.')
    result=provision(user,'trial',3)
    con=database();con.execute('INSERT INTO trials VALUES(?,?,?)',(str(user),result['client_id'],dt.datetime.now(dt.timezone.utc).isoformat()));con.commit();con.close()
    message(chat,f"✅ Тестовый доступ создан до {format_date(result['expires_at'])}. Конфиг — следующим сообщением.")
    send_config(chat,result['config'])

def paid(chat,user,payment):
    payload=payment['invoice_payload']; con=database();row=con.execute('SELECT plan,status FROM orders WHERE payload=?',(payload,)).fetchone()
    if not row or row[1]!='pending':con.close();return
    plan=row[0];title,stars,days=PLANS[plan]
    if payment.get('currency')!='XTR' or payment.get('total_amount')!=stars:con.close();return
    con.execute('UPDATE orders SET status=?,charge_id=? WHERE payload=?',('paid',payment['telegram_payment_charge_id'],payload));con.commit();con.close()
    try:
        result=provision(user,plan,days)
        con=database();con.execute('UPDATE orders SET status=?,client_id=? WHERE payload=?',('delivered',result['client_id'],payload));con.commit();con.close()
        message(chat,f"✅ Оплата подтверждена. Доступ создан до {format_date(result['expires_at'])}. Конфиг — следующим сообщением.")
        send_config(chat,result['config'])
    except Exception:
        con=database();con.execute('UPDATE orders SET status=? WHERE payload=?',('provisioning_failed',payload));con.commit();con.close()
        message(chat,'Оплата получена. Выдача доступа требует проверки поддержки. Номер заказа сохранён.')

def handle(update):
    if 'callback_query' in update:
        q=update['callback_query']; chat=q['message']['chat']['id']; user=q['from']['id']; action=q.get('data','');api('answerCallbackQuery',{'callback_query_id':q['id']})
        if action=='trial':return trial(chat,user)
        if action=='access':return my_access(chat,user)
        if action in ('month','year','renew'):return send_invoice(chat,user,action)
        if action=='ref':return message(chat,'🎁 После первой покупки бот выдаст персональную реферальную ссылку. Когда друг оплатит первый период, вам обоим добавится по 14 дней.')
        if action=='support':return support_menu(chat)
        return
    if 'pre_checkout_query' in update:
        q=update['pre_checkout_query'];con=database();row=con.execute('SELECT status FROM orders WHERE payload=?',(q['invoice_payload'],)).fetchone();con.close()
        return api('answerPreCheckoutQuery',{'pre_checkout_query_id':q['id'],'ok':bool(row and row[0]=='pending')})
    m=update.get('message',{}); chat=m.get('chat',{}).get('id');user=m.get('from',{}).get('id')
    if not chat:return
    if 'successful_payment' in m:return paid(chat,user,m['successful_payment'])
    text=m.get('text',''); start=text.split(maxsplit=1)[1] if text.startswith('/start ') else ''
    if text in ('/support','/paysupport','/terms','/refunds'):return support_menu(chat)
    if text in ('/access','/myaccess'):return my_access(chat,user)
    if start in ('buy_month','month'):return send_invoice(chat,user,'renew' if has_paid_order(user) else 'month')
    if start in ('buy_year','year'):return send_invoice(chat,user,'year')
    if start=='trial':return trial(chat,user)
    show_menu(chat,user)

offset=0
while True:
  try:
    for update in api('getUpdates',{'offset':offset,'timeout':25,'allowed_updates':['message','callback_query','pre_checkout_query']}):
      offset=update['update_id']+1;handle(update)
  except Exception: time.sleep(3)
