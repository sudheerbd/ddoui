/**
 * The file EmployeesInNoticePeriodCards is the view file for the different cards in the progress bar.
 * @extends {Ext.container.Container}.
 * @alias widget.employeesinnoticeperiodcards.
 */
Ext.define('DDO.view.noticeperiod.EmployeesInNoticePeriodCards', {
  extend: 'Ext.container.Container',
  xtype: 'employeesinnoticeperiodcards',

  requires: [
    'DDO.view.noticeperiod.EmployeesInNoticePeriodHR',
    'DDO.view.noticeperiod.EmployeesInNoticePeriodProject',
    'DDO.view.noticeperiod.EmployeesInNoticePeriodAssets',
    'DDO.view.noticeperiod.EmployeesInNoticePeriodHRAdv'
  ],
  width: '100%',
  height: '100%',
  padding: '0px 21px 0px 10px',
  layout: {
    type: 'card'
  },
  items: [
    {
      xtype: 'employeesinnoticeperiodhr',
      itemId: "with_hr",
    },
    {
      xtype: 'employeesinnoticeperiodproject',
      itemId: "with_project",
    },
    {
      xtype: 'employeesinnoticeperiodassets',
      itemId: "with_asset"
    },
    {
      xtype: 'employeesinnoticeperiodhradv',
      itemId: "final_hr"
    }
  ]
});
