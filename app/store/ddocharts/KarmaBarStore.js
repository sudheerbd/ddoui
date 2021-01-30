Ext.define('DDO.store.ddocharts.KarmaBarStore', {
    extend: 'Ext.data.Store',
    alias: 'store.karmabarstore',
    
    requires: [
        'DDO.model.ddocharts.KarmaBarModel'
    ],
    
    model: 'DDO.model.ddocharts.KarmaBarModel',
    //storeId: 'karmabarstore',
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
            url:  Api.URL.karmabarstore.READ,
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});