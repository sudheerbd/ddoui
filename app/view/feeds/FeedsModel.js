/**
 * This is ViewModel for view 'DDO.view.feeds.FeedsView'.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.feedsmodel'
 */
Ext.define('DDO.view.feeds.FeedsModel',{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.feedsmodel',

    data : {
        postContent : "",
        postType : "standard",
        newFeeds : [],
        test: null,
        visibleDelegateEvent: false,
        delegateActionPerformed: false,
        statusBoxAcc: false,
        postEmptyText:"Write a comment...",
        peopleChecked: false
    }
});