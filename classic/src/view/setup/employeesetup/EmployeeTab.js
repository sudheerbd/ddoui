/**
 * The file EmployeeTab is the view file of the employee tab.
 * @extends {Ext.container.Container}
 * @alias 'widget.employeetab'.
 * ViewModel : 'DDO.view.setup.employeesetup.EmployeeTabViewModel'.
 * ViewController : 'DDO.view.setup.employeesetup.EmployeeTabController'.
 */
Ext.define('DDO.view.setup.employeesetup.EmployeeTab', {
  extend: 'Ext.container.Container',

  xtype: 'employeetab',
  alias: 'employeetab',
  requires: [
    'Ext.container.ButtonGroup',
    'DDO.view.setup.employeesetup.EmployeeView',
    'DDO.view.setup.employeesetup.EmployeeGroup',
    'DDO.view.setup.employeesetup.EmployeeTabViewModel',
    'DDO.view.setup.employeesetup.EmployeeTabController'
  ],
  controller: 'employeetabcontroller',
  viewModel: {
    type: 'employeetabviewmodel'
  },
 
  items: [{
    xtype: 'empgroup'
  }, 
  {
    xtype: 'buttongroup',
    reference: 'btnGrpRef',
    columns: 4,
    cls: 'employeetabbtn-grp-cls',
    bodyPadding: '10 0 3 0',

    defaults: {
      cls: 'employeetabbtn-cls',
      enableToggle: true,
      width: 160,
      height: 35,
      margin: 4
     
    },

    items: [
      {
        text: 'Employees',
        reference: 'employeebtn',
        iconCls: 'employee-view-icon-cls',
        listeners: {
          click: 'onEmployeeClick'
        },
      }, {
        text: 'Utilization',
        iconCls: 'x-fa fa-certificate',
        reference: 'utilbtn',
        listeners: {
          click: 'onUtilisationClick'
        }
      }, {
        text: 'Reports',
        iconCls: 'x-fa fa-file',
        reference: 'reportsbtn',
        listeners: {
          click: 'onReportsClick'
        }
      }, {
        text: 'AllEmployees',
        iconCls: 'employee-view-icon-cls',
        reference: 'allemployeebtn',
        listeners: {
          click: 'onEmployeeClick'
        }
      }
    ]
  }, {
    xtype: 'employeeview',
    reference: 'employeeview'
  }],
  listeners: {
    render: 'onEmpViewRender'
  }
});