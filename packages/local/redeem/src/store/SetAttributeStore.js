Ext.define('Redeem.store.SetAttributeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.setattributestore',
    autoLoad: false,

    fields: ['ddo_product_id', 'attribute_code', 'attribute_ids', 'attribute_value_ids',
        'quantity', 'ddo_productattribute_id', 'ddo_productattributes_set_id','ddo_productattribute_instance_id'
    ],


    proxy: {
        type: 'ajax',

        api: {
            read: '/setproductattributes',
            create: '/setproductattributes',
            update: '/setproductattributes',
            destroy: '/setproductattributes'
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