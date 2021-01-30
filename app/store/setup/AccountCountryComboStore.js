Ext.define('DDO.store.setup.AccountCountryComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.actioncountrycombostore',

    requires: [
        'DDO.model.setup.AccountCountryComboModel'
    ],

    model: 'DDO.model.setup.AccountCountryComboModel',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: Api.URL.accountcountrycombostore.READ,

        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },

    sorters: [{
        property: "countryname",
        direction: "ASC"
    }]
});