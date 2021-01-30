Ext.define('ADDO.store.SupportUser', {
    extend: 'Ext.data.Store',
    alias: 'store.supportuser',
    storeId : 'supportuser',
    autoLoad: true,
    proxy : {
        type : 'ajax',
        url : '/supportuser',
        reader : {
            type : 'json',
            rootProperty : 'data'
        }
    }
});
