/**
 * This view is responsible for displaying all feed's like activities and it's related operations.
 * @class 'DDO.view.feeds.likes.FeedsLikeWindow'
 * @extends 'Ext.window.Window'
 * @alias 'widget.feedslikewindow'
 * @ViewModel 'DDO.view.feeds.likes.FeedsLikeWindowViewModel'
 * @Controller 'DDO.view.feeds.likes.FeedsLikeWindowController'
 */
Ext.define('DDO.view.feeds.likes.FeedsLikeWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.feedslikewindow',
    requires: [
        'DDO.view.feeds.likes.FeedsLikeWindowController',
        'DDO.view.feeds.likes.FeedsLikeWindowViewModel',
        'DDO.view.feeds.likes.FeedsLikeDataView',
        'DDO.view.feeds.likes.FeedsLikeUsersDataView'
    ],
    controller: 'feedslikewindowcontroller',
    viewModel: {
        type: 'feedslikewindowviewmodel'
    },
    items: [{
            xtype: 'feedslikedataview',
            margin: '10 20 10 20'
        },
        {
            xtype: 'feedslikeusersdataview'
        }],
        
    cls:'feed-likes-window',
    width: Constants.ViewportWidth * 0.278,
    height: Constants.ViewportHeight * 0.745,
    resizable: false,
    modal: true,
    header: false,
    initComponent: function () {
        this.callParent(arguments);
        var controller = this.getController();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    destroy: function () {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    }
});