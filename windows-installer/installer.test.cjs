const assert = require('node:assert/strict');
const test = require('node:test');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = process.env.FREERUS_PACKAGE_DIR;
assert.ok(root, 'Set FREERUS_PACKAGE_DIR to the generated IFW package directory');
test('Windows shortcuts, service and executable agree with packaged files', () => {
 const calls=[];
 const context=vm.createContext({systemInfo:{kernelType:'winnt',currentCpuArchitecture:'x86_64'},installer:{value:(key)=>({Name:'FREE RUS VPN',TargetDir:'C:/Program Files/FreeRusVPN',AllUsersStartMenuProgramsPath:'C:/ProgramData/Microsoft/Windows/Start Menu/Programs',RootDir:'C:/'}[key]),findPath:()=>['runtime']},component:{createOperations(){},addOperation:(...a)=>calls.push(a),addElevatedOperation:(...a)=>calls.push(a)},QDesktopServices:{DesktopLocation:1,storageLocation:()=> 'C:/Users/Test/Desktop'},console});
 vm.runInContext(fs.readFileSync(path.join(root,'packages/AmneziaVPN/meta/componentscript.js'),'utf8'),context);
 vm.runInContext('Component.prototype.createOperations()',context);
 assert.equal(vm.runInContext('appExecutableFileName()',context),'FreeRusVPN.exe');
 assert.equal(vm.runInContext('serviceName()',context),'FreeRusVPN-service');
 const shortcuts=calls.filter(a=>a[0]==='CreateShortcut');
 assert.equal(shortcuts.length,2);
 for(const a of shortcuts){assert.equal(a[1],'@TargetDir@/FreeRusVPN.exe');assert.ok(a[2].endsWith('/FREE RUS VPN.lnk'));}
 const service=calls.find(a=>a[0]==='Execute' && Array.isArray(a[1]));
 assert.equal(service[1][2],'FreeRusVPN-service');
 assert.equal(service[1][4],'"C:\\Program Files\\FreeRusVPN\\FreeRusVPN-service.exe"');
 for(const file of ['FreeRusVPN.exe','FreeRusVPN-service.exe','vc_redist.x64.exe','LICENSE','THIRD_PARTY_LICENSES.md'])assert.ok(fs.existsSync(path.join(root,'packages/AmneziaVPN/data',file)));
 assert.ok(!fs.existsSync(path.join(root,'packages/AmneziaVPN/data/AmneziaVPN-service.exe')));
});
test('Installer presents FREE RUS and never automatically removes Amnezia',()=>{
 const config=fs.readFileSync(path.join(root,'config/config.xml'),'utf8');
 for(const tag of ['Name','Title','Publisher'])assert.ok(config.includes(`<${tag}>FREE RUS VPN</${tag}>`));
 assert.ok(config.includes('<Version>5.0.3.3</Version>'));
 const control=fs.readFileSync(path.join(root,'config/controlscript.js'),'utf8');
 assert.ok(!control.includes('Program Files/AmneziaVPN/'));
 const uninstall=fs.readFileSync(path.join(root,'packages/AmneziaVPN/data/post_uninstall.cmd'),'utf8');
 assert.ok(!uninstall.includes('taskkill'));
 assert.ok(uninstall.includes('sc stop FreeRusVPN-service'));
});
