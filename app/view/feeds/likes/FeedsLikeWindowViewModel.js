/**
 * This is ViewModel for view 'DDO.view.feeds.likes.FeedsLikeWindow'.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.feedslikewindowviewmodel'
 */
Ext.define('DDO.view.feeds.likes.FeedsLikeWindowViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.feedslikewindowviewmodel',
    data: {
        likeIconsVisible: true,
        userLikesCountData:[]
    }
});