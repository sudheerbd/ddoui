Ext.define('DDO.store.loginlanding.createaccount.RegistrationStateComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.registrationstatecombostore',

    requires: [
        'DDO.model.loginlanding.createaccount.RegistrationStateComboModel'
    ],

    model: 'DDO.model.loginlanding.createaccount.RegistrationStateComboModel',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: Api.URL.registrationstatecombostore.READ,

        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },

    sorters: [{
        property: "statename",
        direction: "ASC"
    }]
});