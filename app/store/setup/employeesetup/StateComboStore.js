Ext.define('DDO.store.setup.employeesetup.StateComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.statecombostore',

    requires: [
        'DDO.model.setup.employeesetup.StateComboModel'
    ],

    autoLoad: false,

    model: 'DDO.model.setup.employeesetup.StateComboModel',

    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.account.READ
        },
        reader: {
            type: 'json',
            rootProperty: "data"
        },
        actionMethods: {
            read: 'GET'
        }
    },
    sorters: [{
        property: "region_name",
        direction: "ASC"
    }]
});
