const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../client/script.js'), 'utf8');
function run(options = {}) {
  const calls=[]; let handler;
  const status={hidden:true,textContent:''};
  const anchor={getAttribute:()=>options.payload || 'trial',addEventListener:(_,fn)=>{handler=fn}};
  const tg={platform:options.outside?'unknown':'web',initData:options.outside?'':'signed-data',ready(){},expand(){},openTelegramLink(url){calls.push(['open',url]);if(options.openFails)throw Error('open failed')},close(){calls.push(['close']);if(options.closeFails)throw Error('close failed')}};
  const window={Telegram:{WebApp:tg},location:{href:''},addEventListener(){}};
  const document={documentElement:{classList:{add(){}}},querySelector:s=>s==='[data-handoff-status]'?status:null,querySelectorAll:s=>s==='[data-bot-start]'?[anchor]:[]};
  vm.runInNewContext(source,{window,document,navigator:{}});
  let prevented=false; handler({preventDefault(){prevented=true}});
  return {calls,status,window,prevented};
}
test('opens the requested bot action then closes the Telegram 7+ window',()=>{
  for(const action of ['trial','access','buy_month','buy_year']){
    const result=run({payload:action});assert.equal(result.calls[0][0],'open');assert.equal(result.calls[0][1],'https://t.me/FREE_RUS_VPN_BOT?start='+action);assert.equal(result.calls[1][0],'close');assert.equal(result.status.hidden,false);
  }
});
test('ordinary browser navigation remains a native link even with Telegram SDK loaded',()=>{
  const result=run({outside:true});assert.equal(result.prevented,false);assert.equal(result.calls.length,0);
});
test('failed Telegram handoff falls back to the direct bot link without closing first',()=>{
  const result=run({openFails:true});assert.equal(result.window.location.href,'https://t.me/FREE_RUS_VPN_BOT?start=trial');assert.equal(result.calls.length,1);
});
test('close failure keeps instructions visible instead of pretending access was issued',()=>{
  const result=run({closeFails:true});assert.equal(result.status.hidden,false);assert.match(result.status.textContent,/Запустить/);assert.match(result.status.textContent,/\/trial/);
});
