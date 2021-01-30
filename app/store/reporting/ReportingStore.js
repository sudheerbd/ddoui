Ext.define('DDO.store.reporting.ReportingStore', {
    extend: 'Ext.data.Store',
    alias: 'store.reportingManagerStore',

    requires: [
        'DDO.model.reporting.ReportingModel'
    ],
    model: 'DDO.model.reporting.ReportingModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Api.URL.employeehistory.ALLEMPLOYEES_HISTORY,

        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },
    sorters: [{
        property: 'from_date',
        direction: 'DESC'
    }]
});