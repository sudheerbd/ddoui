Ext.define('DDO.store.redeem.RedeemHistoryItemsGridStore', {
    extend: 'Ext.data.Store',

    alias: 'store.redeemhistoryitemsgridstore',

    fields: [{
        name: 'product_name'
    },{
        name: 'product_id'
    }, {
        name: 'quantity',
        type:'int'
    }, {
        name: 'price',
        type:'int'
    }],

    proxy: {
        type: 'ajax',
        url: Api.URL.redeemhistoryitemsgridstore.READ,

        reader: {
            type: 'json',
            rootProperty: "data"
        }

    }
});