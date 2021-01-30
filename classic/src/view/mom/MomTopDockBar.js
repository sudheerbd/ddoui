/**
 * The file MomTopDockBar is the top bar of MoM view which contains search field and create button.
 * @extends {Ext.container.Container}
 * @alias 'widget.momtopdockbar'.
 * ViewController : 'DDO.view.mom.MomViewController'
 */
Ext.define('DDO.view.mom.MomTopDockBar', {
	extend: 'Ext.container.Container',

	alias: 'widget.momtopdockbar',

	layout: {
		type: 'hbox',
		align: 'center'
	},

	cls: 'notes-toolbar-cls',

	margin: '0 20 0 10',

	defaults: {
		margin: 5
	},

	items: [{
		xtype: 'textfield',
		reference: 'agendaRef',
		emptyText: LabelsTitles.MoM.EMPTYTEXTAGENDA,
		cls: 'ddo-todo-detail-search-texts',
		name: 'agendasearch',
		height: 30,
		width: Constants.ViewportWidth*0.2,
		margin: 15,
		enableKeyEvents: true,
		listeners: {
			keyup: 'onMomSearchText'
		}
	}, {
		xtype: 'button',
		width: 10,
		height: 10,
		cls: 'search-icon-field'
	}, {
		xtype: 'tbfill'
	}, {
		xtype: 'button',
		cls: 'notes-create-btn-cls',
		width: Constants.ViewportWidth*0.099,
		height: 40,
		text: LabelsTitles.MoM.CREATEMOM,
		listeners: {
			click: 'onMOMNodeCreateBtnClick'
		}
	},
	{
		xtype:'button',
		height:40,
		width:Constants.ViewportWidth*0.096,
		text:'newwindow',
		handler:function(btn){
			var window = Ext.ComponentQuery.query('momcreatenewwindow')[0] ||
			Ext.create('DDO.view.projects.MOMNewCreateWindow');
			window.show();
		}
	}]
});