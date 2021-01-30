/**
 * This view is responsible for displaying all feed's like activities and it's related operations.
 * @class 'DDO.view.feeds.likes.FeedsLikeWindow'
 * @extends 'Ext.view.View'
 * @alias 'feedslikeusersdataview'
 * @ViewModel 'DDO.view.feeds.likes.FeedsLikeWindowViewModel'
 * @Controller 'DDO.view.feeds.likes.FeedsLikeWindowController'
 */
Ext.define('DDO.view.feeds.likes.FeedsLikeUsersDataView', {
    extend: 'Ext.view.View',

    xtype: 'feedslikeusersdataview',

    store: 'userlikesstore',

    cls: 'main-container',

    emptyText: LabelsTitles.HOME.FEEDS.NOLIKE,

    autoHeight: true,
    loadMask: false,

    tpl: [
        '<div class="scoreViewData-cls noscrollbar">',
            '<tpl for=".">',
                '<div style="margin: 10px;" class="scoreView-cls">',
                '<img class="profileImage-cls" src="{[this.getProfileImg(values)]}" onerror='+Utility.defaultUserImg+'>',
                    '<div class="scorerName-cls ddo-karma-item"',
                    '{[this.validEllipsesQtip(values.user_full_name, 16)]}',
                    '>{[this.getEllipseText(values.user_full_name, 35)]}</div>',
                    '{[this.getLikeImage(values)]}<br />',
                    '<div class="profession-cls" ',
                    '{[this.validEllipsesQtip(values.user_designation, 35)]}',
                    '>{[this.getEllipseText(values.user_designation, 35)]}</div>',
                '</div>',
            '</tpl>',
        '</div>', {
            getLikeImage: function(values) {
                var view = Ext.ComponentQuery.query('feedslikewindow')[0],
                    VM = view.getViewModel(),
                    likeIconsVisible = VM.get('likeIconsVisible');
                if (!likeIconsVisible) {
                    return ""
                } else {
                    var likesStore = Ext.getStore('feeds.likes.LikesStore'),
                        likeRecord;

                    likeRecord = likesStore.findRecord('value', values.like_value);


                    return '<span class="score-cls"><img  src="' + likeRecord.get('imgsrc') + '" height="35px" alt="user face"/></span>'
                }

            },
            getEllipseText: function(string, limit) {
                return Ext.String.ellipsis(string, limit);
            },
            getProfileImg: function(values) {
                return Utility.imageCheck(values.user_profile_pic_url);
            },
            validEllipsesQtip: function(value, limit) {
                if (value) {
                    var qtip = " data-qtip='" + value + "'";
                    return (value.length > limit) ? qtip : '';
                } else {
                    return '';
                }
            }
        }
    ],

    itemSelector: '.scoreViewData-cls'
});