/**
 * The file EmployeesInNoticePeriodView is the view file for notice period tab in Employee Dashboard.
 * @extends Ext.container.Container.
 * @alias 'widget.employeesinnoticeperiodview'.
 * ViewModel : 'DDO.view.noticeperiod.EmployeesInNoticePeriodViewModel'.
 * ViewController : 'DDO.view.noticeperiod.EmployeesInNoticePeriodController'.
 */

Ext.define('DDO.view.noticeperiod.EmployeesInNoticePeriodView', {
  extend: 'Ext.container.Container',
  alias: 'widget.employeesinnoticeperiodview',
  requires: [
    'DDO.view.noticeperiod.EmployeesInNoticePeriodController',
    'DDO.view.noticeperiod.EmployeesInNoticePeriodViewModel',
    'DDO.view.noticeperiod.EmployeesInNoticePeriodDataView',
    'DDO.view.noticeperiod.EmployeesInNoticePeriodGrid',
  ],
  width: '100%',
  minWidth: Constants.ViewportWidth * 0.50,
  padding: '0px 21px 0px 10px',
  listeners:{
    show:'onComponentActivate'
  },
  layout: {
    type: 'card',
  },
  viewModel: {
    type: 'employeesinnoticeperiodviewmodel'
  },
  controller: 'employeesinnoticeperiodcontroller',
  items: [{
    xtype: 'employeesinnoticeperiodgrid',
    itemId: 'noticegrid'
  },
    {
      xtype: 'employeesinnoticeperioddataview',
      itemId: 'noticeview'
    }
  ]
});





