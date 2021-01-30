Ext.define('Redeem.store.AttributeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.attributestore',
    autoLoad: false,

    fields: ['name', 'attribute_values', 'ddo_productattribute_id','code'],

    proxy: {
        type: 'ajax',

        api: {
            read: '/productattribute',
            create: '/productattribute',
            update: '/productattribute',
            destroy: '/productattribute'
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