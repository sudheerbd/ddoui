Ext.define('DDO.view.settings.GoalSettings', {
	extend: 'Ext.container.Container',

	alias: 'widget.goalsettings',

	title: LabelsTitles.GOAL_SETTINGS,

	requires:[
         'DDO.overrides.form.field.Tag'
	],

	items: [{
		xtype: 'tagfield',
		width: '100%',
		anyMatch: true,
		editable: true,
		name: 'roleid',
		typeAhead:true,
		//typeAheadDelay:10,
		// Added clearOnBackspace config in event. 6.0.1 not supported clearOnBackspace so I have ovverided.
        clearOnBackspace: false,
        queryMode:'local',
		emptyText: 'Auto Approval Role',
		labelSeparator: '',
		labelWidth: 120,
		fieldLabel: 'Auto Approval Role',
		displayField: 'name',
		cls: 'goalsetting-tagfield-cls',
		valueField: 'ddo_role_id',
		store: 'setup.role.RoleStore',
		listConfig: {
			cls: 'tag-view-list'
		},
		 listeners: {
		  select: 'onAccessDetailsSelect',
		  beforedeselect:'onAccessDetailsDeSelect',
		  beforeselect:'onAccessDetailsBeforeSelect',
		  afterRender:'afterTagFieldRender'
		}
	}, {
		xtype: 'container',
		margin: '30 0 0 0',
		layout: {
			type: 'hbox',
			pack: 'center',
			align: 'center'
		},
		defaults: {
			margin: 15,
			padding: '10 30'
		},
		items: [{
			xtype: 'button',
			text: 'Save',
			bind:{
				disabled:'{saveBtnView}'
			},
			handler: 'onSaveGoalBtnClick'
		}]
	}]
});