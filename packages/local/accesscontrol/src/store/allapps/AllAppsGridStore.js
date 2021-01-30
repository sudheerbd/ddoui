Ext.define('ACCTRL.store.allapps.AllAppsGridStore', {
    extend: 'Ext.data.Store',

    alias: 'store.allappsstore',

    storeId:'allappsstore',
    requires: [
        'ACCTRL.model.allapps.AllAppsGridModel'
    ],
    model: 'ACCTRL.model.allapps.AllAppsGridModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: '/accessapp',
        method : 'GET',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    sorters : [{
        property : 'created',
        direction: 'DESC'
    }]
});
