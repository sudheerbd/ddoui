Ext.define('DDO.store.loginlanding.createaccount.RegistrationCityComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.registrationcitycombostore',

    requires: [
        'DDO.model.loginlanding.createaccount.RegistrationCityComboModel'
    ],

    model: 'DDO.model.loginlanding.createaccount.RegistrationCityComboModel',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: Api.URL.registrationcitycombostore.READ,

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