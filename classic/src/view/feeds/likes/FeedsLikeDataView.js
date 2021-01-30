/**
 * This view is responsible for displaying all feed's like activities and it's related operations.
 * @class 'DDO.view.feeds.likes.FeedsLikeDataView'
 * @extends 'Ext.view.View'
 * @alias 'feedslikedataview'
 * @ViewModel 'DDO.view.feeds.likes.FeedsLikeWindowViewModel'
 * @Controller 'DDO.view.feeds.likes.FeedsLikeWindowController'
 */
Ext.define('DDO.view.feeds.likes.FeedsLikeDataView', {
    extend: 'Ext.view.View',

    requires: [
        'DDO.store.feeds.likes.LikesStore'
    ],

    xtype: 'feedslikedataview',

    store: {
        type: 'likesstore'
    },

    loadMask: false,

    tpl: [
        '<div>',
            '<table class="likes-header-cls" style="width:100%">',
                '<tr>',
                    '<tpl for=".">',
                        '<td class="header-td-cls {[this.getActiveItemTab(values)]}">',
                            "{[this.getAllLikes(values)]}",
                            '<span class="likes-header-text-cls">{[this.getCount(values)]}</span>',
                        '</td>',
                    '</tpl>',
                '</tr>',
            '</table>',
        '</div>', {
            getCount: function(values) {
                var win = Ext.ComponentQuery.query('feedslikewindow')[0],
                    userLikesCountData = win.getViewModel().get('userLikesCountData'),
                    count = 0;
                if (values.reaction == "All") {
                    count = userLikesCountData.length;
                    return count
                } else {
                    userLikesCountData.forEach(function(rec) {
                        if (rec.like_value == values.value) {
                            count = count + 1;
                        }
                    });
                    return count
                }
            },
            getActiveItemTab: function(values) {
                if (values.active) {
                    return "likes-header-active-cls"
                } else {
                    return ""
                }
            },
            getAllLikes: function(values) {
                if (values.reaction === "All") {
                    return '<span class="likes-header-text-cls">All</span>'
                } else {
                    return '<img  src="' + values.imgsrc + '" width="25px" height="25px" alt="user face"/>'
                }
            }
        }
    ],

    itemSelector: '.header-td-cls',

    listeners: {
        itemclick: 'onHeaderItemClick'
    }
});