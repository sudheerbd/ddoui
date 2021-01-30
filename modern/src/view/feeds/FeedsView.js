Ext.define('DDO.view.feeds.FeedsView', {
    extend: 'Ext.container.Container',
    xtype: 'feedsview',
    requires: [
        'DDO.view.feeds.FeedsContainer',
        'DDO.view.feeds.ShareUpdate',
        'DDO.view.feeds.FeedsViewController',
        'DDO.view.feeds.FeedsModel'
    ],

    controller: 'feedsviewcontroller',
    viewModel: {
        type: 'feedsmodel'
    },
    cls: 'feeds-view-cls',
    items: [{
        xtype: 'shareupdate',
        flex: 1
    }, {
        xtype: 'feedscontainer',
        flex: 1
    }, {
        xtype: 'image',
        flex: 1,
        alt: 'Loading...',
        src: DDO.util.Constants.BASE_FEED_IMAGE_PATH + 'post_loading.gif',
        hidden: true
    }]
});
