/**
 * The file EmployeesInNoticePeriodDataView is the view file which contains progressbar and toolbar and cards used in the view.
 * @extends {Ext.container.Container}.
 * @alias 'widget.employeesinnoticeperioddataview'.
 */
Ext.define('DDO.view.noticeperiod.EmployeesInNoticePeriodDataView', {
  extend: 'Ext.container.Container',
  alias: 'widget.employeesinnoticeperioddataview',
  xtype: 'employeesinnoticeperioddataview',
  requires: [
    'DDO.view.noticeperiod.EmployeeNoticePeriodProgressbar',
    'DDO.view.noticeperiod.EmployeeNoticePeriodToolbar',
    'DDO.view.noticeperiod.EmployeesInNoticePeriodCards',
    'DDO.view.noticeperiod.EmployeesInNoticePeriodBbar'
  ],
  cls: 'employeesinnoticeperioddataview',
  width: '100%',
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [
    {
      xtype: 'employeenoticeperiodprogressbar'
    },
    {
      xtype: 'employeenoticeperiodtoolbar'
    },
    {
      xtype: 'employeesinnoticeperiodcards',
      cls:'employeesinnoticeperiodcards'
    },
    {
      xtype: 'employeesinnoticeperiodbbar',
      cls:'employeesinnoticeperiodbbar'
    }
  ]
});