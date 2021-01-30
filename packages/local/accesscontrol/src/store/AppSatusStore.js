Ext.define('ACCTRL.store.AppSatusStore', {
    extend: 'Ext.data.Store',
    storeId: 'AppSatusStore',
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
        url: '/resources/data/accesscontrol/appsatusstore.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});