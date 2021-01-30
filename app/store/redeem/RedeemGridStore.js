Ext.define('DDO.store.redeem.RedeemGridStore', {
    extend: 'Ext.data.Store',

    alias: 'store.redeemgridstore',

    fields:[{
        name:'ddo_product_order_id'
    },{
        name:'created'
    },{
        name:'ddo_redeemhistory_id'
    },{
        name:'documentno'
    },{
        name:'redeem_points'
    },{
        name:'status'
    },{
        name:'buyer_name'
    }],

    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.redeemgrid.READ,
            create: Api.URL.redeemgrid.CREATE,
            update: Api.URL.redeemgrid.UPDATE
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