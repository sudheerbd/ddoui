/**
 *   This file is responsible for TechnologiesToolbar.
 *   @extends {Ext.container.Container}
 *   @alias widget.technologiestoolbar
 *   ViewModel :'DDO.view.projects.TechnologiesViewModel'.
 *   ViewController :'DDO.view.projects.TechnologiesViewController.
 */
Ext.define('DDO.view.projects.TechnologiesToolbar', {
	extend: 'Ext.container.Container',
	alias: 'widget.technologiestoolbar',
	requires: ['DDO.view.projects.TechnologiesWindow'],
	itemId: 'technologies',
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
		reference: 'searchtechnology',
		emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.TECHNOLOGIES.SEARCH,
		cls: 'ddo-todo-detail-search-text',
		name: 'technology',
		enforceMaxLength: true,
		flex:1,
		margin: 15,
		enableKeyEvents: true,
		listeners: {
			keyup: 'onSearchText'
		}
	}, {
		xtype: 'button',
		width: Constants.ViewportWidth * 0.008,
		height: Constants.ViewportHeight * 0.016,
	
		cls: 'search-icon-field'
	}, {
		xtype: 'tbfill'
	}, {
		xtype: 'button',
		cls: 'notes-create-btn-cls',
		width: Constants.ViewportWidth * 0.096,
		height: Constants.ViewportHeight * 0.062,
		text:  LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.TECHNOLOGIES.ADDTECHNOLOGIES,
		listeners: {
			click: 'onAddTechnologyClick'
		}
	}]
});