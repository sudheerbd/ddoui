Ext.define('DDO.store.setup.AccountStore', {
    extend: 'Ext.data.Store',

    alias: 'store.accountstore',

    requires: [
        'DDO.model.setup.AccountModel'
    ],

    autoLoad: false,

    model: 'DDO.model.setup.AccountModel',

    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.account.READ,
            update: Api.URL.account.UPDATE
        },
        reader: {
            type: 'json',
            rootProperty: "data"
        },
        actionMethods: {
            read: 'GET',
            update: 'PUT'
        }
    }
});