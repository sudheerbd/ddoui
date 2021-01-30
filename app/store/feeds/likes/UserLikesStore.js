Ext.define('DDO.store.feeds.likes.UserLikesStore', {
    extend: 'Ext.data.Store',
    alias: 'store.userlikesstore',
    storeId: 'userlikesstore',
    requires: [
        'Ext.data.proxy.JsonP',
        'DDO.model.feeds.likes.UserLike'
    ],
    model: 'DDO.model.feeds.likes.UserLike',
    //This proxy is used when we are loading data from remote APIs
    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.postlikes.READ
        },
        actionMethods: {
            read: 'GET'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});