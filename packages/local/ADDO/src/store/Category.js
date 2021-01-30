Ext.define('ADDO.store.Category', {
    extend: 'Ext.data.Store',
    alias: 'store.category',
    storeId : 'category',
    autoLoad: true,
    proxy : {
        type : 'ajax',
        url : '/priorityandcategory/category',
        reader : {
            type : 'json',
            rootProperty : 'data'
        }
    }
});
