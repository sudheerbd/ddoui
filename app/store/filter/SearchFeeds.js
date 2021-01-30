Ext.define('DDO.store.filter.SearchFeeds', {
    extend: 'Ext.data.Store',
    alias: 'store.searchfeeds',

    requires: [
        'DDO.model.feeds.Feed'
    ],

    model: 'DDO.model.feeds.Feed',

    storeId: 'searchfeeds',

    autoLoad: false,

    idProperty: 'post_id',

    proxy: {
        type: 'ajax',
        url: Api.URL.searchfeeds.READ,
        timeout: 100000,
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },

    filters: [{
        property: 'filter_sort',
        value: false
    }],

    sorters: [{
        property: "post_modified_date",
        direction: "DESC"
    }]
});