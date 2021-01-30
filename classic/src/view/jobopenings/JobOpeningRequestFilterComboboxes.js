Ext.define('DDO.view.jobopenings.JobOpeningRequestFilterComboboxes',{
	extend: 'Ext.form.Panel',
	xtype: 'jobopeningrequestfieltercomboboxes',
	requires: [
	// 'DDO.view.jobopenings.JobOpeningsRequestViewModel',
	'DDO.store.jobopenings.JobOpeningsRequest',
	'DDO.store.jobopenings.FilterbyLocation',
	'DDO.store.jobopenings.FilterbyRole',
	'DDO.view.jobopenings.JobOpeningsRequestController'
			],
	// viewModel: 'jobopeneingsrequest',
	controller: 'JobOpeningsRequestController',

	items:[{
			xtype: 'toolbar',
			items:[{
			xtype: 'combobox',
			reference: 'filterdate',
			labelAlign: 'top',
			fieldLabel: 'Filter by Date',
			margin: '10 0 0 90',
			cls: 'requestCombo-cls',
			queryMode: 'local',
			displayField: 'name',
			valueField: 'name',
			value: 'All',
			store: 'jobopeningsstore',
			autoLoadOnValue : false
			// bind:{
			// 	store: '{fielterbydatestore}'
			// }
			// cls: 'karmascore-search-field',
		},
		{
			xtype: 'combobox',
			labelAlign: 'top',
			cls: 'requestCombo-cls',
			fieldLabel: 'Filter by Location',
			margin: '10 0 0 60',
			queryMode: 'local',
			displayField: 'name',
			valueField: 'name',
			value: 'All',
			store: 'location',
			autoLoadOnValue : false
			// bind:{
			// 	store: '{fielterbylocation}'
			// }
		},
		{
			xtype: 'tbspacer',
			width: '10px'
		}
		]
	},

	{
		
			xtype: 'combobox',
			labelAlign : 'top',
			fieldLabel: 'Filter by Role',
			cls: 'requestCombo-cls',
			margin: '10 0 0 100',
			queryMode: 'local',
			displayField: 'name',
			valueField: 'name',
			value: 'All',
			store: 'role',
			autoLoadOnValue : false
			// bind:{
			// 	store: '{fielterbyrole}'
			// }
		
		
	}
	],

	dockedItems:[{
		xtype: 'toolbar',
		width: '100%',
		margin:'0 0 30 0',
		dock: 'bottom',
		// fixed: true,
		items:[{
			xtype: 'tbfill'
		},
		{
			xtype: 'button',
			text: 'Apply',
			width: 150,
			// style:{
			// 	color: '#ffffff'
			// },
			// cls: 'add-filter-apply-btn'
			cls: 'filter-submit-btn',
			handler: 'getcombovalues'
		},
		{
			xtype: 'tbfill'
		}]
	}]

	
});