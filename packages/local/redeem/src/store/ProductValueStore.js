Ext.define('Redeem.store.ProductValueStore', {
    extend: 'Ext.data.Store',
    alias: 'store.productvaluestore',
    autoLoad: false,

    fields: ['ddo_product_id', 'categoryname', 'ddo_productcategory_id','price','quantity','code','productname'],

    proxy: {
        type: 'ajax',

        api: {
            read: '/product',
            create: '/product',
            update: '/product',
            destroy: '/product'
        },

        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },

        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            writeAllFields: true
        }

    }
});
