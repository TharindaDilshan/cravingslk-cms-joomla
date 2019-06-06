var InputModulePosition=api.InputModulePosition=extendReactClass('MixinInput',{getDefaultProps:function(){return{getPositionList:api.urls.ajaxBase+'&action=getTemplatePosition',saveNewPosition:api.urls.ajaxBase+'&action=saveTemplatePosition'};},getInitialState:function(){return{value:this.props.value,options:[],position:''};},componentWillMount:function(){api.__parent__();this.loading=true;api.Ajax.request(this.props.getPositionList,function(req){var response=req.responseJSON;this.loading=false;if(response.type=='success'){this.setState({options:response.data});}}.bind(this));},render:function(){var options=[],selected;if(this.loading){options.push(React.createElement('option',{value:''},api.Text.parse('loading')));}this.state.options.map(option=>{selected=this.state.value==option.value?true:false;options.push(React.createElement('option',{value:option.value,selected:selected},option.name));});return React.createElement('div',{key:this.props.id||api.Text.toId(),className:'form-group '+(this.props.control.className||'')},React.createElement('label',null,this.label,this.tooltip),React.createElement('div',null,React.createElement('select',{ref:'field',name:this.props.setting,onChange:this.change,className:'form-control'},options)),this.state.options.length?React.createElement('a',{href:api.urls.root+'/administrator/index.php?option=com_modules&filter[position]='+(this.state.value!=''?this.state.value:this.state.options[0].value),target:'_blank',className:'btn btn-default btn-block mt-3'},api.Text.parse('view-modules')):null,React.createElement('button',{type:'button',onClick:this.popupForm.bind(this,'create-position'),className:'btn btn-default btn-block mt-3'},api.Text.parse('create-position')));},initActions:function(){api.__parent__();if(this.refs.field&&!this._initialized_chosen){this.initChosen({disable_search:false},true);this._initialized_chosen=true;}},updateState:function(values){this.setState({position:values.position});},saveSettings:function(values){api.Ajax.request(this.props.saveNewPosition,function(req){var response=req.responseJSON;if(response.type=='success'){var options=this.state.options,position=this.state.position;options.push({name:this.state.position,value:this.state.position});this.setState({options:options,position:''});delete this.refs.field._initialized_chosen;jQuery(this.refs.field).chosen('destroy');this.change(this.props.setting,position);}else{bootbox.alert(response.data);}}.bind(this),{position:values.position});},popupData:function(){return{form:{rows:[{cols:[{'class':'col-12',controls:{'position':{type:'text',label:'position-name'}}}]}]},values:{position:this.state.position}};}});