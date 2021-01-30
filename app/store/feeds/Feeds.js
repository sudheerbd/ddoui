Ext.define('DDO.store.feeds.Feeds', {
    extend: 'Ext.data.Store',
    alias: 'store.feeds',
    storeId:'feeds',
    requires: [
        'DDO.model.feeds.Feed'
    ],
    
    model: 'DDO.model.feeds.Feed',
    storeId: 'feeds',
    autoLoad: false,
    idProperty: 'post_id',
    
    proxy: {
        type: 'ajax',
        url: Api.URL.feeds.READ,
        timeout: 100000,
        extraParams: {
            limit: 10
        },
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },
    
    filters: [{
        property: 'filter_sort',
        value: true
    }],
    sorters: [{
        property: "post_modified_date",
        direction: "DESC"
    }]
});