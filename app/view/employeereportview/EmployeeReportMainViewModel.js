Ext.define('DDO.view.employeereportview.EmployeeReportMainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employeereportmainviewmodel',
    requires:['DDO.model.employeereportview.EmployeeReportModel'],
    stores: {
        employestore: {
          model: 'DDO.model.employeereportview.EmployeeReportModel',
            proxy: {
                type: 'ajax',
                api: {
                   read: Api.URL.employeereport.READ   
                },
                reader: {
                    type: 'json',
                    rootProperty: "data"
                }
            },
            autoLoad: true
        }
    }
});