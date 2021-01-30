Ext.define('DDO.store.organization.OrgChartDepartmentStore', {
    extend: 'Ext.data.Store',
    alias: 'store.orgchartdepartmentstore',

    storeId: 'orgchartdepartmentstore',

    requires: [
        'DDO.model.organization.OrgChartDepartmentModel'
    ],

    model: 'DDO.model.organization.OrgChartDepartmentModel',

    proxy: {
        type: 'ajax',
        url: Api.URL.orgchartdepartmentstore.READ,

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});