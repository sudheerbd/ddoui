/**
 * The file OrgChartSearch is the view file for tbar view which contains employee search and department with reset button.
 * @extends {Ext.container.Container}
 * @alias 'widget.orgchartsearch'.
 */
Ext.define('DDO.view.organization.OrgChartSearch', {
	extend: 'Ext.container.Container',
	alias: 'widget.orgchartsearch',

	width: '100%',

	layout: {
		type: 'hbox'
	},

	margin: '10 0 0 10',

	items: [{
		xtype: 'combobox',
		emptyText:LabelsTitles.EMPLOYEEDASHBOARD.ORGCHART.EMPNAME,
		typeAhead: true,
		width:Constants.ViewportWidth*0.154,
		height: 30,
		hideTrigger: true,
		forceSelection: true,
		cls: 'ddo-org-combo',
		minChars: 1,
		queryMode: 'local',
		enableKeyEvents: true,
		reference:'employeename',
		displayField: 'employee_name',
		valueField: 'employee_code',
		listConfig: {
			cls: 'ddo-org-combo-bound'
		},
		store: {
			type: 'orgchartempnamesstore'
		},
		bind: {
			value: '{employee_name}'
		},
		listeners: {
			select: 'onOrgEmpComboSelect',
			keyup: 'onOrgEmpComboEmptyText',
			specialkey: 'onOrgEmpComboEmptyEnter',
			beforequery: 'onOrgEmpComboSearch'
		}
	}, {
		xtype: 'tbspacer',
		width: 10
	}, {
		xtype: 'combobox',
		emptyText:LabelsTitles.EMPLOYEEDASHBOARD.ORGCHART.DEPARTMENT,
		displayField: 'name',
		width: Constants.ViewportWidth*0.154,
		height: 30,
		editable: false,
		queryMode: 'local',
		reference:'departmentname',
		valueField: 'hr_department_id',
		cls: 'ddo-org-combo',
		listConfig: {
			cls: 'ddo-org-combo-bound'
		},
		bind: {
			value: '{department_name}'
		},
		store: {
			type: 'orgchartdepartmentstore'
		},
		listeners: {
			select: 'onOrgComboSelect'
		}
	}, 
	{
		xtype: 'tbspacer',
		width: 10
	},{
		xtype: 'button',
		text:LabelsTitles.EMPLOYEEDASHBOARD.ORGCHART.RESET,
		bind:{
			hidden:'{!department_name}'	
		},
		name:"reset",
		reference:"reset",
		listeners:{
			click:"onResetBtnClick"
		}
	},{
		xtype: 'tbspacer',
		width: 41
	}],

	listeners: {
		beforerender: function() {
			Ext.getStore('orgchartempnamesstore').load();
			Ext.getStore('orgchartdepartmentstore').load();
			Ext.getStore('wtclocationstore').load();
		}
	}
});