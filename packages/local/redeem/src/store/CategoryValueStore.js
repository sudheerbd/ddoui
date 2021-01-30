Ext.define('Redeem.store.CategoryValueStore', {
    extend: 'Ext.data.Store',
    alias: 'store.categoryevaluestore',
    autoLoad: false,

    fields: ['ddo_productcategory_id', 'description', 'productcategoryname','code'],
    
    proxy: {
        type: 'ajax',

        api: {
            read: '/productcategory',
            create: '/productcategory',
            update: '/productcategory',
            destroy: '/productcategory'
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