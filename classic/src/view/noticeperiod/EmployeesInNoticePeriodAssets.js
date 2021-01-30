/**
 * The file EmployeesInNoticePeriodAssets is the view file for assets view in the progress bar.
 * @extends {Ext.grid.Panel}.
 * @alias widget.employeesinnoticeperiodassets.
 */
Ext.define('DDO.view.noticeperiod.EmployeesInNoticePeriodAssets', {
  extend: 'Ext.grid.Panel',
  xtype: 'employeesinnoticeperiodassets',
  padding: '10 0 10 0',
  scrollable: true,
  width: '100%',
  height: Constants.ViewportHeight * 0.68,
  cls: 'noticeprojectgrid-cls',
  bind: {
    store: '{myappsgridstore}'
  },
  columns: [
    {                                 
      text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.APP,
      flex: 1,
      height: 40,
      dataIndex: 'appName'
    },
    {
      text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.STATUS,
      flex: 1,
      height: 40,
      dataIndex: 'status'
    },
    {
      xtype:  LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.CHECKCOLUMN,
      menuDisabled: true,
      sortable: false,
      id: 'checkcolumn',
      dataIndex: 'active',
      text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.ALLOW,
      flex: 0.2,
      listeners: {
        checkchange: 'OnClickCheckBtn'
      }
    }

  ]


});



