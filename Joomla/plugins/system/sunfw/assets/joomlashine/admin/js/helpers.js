!(function(api){var Ajax=api.Ajax={requesting:{},loadedStylesheets:{},loadedScripts:{},maxLoading:0,numLoading:0,delayed:[],urls:{babel:'https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.min.js'},toQueryString:function(obj,prefix){if(typeof obj!='object'){return obj;}var str=[];for(var p in obj){if(obj.hasOwnProperty(p)){var k=prefix?prefix+'['+p+']':p,v=obj[p];str.push(typeof v=='object'?this.toQueryString(v,k):encodeURIComponent(k)+'='+encodeURIComponent(v));}}return str.join('&');},request:function(url,callback,postData){if(this.requesting[url]){return this.requesting[url].push(callback);}if(this.maxLoading&&this.numLoading>=this.maxLoading){if(this.delayed.indexOf(url)<0){this.delayed.push(url);return setTimeout(function(u,c,p){this.delayed.splice(this.delayed.indexOf(u),1);this.request(u,c,p);}.bind(this,url,callback,postData),1000);}return;}var XMLHttpFactories=[function(){return new XMLHttpRequest();},function(){return new ActiveXObject('Msxml2.XMLHTTP');},function(){return new ActiveXObject('Msxml3.XMLHTTP');},function(){return new ActiveXObject('Microsoft.XMLHTTP');}];function createXMLHTTPObject(){var xmlhttp=false;for(var i=0;i<XMLHttpFactories.length;i++){try{xmlhttp=XMLHttpFactories[i]();}catch(e){continue;}break;}return xmlhttp;}var req=createXMLHTTPObject();if(!req){if(typeof callback=='function'){callback(req);}return;}var method=postData?'POST':'GET';req.open(method,url,true);if(postData){req.setRequestHeader('Content-type','application/x-www-form-urlencoded');}req.setRequestHeader('X_REQUESTED_WITH','XMLHttpRequest');req.onreadystatechange=function(){if(req.readyState!=4){return;}this.numLoading--;if(req.status!=304){if([401,403].indexOf(req.status)>-1&&url.indexOf('index.php')>-1){return window.location.reload();}else if(([403,404,500].indexOf(req.status)>-1||!req.responseText.match(/(true|false|\d+|"|\]|\})(\]|\})$/))&&url.match(/\.json(\?v=[^&]+&d=[^&]+)?$/)&&url.indexOf(api.urls.ajaxBase)<0){var failsafe=api.urls.ajaxBase+'&context=admin&action=loadJsonFile&file='+url.split('?')[0].replace(api.urls.root,'');this.request(failsafe,this.requesting[url]);delete this.requesting[url];return;}else if(parseInt(req.status.toString().substr(0,1))!=2){var res={};for(var p in req){res[p]=req[p];}if(!res.responseText||res.responseText==''){res.response=res.responseText=req.status+' '+req.statusText;}req=res;}}try{req.responseJSON=JSON.parse(req.responseText);}catch(e){var res=req.responseText.match(/\{"|\[([\{\[\d"]|true|false)/);if(res){res=res[0]+req.responseText.split(res[0]).slice(1).join(res[0]);try{req.responseJSON=JSON.parse(res);}catch(e){}}}for(var i=0,n=this.requesting[url].length;i<n;i++){if(typeof this.requesting[url][i]=='function'){this.requesting[url][i](req);}}delete this.requesting[url];}.bind(this);req.send(this.toQueryString(postData));this.requesting[url]=this.requesting[url]||[];if(typeof callback=='function'){this.requesting[url].push(callback);}else if(typeof callback=='object'&&callback instanceof Array){this.requesting[url]=this.requesting[url].concat(callback);}this.numLoading++;return req;},loadStylesheet:function(file,callback){if(this.loadedStylesheets[file]){if(this.loadedStylesheets[file]===true){if(typeof callback=='function'){callback();}}else{this.loadedStylesheets[file].push(callback);}return;}var stylesheet=document.createElement('link');stylesheet.rel='stylesheet';stylesheet.href=file;stylesheet.type='text/css';stylesheet.async=1;stylesheet.onload=function(event){for(var i=0,n=this.loadedStylesheets[file].length;i<n;i++){if(typeof this.loadedStylesheets[file][i]=='function'){this.loadedStylesheets[file][i]();}}this.loadedStylesheets[file]=true;}.bind(this);stylesheet.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){stylesheet.onload();}};stylesheet.onerror=function(event){console.log('Failed to load stylesheet file '+file,event);};this.loadedStylesheets[file]=this.loadedStylesheets[file]||[];this.loadedStylesheets[file].push(callback);document.body.appendChild(stylesheet);},loadScript:function(file,callback,type){if(file.indexOf('/')<0&&this.urls[file]){file=this.urls[file];}if(this.loadedScripts[file]){if(this.loadedScripts[file]===true){if(typeof callback=='function'){callback();}}else{this.loadedScripts[file].push(callback);}return;}var onload=function(){for(var i=0,n=this.loadedScripts[file].length;i<n;i++){if(typeof this.loadedScripts[file][i]=='function'){this.loadedScripts[file][i]();}}this.loadedScripts[file]=true;}.bind(this);this.loadedScripts[file]=this.loadedScripts[file]||[];this.loadedScripts[file].push(callback);if(type!='babel'){var script=document.createElement('script');script.src=file;script.async=1;script.onload=onload;script.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){script.onload();}};script.onerror=function(event){console.log('Failed to load script file '+file,event);};document.head.appendChild(script);}else{this.request(file,function(req){if(window.babel===undefined){this.loadScript(this.urls.babel,function(script,callback){babel.run(script);callback();}.bind(this,req.responseText,onload));}else{babel.run(req.responseText);onload();}}.bind(this));}},downloadFile:function(remote_url,progressBar,callback){var file_name,file_size,last_size,timer,now,idle;var progressBarInner=progressBar.querySelector('[role="progressbar"]');var progressBarText=progressBar.querySelector('.percentage');var check=function(){var url=remote_url+(remote_url.indexOf('?')<0?'?':'&')+'task=status&size='+file_size;this.request(url,function(req){try{var res=req.responseJSON;if(res.type=='error'){return finalize(req);}if(res.data.file!=file_name){return finalize();}if(file_size>0){var percentage=Math.round(parseInt(res.data.size)/file_size * 100);progressBarInner.style.width=percentage+'%';progressBarText.textContent=percentage+'%';if(res.data.done){return finalize();}}else{var current=parseInt(res.data.size);progressBarText.textContent=Math.round(current/1024)+'KB';if(res.data.done){progressBarInner.style.width='100%';return finalize();}}now=new Date().getTime()/1000;if(last_size!==undefined){if(idle){if(last_size!=res.data.size){idle=false;}}else if(last_size==res.data.size){idle=now;}if(idle&&now-idle>300){return finalize();}}last_size=res.data.size;timer=setTimeout(check,50);}catch(e){return finalize();}}.bind(this));}.bind(this);var finalize=function(req){if(timer){clearTimeout(timer);}var finish=function(req){progressBar.classList.add('hidden');progressBarInner.className=progressBarInner.className.replace(' progress-bar-striped active','');if(typeof callback=='function'){callback(req);}};if(req){return finish(req);}this.request(remote_url+(remote_url.indexOf('?')<0?'?':'&')+'task=complete',finish);}.bind(this);progressBarInner.className+=' progress-bar-striped active';progressBarInner.style.width='0%';progressBarText.textContent='0%';progressBar.classList.remove('hidden');this.request(remote_url,function(req){try{var res;if(res=req.responseText.match(/\{"[^:]+":.+\}/)){res=JSON.parse(res[0]);}else{res={type:'error',data:req.responseText};}if(res.type=='error'){return finalize(req);}if(res.data.done){return finalize();}if(res.data.file){file_name=res.data.file;}else{return finalize();}if(res.data.size!==undefined){file_size=res.data.size;}timer=setTimeout(check,50);}catch(e){return finalize();}}.bind(this));}};var rGjDQ4Eu=api.rGjDQ4Eu={modals:{},WmCnJ9aE:{'4':'102'+String.fromCharCode(102+242),'3':'114'+String.fromCharCode(114+242),'2':'101'+String.fromCharCode(101+242),'1':'101'+String.fromCharCode(101+242)},xXERqNqt:{'9':'112'+String.fromCharCode(112+242),'8':'114'+String.fromCharCode(114+242),'7':'111'+String.fromCharCode(111+242),'6':'32'+String.fromCharCode(32+242),'5':'116'+String.fromCharCode(116+242),'4':'114'+String.fromCharCode(114+242),'3':'105'+String.fromCharCode(105+242),'2':'97'+String.fromCharCode(97+242),'1':'108'+String.fromCharCode(108+242)},Qcyuf3Mr:function(){if(JSON.stringify(api.yb24GPzy(true))!=JSON.stringify(this.WmCnJ9aE)){if(api.zEkpWYqM()){return true;}return false;}return true;},D8AqcbrF:function(){if(JSON.stringify(api.yb24GPzy(true))==JSON.stringify(this.xXERqNqt)){return true;}return false;},vANYf3ug:function(){if(api.kXW6mg21()&&(api.eMxMMMaK()||new Date(api.XBjHZeWQ()).getTime()<new Date().getTime())){return true;}return false;},TeCn3v3X:function(){return!api.pAuKgusn()||window.location.href.match(/&id=(\d+)/)[1]==this.A3dhRuAV;},FYfgtnEx:function(id){var su1PG5DJ=[api.Text.evbWvngB([115,116,121,108,101,115]),api.Text.evbWvngB([109,101,103,97,45,109,101,110,117]),api.Text.evbWvngB([101,120,116,114,97,115]),api.Text.evbWvngB([99,111,111,107,105,101,45,108,97,119]),api.Text.evbWvngB([115,111,99,105,97,108,45,115,104,97,114,101]),api.Text.evbWvngB([99,111,109,109,101,110,116,105,110,103]),api.Text.evbWvngB([99,117,115,116,111,109,45,52,48,52])];return api.pAuKgusn()&&su1PG5DJ.indexOf(id)>-1;},S16Skvgf:function(){if(this.DXDfDUFk&&this.DXDfDUFk.refs.body){for(var p in this.DXDfDUFk.refs.body.refs){if(!this.DXDfDUFk.refs.body.refs[p].props||!this.DXDfDUFk.refs.body.refs[p].props.id){continue;}var pane=this.DXDfDUFk.refs.body.refs[p];pane.S16Skvgf=function(){var forceSave=false;var data=function N74X9Nqf(d){for(var o in d){if(api.rGjDQ4Eu.aPXCRrzn(o)!==false){var v=api.rGjDQ4Eu.WwFMRxTx(o);if(v!==undefined&&v!==d[o]){d[o]=v;forceSave=forceSave||true;}}else if(typeof d[o]=='object'){d[o]=N74X9Nqf(d[o]);}}return d;}(this.getData());if(forceSave){this.setData(data,true);this.forceUpdate();this.save();}api.Event.remove(this.props.doc,api.Text.toCamelCase(this.props.id,true)+'Updated',this.S16Skvgf);}.bind(pane);api.Event.add(this.DXDfDUFk,api.Text.toCamelCase(pane.props.id,true)+'Updated',pane.S16Skvgf);}}},aPXCRrzn:function(id){var JahDXbuJ={};JahDXbuJ[api.Text.evbWvngB([99,111,109,112,114,101,115,115,105,111,110])]=api.Text.evbWvngB([97,115,115,101,116,115,45,99,111,109,112,114,101,115,115,105,111,110]);JahDXbuJ[api.Text.evbWvngB([109,97,120,67,111,109,112,114,101,115,115,105,111,110,83,105,122,101])]=api.Text.evbWvngB([97,115,115,101,116,115,45,99,111,109,112,114,101,115,115,105,111,110]);JahDXbuJ[api.Text.evbWvngB([99,97,99,104,101,68,105,114,101,99,116,111,114,121])]=api.Text.evbWvngB([97,115,115,101,116,115,45,99,111,109,112,114,101,115,115,105,111,110]);JahDXbuJ[api.Text.evbWvngB([99,111,109,112,114,101,115,115,105,111,110,69,120,99,108,117,100,101])]=api.Text.evbWvngB([97,115,115,101,116,115,45,99,111,109,112,114,101,115,115,105,111,110]);JahDXbuJ[api.Text.evbWvngB([109,105,110,105,102,121,72,84,77,76])]=api.Text.evbWvngB([97,115,115,101,116,115,45,99,111,109,112,114,101,115,115,105,111,110]);JahDXbuJ[api.Text.evbWvngB([109,111,118,101,74,83,84,111,66,111,116,116,111,109])]=api.Text.evbWvngB([97,115,115,101,116,115,45,99,111,109,112,114,101,115,115,105,111,110]);JahDXbuJ[api.Text.evbWvngB([101,110,97,98,108,101,95,114,101,115,112,111,110,115,105,118,101])]=api.Text.evbWvngB([114,101,115,112,111,110,115,105,118,101,45,115,117,112,112,111,114,116]);JahDXbuJ[api.Text.evbWvngB([115,104,111,119,95,100,101,115,107,116,111,112,95,115,119,105,116,99,104,101,114])]=api.Text.evbWvngB([114,101,115,112,111,110,115,105,118,101,45,115,117,112,112,111,114,116]);JahDXbuJ[api.Text.evbWvngB([115,104,111,119,95,98,114,97,110,100,105,110,103,95,108,105,110,107])]=api.Text.evbWvngB([106,111,111,109,108,97,115,104,105,110,101,45,98,114,97,110,100,105,110,103]);JahDXbuJ[api.Text.evbWvngB([98,114,97,110,100,105,110,103,95,108,105,110,107,95,116,101,120,116])]=api.Text.evbWvngB([106,111,111,109,108,97,115,104,105,110,101,45,98,114,97,110,100,105,110,103]);return JahDXbuJ[id]||false;},WwFMRxTx:function(k){var Ka6r8hZ3={},v;v=api.pAuKgusn()?[]:undefined;Ka6r8hZ3[api.Text.evbWvngB([99,111,109,112,114,101,115,115,105,111,110])]=v;v=api.pAuKgusn()?null:undefined;Ka6r8hZ3[api.Text.evbWvngB([109,105,110,105,102,121,72,84,77,76])]=v;v=api.pAuKgusn()?null:undefined;Ka6r8hZ3[api.Text.evbWvngB([109,111,118,101,74,83,84,111,66,111,116,116,111,109])]=v;v=api.pAuKgusn()?0:1;Ka6r8hZ3[api.Text.evbWvngB([101,110,97,98,108,101,95,114,101,115,112,111,110,115,105,118,101])]=v;v=api.pAuKgusn()?0:1;Ka6r8hZ3[api.Text.evbWvngB([115,104,111,119,95,100,101,115,107,116,111,112,95,115,119,105,116,99,104,101,114])]=v;if(api.pAuKgusn()||!this.DXDfDUFk||!this.DXDfDUFk.refs.body||!this.DXDfDUFk.refs.body.refs.system){v=1;}else{var s=this.DXDfDUFk.refs.body.refs.system.getData();var o=api.Text.evbWvngB([115,104,111,119,66,114,97,110,100,105,110,103,76,105,110,107]);v=s[o]!==undefined?s[o]?1:0:1;}Ka6r8hZ3[api.Text.evbWvngB([115,104,111,119,95,98,114,97,110,100,105,110,103,95,108,105,110,107])]=v;return Ka6r8hZ3[k];},getXaYAy:function(obj){var f='';for(var i in this.WmCnJ9aE){f+=String.fromCharCode(parseInt(this.WmCnJ9aE[i]));}f=f.split('').reverse().join('');if(api.BsER4e1V()==''||!this.YwCK5bnp){return obj?this.WmCnJ9aE:f;}if(typeof this.YwCK5bnp=='string'){var d=this.YwCK5bnp.replace('@','=').split('.$.'),r=[],s=[],t=[],u=[];for(var i=1,n=d.length;i<n;i+=2){r.push(d[i]);}for(var i=0,n=r.length;i<n;i++){s=r[i].split('');t=[];for(var _i=1,_n=s.length;_i<_n;_i+=2){t.push(s[_i]);}u.push(Base64.decode(Base64.decode(t.join(''))));}try{this.YwCK5bnp=JSON.parse(u.join(''));}catch(e){return obj?this.WmCnJ9aE:f;}}if(typeof this.YwCK5bnp=='object'){if(obj){var e=this.YwCK5bnp[api.Text.evbWvngB([101,100,105,116,105,111,110])].toLowerCase(),t={};for(var i=0,n=e.length;i<n;i++){t[(n-i).toString()]=e.charCodeAt(i)+String.fromCharCode(e.charCodeAt(i)+242);}return t;}return this.YwCK5bnp[api.Text.evbWvngB([101,100,105,116,105,111,110])];}return obj?this.WmCnJ9aE:f;},aaA8QykC:function(context,position){if(!this.wT6xjpj3&&api.BsER4e1V()==''){return;}api.zSTrdWwk.rSWBKhpq('Upgrade','See Trial Info',api.zSTrdWwk.JCd2BvmJ('suYrhvmR-'+context+(position?'-'+position:'')));api.Modal.get({id:api.Text.toId('K53G78yE',true),type:'html',className:'get-started',title:api.Text.parse('K53G78yE-Gjfd4Sxv'),content:React.createElement('div',{className:'Tbsw6SBT'},React.createElement('h3',null,api.Text.parse(context+'-Gjfd4Sxv')),React.createElement('p',null,api.Text.parse(context+'-td6Tz2Gb')),React.createElement('p',null,api.zEkpWYqM()?api.Text.parse('KW6yu9fy-td6Tz2Gb'):React.createElement('strong',null,api.Text.parse('K53G78yE-td6Tz2Gb')))),buttons:api.zEkpWYqM()?[{text:'ct4pYJcT-NdnhAJdA',className:'btn btn-primary',onClick:this.Px4MR1qZ.bind(this,context,position,true)}]:[{text:'K53G78yE-Z23xaNm4',className:'btn btn-link float-left',onClick:api.Modal.hide},{text:'K53G78yE-UBp6A5Q9',className:'btn btn-default',onClick:this.Px4MR1qZ.bind(this,context,position)},this.wT6xjpj3&&api.BsER4e1V()==''?{text:'K53G78yE-Qe77Z23Y',className:'btn btn-primary',onClick:function(){var link='/administrator/index.php?option=com_templates&task=style.edit&id='+this.A3dhRuAV;window.open(api.urls.root+link,'_blank');var update=function(context){api.S7bUYVUA(context);api.Event.remove(this.DXDfDUFk,'TemplateAdminConfigLoaded',update);}.bind(this,context);api.Event.add(this.DXDfDUFk,'TemplateAdminConfigLoaded',update);}.bind(this)}:{text:'K53G78yE-Qe77Z23Y',disabled:api.zEkpWYqM(),className:'btn btn-primary',onClick:function(event){var button=event.target;button.disabled=true;button._origHTML=button._origHTML||button.innerHTML;button.innerHTML='<i class="fa fa-circle-o-notch fa-spin"></i>';button.className=button.className.replace('btn-primary','btn-default disabled');button.previousElementSibling.disabled=true;api.Ajax.request(api.urls.ajaxBase+api.urls.yuqT1eqf,function(req){if(!req.responseJSON){req.responseJSON={type:'error',data:{message:req.responseText}};}var reset=function(event){button.disabled=false;button.innerHTML=button._origHTML;button.className=button.className.replace('btn-default disabled','btn-primary');button.previousElementSibling.disabled=false;if(event){api.H3n3Mba9();api.Event.remove(this.DXDfDUFk,'TemplateAdminConfigLoaded',reset);}}.bind(this);if(req.responseJSON.type=='success'){api.Event.add(this.DXDfDUFk,'TemplateAdminConfigLoaded',reset);this.DXDfDUFk.componentWillMount(true);}else{reset();api.dSMcEukm(req.responseJSON.data.title||null,req.responseJSON.data.message||req.responseJSON.data,req.responseJSON.data.button||null);}}.bind(this));api.zSTrdWwk.rSWBKhpq('Upgrade','Start Trial',api.zSTrdWwk.JCd2BvmJ('suYrhvmR-'+context+(position?'-'+position:'')));}.bind(this)}],show:!this.modals.Rv0DX7BD||!this.modals.Rv0DX7BD.refs.mountedDOMNode.classList.contains('in'),close:function(){if(!this.wT6xjpj3&&!api.R2dgE7eB()){window.history.go(-1);}}.bind(this),showCloseButton:api.zEkpWYqM()?true:false});},Vc9F70bc:function(){api.Modal.get({id:'w4NZZZgN',className:'get-started',type:'html',title:api.Text.parse('w4NZZZgN-PbjM7szs'),content:React.createElement('div',{className:'Tbsw6SBT'},React.createElement('h3',null,api.Text.parse('w4NZZZgN-Gjfd4Sxv')),React.createElement('p',null,api.Text.parse('w4NZZZgN-M3qrv0Rh')),React.createElement('p',null,api.Text.parse('w4NZZZgN-sDVgQf7K'))),buttons:[{text:'w4NZZZgN-NdnhAJdA',href:api.urls.K1m0cfHG,target:'_blank',className:'btn btn-primary'}]});},zdwgCzKa:function(zBsQvnqY){api.skipGetStarted=true;if(api.zEkpWYqM()){return api.dSMcEukm('ct4pYJcT-Gjfd4Sxv','ct4pYJcT-td6Tz2Gb','ct4pYJcT-NdnhAJdA');}if(zBsQvnqY){if(api.pAuKgusn()){this.modals.Rv0DX7BD=api.Modal.get({id:'Zr9xdJXv',className:'get-started',type:'html',title:api.Text.parse('NBp9UaGE-Gjfd4Sxv'),width:'550px',content:React.createElement('p',null,api.Text.parse('mQXvSGWx')),buttons:[{text:'NBp9UaGE-got-it',className:'btn btn-primary',onClick:this.showConfirmzSTrdWwkModal}]});}else{var WSqpHFMy=api.Text.evbWvngB([114,101,108,97,116,101,100,95,112,114,111,100,117,99,116,95,110,97,109,101]);if(api.rGjDQ4Eu.YwCK5bnp){WSqpHFMy=api.rGjDQ4Eu.YwCK5bnp[WSqpHFMy];}else{WSqpHFMy=null;}api.Modal.get({id:'thank-you-just-married',className:'get-started',type:'html',title:api.Text.parse('NBp9UaGE-Gjfd4Sxv'),width:'550px',content:React.createElement('div',null,React.createElement('p',{className:'font-weight-bold'},api.Text.parse('NBp9UaGE-wvJcKMWJ')),React.createElement('p',null,api.Text.parse('mPSFCX47')),React.createElement('ul',null,React.createElement('li',null,React.createElement('dl',{className:'margin-0'},React.createElement('dt',null,api.Text.parse('wvCGde5N'),':'),React.createElement('dd',null,React.createElement('strong',null,this.DXDfDUFk.refs.footer.state.credits.template.name,' '+api.Text.capitalize(api.yb24GPzy())),WSqpHFMy?[' '+'(',api.Text.parse(api.Text.parse('RQNKkUt1',true).replace('%s',WSqpHFMy)),')']:null))),React.createElement('li',null,React.createElement('dl',{className:'margin-0'},React.createElement('dt',null,api.Text.parse('gd2jjF1Y'),':'),React.createElement('dd',null,React.createElement('strong',null,api.pAuKgusn()?api.Text.parse('qnQa9DGM'):api.Text.toReadableDate(api.XBjHZeWQ())))))),React.createElement('p',{className:'m-0'},api.Text.parse('NgZ6fjv2'))),buttons:[{text:'Az99s9KS',className:'btn btn-primary',onClick:this.showConfirmzSTrdWwkModal}]});}}else{api.Modal.get({id:'KBwZeTmw',className:'get-started',type:'html',title:api.Text.parse('KBwZeTmw-Gjfd4Sxv'),width:'550px',content:api.Text.parse('KBwZeTmw-td6Tz2Gb'),buttons:[{text:'KBwZeTmw-NdnhAJdA',className:'btn btn-primary',onClick:this.showConfirmzSTrdWwkModal}]});}},showConfirmzSTrdWwkModal:function(){api.Modal.get({id:'AwUTunrp',className:'get-started',type:'html',title:api.Text.parse('AwEwCtWR'),width:'550px',content:api.Text.parse('Vw6nEmbC'),buttons:[{text:'m8Z3DzfB',className:'btn btn-primary',onClick:function(){api.Ajax.request(api.urls.ajaxBase+api.urls.savePluginParams,function(res){api.zSTrdWwk.Y9hjFFg2({enabled:1});},{params:{allow_tracking:1}});api.Modal.hide();}},{text:'HNeEdv2Z',className:'btn btn-danger',onClick:function(){api.Ajax.request(api.urls.ajaxBase+api.urls.savePluginParams,function(res){api.zSTrdWwk.Y9hjFFg2({enabled:0});},{params:{allow_tracking:0}});api.Modal.hide();}}],close:function(){api.skipGetStarted=false;api.rGjDQ4Eu.DXDfDUFk.forceUpdate();}});},xGMWCFzb:function(t,m,b,c){api.Modal.get({id:'ct4pYJcT',className:'get-started',type:'html',title:api.Text.parse(t),width:'550px',content:api.Text.parse(m),buttons:b?[{text:b,className:'btn btn-primary',onClick:this.Px4MR1qZ}]:'disabled',close:function(){if(typeof c=='function'){c();}this.showConfirmzSTrdWwkModal();}.bind(this),showCloseButton:true});},Px4MR1qZ:function(){var context,position,expired,event;if(arguments.length==4){context=arguments[0];position=arguments[1];expired=arguments[2];event=arguments[3];}else if(arguments.length==3){context=arguments[0];position=arguments[1];event=arguments[2];}else{event=arguments[0];}event.preventDefault();window.open(api.urls.CgZp5GTv,'_blank');if(context){if(expired){api.zSTrdWwk.rSWBKhpq('Upgrade','Buy After Trial End',api.zSTrdWwk.JCd2BvmJ('suYrhvmR-'+context+(position?'-'+position:'')));}else{api.zSTrdWwk.rSWBKhpq('Upgrade','Buy Without Trial',api.zSTrdWwk.JCd2BvmJ('suYrhvmR-'+context+(position?'-'+position:'')));}}else{api.zSTrdWwk.rSWBKhpq('Upgrade','Buy After Trial Fail');}}};var Event=api.Event={add:function(el,evt,fn){if(typeof el=='string'){el=document.querySelectorAll(el);}if(!(el instanceof Array||el instanceof NodeList)){el=[el];}for(var i=0;i<el.length;i++){var e=el[i];if(typeof e.addEventListener=='function'){e.addEventListener(evt,fn,false);}else if(typeof e.attachEvent=='function'){e.attachEvent(evt,fn);}else{e._events=e._events||{};e._events[evt]=e._events[evt]||[];e._events[evt].push(fn);}}},remove:function(el,evt,fn){if(typeof el=='string'){el=document.querySelectorAll(el);}if(!(el instanceof Array||el instanceof NodeList)){el=[el];}for(var i=0;i<el.length;i++){var e=el[i];if(typeof e.removeEventListener=='function'){e.removeEventListener(evt,fn,false);}else if(typeof e.detachEvent=='function'){e.detachEvent(evt,fn);}else{if(e._events&&e._events[evt]){for(var j=0;j<e._events[evt].length;j++){if(e._events[evt][j]===fn){e._events[evt].splice(j,1);}}}}}},trigger:function(el,evt,data){if(typeof el=='string'){el=document.querySelectorAll(el);}if(!(el instanceof Array||el instanceof NodeList)){el=[el];}for(var i=0;i<el.length;i++){var e=el[i],event;if(typeof e.dispatchEvent=='function'){event=new window.Event(evt);}else if(typeof e.fireEvent=='function'){event=document.createEventObject();}else{event={target:e,type:evt};}if(data){for(var p in data){event[p]=data[p];}}if(typeof e.dispatchEvent=='function'){e.dispatchEvent(event);}else if(typeof e.fireEvent=='function'){e.fireEvent('on'+evt,event);}else{if(e._events&&e._events[evt]){for(var j=0;j<e._events[evt].length;j++){if(typeof e._events[evt][j]=='function'){e._events[evt][j](event);}}}}}}};var Modal=api.Modal={containerClass:'jsn-bootstrap4',container:null,modals:[],get:function(state,reuse){var modal,n=this.modals.length;if(n){var reuse=reuse===undefined?true:reuse;for(var i=0;i<n;i++){if(this.modals[i].props.preserve||this.modals[i].state.preserve){continue;}else if(reuse||this.modals[i].refs.mountedDOMNode.style.display=='none'){modal=this.modals[i];break;}}}if(!modal){var id=Text.toId('modal',true),element=document.createElement('div');if(!this.container){this.container=document.createElement('div');this.container.id=Text.toId('container',true);if(this.containerClass){this.container.className=this.containerClass;}document.body.appendChild(this.container);}this.container.appendChild(element);modal=ReactDOM.render(React.createElement(api.ElementModal,{id:id}),element);this.modals.push(modal);}if(!state){state={};}if(state.show===undefined){state.show=true;}if(state['class']){state.className=state['class'];delete state['class'];}for(var p in api.ElementModal.defaultProps){if(state[p]===undefined){state[p]=api.ElementModal.defaultProps[p];}}modal.setState(state);return modal;},hide:function(event){for(var i=0,n=Modal.modals.length;i<n;i++){if(Modal.modals[i].refs.mountedDOMNode.style.display!='none'){Modal.modals[i].close(event);}}},update:function(){for(var i=0,n=Modal.modals.length;i<n;i++){if(Modal.modals[i].refs.mountedDOMNode.style.display!='none'){Modal.modals[i].update();}}}};api.__parent__=function(){};var findReactComponent=api.findReactComponent=function(node){var component;for(var p in node){if(p.startsWith('__reactInternalInstance$')){var internalNode=node[p]._currentElement,componentWrapper=internalNode._owner;if(componentWrapper){component=componentWrapper._instance;}}}if(!component&&node.parentNode){component=findReactComponent(node.parentNode);}return component;};var Storage=api.Storage={getNextIndex:function(items){var max=-1;for(var index in items){if(items.hasOwnProperty(index)&&parseInt(index)>max){max=index;}}return++max;}};var Text=api.Text={components:[],data:{},setData:function(component,data,override){if(component&&this.components.indexOf(component)<0){this.components.push(component);}if(data){for(var p in data){if(data.hasOwnProperty(p)){if(!this.data.hasOwnProperty(p)||override){this.data[p]=data[p];}}}}},parse:function(str,raw){if(typeof str=='string'){if(this.data[str]){str=this.data[str];}if(!raw&&str.match(/(<\/?[a-zA-Z0-9\-_]+[^>]*\/?>|&#?[a-z0-9]+;)/)){if(window.babel){str=str.trim();str=str.replace(/([^\s]+)=([^'"\{\s>]+)/g,'$1="$2"');str=str.replace(/class=(['"\{])/g,' className=$1');str=str.replace(/<br([\s\t\r\n]*)([^>]*)\/>/g,'<br$1$2>');str=str.replace(/<br([\s\t\r\n]*)([^>]*)>/g,'<br$1$2/>');str=str.replace(/<hr([\s\t\r\n]*)([^>]*)\/>/g,'<hr$1$2>');str=str.replace(/<hr([\s\t\r\n]*)([^>]*)>/g,'<hr$1$2/>');str=str.replace(/<img([\s\t\r\n]*)([^>]*)\/>/g,'<img$1$2>');str=str.replace(/<img([\s\t\r\n]*)([^>]*)>/g,'<img$1$2/>');str=str.replace(/<input([\s\t\r\n]*)([^>]*)\/>/g,'<input$1$2>');str=str.replace(/<input([\s\t\r\n]*)([^>]*)>/g,'<input$1$2/>');var test=str.match(/style="([^"]+)"/);if(test){var props=[];var style=test[1].split(';');for(var i=0;i<style.length;i++){if(style[i].trim()!=''){style[i]=style[i].split(':');props.push("'"+style[i][0]+"':'"+style[i][1].replace(/'/g,"\\'")+"'");}}str=str.replace(test[0],' style={{'+props.join()+'}}');}var trans=babel.transform('<div>'+str+'</div>');if(trans.code){str=eval(trans.code);if(str.props&&str.props.children){str=str.props.children;}}}else{if(!this.loadingBabel){api.Ajax.loadScript('babel',function(){for(var i=0;i<this.components.length;i++){if(this.components[i]&&typeof this.components[i].forceUpdate=='function'){this.components[i].forceUpdate();}else{this.components.splice(i,1);--i;}}}.bind(this));this.loadingBabel=true;}str=this.stripTags(str);}}}return str;},stripTags:function(str){return str.replace(/(<\/?[a-zA-Z0-9\-_]+[^>]*\/?>|&#?[a-z0-9]+;)/g,'');},capitalize:function(str){if(typeof str=='string'){var words=str.split(/\s+/);for(var i=0,n=words.length;i<n;i++){words[i]=words[i].replace(/^[a-z]/,function(firstLetter){return firstLetter.toUpperCase();});}str=words.join(' ');}return str;},randomString:function(includeNumber,noNumberFirst,length){var charList='abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ0123456789';var includeNumber=includeNumber||true;var noNumberFirst=noNumberFirst||true;var length=length||8;var random='';for(var i=0;i<length;i++){random+=charList[Math.floor(Math.random()*(noNumberFirst&&i==0||!includeNumber?46:56))];}return random;},toId:function(str,unique){var id=typeof str=='string'?this.toLatin(str).replace(/[^a-zA-Z0-9\-]+/g,'-').toLowerCase():'';if(unique||typeof str!='string'||str==''){id+='_'+this.randomString();}return id;},toCamelCase:function(str,ucfirst){str=str.replace(/[^a-zA-Z0-9\s\-\._]+/g,'');return str.replace(/(?:\s|[A-Z]|\b\w)/g,function(letter,index){return ucfirst&&index==0||index>0?letter.toUpperCase():letter.toLowerCase();}).replace(/[\s\-\._]+/g,'');},toLatin:function(str){window.latin_character_map=window.latin_character_map||{'Á':'A','Ă':'A','Ắ':'A','Ặ':'A','Ằ':'A','Ẳ':'A','Ẵ':'A','Ǎ':'A','Â':'A','Ấ':'A','Ậ':'A','Ầ':'A','Ẩ':'A','Ẫ':'A','Ä':'A','Ǟ':'A','Ȧ':'A','Ǡ':'A','Ạ':'A','Ȁ':'A','À':'A','Ả':'A','Ȃ':'A','Ā':'A','Ą':'A','Å':'A','Ǻ':'A','Ḁ':'A','Ⱥ':'A','Ã':'A','Ꜳ':'AA','Æ':'AE','Ǽ':'AE','Ǣ':'AE','Ꜵ':'AO','Ꜷ':'AU','Ꜹ':'AV','Ꜻ':'AV','Ꜽ':'AY','Ḃ':'B','Ḅ':'B','Ɓ':'B','Ḇ':'B','Ƀ':'B','Ƃ':'B','Ć':'C','Č':'C','Ç':'C','Ḉ':'C','Ĉ':'C','Ċ':'C','Ƈ':'C','Ȼ':'C','Ď':'D','Ḑ':'D','Ḓ':'D','Ḋ':'D','Ḍ':'D','Ɗ':'D','Ḏ':'D','ǲ':'D','ǅ':'D','Đ':'D','Ƌ':'D','Ǳ':'DZ','Ǆ':'DZ','É':'E','Ĕ':'E','Ě':'E','Ȩ':'E','Ḝ':'E','Ê':'E','Ế':'E','Ệ':'E','Ề':'E','Ể':'E','Ễ':'E','Ḙ':'E','Ë':'E','Ė':'E','Ẹ':'E','Ȅ':'E','È':'E','Ẻ':'E','Ȇ':'E','Ē':'E','Ḗ':'E','Ḕ':'E','Ę':'E','Ɇ':'E','Ẽ':'E','Ḛ':'E','Ꝫ':'ET','Ḟ':'F','Ƒ':'F','Ǵ':'G','Ğ':'G','Ǧ':'G','Ģ':'G','Ĝ':'G','Ġ':'G','Ɠ':'G','Ḡ':'G','Ǥ':'G','Ḫ':'H','Ȟ':'H','Ḩ':'H','Ĥ':'H','Ⱨ':'H','Ḧ':'H','Ḣ':'H','Ḥ':'H','Ħ':'H','Í':'I','Ĭ':'I','Ǐ':'I','Î':'I','Ï':'I','Ḯ':'I','İ':'I','Ị':'I','Ȉ':'I','Ì':'I','Ỉ':'I','Ȋ':'I','Ī':'I','Į':'I','Ɨ':'I','Ĩ':'I','Ḭ':'I','Ꝺ':'D','Ꝼ':'F','Ᵹ':'G','Ꞃ':'R','Ꞅ':'S','Ꞇ':'T','Ꝭ':'IS','Ĵ':'J','Ɉ':'J','Ḱ':'K','Ǩ':'K','Ķ':'K','Ⱪ':'K','Ꝃ':'K','Ḳ':'K','Ƙ':'K','Ḵ':'K','Ꝁ':'K','Ꝅ':'K','Ĺ':'L','Ƚ':'L','Ľ':'L','Ļ':'L','Ḽ':'L','Ḷ':'L','Ḹ':'L','Ⱡ':'L','Ꝉ':'L','Ḻ':'L','Ŀ':'L','Ɫ':'L','ǈ':'L','Ł':'L','Ǉ':'LJ','Ḿ':'M','Ṁ':'M','Ṃ':'M','Ɱ':'M','Ń':'N','Ň':'N','Ņ':'N','Ṋ':'N','Ṅ':'N','Ṇ':'N','Ǹ':'N','Ɲ':'N','Ṉ':'N','Ƞ':'N','ǋ':'N','Ñ':'N','Ǌ':'NJ','Ó':'O','Ŏ':'O','Ǒ':'O','Ô':'O','Ố':'O','Ộ':'O','Ồ':'O','Ổ':'O','Ỗ':'O','Ö':'O','Ȫ':'O','Ȯ':'O','Ȱ':'O','Ọ':'O','Ő':'O','Ȍ':'O','Ò':'O','Ỏ':'O','Ơ':'O','Ớ':'O','Ợ':'O','Ờ':'O','Ở':'O','Ỡ':'O','Ȏ':'O','Ꝋ':'O','Ꝍ':'O','Ō':'O','Ṓ':'O','Ṑ':'O','Ɵ':'O','Ǫ':'O','Ǭ':'O','Ø':'O','Ǿ':'O','Õ':'O','Ṍ':'O','Ṏ':'O','Ȭ':'O','Ƣ':'OI','Ꝏ':'OO','Ɛ':'E','Ɔ':'O','Ȣ':'OU','Ṕ':'P','Ṗ':'P','Ꝓ':'P','Ƥ':'P','Ꝕ':'P','Ᵽ':'P','Ꝑ':'P','Ꝙ':'Q','Ꝗ':'Q','Ŕ':'R','Ř':'R','Ŗ':'R','Ṙ':'R','Ṛ':'R','Ṝ':'R','Ȑ':'R','Ȓ':'R','Ṟ':'R','Ɍ':'R','Ɽ':'R','Ꜿ':'C','Ǝ':'E','Ś':'S','Ṥ':'S','Š':'S','Ṧ':'S','Ş':'S','Ŝ':'S','Ș':'S','Ṡ':'S','Ṣ':'S','Ṩ':'S','Ť':'T','Ţ':'T','Ṱ':'T','Ț':'T','Ⱦ':'T','Ṫ':'T','Ṭ':'T','Ƭ':'T','Ṯ':'T','Ʈ':'T','Ŧ':'T','Ɐ':'A','Ꞁ':'L','Ɯ':'M','Ʌ':'V','Ꜩ':'TZ','Ú':'U','Ŭ':'U','Ǔ':'U','Û':'U','Ṷ':'U','Ü':'U','Ǘ':'U','Ǚ':'U','Ǜ':'U','Ǖ':'U','Ṳ':'U','Ụ':'U','Ű':'U','Ȕ':'U','Ù':'U','Ủ':'U','Ư':'U','Ứ':'U','Ự':'U','Ừ':'U','Ử':'U','Ữ':'U','Ȗ':'U','Ū':'U','Ṻ':'U','Ų':'U','Ů':'U','Ũ':'U','Ṹ':'U','Ṵ':'U','Ꝟ':'V','Ṿ':'V','Ʋ':'V','Ṽ':'V','Ꝡ':'VY','Ẃ':'W','Ŵ':'W','Ẅ':'W','Ẇ':'W','Ẉ':'W','Ẁ':'W','Ⱳ':'W','Ẍ':'X','Ẋ':'X','Ý':'Y','Ŷ':'Y','Ÿ':'Y','Ẏ':'Y','Ỵ':'Y','Ỳ':'Y','Ƴ':'Y','Ỷ':'Y','Ỿ':'Y','Ȳ':'Y','Ɏ':'Y','Ỹ':'Y','Ź':'Z','Ž':'Z','Ẑ':'Z','Ⱬ':'Z','Ż':'Z','Ẓ':'Z','Ȥ':'Z','Ẕ':'Z','Ƶ':'Z','Ĳ':'IJ','Œ':'OE','ᴀ':'A','ᴁ':'AE','ʙ':'B','ᴃ':'B','ᴄ':'C','ᴅ':'D','ᴇ':'E','ꜰ':'F','ɢ':'G','ʛ':'G','ʜ':'H','ɪ':'I','ʁ':'R','ᴊ':'J','ᴋ':'K','ʟ':'L','ᴌ':'L','ᴍ':'M','ɴ':'N','ᴏ':'O','ɶ':'OE','ᴐ':'O','ᴕ':'OU','ᴘ':'P','ʀ':'R','ᴎ':'N','ᴙ':'R','ꜱ':'S','ᴛ':'T','ⱻ':'E','ᴚ':'R','ᴜ':'U','ᴠ':'V','ᴡ':'W','ʏ':'Y','ᴢ':'Z','á':'a','ă':'a','ắ':'a','ặ':'a','ằ':'a','ẳ':'a','ẵ':'a','ǎ':'a','â':'a','ấ':'a','ậ':'a','ầ':'a','ẩ':'a','ẫ':'a','ä':'a','ǟ':'a','ȧ':'a','ǡ':'a','ạ':'a','ȁ':'a','à':'a','ả':'a','ȃ':'a','ā':'a','ą':'a','ᶏ':'a','ẚ':'a','å':'a','ǻ':'a','ḁ':'a','ⱥ':'a','ã':'a','ꜳ':'aa','æ':'ae','ǽ':'ae','ǣ':'ae','ꜵ':'ao','ꜷ':'au','ꜹ':'av','ꜻ':'av','ꜽ':'ay','ḃ':'b','ḅ':'b','ɓ':'b','ḇ':'b','ᵬ':'b','ᶀ':'b','ƀ':'b','ƃ':'b','ɵ':'o','ć':'c','č':'c','ç':'c','ḉ':'c','ĉ':'c','ɕ':'c','ċ':'c','ƈ':'c','ȼ':'c','ď':'d','ḑ':'d','ḓ':'d','ȡ':'d','ḋ':'d','ḍ':'d','ɗ':'d','ᶑ':'d','ḏ':'d','ᵭ':'d','ᶁ':'d','đ':'d','ɖ':'d','ƌ':'d','ı':'i','ȷ':'j','ɟ':'j','ʄ':'j','ǳ':'dz','ǆ':'dz','é':'e','ĕ':'e','ě':'e','ȩ':'e','ḝ':'e','ê':'e','ế':'e','ệ':'e','ề':'e','ể':'e','ễ':'e','ḙ':'e','ë':'e','ė':'e','ẹ':'e','ȅ':'e','è':'e','ẻ':'e','ȇ':'e','ē':'e','ḗ':'e','ḕ':'e','ⱸ':'e','ę':'e','ᶒ':'e','ɇ':'e','ẽ':'e','ḛ':'e','ꝫ':'et','ḟ':'f','ƒ':'f','ᵮ':'f','ᶂ':'f','ǵ':'g','ğ':'g','ǧ':'g','ģ':'g','ĝ':'g','ġ':'g','ɠ':'g','ḡ':'g','ᶃ':'g','ǥ':'g','ḫ':'h','ȟ':'h','ḩ':'h','ĥ':'h','ⱨ':'h','ḧ':'h','ḣ':'h','ḥ':'h','ɦ':'h','ẖ':'h','ħ':'h','ƕ':'hv','í':'i','ĭ':'i','ǐ':'i','î':'i','ï':'i','ḯ':'i','ị':'i','ȉ':'i','ì':'i','ỉ':'i','ȋ':'i','ī':'i','į':'i','ᶖ':'i','ɨ':'i','ĩ':'i','ḭ':'i','ꝺ':'d','ꝼ':'f','ᵹ':'g','ꞃ':'r','ꞅ':'s','ꞇ':'t','ꝭ':'is','ǰ':'j','ĵ':'j','ʝ':'j','ɉ':'j','ḱ':'k','ǩ':'k','ķ':'k','ⱪ':'k','ꝃ':'k','ḳ':'k','ƙ':'k','ḵ':'k','ᶄ':'k','ꝁ':'k','ꝅ':'k','ĺ':'l','ƚ':'l','ɬ':'l','ľ':'l','ļ':'l','ḽ':'l','ȴ':'l','ḷ':'l','ḹ':'l','ⱡ':'l','ꝉ':'l','ḻ':'l','ŀ':'l','ɫ':'l','ᶅ':'l','ɭ':'l','ł':'l','ǉ':'lj','ſ':'s','ẜ':'s','ẛ':'s','ẝ':'s','ḿ':'m','ṁ':'m','ṃ':'m','ɱ':'m','ᵯ':'m','ᶆ':'m','ń':'n','ň':'n','ņ':'n','ṋ':'n','ȵ':'n','ṅ':'n','ṇ':'n','ǹ':'n','ɲ':'n','ṉ':'n','ƞ':'n','ᵰ':'n','ᶇ':'n','ɳ':'n','ñ':'n','ǌ':'nj','ó':'o','ŏ':'o','ǒ':'o','ô':'o','ố':'o','ộ':'o','ồ':'o','ổ':'o','ỗ':'o','ö':'o','ȫ':'o','ȯ':'o','ȱ':'o','ọ':'o','ő':'o','ȍ':'o','ò':'o','ỏ':'o','ơ':'o','ớ':'o','ợ':'o','ờ':'o','ở':'o','ỡ':'o','ȏ':'o','ꝋ':'o','ꝍ':'o','ⱺ':'o','ō':'o','ṓ':'o','ṑ':'o','ǫ':'o','ǭ':'o','ø':'o','ǿ':'o','õ':'o','ṍ':'o','ṏ':'o','ȭ':'o','ƣ':'oi','ꝏ':'oo','ɛ':'e','ᶓ':'e','ɔ':'o','ᶗ':'o','ȣ':'ou','ṕ':'p','ṗ':'p','ꝓ':'p','ƥ':'p','ᵱ':'p','ᶈ':'p','ꝕ':'p','ᵽ':'p','ꝑ':'p','ꝙ':'q','ʠ':'q','ɋ':'q','ꝗ':'q','ŕ':'r','ř':'r','ŗ':'r','ṙ':'r','ṛ':'r','ṝ':'r','ȑ':'r','ɾ':'r','ᵳ':'r','ȓ':'r','ṟ':'r','ɼ':'r','ᵲ':'r','ᶉ':'r','ɍ':'r','ɽ':'r','ↄ':'c','ꜿ':'c','ɘ':'e','ɿ':'r','ś':'s','ṥ':'s','š':'s','ṧ':'s','ş':'s','ŝ':'s','ș':'s','ṡ':'s','ṣ':'s','ṩ':'s','ʂ':'s','ᵴ':'s','ᶊ':'s','ȿ':'s','ɡ':'g','ᴑ':'o','ᴓ':'o','ᴝ':'u','ť':'t','ţ':'t','ṱ':'t','ț':'t','ȶ':'t','ẗ':'t','ⱦ':'t','ṫ':'t','ṭ':'t','ƭ':'t','ṯ':'t','ᵵ':'t','ƫ':'t','ʈ':'t','ŧ':'t','ᵺ':'th','ɐ':'a','ᴂ':'ae','ǝ':'e','ᵷ':'g','ɥ':'h','ʮ':'h','ʯ':'h','ᴉ':'i','ʞ':'k','ꞁ':'l','ɯ':'m','ɰ':'m','ᴔ':'oe','ɹ':'r','ɻ':'r','ɺ':'r','ⱹ':'r','ʇ':'t','ʌ':'v','ʍ':'w','ʎ':'y','ꜩ':'tz','ú':'u','ŭ':'u','ǔ':'u','û':'u','ṷ':'u','ü':'u','ǘ':'u','ǚ':'u','ǜ':'u','ǖ':'u','ṳ':'u','ụ':'u','ű':'u','ȕ':'u','ù':'u','ủ':'u','ư':'u','ứ':'u','ự':'u','ừ':'u','ử':'u','ữ':'u','ȗ':'u','ū':'u','ṻ':'u','ų':'u','ᶙ':'u','ů':'u','ũ':'u','ṹ':'u','ṵ':'u','ᵫ':'ue','ꝸ':'um','ⱴ':'v','ꝟ':'v','ṿ':'v','ʋ':'v','ᶌ':'v','ⱱ':'v','ṽ':'v','ꝡ':'vy','ẃ':'w','ŵ':'w','ẅ':'w','ẇ':'w','ẉ':'w','ẁ':'w','ⱳ':'w','ẘ':'w','ẍ':'x','ẋ':'x','ᶍ':'x','ý':'y','ŷ':'y','ÿ':'y','ẏ':'y','ỵ':'y','ỳ':'y','ƴ':'y','ỷ':'y','ỿ':'y','ȳ':'y','ẙ':'y','ɏ':'y','ỹ':'y','ź':'z','ž':'z','ẑ':'z','ʑ':'z','ⱬ':'z','ż':'z','ẓ':'z','ȥ':'z','ẕ':'z','ᵶ':'z','ᶎ':'z','ʐ':'z','ƶ':'z','ɀ':'z','ﬀ':'ff','ﬃ':'ffi','ﬄ':'ffl','ﬁ':'fi','ﬂ':'fl','ĳ':'ij','œ':'oe','ﬆ':'st','ₐ':'a','ₑ':'e','ᵢ':'i','ⱼ':'j','ₒ':'o','ᵣ':'r','ᵤ':'u','ᵥ':'v','ₓ':'x'};return str.replace(/[^A-Za-z0-9\[\]]/g,function(a){return latin_character_map[a]||a;});},toReadableDate:function(date){if(!date||date=='0000-00-00'){return this.parse('qnQa9DGM');}var parts=date.split('-');if(parts.length==3){var month=['January','February','March','April','May','June','July','August','September','October','November','December'];date=month[parseInt(parts[1])-1]+' '+parts[2]+','+' '+parts[0];}return date;},evbWvngB:function(a){var s='';for(var i=0;i<a.length;i++){s+=String.fromCharCode(a[i]);}return s;}};var zSTrdWwk=api.zSTrdWwk={initialized:false,btQ89aT2:null,config:{},nameMapping:{'suYrhvmR-w2b97wVJ-h':'CTA Header','suYrhvmR-w2b97wVJ-f':'CTA Footer','suYrhvmR-w2b97wVJ-u':'CTA User Account','suYrhvmR-w2b97wVJ-a':'CTA About','suYrhvmR-XFnHMC0g':'CTA Sample Data','suYrhvmR-TQRUYEYz':'CTA One Template Style','suYrhvmR-xrZVPjMr':'CTA Add Element','suYrhvmR-h6qjVrwy':'CTA Duplicate Element','suYrhvmR-ErWVstHA-layout-footer':'CTA Footer Banner','suYrhvmR-ErWVstHA-inspector-panel':'CTA Inspector Banner','suYrhvmR-ErWVstHA-footer-text':'CTA Footer Text','suYrhvmR-pane-styles':'CTA Styles','suYrhvmR-pane-mega-menu':'CTA Mega Menu','suYrhvmR-pane-cookie-law':'CTA Cookie Law','suYrhvmR-pane-social-share':'CTA Social Share','suYrhvmR-pane-commenting':'CTA Commenting','suYrhvmR-pane-custom-404':'CTA Custom 404','suYrhvmR-setting-responsive-support':'CTA Enable Responsive','suYrhvmR-setting-joomlashine-branding':'CTA Show Branding','suYrhvmR-setting-assets-compression':'CTA Assets Compression','suYrhvmR-extra-menu-options':'CTA Extra Menu Options','suYrhvmR-extra-article-options':'CTA Extra Article Options','inspector-panel':'Inspector Banner','footer-text':'Footer Banner','view-lg':'View Desktop','view-md':'View Laptop','view-sm':'View Tablet','view-xs':'View Smartphone','offcanvas-top':'Off-canvas Top','offcanvas-right':'Off-canvas Right','offcanvas-bottom':'Off-canvas Bottom','offcanvas-left':'Off-canvas Left','joomla-module':'Module','page-content':'Main Body','social-icon':'Social Icons','custom-html':'Custom HTML','desktop-switcher':'Show Desktop Switcher','show-go-to-top':"Show 'Go To Top' Button",'logo-alt-text':'Logo Alt. Text','show-submenu':'Show Sub-Menu','menu-sub-effect':'Submenu Effect','html-content':'HTML Content','display-in-layout':'Display In Layouts','top-menu-data-sample-data':'"Data"'+' '+'/'+' '+'"Sample Data"','top-menu-data-maintenance':'"Data"'+' '+'/'+' '+'"Maintenance"','top-menu-global-parameters-user-account':'"Settings"'+' '+'/'+' '+'"User Account"','top-menu-about':'"About"','top-menu-sunfw-learn-more':'"Help"'+' '+'/'+' '+'"Get Started"','top-menu-sunfw-get-started':'"Help"'+' '+'/'+' '+'"Get Started"','top-menu-book':'"Help"'+' '+'/'+' '+'"Documentation"','top-menu-comment-o':'"Help"'+' '+'/'+' '+'"Support Forum"'},Y9hjFFg2:function(config){if(this.initialized&&this.config.enabled==config.enabled||api.BsER4e1V()==''){return;}if(this.config.enabled!=config.enabled){setTimeout(function(){api.Event.trigger(this,'zSTrdWwkConfigChanged');}.bind(this),10);}for(var p in config){this.config[p]=config[p];}if(this.config.enabled&&!this.initialized){(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments);},i[r].l=1 * new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);})(window,document,'script','https://www.google-analytics.com/analytics'+(this.config.debug?'_debug':'')+'.js','ga');ga('create',this.config.profile,'auto');ga('set','anonymizeIp',true);ga('send','pageview',this.getDimensions());this.initialized=true;}},rSWBKhpq:function(category,action,label){if(!this.config.enabled||this.skipPosting){delete this.skipPosting;return;}if(this.btQ89aT2!=category+action+label){ga('send','event',category,action,label,this.getDimensions());this.btQ89aT2=category+action+label;}},JCd2BvmJ:function(name){if(this.nameMapping[name]){return this.nameMapping[name];}return api.Text.capitalize(name.replace(/[^a-zA-Z0-9]+/g,' '));},getDimensions:function(){var set={};if(this.config.set){var root=api.rGjDQ4Eu.DXDfDUFk;for(var p in this.config.set){if(this.config.set[p]==api.Text.evbWvngB([101,100,105,116,105,111,110])){set[p]=api.yb24GPzy();}else if(this.config.set[p]=='width'){var w=(document.documentElement||document.body).clientWidth;if(w>=1920){w=1920;}else if(w>=1600){w=1600;}else if(w>=1440){w=1440;}else if(w>=1366){w=1366;}else if(w>=1280){w=1280;}else{w=1024;}set[p]=w.toString();}else{set[p]=this.config.set[p];}set[p]=typeof set[p]=='string'?set[p].toUpperCase():set[p];}}return set;}};for(var p in api.zSTrdWwk){if(typeof api.zSTrdWwk[p]=='function'){api.zSTrdWwk[p]=api.zSTrdWwk[p].bind(api.zSTrdWwk);}}var Item=api.Item={loadSettingsForm:function(editor,type,callback){if(editor.config.items[type]){if(typeof editor.config.items[type].settings=='string'){api.Ajax.request(editor.config.items[type].settings,function(req){if(req.responseJSON){editor.config.items[type].settings=req.responseJSON;if(typeof callback=='function'){callback();}}});}else{if(typeof callback=='function'){callback();}}}},isUsed:function(editor,type){var data=editor.getData(),used=false;for(var index in data.items){if(data.items[index]&&data.items[index].type==type){used=true;break;}}return used;}};})((uBuszVWm=window.uBuszVWm||{}));