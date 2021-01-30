Ext.define('DDO.store.setup.AccountCityComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.actioncitycombostore',

    requires: [
        'DDO.model.setup.AccountCityComboModel'
    ],

    model: 'DDO.model.setup.AccountCityComboModel',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: Api.URL.accountcitycombostore.READ,

        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },

    sorters: [{
        property: "cityname",
        direction: "ASC"
    }]
});