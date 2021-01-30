Ext.define('DDO.view.feeds.FeedsViewController', {
    extend: 'DDO.view.feeds.FeedsController',
    alias: 'controller.feedsviewcontroller',

    requires: [
        'DDO.view.feeds.comments.FeedComments'
    ],

    onFeedViewRender: function(feeddataview, event) {
        var me = this,
            feedview = me.lookupReference("feedsdataview");

        Ext.Viewport.setActiveItem({xtype: 'loadingmask'});

        feedview.refresh();

        if (!feedview.getStore().isLoaded()) {            
            feedview.getStore().load({
                scope: this,
                callback: function(records, operation, success) {
                    Ext.Viewport.setActiveItem(0);
                }
            });
        } else {
            Ext.Viewport.setActiveItem(0);
        }
    },

    onShareTypeTap: function(view, evt, opts) {
        var me = this,
            viewModel = me.getViewModel(),
            value = view.test;

        viewModel.set("postType", value);

        this.onPostButtonTap(view, evt);
    },

    onFeedItemTap: function(view, idx, item, record, evt, opts) {
        var me = this,
            targetDom = evt.getTarget(),
            targetEl = Ext.get(targetDom);

        if (targetEl.hasCls('comments-like')) {
            me.onCommentLikeTap(view, record, targetEl);
        } else if (targetEl.hasCls('like-cls') || targetEl.hasCls('like-heart-animation')) {
            me.onFeedLikeTap(view, record, targetEl);
        } else if (targetEl.hasCls('comment-cls') || targetEl.hasCls('fa-commenting')) {
            me.onCommentsTap(view, record, targetEl);
        }else if (targetEl.hasCls('uname-cls')) {
            me.onUserNameTap(view, record, targetEl);
        }
    },
    
    onUserNameTap:function(view, record, targetEl){
        var empId = record.data.user.employee_code,
            profile = Ext.ComponentQuery.query('userprofile')[0],
            headerTitle = Ext.ComponentQuery.query('#headertitle')[0],
            mainViewPort = Ext.ComponentQuery.query('mainviewport')[0],
            loginStore = Ext.getStore('login'),
            loginData = loginStore.getData().items[0].data,
            detailButton, timelineButton, detailstimeline;

        Ext.Viewport.setActiveItem(1);

        detailButton = Ext.ComponentQuery.query('#detailedview')[0];
        detailButton.setDisabled(false);

        detailButton.addCls('ddo-mobile-detailedbutton.x-item-disabled x-item-disabled');

        timelineButton = Ext.ComponentQuery.query('#timelineview')[0];
        timelineButton.setDisabled(false);
        timelineButton.removeCls('ddo-mobile-timelinebutton.x-item-disabled x-item-disabled');

        detailstimeline = Ext.ComponentQuery.query('#detailstimeline')[0];
        detailstimeline.setActiveItem(0);

        headerTitle.setText("Profile");

        mainViewPort.getViewModel().set('profileBtnMobileVisible', true);
        mainViewPort.getViewModel().set('headerTitleCls', 'headerTitleCls');

        Utility.fireOn(profile, 'loadprofiledata', empId);
    
    },
    onFeedLikeTap: function(view, record, targetEl) {
        var me = this,
            viewModel = me.getViewModel(),
            likedUsers = record.get("post_like_users") || [],
            loginStore = Ext.getStore("login"),
            userRecord = loginStore.getAt(0),
            userId = userRecord && userRecord.get("user_id"),
            likedUser = Ext.Array.findBy(likedUsers, function(o) {
                return o.like_user_id == userId;
            });

        if (me.isFeedLikeLoading) {
            return;
        }

        me.isFeedLikeLoading = true;
        Utility.likeImgAnim = true;

        var config = {
            url: likedUser ? "/feed/unlike" : "/feed/like",
            method: "POST",
            params: {
                post_id: record.get("post_id")
            }
        }

        var successCallback = function(data) {
            record.set("post_like_count", data.post_like_count || 0);
            record.set("post_like_users", data.post_like_users || []);

            if (targetEl.hasCls('red-color')) { //Adding/Removing Cls
                targetEl.removeCls('red-color');
            } else {
                targetEl.addCls('red-color');
            }

        }

        var failureCallback = function() {
            Ext.toast('Unable to like the feed.');
        }

        var callback = function() {
            me.isFeedLikeLoading = false;
        }

        Utility.fireAjax(config, successCallback, failureCallback, callback);

    },
    onCommentsTap: function(view, record, targetEl) {
        var view = Ext.create('DDO.view.feeds.comments.FeedComments');

        if (!view.getParent()) {
            this.getView().add(view);
        }

        mainviewtoolbar = Ext.ComponentQuery.query('#mainvieporttoolbar')[0];

        this.getViewModel().set('feeditem', record);

        view.down('label').setData(record.data);
        view.down('list').setData(record.data.comments);

        mainviewtoolbar.hide();

        view.show();
    },

    onCommentLikeTap: function(view, record, targetEl) {
        var me = this,
            viewModel = me.getViewModel(),
            likedUsers = record.get("comment_like_users") || [],
            loginStore = Ext.getStore("login"),
            userRecord = loginStore.getAt(0),
            userId = userRecord && userRecord.get("user_id"),
            likedUser = Ext.Array.findBy(likedUsers, function(o) {
                return o.like_user_id == userId;
            }),
            feeditem = me.getViewModel().get('feeditem'),
            comment_like_users = record.get("comment_like_users");

        if (me.isFeedLikeLoading) {
            return;
        }

        me.isFeedLikeLoading = true;

        var config = {
            // Write config for commentLike request
            url: likedUser ? "/feed/unlike" : "/feed/like",
            method: "POST",
            params: {
                post_id: feeditem.get("post_id"),
                comment_id: record.get("comment_id")
            }
        }

        var successCallback = function(data) {
            /*Assuming data gives me back full feed(/post) record*/
            feeditem.set("comment_count", data.comment_count || 0);
            feeditem.set("comments", data.comments || []);
            if (targetEl.hasCls('red-color')) { //Adding/Removing Cls
                targetEl.removeCls('red-color');
                record.set("comment_like_count", record.get("comment_like_count") - 1 || 0);
                /*
                    Find user record in comment_like_users and remove it
                */
            } else {
                targetEl.addCls('red-color');
                record.set("comment_like_count", record.get("comment_like_count") + 1 || 0);
                record.set("comment_like_users", Ext.Array.clone(comment_like_users.push(Ext.clone(userRecord.data))) || []);
            }
        }

        var failureCallback = function() {
            Ext.toast('Unable to like the comment.');
        }

        var callback = function() {
            me.isFeedLikeLoading = false;
        }

        Utility.fireAjax(config, successCallback, failureCallback, callback);
    },

    onSendCommentsClick: function(ele, target, eOpts) {
        var me = this,
            targetEl = Ext.get(target),
            commentValue,
            commentBox = this.lookupReference('commentBox'),
            record = me.getViewModel().get('feeditem');

        if (targetEl.hasCls('footer-send-icon') && !Ext.isEmpty(commentBox) && !Ext.isEmpty(commentBox.getValue())) {
            commentValue = commentBox.getValue();

            var config = {
                url: "/feed/comment/create",
                method: "POST",
                params: {
                    post_id: record.get("post_id"),
                    comment_content: commentValue
                }
            }

            var successCallback = function(data) {
                var comments = record.get("comments");
                comments.push(data);
                record.set("comments", Ext.Array.clone(comments));
                commentBox.setValue('');
                me.lookupReference('commentsList').setData(record.data.comments);
            }

            var failureCallback = function() {
                Ext.toast('Unable to add a comment. Please try again later.');
            }

            Utility.fireAjax(config, successCallback, failureCallback);
        } else {
            return false;
        }
    },

    onCommentsChange: function(field, newValue, oldValue, eOpts) {
        if (!Ext.isEmpty(newValue) && Ext.isEmpty(field.getHtml())) {
            field.setHtml('<img class="footer-send-icon" src="' + DDO.util.Constants.BASE_FEED_IMAGE_PATH + 'push_Comment.png" alt="Send Comment"/>');
        } else if (Ext.isEmpty(newValue)) {
            field.setHtml('');
        }
    },
    onPostButtonTap: function(btn, evt) {
        var me = this,
            viewModel = me.getViewModel(),
            feedsDataView = me.lookupReference("feedsdataview");

        if (viewModel.get("postContent")) {
            if (viewModel.get("postContent").trim().length) {
                btn.setDisabled(true);

                var config = {
                    url: "/feed/create",
                    method: "POST",
                    params: {
                        post_content: viewModel.get("postContent"),
                        post_type: viewModel.get("postType")
                    }
                }

                var successCallback = function(data) {
                    feedsDataView.getStore().add([data]);
                    viewModel.set("postContent", "");
                }

                var failureCallback = function() {
                    Ext.toast({
                        html: 'Unable to create a feed. Please try again later.',
                        width: 400,
                        align: 't'
                    });
                }

                var callback = function() {
                    btn.setDisabled(false);
                }

                Utility.fireAjax(config, successCallback, failureCallback, callback);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
});