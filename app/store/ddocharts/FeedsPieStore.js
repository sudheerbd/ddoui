Ext.define('DDO.store.ddocharts.FeedsPieStore', {
    extend: 'Ext.data.Store',
    alias: 'store.feedspiestore',
    
    requires: [
        'DDO.model.ddocharts.FeedsPieModel'
    ],
    
    model: 'DDO.model.ddocharts.FeedsPieModel',
   // storeId: 'feedspiestore',
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
        url: Api.URL.feedspiestore.READ,
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});