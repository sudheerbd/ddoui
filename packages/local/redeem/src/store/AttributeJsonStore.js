
Ext.define('Redeem.store.AttributeJsonStore', {
    extend: 'Ext.data.Store',
    alias: 'store.attributejsonstore',
    autoLoad: false,

    fields: ['name', 'value'],

    proxy: {
        type: 'ajax',
        url: 'resources/data/redeem/attributes.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});