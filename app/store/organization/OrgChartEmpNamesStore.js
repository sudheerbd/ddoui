Ext.define('DDO.store.organization.OrgChartEmpNamesStore', {
    extend: 'Ext.data.Store',
    alias: 'store.orgchartempnamesstore',
    storeId: 'orgchartempnamesstore',

    requires: [
        'DDO.model.organization.OrgChartEmpNamesModel'
    ],

    model: 'DDO.model.organization.OrgChartEmpNamesModel',

    proxy: {
        type: 'ajax',
        url: Api.URL.orgchartempnamesstore.READ,

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});