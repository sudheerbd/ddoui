Ext.define('ADDO.thread.EditorPanel',{
	extend : 'Ext.panel.Panel',

	alias : 'widget.editorpanel',

	margin : '0 20 20 20',	
	layout : 'fit',	

	bbar   : [{
		text  : 'Reply',
		handler : 'onClickReply'
	},{
		text  : 'Cancel',
		handler: 'onClickCancel'
	}],			
	
	items  : [{
		xtype : 'htmleditor'
	}]
});