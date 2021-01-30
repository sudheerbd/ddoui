Ext.define('Redeem.store.AttributeValueStore', {
    extend: 'Ext.data.Store',
    alias: 'store.attributevaluestore',
    autoLoad: false,

    fields: ['ddo_productattribute_value_id', 'description', 'ddo_productattribute_id', 'productattribute', 'productattributevalue','code'],

    proxy: {
        type: 'ajax',

        api: {
            read: '/productattributevalues',
            create: '/productattributevalues',
            update: '/productattributevalues',
            destroy: '/productattributevalues'
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

    },
    groupField:'productattribute'
});