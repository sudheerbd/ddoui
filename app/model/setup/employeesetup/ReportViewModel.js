/**
 * The file ReportViewModel is the ViewModel of the 'DDO.view.setup.employeesetup.ReportsView'.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.reportviewmodel'.
 */
Ext.define('DDO.model.setup.employeesetup.ReportViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reportviewmodel',
    requires: [
        'Ext.data.proxy.JsonP',
        'DDO.model.setup.employeesetup.EmployeeModel'
	],
    stores: {
		reports: {
            model: 'DDO.model.setup.employeesetup.EmployeeModel',
            autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url: '/employeedetail',
                    reader: {
                        type: 'json',
                        rootProperty:'data'
                    },
                    extraParams: {
                        empstatus: "All"
                    }
                }
            },
            workStatusStore: {
                data: [
                    {
                        "name": "All"
                    },{
                    "name": "Probation"
                  },
                  {
                    "name": "Confirmed"
                  },{
                    "name" : "Separated"
                  },
                  {
                    "name": "Notice"
                  },
                  {
                    "name": "Loss of Pay"
                  }]
            }
        }
});