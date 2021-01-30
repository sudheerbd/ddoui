Ext.define('DDO.store.setup.AccountStateComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.actionstatecombostore',

    requires: [
        'DDO.model.setup.AccountStateComboModel'
    ],

    model: 'DDO.model.setup.AccountStateComboModel',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: Api.URL.accountstatecombostore.READ,

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