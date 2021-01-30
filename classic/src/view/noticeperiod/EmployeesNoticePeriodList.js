/**
 * The file EmployeesNoticePeriodList is the columns of the grid view in the notice period.
 * @extends {Ext.grid.Panel}.
 * @alias widget.employeesnoticeperiodlist
 */
Ext.define('DDO.view.noticeperiod.EmployeesNoticePeriodList', {
  extend: 'Ext.grid.Panel',
  xtype: 'employeesnoticeperiodlist',
  bind: {
    store: '{employeesnoticeperiodliststore}'
  },
  cls: 'ddo-dashboard-grid karmaapproval',
  defaults: {
    padding: '5 0 0 5',
  },
  margin: '30px 0px 0px 20px',
  columns: [
    {
      text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.EMPNAME,
      flex: 1,
      height: 40,
      dataIndex: 'reqbyname'
    },
    {
      text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.REPORTING,
      flex: 1,
      height: 40,
      dataIndex: 'reqtoname'
    },
    {
      text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.JOININGDATE,
      flex: 1,
      height: 40,
      dataIndex: 'joiningdate'
    },
    {
      text:LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.EMPSTATUS ,
      flex: 1,
      height: 40,
      dataIndex: 'empstatus'
    },
    {
      text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.STATUS,
      flex: 1,
      height: 40,
      dataIndex: 'status'
    },  
    {
      xtype: 'actioncolumn',
      flex: 1,
      height: 40,
      reference:'Document',
     header:'Document',
      items: [{
        text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.DOCUMENT,
        iconCls: 'x-fa fa-eye',
        align: 'end',
        handler: 'OnEyeButtonActionClick'
      }]
    } ,
    {
      xtype: 'actioncolumn',
      flex: 1,
      text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.ACTION,
      reference: 'actioncoloumn',
      bind: {
        hidden: '{actionBtnUnable}'
      },
      items: [{
        iconCls: 'x-fa fa-arrow-right',
        text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.PROCEED,
        align: 'center',
        handler: 'OnButtonActionClick'
      }]
    }]
});
