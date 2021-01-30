Ext.define('DDO.store.feeds.likes.LikesStore', {
    extend: 'Ext.data.Store',
    alias: 'store.likesstore',
    
    requires: [
        'DDO.model.feeds.likes.Like'
    ],
    
    model: 'DDO.model.feeds.likes.Like',
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
        url: 'resources/data/likescount.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});