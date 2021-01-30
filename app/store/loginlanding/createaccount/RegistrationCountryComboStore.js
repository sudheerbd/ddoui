Ext.define('DDO.store.loginlanding.createaccount.RegistrationCountryComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.registrationcountrycombostore',

    requires: [
        'DDO.model.loginlanding.createaccount.RegistrationCountryComboModel'
    ],

    model: 'DDO.model.loginlanding.createaccount.RegistrationCountryComboModel',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: Api.URL.registrationcountrycombostore.READ,

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