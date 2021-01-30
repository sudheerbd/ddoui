Ext.define('DDO.store.widget.wallethistory.KarmaHistoryStore', {
    extend: 'Ext.data.Store',
    alias: 'store.karmadetails',

    requires: [
        'Ext.data.proxy.JsonP',
        'DDO.model.wallethistory.KarmaHistoryModel'
    ],
    model: 'DDO.model.wallethistory.KarmaHistoryModel',

    //This proxy is used when we are loading data from remote APIs
    proxy: {
        type: 'ajax',
        timeout: 100000,
        //url: Api.URL.karma.READ,
        url: Api.URL.karmahistorystore.READ,

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