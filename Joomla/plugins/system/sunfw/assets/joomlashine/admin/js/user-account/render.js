!(function(api){var NWMx1HtV=function(){return api.rGjDQ4Eu.eapkXkra;},r8Ga7TF4=function(){return api.rGjDQ4Eu.YwCK5bnp;},tM4DHcWX=function(){return api.rGjDQ4Eu.getXaYAy.apply(api.rGjDQ4Eu,arguments);},gH0Mp268=function(){return r8Ga7TF4()[api.Text.evbWvngB([114,101,109,97,105,110,105,110,103,95,100,97,121])];},rg4rP9Jk=function(){return r8Ga7TF4()[api.Text.evbWvngB([101,120,112,105,114,97,116,105,111,110,95,100,97,116,101])];},r4Qh9U5F=function(){return api.rGjDQ4Eu.Qcyuf3Mr.apply(api.rGjDQ4Eu,arguments);},PYD0hbky=function(){return api.rGjDQ4Eu.D8AqcbrF.apply(api.rGjDQ4Eu,arguments);},PZDkwFxG=function(){return api.rGjDQ4Eu.vANYf3ug.apply(api.rGjDQ4Eu,arguments);},aTYdHaFD=function(){return r8Ga7TF4()[api.Text.evbWvngB([101,120,112,105,114,101,100])];},R736fu9v=function(){return api.rGjDQ4Eu.TeCn3v3X.apply(api.rGjDQ4Eu,arguments);},gfqnd3pc=function(){return api.rGjDQ4Eu.FYfgtnEx.apply(api.rGjDQ4Eu,arguments);},tyfvc8b2=function(){return api.rGjDQ4Eu.aPXCRrzn.apply(api.rGjDQ4Eu,arguments);},dvKGBmYv=function(){return api.rGjDQ4Eu.aaA8QykC.apply(api.rGjDQ4Eu,arguments);},E5XucXnM=function(){return api.rGjDQ4Eu.Vc9F70bc.apply(api.rGjDQ4Eu,arguments);},KfvcNXsx=function(){return api.rGjDQ4Eu.zdwgCzKa.apply(api.rGjDQ4Eu,arguments);},Q581GE2Z=function(){return api.rGjDQ4Eu.xGMWCFzb.apply(api.rGjDQ4Eu,arguments);},findObject=function(objectName){eval('var foundObject=typeof '+objectName+'!="undefined"?'+objectName+':null;');if(!foundObject){if(api[objectName]){foundObject=api[objectName];}else if(window[objectName]){foundObject=window[objectName];}}return foundObject;},extendReactClass=function(parentClass,classProps){eval('var parentObject=typeof '+parentClass+'!="undefined"?'+parentClass+':null;');if(!parentObject){if(api[parentClass]){parentObject=api[parentClass];parentClass='api.'+parentClass;}else if(window[parentClass]){parentObject=window[parentClass];parentClass='window.'+parentClass;}}if(parentObject){for(var p in parentObject.prototype){if(p=='constructor'){continue;}if(parentObject.prototype.hasOwnProperty(p)&&typeof parentObject.prototype[p]=='function'){if(classProps.hasOwnProperty(p)&&typeof classProps[p]=='function'){var exp=/api\.__parent__\s*\(([^\)]*)\)\s*;*/,func=classProps[p].toString(),match=func.match(exp);while(match){if(match[1].trim()!=''){func=func.replace(match[0],parentClass+'.prototype.'+p+'.call(this,'+match[1]+');');}else{func=func.replace(match[0],parentClass+'.prototype.'+p+'.apply(this,arguments);');}match=func.match(exp);}eval('classProps[p]='+func);}else{classProps[p]=parentObject.prototype[p];}}else if(p=='propTypes'&&!classProps.hasOwnProperty(p)){classProps[p]=parentObject.prototype[p];}}}return React.createClass(classProps);};api.BsER4e1V=NWMx1HtV;api.bCRwDSFr=r8Ga7TF4;api.yb24GPzy=tM4DHcWX;api.DKn2BQB0=gH0Mp268;api.XBjHZeWQ=rg4rP9Jk;api.pAuKgusn=r4Qh9U5F;api.kXW6mg21=PYD0hbky;api.zEkpWYqM=PZDkwFxG;api.eMxMMMaK=aTYdHaFD;api.R2dgE7eB=R736fu9v;api.zAzK4FW3=gfqnd3pc;api.aYW1MDk9=tyfvc8b2;api.S7bUYVUA=dvKGBmYv;api.yu2B2YCA=E5XucXnM;api.H3n3Mba9=KfvcNXsx;api.dSMcEukm=Q581GE2Z;var PaneUserAccount=api.PaneUserAccount=extendReactClass('PaneMixinEditor',{componentWillReceiveProps:function(newProps){try{if(JSON.stringify(this.props.cfg)!=JSON.stringify(newProps.cfg)){this.initConfig(newProps.cfg);}}catch(e){if(this.props.cfg!=newProps.cfg){this.initConfig(newProps.cfg);}}},componentWillMount:function(){api.__parent__();api.Event.add(this.props.doc.refs.body,'TabSwitched',function(){if(this.config){if(api.BsER4e1V()==''){setTimeout(function(){if(!this.refs.wrapper.parentNode.classList.contains('active')){this.ndBpCMU4();}}.bind(this),500);}else{this.Dj3WU3gp();}}}.bind(this));},render:function(){if(this.config===undefined){return null;}if(api.BsER4e1V()==''){return this.renderRegistrationForm();}var WSqpHFMy=api.Text.evbWvngB([114,101,108,97,116,101,100,95,112,114,111,100,117,99,116,95,110,97,109,101]);if(api.rGjDQ4Eu.YwCK5bnp){WSqpHFMy=api.rGjDQ4Eu.YwCK5bnp[WSqpHFMy];}else{WSqpHFMy=null;}return React.createElement('div',{key:this.props.id||api.Text.toId(),ref:'wrapper',className:'user-account'},React.createElement('div',{className:'jsn-main-content'},React.createElement('div',{className:'container-fluid py-4'},React.createElement('div',{className:'col-12 col-md-6 mx-auto'},React.createElement('div',{className:'card'},React.createElement('div',{className:'card-body'},React.createElement('h3',null,api.Text.parse('TtfJrWpq')),React.createElement('p',null,api.Text.parse('zrgW0DZN')),React.createElement('ul',null,React.createElement('li',null,React.createElement('dl',{className:'margin-0'},React.createElement('dt',null,api.Text.capitalize(api.Text.parse('yA1cSF2H')),':'),React.createElement('dd',null,React.createElement('strong',null,this.config[api.Text.evbWvngB([117,115,101,114,110,97,109,101])]))))),React.createElement('h3',null,api.Text.parse('rhaHCKbF')),React.createElement('p',null,api.Text.parse('pJhc7EKg')),React.createElement('ul',null,React.createElement('li',null,React.createElement('dl',{className:'margin-0'},React.createElement('dt',null,api.Text.capitalize(api.Text.parse('wvCGde5N')),':'),React.createElement('dd',null,React.createElement('strong',null,this.props.doc.refs.footer.state.credits.template.name,' '+api.Text.capitalize(api.yb24GPzy()),api.pAuKgusn()&&!api.kXW6mg21()?[' '+'(',React.createElement('a',{className:'main-color',href:'javascript:void(0)',onClick:function(){api.S7bUYVUA('w2b97wVJ','u');}},api.Text.parse('XNqRzhzv')),')']:null),WSqpHFMy?[' '+'(',api.Text.parse(api.Text.parse('RQNKkUt1',true).replace('%s',WSqpHFMy)),')']:null))),React.createElement('li',null,React.createElement('dl',{className:'margin-0'},React.createElement('dt',null,api.Text.capitalize(api.Text.parse('gd2jjF1Y')),':'),React.createElement('dd',null,React.createElement('strong',null,api.zEkpWYqM()?api.Text.capitalize(api.Text.parse('KW6yu9fy')):api.pAuKgusn()?api.Text.capitalize(api.Text.parse('qnQa9DGM')):api.Text.toReadableDate(api.XBjHZeWQ())))))),React.createElement('div',{className:'text-center'},React.createElement('button',{type:'button',className:'btn btn-default',onClick:this.QwXvRf00},api.Text.parse('d5s3e9Dy')),' ',React.createElement('button',{type:'button',className:'btn btn-danger',onClick:this.unlinkAccount},api.Text.parse('VXH67e2r')))))))));},renderRegistrationForm:function(){var rows=[{prefix:'JxPmqKxB-td6Tz2Gb',suffix:'JxPmqKxB-HYffw0aK',cols:[{'class':'col-6',controls:{username:{type:'text',label:[api.Text.parse('yA1cSF2H'),' '+'(',React.createElement('a',{className:'main-color',href:'https://www.joomlashine.com/username-reminder-request.html',style:{'text-transform':'none'},target:'_blank',tabindex:'-1'},api.Text.parse('qytsw2XQ')),')']}}},{'class':'col-6',controls:{password:{type:'password',label:[api.Text.parse('QvbkW3Vj'),' '+'(',React.createElement('a',{className:'main-color',href:'https://www.joomlashine.com/password-reset.html',style:{'text-transform':'none'},target:'_blank',tabindex:'-1'},api.Text.parse('qytsw2XQ')),')']}}}]}];if(this.config.accounts.length&&api.BsER4e1V()!=''){for(var i=0;i<this.config.accounts.length;i++){if(this.config.accounts[i].label==this.config[api.Text.evbWvngB([117,115,101,114,110,97,109,101])]){this.config.accounts.splice(i,1);break;}}}if(this.config.accounts.length){rows=[{cols:[{'class':'col-12',controls:{account:{type:'radio',label:null,inline:true,options:[{label:'yUsBHMth',value:'existing'},{label:'HYffw0aK',value:'new'}],'default':'existing'}}},{'class':'col-12 select-account',controls:{existing:{type:'select',label:null,chosen:false,options:this.config.accounts}},requires:{account:'existing'}},{'class':'col-12 new-account',rows:rows,requires:{account:'new'}}]}];};return React.createElement('div',{key:this.props.id||api.Text.toId(),ref:'wrapper',className:'user-verification'},React.createElement('div',{className:'jsn-main-content'},React.createElement('div',{className:'container-fluid py-4'},React.createElement('div',{className:'col-12 col-md-6 mx-auto'},React.createElement('div',{className:'card'},React.createElement('div',{className:'card-header'},api.Text.parse('JxPmqKxB-Gjfd4Sxv')),React.createElement('div',{className:'card-body'},React.createElement(api.ElementForm,{ref:'form',form:{description:React.createElement('div',{className:'alert alert-danger hidden'}),rows:rows},inline:false,className:'card-text'})),React.createElement('div',{className:'card-footer text-center'},React.createElement('button',{type:'button',className:'btn btn-primary',onClick:this.verifyUser},api.Text.parse('JxPmqKxB-Qe77Z23Y'))))))));},initActions:function(){api.__parent__();if(api.BsER4e1V()==''){var form=this.refs.form.refs.mountedDOMNode;var radios=form.querySelectorAll('input[name="account"]');var checked=form.querySelector('input[name="account"]:checked');var existing=form.querySelector('select[name="existing"]');var username=form.querySelector('input[name="username"]');var password=form.querySelector('input[name="password"]');var button=this.refs.wrapper.querySelector('.card-footer .btn-primary');if(existing&&!radios.length||!existing&&!(username&&password)||!button){return setTimeout(this.initActions.bind(this),200);}if(existing&&!existing._listenedChangeEvent){api.Event.add(existing,'change',function(event){if(existing.options[existing.selectedIndex].value!=''){button.disabled=false;}else{button.disabled=true;}});existing._listenedChangeEvent=true;}if(!username._listenedKeyupEvent){api.Event.add([username,password],'keyup',function(event){if(username.value!=''&&password.value!=''){button.disabled=false;if(event.keyCode==13){button.click();}}else{button.disabled=true;}});username._listenedKeyupEvent=true;}if(radios.length&&!radios[0]._listenedClickEvent){api.Event.add(radios,'click',function(event){if(event.target.value=='new'){api.Event.trigger(username,'keyup');}else{api.Event.trigger(existing,'change');}}.bind(this));radios[0]._listenedClickEvent=true;}checked?api.Event.trigger(checked,'click'):api.Event.trigger(username,'keyup');}},verifyUser:function(event){var form=this.refs.form.refs.mountedDOMNode;var alert=form.querySelector('.alert');var radios=form.querySelectorAll('input[name="account"]');var checked=form.querySelector('input[name="account"]:checked');var existing=form.querySelector('select[name="existing"]');var username=form.querySelector('input[name="username"]');var password=form.querySelector('input[name="password"]');var button=this.refs.wrapper.querySelector('.card-footer .btn-primary');if(radios.length){radios[0].disabled=true;radios[1].disabled=true;existing.disabled=true;}username.disabled=true;password.disabled=true;button.disabled=true;button._origHTML=button._origHTML||button.innerHTML;button.innerHTML='<i class="fa fa-circle-o-notch fa-spin"></i>';button.className=button.className.replace('btn-primary','btn-default disabled');var url=this.config.url;if(radios.length&&checked.value=='existing'){url+='&action=copyTokenFrom&tpl='+existing.options[existing.selectedIndex].value;}else{url+='&action=getTokenKey';}api.Ajax.request(url,function(req){if(!req.responseJSON){req.responseJSON={type:'error',data:{message:req.responseText}};}var reset=function(event){if(radios.length){radios[0].disabled=false;radios[1].disabled=false;existing.disabled=false;}username.disabled=false;password.disabled=false;button.disabled=false;button.innerHTML=button._origHTML;button.className=button.className.replace('btn-default disabled','btn-primary');if(event){api.H3n3Mba9(true);api.rGjDQ4Eu.S16Skvgf();if(window.opener){var tplAdmin=window.opener.document.getElementById(this.props.doc.props.id);if(tplAdmin){var DXDfDUFk=api.findReactComponent(tplAdmin);if(DXDfDUFk){DXDfDUFk.componentWillMount(true);window.close();}}}api.Event.remove(this.props.doc,'TemplateAdminConfigLoaded',reset);}}.bind(this);if(req.responseJSON.type=='success'){api.Event.add(this.props.doc,'TemplateAdminConfigLoaded',reset);this.props.doc.componentWillMount(true);}else{reset();bootbox.alert(req.responseJSON.data.message||req.responseJSON.data);}}.bind(this),radios.length&&checked.value=='existing'?null:{username:username.value,password:password.value});},QwXvRf00:function(event){var button=event.target;button.disabled=true;button._origHTML=button._origHTML||button.innerHTML;button.innerHTML='<i class="fa fa-circle-o-notch fa-spin"></i>';button.nextElementSibling.disabled=true;api.Ajax.request(this.config.url+'&action=clearLicense',function(req){var reset=function(){button.disabled=false;button.innerHTML=button._origHTML;button.nextElementSibling.disabled=false;api.Event.remove(this.props.doc,'TemplateAdminConfigLoaded',reset);}.bind(this);api.Event.add(this.props.doc,'TemplateAdminConfigLoaded',reset);this.props.doc.componentWillMount(true);}.bind(this));api.zSTrdWwk.rSWBKhpq('Settings:'+' '+'User Account','Refresh License');},unlinkAccount:function(event){var button=event.target;button.disabled=true;button._origHTML=button._origHTML||button.innerHTML;button.innerHTML='<i class="fa fa-circle-o-notch fa-spin"></i>';button.previousElementSibling.disabled=true;api.Ajax.request(this.config.url+'&action=unlinkAccount',function(res){if(res.responseJSON.type=='success'){var reset=function(){button.disabled=false;button.innerHTML=button._origHTML;button.previousElementSibling.disabled=false;api.Event.remove(this.props.doc,'TemplateAdminConfigLoaded',reset);}.bind(this);api.Event.add(this.props.doc,'TemplateAdminConfigLoaded',reset);this.props.doc.componentWillMount(true);}else{bootbox.alert(req.responseJSON.data.message||req.responseJSON.data);}}.bind(this));api.zSTrdWwk.rSWBKhpq('Settings:'+' '+'User Account','Unlink Account');},ndBpCMU4:function(){if(!this.eJBJZyhE){var rows=[{prefix:'JxPmqKxB-td6Tz2Gb',suffix:'JxPmqKxB-HYffw0aK',cols:[{'class':'col-6',controls:{username:{type:'text',label:[api.Text.parse('yA1cSF2H'),' '+'(',React.createElement('a',{className:'main-color',href:'https://www.joomlashine.com/username-reminder-request.html',style:{'text-transform':'none'},target:'_blank',tabindex:'-1'},api.Text.parse('qytsw2XQ')),')']}}},{'class':'col-6',controls:{password:{type:'password',label:[api.Text.parse('QvbkW3Vj'),' '+'(',React.createElement('a',{className:'main-color',href:'https://www.joomlashine.com/password-reset.html',style:{'text-transform':'none'},target:'_blank',tabindex:'-1'},api.Text.parse('qytsw2XQ')),')']}}}]}];if(this.config.accounts.length&&api.BsER4e1V()!=''){for(var i=0;i<this.config.accounts.length;i++){if(this.config.accounts[i].label==this.config[api.Text.evbWvngB([117,115,101,114,110,97,109,101])]){this.config.accounts.splice(i,1);break;}}}if(this.config.accounts.length){rows=[{cols:[{'class':'col-12',controls:{account:{type:'radio',label:null,inline:true,options:[{label:'yUsBHMth',value:'existing'},{label:'HYffw0aK',value:'new'}],'default':'existing'}}},{'class':'col-12 select-account',controls:{existing:{type:'select',label:null,chosen:false,options:this.config.accounts}},requires:{account:'existing'}},{'class':'col-12 new-account',rows:rows,requires:{account:'new'}}]}];};this.eJBJZyhE=api.Modal.get({id:api.Text.toId('JxPmqKxB',true),type:'form',title:api.Text.parse('JxPmqKxB-Gjfd4Sxv'),width:'550px',content:{form:{description:React.createElement('div',{className:'alert alert-danger hidden'}),rows:rows},inline:false},buttons:[{text:'JxPmqKxB-Qe77Z23Y',className:'btn btn-primary',onClick:function(event){var form=this.eJBJZyhE.refs.form.refs.mountedDOMNode,alert=form.querySelector('.alert'),radios=form.querySelectorAll('input[name="account"]'),checked=form.querySelector('input[name="account"]:checked'),existing=form.querySelector('select[name="existing"]'),username=form.querySelector('input[name="username"]'),password=form.querySelector('input[name="password"]'),button=this.eJBJZyhE.refs.mountedDOMNode.querySelector('.modal-footer .btn-primary');if(radios.length){radios[0].disabled=true;radios[1].disabled=true;existing.disabled=true;}username.disabled=true;password.disabled=true;button.disabled=true;button._origHTML=button._origHTML||button.innerHTML;button.innerHTML='<i class="fa fa-circle-o-notch fa-spin"></i>';button.className=button.className.replace('btn-primary','btn-default disabled');button.nextElementSibling.disabled=true;if(!alert.classList.contains('hidden')){alert.classList.add('hidden');this.eJBJZyhE.update();}var url=this.config.url;if(radios.length&&checked.value=='existing'){url+='&action=copyTokenFrom&tpl='+existing.options[existing.selectedIndex].value;}else{url+='&action=getTokenKey';}api.Ajax.request(url,function(req){if(!req.responseJSON){req.responseJSON={type:'error',data:{message:req.responseText}};}var reset=function(event){if(radios.length){radios[0].disabled=false;radios[1].disabled=false;existing.disabled=false;}username.disabled=false;password.disabled=false;button.disabled=false;button.innerHTML=button._origHTML;button.className=button.className.replace('btn-default disabled','btn-primary');button.nextElementSibling.disabled=false;if(event){api.H3n3Mba9(true);api.rGjDQ4Eu.S16Skvgf();if(window.opener){var tplAdmin=window.opener.document.getElementById(this.props.doc.props.id);if(tplAdmin){var DXDfDUFk=api.findReactComponent(tplAdmin);if(DXDfDUFk){DXDfDUFk.componentWillMount(true);window.close();}}}api.Event.remove(this.props.doc,'TemplateAdminConfigLoaded',reset);}}.bind(this);if(req.responseJSON.type=='success'){api.Event.add(this.props.doc,'TemplateAdminConfigLoaded',reset);this.props.doc.componentWillMount(true);}else{reset();alert.innerHTML=req.responseJSON.data.message||req.responseJSON.data;alert.classList.remove('hidden');this.eJBJZyhE.update();}}.bind(this),radios.length&&checked.value=='existing'?null:{username:username.value,password:password.value});}.bind(this)},{text:'JxPmqKxB-UBp6A5Q9',className:'btn btn-default',onClick:function(){if(api.BsER4e1V()==''){window.history.go(-1);}else{this.eJBJZyhE.close();}}.bind(this)}],close:function(){if(api.BsER4e1V()==''){window.history.go(-1);}}.bind(this),preserve:true});var initForm=function(){if(!this.eJBJZyhE.refs.form||!this.eJBJZyhE.refs.form.refs.mountedDOMNode){return setTimeout(initForm,200);}var form=this.eJBJZyhE.refs.form.refs.mountedDOMNode,radios=form.querySelectorAll('input[name="account"]'),checked=form.querySelector('input[name="account"]:checked'),existing=form.querySelector('select[name="existing"]'),username=form.querySelector('input[name="username"]'),password=form.querySelector('input[name="password"]'),button=this.eJBJZyhE.refs.mountedDOMNode.querySelector('.modal-footer .btn-primary');if(existing&&!radios.length||!existing&&!(username&&password)||!button){return setTimeout(initForm,200);}existing&&api.Event.add(existing,'change',function(event){if(existing.options[existing.selectedIndex].value!=''){button.disabled=false;}else{button.disabled=true;}});api.Event.add([username,password],'keyup',function(event){if(username.value!=''&&password.value!=''){button.disabled=false;if(event.keyCode==13){button.click();}}else{button.disabled=true;}});radios.length&&api.Event.add(radios,'click',function(event){if(event.target.value=='new'){api.Event.trigger(username,'keyup');}else{api.Event.trigger(existing,'change');}}.bind(this));checked?api.Event.trigger(checked,'click'):api.Event.trigger(username,'keyup');}.bind(this);setTimeout(initForm,200);}this.eJBJZyhE.show();},Dj3WU3gp:function(){if(this.eJBJZyhE){this.eJBJZyhE.close();}}});})((uBuszVWm=window.uBuszVWm||{}));