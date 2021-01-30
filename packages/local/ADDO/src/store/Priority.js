Ext.define('ADDO.store.Priority', {
    extend: 'Ext.data.Store',
    alias: 'store.priority',
    storeId : 'priority',
    autoLoad: true,
    proxy : {
        type : 'ajax',
        url : '/priorityandcategory/priority',
        reader : {
            type : 'json',
            rootProperty : 'data'
        }
    }
});
