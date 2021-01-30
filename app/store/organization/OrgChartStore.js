Ext.define('DDO.store.organization.OrgChartStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.orgchartstore',

    storeId: 'orgchartstore',

    requires: [
        'DDO.model.organization.OrgChartModel'
    ],

    model: 'DDO.model.organization.OrgChartModel',
    
    proxy: {
        type: 'ajax',
        url: Api.URL.orgchartstore.READ,

        reader: {
            type: 'json',
            rootProperty: 'children'
        }
    }
});