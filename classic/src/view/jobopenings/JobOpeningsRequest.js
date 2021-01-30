Ext.define('DDO.view.jobopenings.JobOpeningsRequest',{
	extend: 'Ext.panel.Panel',
	alias: 'jobopeningrequest',

	requires:[
	'DDO.view.jobopenings.JobOpeningsRequestController',
	'DDO.store.jobopenings.FilterbyStatus'
	],
	controller: 'JobOpeningsRequestController',
	defaults:{
		margin: '10 0 0 10'
	},
	// defaultButton: 'search',
	// cls: 'ddo-adv-karma-search-form',
	layout: {
		type: 'hbox',
		width: '100%'
		// align: 'middle'
   },
   items:[
   {
   	// xtype: 'toolbar',
   	// width: '100%',
   	// items: [
   	// {
   		xtype: 'button',
   		width: 6,
   		cls: 'karmascore-search-icon-field',
   		height: 6//,
		// iconCls: 'x-fa fa-search'
		// cls: 'search-icon-field'
		},
		{
			xtype: 'textfield',
			// emptyText: 'search',
			width: '20%',
			// margin:'10 10 10 0',
			cls: 'karmascore-search-field'
			// iconCls: 'x-fa fa-search'
			//cls: 'ta-search-field',

		},
		{
			xtype: 'button',
			iconCls: 'x-fa fa-list',
			listeners:{
				click:'hideCombobox'
			}
		},
		{
			xtype:'tbfill'
		},
		{
			xtype: 'combobox',
			fieldLabel:'Filter by Status',
			// width: '15%',
			queryMode:'local',
			displayField:'name',
			valueField: 'name',
			value:'All',
			cls: 'requestCombo-cls',
			store:'status',
			autoLoadOnValue : true
		},
		{
			xtype: 'button',
			text: 'Create New',
			width: 100,
			height: 35,
			textAlign: 'center',
			cls: 'create-new-btn-cls'
		// }]
		
	}]
});