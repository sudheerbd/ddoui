Ext.define('DDO.view.feeds.FeedsContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.feedscontainer',

    cls: 'feedscontainer-cls',

    requires: [
        'DDO.view.feeds.Feeds',
        'DDO.store.feeds.Feeds'
    ],

    items: [{
        xtype: 'dataview',
        loadingText: false,
        scrollable: false,
        flex: 1,
        padding: '0px 0px 0px 25px',
        useComponents: true,
        reference: 'feedsdataview',
        itemId: 'feedsdataview',
        defaultType: 'feedlistitem',
        deferEmptyText: false,
        emptyText: '<img src="' + DDO.util.Constants.BASE_FEED_IMAGE_PATH + 'nofeeds.png" class="nofeeds-cls">',
        listeners: {
            itemtap: 'onFeedItemTap'
        },
        bind: {
            selection: '{feeditem}'
        },
        store: {
            type: 'feeds'
        }
    }],

    listeners: {
        painted: 'onFeedViewRender'
    }
});