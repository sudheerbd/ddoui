Ext.define('DDO.view.feeds.comments.FeedComments', {
    extend: 'Ext.Panel',
    xtype: 'feedcomments',

    requires: ['Ext.Toolbar'],
    viewModel: {
        data: {}
    },

    config: {
        modal: true,
        centered: false,
        hideOnMaskTap: true,
        fullscreen: true,
        top: '-15px',
        bottom: '-14px',
        right: '0',
        left: '0',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        cls: 'feedcomments-container-cls',
        style: 'border:2px solid red !important',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            cls: 'feedcommentstoolbar-cls',
            items: [{
                xtype: 'label',
                tpl: ['<tpl for="."><i class="x-fa fa-heart like-icon-red {[this.isUserLiked(values.post_like_count)]}"></i>',
                    '<tpl if="values.post_like_count!=0">',
                    '{post_like_count} ',
                    '</tpl>',
                    '{[this.getLikeLabel(values.post_like_count)]}</tpl>', {
                        getLikeLabel: function(count) {
                            if (count > 1) {
                                return 'Likes';
                            } else {
                                return 'Like';
                            }
                        },
                        isUserLiked: function(count) {
                            if (count > 0) {
                                return 'red-color';
                            } else {
                                return '';
                            }
                        }
                    }
                ]
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                icon: 'resources/images/feeds/commentback.png',
                cls: 'ddo-comments-backbtn',
                listeners: {
                    tap: function() {
                        var mainviewtoolbar = Ext.ComponentQuery.query('#mainvieporttoolbar')[0];
                        var comment = this.up('panel');
                        comment.hide();
                        mainviewtoolbar.show();
                    }
                }
            }]
        }, {
            xtype: 'list',
            height: '100%',
            reference: 'commentsList',
            cls: 'feedcomments-cls',
            emptyText: '<span class="comment-emptytext-cls"><i class="x-fa fa-commenting"></i> Be the first to comment this</span>',
            // listeners: {
            //     itemtap: 'onFeedItemTap'
            // },
            bind: {
                selection: '{commentitem}'
            },
            itemTpl: [
                '<tpl for=".">',
                '<div class="header-content-cls">',

                '<table class="head-comment-header">',
                '<tr>',
                '<td>',
                '<img class="comments-profilepic-cls" src="{[this.getUserImg(values.user.user_emilid)]}" alt="user face"/>',
                '</td>',
                '<td class="comment-username-cls">',
                '<table>',
                '<tr>',
                '<td class="modern-subcomment-post">',
                '{user.user_full_name}',
                '</br>',
                '<span class="header-designation-cls">{[this.getCommentContent(values.comment_content)]}</span>',
                '</td>',
                // '<td class="modern-subcomments-time-cls">',
                // '<span class="{[this.getClockIcon(values.comment_date)]}"></span>',
                // '<span class="modern-subcomments-from-now">&nbsp;{[this.getTime(values.comment_date)]}</span>',
                // '<span>&nbsp;</span>',
                // '</td>',
                '</tr>',
                '<tr>',
                '<td>',
                '<div class="header-designation-cls" style="font-size: 12px;">',
                // '<i class="comments-like x-fa fa-heart like-icon-red {[this.isUserLiked(values)]}"></i>',
                // '<span class="like-cls">Likes</span>',
                '</div>',
                '</td>',
                '</tr>',
                '</table>',
                '</td>',
                '</tr>',
                '</table>',
                '</div>',
                '</tpl>', {
                    getCommentContent: function(comment_content) {
                        comment_content = comment_content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        comment_content = comment_content.replace(/ /g, '&nbsp;');
                        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                        comment_content = comment_content.replace(urlRegex, function(url) {
                            return '<a href="' + url + '"  target="_blank">' + url + '</a>';
                        });
                        return comment_content;
                    },
                    isUserLiked: function(comments) {
                        var likedUsers = comments.comment_like_users || [],
                            loginStore = Ext.getStore("login"),
                            userRecord = loginStore.getAt(0),
                            userId = userRecord && userRecord.get("user_id"),
                            likedUser = Ext.Array.findBy(likedUsers, function(o) {
                                return o.like_user_id == userId;
                            });
                        return likedUser ? 'red-color' : '';
                    },
                    getUserImg: function(emailId) {
                        return Utility.gravatarImageUrl(emailId);
                    },
                    getClockIcon: function(values) {
                        var one_day = 1000 * 60 * 60 * 24,
                            postGmt = new Date(values),
                            postTimeMiliseconds = postGmt.getTime(),
                            //var postTime=postTimeMiliseconds-19800000;//+5:30 GMT
                            currentDate = new Date(),
                            currentTimeMiliseconds = currentDate.getTime(),
                            difference_ms = currentTimeMiliseconds - postTimeMiliseconds;
                        days = Math.round(difference_ms / one_day);
                        if (difference_ms < 60000) {
                            return '';
                        } else {
                            return 'x-fa fa-clock-o subcomments-from-now';
                        }
                    },
                    getTime: function(postDate) {
                        var one_day = 1000 * 60 * 60 * 24,
                            postGmt = new Date(postDate),
                            postTimeMiliseconds = postGmt.getTime(),
                            //var postTime=postTimeMiliseconds-19800000;//+5:30 GMT
                            currentDate = new Date(),
                            currentTimeMiliseconds = currentDate.getTime(),
                            difference_ms = currentTimeMiliseconds - postTimeMiliseconds,
                            days = Math.round(difference_ms / one_day),
                            minuteDifference, hoursDifference, minute, hours, days;
                        if (difference_ms < 60000) {
                            return 'Now';
                        } else if (difference_ms < 3600000) {
                            minuteDifference = (difference_ms / (60 * 1000));
                            minute = Math.floor(minuteDifference);
                            return minute + 'm';
                        } else if (difference_ms < 86400000 && difference_ms > 3600000 && days < 1) {
                            hoursDifference = (difference_ms / (60 * 60 * 1000));
                            hours = Math.floor(hoursDifference);
                            return hours + 'h';
                        } else {
                            return days + 'd';

                        }
                    }
                }
            ]
        }, {
            xtype: 'toolbar',
            docked: 'bottom',
            cls: 'feedcommentstoolbar-cls',
            items: [{
                xtype: 'textareafield',
                clearIcon: false,
                width: '100%',
                reference: 'commentBox',
                docked: 'bottom',
                cls: 'comment-input-cls',
                placeHolder: 'Write a comment...',
                listeners: {
                    painted: function() {
                        /*mousedown === touchstart*/
                        this.el.on('touchstart', this.up('feedsview').getController().onSendCommentsClick, this.up('feedsview').getController());
                    },
                    change: 'onCommentsChange'
                }
            }]
        }]
    },

    hide: function(modal) {
        var mainviewtoolbar = Ext.ComponentQuery.query('#mainvieporttoolbar')[0];
        this.destroy();
        mainviewtoolbar.show();
    }
});
