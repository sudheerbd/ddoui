Ext.define('DDO.store.widget.wallethistory.WalletHistoryStore', {
    extend: 'Ext.data.Store',
    alias: 'store.walletdetails',

    requires: [
        'Ext.data.proxy.JsonP',
        'DDO.model.wallethistory.WalletHistoryModel'
    ],

    model: 'DDO.model.wallethistory.WalletHistoryModel',

    //This proxy is used when we are loading data from remote APIs
    proxy: {
        type: 'ajax',
        timeout: 100000,
        //url: Api.URL.karma.READ,
        url: Api.URL.wallethistorystore.READ,

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    sorters: [{
        property: "date",
        direction: "DESC"
    }],
    listeners:{

        load:function(store){

           //TODO:do something
        }
    }
});