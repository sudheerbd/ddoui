Ext.define('DDO.view.employeereportview.EmployeeReportMainView', {
  extend: 'Ext.container.Container',
  alias: 'widget.employeereportmainview',
  layout:'fit',
  height:520,
  requires: [
    'DDO.view.employeereportview.EmployeeReportController',
    'DDO.view.employeereportview.EmployeeReportWin',
    'DDO.view.employeereportview.EmployeeReportGrid',
    'DDO.view.employeereportview.EmployeeReportMainViewModel'
  ],
  viewModel: {
    type: 'employeereportmainviewmodel'
  },
  cls: 'employeereport-cls',
  margin: '0 0 0 0',
  controller: 'employeereportcontroller',
  items: [
    {
      xtype: 'employeereportgrid'
    //   height: Constants.ViewportHeight*1.632,
    //   width:1000,
    //  maxWidth:Constants.ViewportWidth*0.732,
    //  maxHeight:Constants.ViewportHeight*0.762,
    }]
});