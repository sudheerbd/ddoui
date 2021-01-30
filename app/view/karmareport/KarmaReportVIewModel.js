
Ext.define('DDO.view.karmareport.KarmaReportViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: ['DDO.model.karmareport.KarmaReportGridModel'],
    alias: 'viewmodel.karmareportviewmodel',

    data: {


    },
    stores: {
        karmareportstore: {
            model: 'DDO.model.karmareport.KarmaReportGridModel',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: Api.URL.karmareportdetails.READ,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }

            },
            groupField: 'employeename'
        }
    }
});