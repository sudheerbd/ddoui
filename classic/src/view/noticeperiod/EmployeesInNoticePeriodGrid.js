/**
 * The file EmployeesInNoticePeriodGrid is the view file for grid view in the notice period view.
 * @extends {Ext.container.Container}.
 * @alias 'widget.employeesinnoticeperiodgrid'.
 */
Ext.define('DDO.view.noticeperiod.EmployeesInNoticePeriodGrid', {
  extend: 'Ext.container.Container',
  requires: [
    'DDO.view.noticeperiod.EmployeesNoticePeriodList'
  ],
  xtype: 'employeesinnoticeperiodgrid',
  items: [
    {
      xtype: 'combobox',
      name: 'status',
      cls: 'noticeperiod-view-text-cls',
      labelWidth: 'auto',
      reference: 'combostatus',
      allowBlank: false,
      valueField: 'status_id',
      displayField: 'status',
      bind: {
        store: '{resignationcombostore}'
      },
      selectOnFocus: true,
      listeners: {
        afterrender: 'onNoticePeriodSetStatus',
        change: 'onNoticePeriodStatusSelect'
      }
    },
    {
      xtype: 'employeesnoticeperiodlist'
    }
  ]
});




