Ext.define('Redeem.store.ProductImagesStore', {
    extend: 'Ext.data.Store',
    alias: 'store.productimagesstore',
    autoLoad: false,

    idProperty:'ddo_product_images_id',

    fields: ['imagepath','isdefault','ddo_product_images_id','ddo_product_id'
    ],


    proxy: {
        type: 'ajax',

        api: {
            read: '/productimage',
            create: '/productimage',
            update: '/productimage',
            destroy: '/productimage'
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