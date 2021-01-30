/**
 * This view is responsible for displaying all feeds and it's related operations.
 * @class 'DDO.view.feeds.FeedsView'
 * @extends 'Ext.container.Container'
 * @alias 'feedsview'
 * @ViewModel 'DDO.view.feeds.FeedsModel'
 * @Controller 'DDO.view.feeds.FeedsController'
 */
Ext.define('DDO.view.feeds.FeedsView', {
    extend: 'Ext.container.Container',
    xtype: 'feedsview',
    requires: [
        'DDO.view.feeds.FeedsContainer',
        'DDO.view.feeds.ShareUpdate',
        'DDO.store.feeds.Feeds',
        'DDO.view.feeds.FeedsController',
        'DDO.view.feeds.FeedsModel',
        'DDO.view.feeds.FeedsMenuImage',
        'DDO.view.feeds.FeedsTagMenuImage',
        "DDO.view.feeds.FeedsContainerGrid"
    ],
    
    controller: 'feedscontroller',
    viewModel: {
        type: "feedsmodel"
    },
    
    cls: 'ddo-container',
    items: [{
        xtype: 'shareupdate'
    },{
        xtype: 'feedscontainergrid'
    },{
        xtype: 'image',
        alt: LabelsTitles.HOME.FEEDS.LOADING,
        src: 'resources/images/feeds/post_loading.gif',
        margin: '0px 0px 0px 300px',
        hidden: true
    }]
});
