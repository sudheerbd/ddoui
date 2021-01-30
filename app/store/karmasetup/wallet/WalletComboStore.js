Ext.define('DDO.store.karmasetup.wallet.WalletComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.walletcombostore',

    requires: [
        'DDO.model.karmasetup.wallet.WalletGrid'
    ],

    model: 'DDO.model.karmasetup.wallet.WalletGrid',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.sharablewallet.READ
        },
        reader: {
            type: 'json',
            rootProperty: "data"
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT'
        }
    }
});