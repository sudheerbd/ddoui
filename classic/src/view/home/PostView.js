/**
 *   This file  is responsible for Post View contains karmascore, progress view, todo.
 *   @extends {Ext.container.Container}
 *   @alias postview
 */
Ext.define('DDO.view.home.PostView', {
	extend: 'Ext.container.Container',
	xtype: 'postview',
	layout: {
		type: 'vbox',
		align:'stretch'
	},
	requires:[
		'DDO.view.widget.yourkarmascore.YourKarmaScore',
		'DDO.view.progressbar.ProgressGridView'
	],
	items: [{
		xtype: 'karmascore',
		width: Constants.ViewportWidth * 0.205,
		cls: 'ddo-postview-grid'
	},{
		xtype : 'progressgridview',
		width: Constants.ViewportWidth * 0.205,
		cls : 'your-karma-score'
	},{
		xtype:'yourkarmascore',
		cls:'yourkarmascore-div',
        width: Constants.ViewportWidth * 0.205,
	},{
		xtype: 'todolist',
		width: Constants.ViewportWidth * 0.205,
		height: Constants.ViewportHeight * 0.617,
		name : 'homeTodoList',
		cls: 'list-container add-list-container'
	}]
});

