!(function(api){var NWMx1HtV=function(){return api.rGjDQ4Eu.eapkXkra;},r8Ga7TF4=function(){return api.rGjDQ4Eu.YwCK5bnp;},tM4DHcWX=function(){return api.rGjDQ4Eu.getXaYAy.apply(api.rGjDQ4Eu,arguments);},gH0Mp268=function(){return r8Ga7TF4()[api.Text.evbWvngB([114,101,109,97,105,110,105,110,103,95,100,97,121])];},rg4rP9Jk=function(){return r8Ga7TF4()[api.Text.evbWvngB([101,120,112,105,114,97,116,105,111,110,95,100,97,116,101])];},r4Qh9U5F=function(){return api.rGjDQ4Eu.Qcyuf3Mr.apply(api.rGjDQ4Eu,arguments);},PYD0hbky=function(){return api.rGjDQ4Eu.D8AqcbrF.apply(api.rGjDQ4Eu,arguments);},PZDkwFxG=function(){return api.rGjDQ4Eu.vANYf3ug.apply(api.rGjDQ4Eu,arguments);},aTYdHaFD=function(){return r8Ga7TF4()[api.Text.evbWvngB([101,120,112,105,114,101,100])];},R736fu9v=function(){return api.rGjDQ4Eu.TeCn3v3X.apply(api.rGjDQ4Eu,arguments);},gfqnd3pc=function(){return api.rGjDQ4Eu.FYfgtnEx.apply(api.rGjDQ4Eu,arguments);},tyfvc8b2=function(){return api.rGjDQ4Eu.aPXCRrzn.apply(api.rGjDQ4Eu,arguments);},dvKGBmYv=function(){return api.rGjDQ4Eu.aaA8QykC.apply(api.rGjDQ4Eu,arguments);},E5XucXnM=function(){return api.rGjDQ4Eu.Vc9F70bc.apply(api.rGjDQ4Eu,arguments);},KfvcNXsx=function(){return api.rGjDQ4Eu.zdwgCzKa.apply(api.rGjDQ4Eu,arguments);},Q581GE2Z=function(){return api.rGjDQ4Eu.xGMWCFzb.apply(api.rGjDQ4Eu,arguments);},findObject=function(objectName){eval('var foundObject=typeof '+objectName+'!="undefined"?'+objectName+':null;');if(!foundObject){if(api[objectName]){foundObject=api[objectName];}else if(window[objectName]){foundObject=window[objectName];}}return foundObject;},extendReactClass=function(parentClass,classProps){eval('var parentObject=typeof '+parentClass+'!="undefined"?'+parentClass+':null;');if(!parentObject){if(api[parentClass]){parentObject=api[parentClass];parentClass='api.'+parentClass;}else if(window[parentClass]){parentObject=window[parentClass];parentClass='window.'+parentClass;}}if(parentObject){for(var p in parentObject.prototype){if(p=='constructor'){continue;}if(parentObject.prototype.hasOwnProperty(p)&&typeof parentObject.prototype[p]=='function'){if(classProps.hasOwnProperty(p)&&typeof classProps[p]=='function'){var exp=/api\.__parent__\s*\(([^\)]*)\)\s*;*/,func=classProps[p].toString(),match=func.match(exp);while(match){if(match[1].trim()!=''){func=func.replace(match[0],parentClass+'.prototype.'+p+'.call(this,'+match[1]+');');}else{func=func.replace(match[0],parentClass+'.prototype.'+p+'.apply(this,arguments);');}match=func.match(exp);}eval('classProps[p]='+func);}else{classProps[p]=parentObject.prototype[p];}}else if(p=='propTypes'&&!classProps.hasOwnProperty(p)){classProps[p]=parentObject.prototype[p];}}}return React.createClass(classProps);};api.BsER4e1V=NWMx1HtV;api.bCRwDSFr=r8Ga7TF4;api.yb24GPzy=tM4DHcWX;api.DKn2BQB0=gH0Mp268;api.XBjHZeWQ=rg4rP9Jk;api.pAuKgusn=r4Qh9U5F;api.kXW6mg21=PYD0hbky;api.zEkpWYqM=PZDkwFxG;api.eMxMMMaK=aTYdHaFD;api.R2dgE7eB=R736fu9v;api.zAzK4FW3=gfqnd3pc;api.aYW1MDk9=tyfvc8b2;api.S7bUYVUA=dvKGBmYv;api.yu2B2YCA=E5XucXnM;api.H3n3Mba9=KfvcNXsx;api.dSMcEukm=Q581GE2Z;var PaneCookieLaw=api.PaneCookieLaw=extendReactClass('PaneMixinEditor',{getInitialState:function(){return{changed:false};},getDefaultData:function(){return{style:'',message:'This website uses cookies to ensure you get the best experience on our website.','banner-placement':'','cookie-policy-link':'http://','accept-button-text':'Got It!','read-more-button-text':'More information'};},render:function(){if(this.config===undefined){return null;}return React.createElement('div',{key:this.props.id||api.Text.toId(),ref:'wrapper',className:'cookie-law'},this.renderEditorToolbar('cookie-law','Extras:'+' '+'Cookie Law','extras_'+this.props.id,false),React.createElement('div',{className:'jsn-main-content'},React.createElement('div',{className:'container-fluid'},React.createElement('div',{className:'row align-items-top equal-height'},React.createElement('div',{className:'col mr-auto py-4 workspace-container'},this.renderBanner('layout-footer'),React.createElement(PaneCookieLawWorkspace,{key:this.props.id+'_workspace',ref:'workspace',parent:this,editor:this})),this.renderSettingsPanel()))));}});var PaneCookieLawWorkspace=extendReactClass('PaneMixinBase',{getDefaultProps:function(){return{getArticle:api.urls.ajaxBase+'&action=getArticle'};},render:function(){var data=this.editor.getData(),className='jsn-panel cookie-law-workspace main-workspace',content;if(data.enabled){if(data.style){className+=' '+data.style;}content=React.createElement('div',{className:'jsn-panel-body cookies-content-preview'},React.createElement('p',{ref:'message'},React.createElement('i',{className:'fa fa-circle-o-notch fa-spin'})),data.message_type=='text'?React.createElement('ul',null,React.createElement('li',null,React.createElement('a',{href:data['cookie-policy-link']?data['cookie-policy-link']:'#'},data['read-more-button-text']?data['read-more-button-text']:'More information'))):null,React.createElement('button',{className:'btn btn-default',type:'button'},data['accept-button-text']?data['accept-button-text']:'Got It!'));}else{className+=' empty-workspace';}return React.createElement('div',{ref:'wrapper',className:className},content?content:api.Text.parse('cookie-law-not-enabled'));},initActions:function(){var data=this.editor.getData();if(data.enabled){if(data.message_type=='text'){if(this.refs.message.innerHTML!=(data.message||api.Text.parse('cookie-law-default-message'))){this.refs.message.innerHTML=data.message||api.Text.parse('cookie-law-default-message');}}else if(data.article){var info=data.article.split(':');if(!this.loaded||this.loaded!=info[1]){this.refs.message.innerHTML=api.Text.parse('cookie-law-article-message',true).replace('%s',info[0]);if(data.message_type=='article'&&data.article!=''){api.Ajax.request(this.props.getArticle+'&articleId='+info[1],function(req){var response=req.responseJSON;if(response.type=='success'){this.refs.message.innerHTML=response.data.introtext;this.loaded=info[1];}}.bind(this));}}}else{this.refs.message.innerHTML=api.Text.parse('cookie-law-select-article');}}}});})((uBuszVWm=window.uBuszVWm||{}));