Ext.define('DDO.view.feeds.components.FeedsDataItemController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedsdataitemcontroller',
    
    onLikeClick: function () {
        var record = this.getViewModel().get('record');
        //if (record.post_type == "idea") {
        var feedsLikeWindow = Ext.ComponentQuery.query('feedslikewindow')[0] ||
                Ext.create('DDO.view.feeds.likes.FeedsLikeWindow', {}),
                userLikeStore = Ext.getStore('userlikesstore'),
                userLikesCountData = [];
                feedsLikeWindow.removeAll();
                feedsLikeWindow.add({
                    xtype: 'feedslikedataview',
                            margin: '10 20 10 20'
                        },
                        {
                            xtype: 'feedslikeusersdataview'
                        });
        Ext.getStore('feeds.likes.LikesStore').load({
            callback: function (records, operation, success) {
                if (success) {
                    record.post_like_users.forEach(function (rec) {
                        userLikesCountData.push({
                            like_value: rec.like_value
                        });
                    });

                    userLikeStore.setData(record.post_like_users);

                    var feedsLikeWindowViewModel = feedsLikeWindow.getViewModel(),
                            headerDataView = feedsLikeWindow.down('feedslikedataview'),
                            MainDataView = feedsLikeWindow.down('feedslikeusersdataview');

                    feedsLikeWindowViewModel.set('likeIconsVisible', true);
                    feedsLikeWindowViewModel.set('userLikesCountData', userLikesCountData);
                    headerDataView.getStore().reload();
                    headerDataView.refresh();
                    MainDataView.getStore().clearFilter(true);
                    MainDataView.refresh();

                    if (myMask) {
                        myMask.hide();
                    }

                } else {
                    if (myMask) {
                        myMask.hide();
                    }
                }
            }
        });
        feedsLikeWindow.show();

        var myMask = new Ext.LoadMask({
            msg: 'Please wait...',
            target: feedsLikeWindow
        });

        myMask.show();
    },
    
    onFeedLikeClick: function (record, likedIconValue, status) {
        var hasFollowers;
        if(!Ext.isEmpty(record.followers)){
            hasFollowers = true;
        }else{
            hasFollowers = true;
        }
        var record = this.getViewModel().get('record'),
                me = this,
                config = {
                    url: status == "New" ? "/feedpostlike" : "/feedpostlike/updateemotionlike",
                    method: "POST",
                    params: {
                        post_id: record.post_id,
                        like_value: likedIconValue,
                        followed : hasFollowers
                    }
                };
        if (me.isFeedLikeLoading) {
            return;
        }
        me.isFeedLikeLoading = true;
        var successCallback = function (data) {
            me.getView().updateLikeContent(data);
        }
        var failureCallback = function () {
            Utility.toastReuseFn('t', AlertMessages.unableLikeFeed);
        }
        var callback = function () {
            me.isFeedLikeLoading = false;
        }
        Utility.fireAjax(config, successCallback, failureCallback, callback);
    },
    
    onCommentIconClick: function () {

        var view = this.getView();
        var newComment = view.down("newcomment");
        newComment.inputElement.focus();
    },
    
    onSendCommentsClick: function (view, record, itemDom, idx, evt, opts) {
        Utility.likeImgAnim = false;
        var record = this.getViewModel().get('record'),
        hasFollowers;
        if(!Ext.isEmpty(record.followers)){
            hasFollowers= true;
        }else{
            hasFollowers=false;
        }
        var me = this,
                feedsView = this.getView(),
                commentTextEl = feedsView.down("newcomment").inputElement;

        if (commentTextEl) {
            var commentValue = commentTextEl.getValue();
            Utility.menuform = true;
            if (commentValue.trim().length && commentTextEl.hasCls("updated-comment")) {

                Utility.commentsData.comment_content = commentValue;
                var config = {
                    url: "/feedcomment/comment/update",
                    method: "POST",
                    params: Utility.commentsData
                },
                successCallback = function (data) {

                },
                        failureCallback = function () {
                            Utility.toastReuseFn('t', AlertMessages.unableUpdateComment);
                        }
                Utility.fireAjax(config, successCallback, failureCallback);
            } else if (commentValue.trim().length) {
                var config = {
                    url: "/feedcomment/comment/create",
                    method: "POST",
                    params: {
                        post_id: record.post_id,
                        post_content: record.post_content,
                        comment_content: commentValue,
                        followed : hasFollowers
                    }
                };
                var successCallback = function (data) {

                    var viewModel = feedsView.getViewModel();
                    var record = viewModel.get('record');
                    var comments = record.comments;
                    comments.push(data.comments);
                    commentTextEl.dom.value = '';
                    viewModel.set('record.comments', data.comments);
                    viewModel.set('commentsCount', data.comments.length);
                    feedsView.updateCommentContent(data.comments);
                    var existingCommentcollection = viewModel.getView().down('existingCommentcollection')
                    existingCommentcollection.setHidden(false);
                    existingCommentcollection.up().down('container[name = likeAndComment]').setStyle('border-bottom','0.3px solid #EEE');
                };

                var failureCallback = function () {
                    Utility.toastReuseFn('t', AlertMessages.unableAddComment);
                };
                Utility.fireAjax(config, successCallback, failureCallback);
            } else {
                return false;
            }

        }
    },
    
    attachedImagesFullView: function () {
        var carouselStore = Ext.getStore('Carousel'),
                imgPath, data = [];

        var record = this.getViewModel().get('record');
        if (carouselStore.getCount() > 0) {
            carouselStore.removeAll();
        }
        imgPath = record.post_attachments;

        for (var i in imgPath) {
            carouselStore.add({
                src: imgPath[i].attachments_path
            });
            data.push({
                src: imgPath[i].attachments_path
            });
        }
        Ext.widget('feedsindividualimages', {
            carouselData: data,
            carouselStore: carouselStore
        });

    },
    
    onLikeIconsClick: function (reactionPoints, record) {
        var me = this,
                login = Ext.getStore('login'),
                loginData = login.getData().items[0].data,
                validUser, validLikeUser;

        validUser = function (record, loginData) {
            var likedUsers = record.post_like_users;

            for (var i = 0; i < likedUsers.length; i++) {
                if (likedUsers[i].like_user_id == loginData.ddo_employee_id) {
                    return true;
                }
            }
        };

        validLikeUser = validUser(record, loginData);

        if (!(record.post_author == loginData.ddo_employee_id) && !validLikeUser) {
            var likedIconValue = parseInt(reactionPoints),
                    successCallback = function (data) {
                        var scb = function (data) {
                            if (data) {
                                me.getView().updateLikeContent(data);
                            }
                        };

                        var fcb = function (data) {
                        };

                        var config = {
                            scope: me,
                            url: "/feedpostlike",
                            method: 'POST',
                            params: {
                                ddo_posts_id: record.post_id,
                                like_value: likedIconValue
                            }
                        };

                        Utility.fireAjax(config, scb, fcb, callback);
                    },
                    failureCallback = function (data) {
                    },
                    callback = function () {
                    },
                    nominateParams = {};

            nominateParams.points = reactionPoints;
            nominateParams.karmaId = 0;
            nominateParams.karmaCategoryId = 0;
            nominateParams.karmaRatingId = 0;
            nominateParams.likePostCbpId = record.user.c_bpartner_id;

            Utility.nominateProcess(this, nominateParams, null, null, true, successCallback, failureCallback);
        } else {
            this.onFeedLikeClick(record, reactionPoints, 'Existed');
        }
    },
    
    onlikeAnimClick: function (likedIconValue) {
        var me = this,
                login = Ext.getStore('login'),
                viewModel = this.getViewModel(),
                loginData = login.getData().items[0].data,
                record = this.getViewModel().get('record'),
                likedUsers = record.post_like_users,
                proceedLikeClick = true,
                nominateParams,
                status;

        Utility.likeImgAnim = true;

        if (record.post_author == loginData.ddo_employee_id) {
            proceedLikeClick = false;
            //If post is standard and not ideate
            if (record.post_type == 'standard') {
                var validUser = function (record, loginData) {
                    var likedUsers = record.post_like_users;

                    for (var i = 0; i < likedUsers.length; i++) {
                        if (likedUsers[i].like_user_id == loginData.ddo_employee_id) {
                            return "Existed";
                        }
                    }
                };

                status = validUser(record, loginData) || "New";

                this.onFeedLikeClick(record, likedIconValue, status);
            }
        } else if (record.post_type == 'idea') {
            this.onLikeIconsClick(likedIconValue, record);
            proceedLikeClick = false;
        } else {
            status = 'New';
            for (var i = 0; i < likedUsers.length; i++) {
                if (likedUsers[i].like_user_id == loginData.ddo_employee_id) {
                    status = 'Existed';
                    if (likedIconValue) {
                        if (likedUsers[i].like_value == likedIconValue) {
                            proceedLikeClick = false;
                        }
                    }
                }
            }
        }
        if (proceedLikeClick) {
            this.onFeedLikeClick(record, likedIconValue, status);
        }
    },
    
    onClickPostEditIcon: function (evt) {
        var record = this.getViewModel().get('record'),
                menu = Ext.widget('feedsmenuimage', {
                    item: this.getView(),
                    operation: 'posts',
                    record: record
                });
        evt.getXY()[0] = evt.getXY()[0] -0;
        evt.getXY()[1] = evt.getXY()[1] - 16;
        menu.showAt(evt.getXY());
    },
    
    onClickCommentEditIcon: function (evt, editView) {
        var record = this.getViewModel().get('record'),
                menu = Ext.widget('feedsmenuimage', {
                    item: this.getView(),
                    operation: 'comments',
                    comment: editView,
                    record: record
                });
        evt.getXY()[0] = evt.getXY()[0] -10;
        evt.getXY()[1] = evt.getXY()[1] - 16;
        menu.showAt(evt.getXY());
    },
    
    onTagMenuCommentsClick: function (evt) {
        var record = this.getViewModel().get('record');

        if (record.post_type === "idea") {

            if (record.tagged_group_details && record.tagged_group_details.length > 0) {

                var menu = Ext.create('DDO.view.feeds.FeedsTagMenuImage', {
                    operation: 'comments',
                    //item: item,
                    eventTarget: evt.target
                });

                evt.getXY()[0] = evt.getXY()[0] + 30;
                evt.getXY()[1] = evt.getXY()[1] - 16;

                var arr = record.tagged_group_details,
                        tagsData = [];

                arr.forEach(function (rec) {
                    tagsData.push({
                        id: rec
                    });
                });

                menu.down('tagsMenuView').setData(tagsData);
                menu.showAt(evt.getXY());

            }
        }
    },
    
    onShareBtnClick: function (reactionValue) {
        var me = this;
        Ext.getBody().mask('');

        var selectedShareLinkName = reactionValue,
                record = this.getViewModel().get('record'),
                postContent = record.post_content,
                postId = record.post_id,
                url = "http://ddo.walkingtree.in",
                shareLink;

        if (typeof (postContent) === "object") {
            postContent = postContent.post_content;
        }

        var urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                urllink = postContent.match(urlRegex);

        if (!Ext.isEmpty(urllink)) {
            url = urllink[0];
            if (!url.match(/http/)) {
                url = "http://" + url;
            } else {
                url = url;
            }
        }

        if (selectedShareLinkName === "Facebook") {
            this.shareFacebookCall(postContent, url, postId, selectedShareLinkName);
        } else if (selectedShareLinkName === "Twitter") {
            shareLink = 'http://twitter.com/home?status=' + encodeURIComponent(postContent);
            me.openShareLinkWindow(shareLink);
            this.addKarmaPointsForShare(me, postId, selectedShareLinkName, record);
        } else if (selectedShareLinkName === "LinkedIn") {
            shareLink = "https://www.linkedin.com/shareArticle?summary=" + postContent + "&mini=true&source=LinkedIn&title=My+Linkedinshare&url=" + url;
            me.openShareLinkWindow(shareLink);
            this.addKarmaPointsForShare(me, postId, selectedShareLinkName, record);
        } else {
            shareLink = "https://plus.google.com/share?url=" + url;
            me.openShareLinkWindow(shareLink);
            this.addKarmaPointsForShare(me, postId, selectedShareLinkName, record);
        }
    },
    
    openShareLinkWindow: function (shareLink) {
        return window.open(shareLink, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    },
    
    shareFacebookCall: function (postContent, url, postId, selectedShareLinkName) {
        var me = this;
        FB.ui({
            method: 'share',
            quote: postContent,
            href: url
        },
        // callback
        function (response) {
            if (response && !response.error_message) {
                me.addKarmaPointsForShare(me, postId, selectedShareLinkName, record);
                Ext.getBody().unmask();
            } else {
                Ext.getBody().unmask();
            }
        });
    },
    
    addKarmaPointsForShare: function (me, postId, selectedShareLinkName, rec) {
        var login = Ext.getStore('login'),
                loginData = login.getData().items[0].data;

        var nominateParams = {};

        nominateParams.points = Constants.points;
        nominateParams.karmaId = 0;
        nominateParams.karmaCategoryId = 0;
        nominateParams.karmaRatingId = 0;
        nominateParams.instantApprovalCbpid = true;
        nominateParams.postId = postId;
        nominateParams.activityName = selectedShareLinkName;

        if (me.isShareLoading) {
            Ext.getBody().unmask();
            return;
        }
        me.isShareLoading = true;
        Ext.getBody().mask('');
        /*need to remove after applying the nomination and uncomment the nominate call below*/
        // var config = {
        //     scope: this,
        //     url: '/feedshare',
        //     method: 'POST',
        //     timeout: 1000000,
        //     params: {
        //         post_id: parseInt(postId),
        //         shareType: selectedShareLinkName
        //     }
        // };

        // var scb = function (data) {

        //     var feedView = me.getView();
        //     feedView.updateShareDetails(data);
        //     var shareViewData = feedView.up('feedscontainergrid').getViewModel().get('ownerView').data;
        //     feedView.down('share').insertShareTagReactions(shareViewData);
        //     Ext.getStore('widget.karmascore.KarmaScore').load();
        //     Ext.getBody().unmask();
        // };

        // var fcb = function (data) {
        //     Ext.getBody().unmask();
        // };

        // Utility.fireAjax(config, scb, fcb, callback);

        var successCallback = function (data) {
            var config = {
                scope: this,
                url: '/feedshare',
                method: 'POST',
                timeout: 1000000,
                params: {
                    post_id: parseInt(postId),
                    shareType: selectedShareLinkName
                }
            };

            var scb = function (data) {

                var feedView = me.getView();
                feedView.updateShareDetails(data);
                var shareViewData = feedView.up('feedscontainergrid').getViewModel().get('ownerView').data;
                feedView.down('share').insertShareTagReactions(shareViewData);
                var karmaScoreStore=Ext.getStore('widget.karmascore.KarmaScore') || Ext.getStore('scoredetails');
                karmaScoreStore.load();
                Ext.getBody().unmask();
            };

            var fcb = function (data) {
                Ext.getBody().unmask();
            };

            Utility.fireAjax(config, scb, fcb, callback);
        };

        var failureCallback = function () {
            Ext.getBody().unmask();
        };

        var callback = function () {
            me.isShareLoading = false;
        };
        if (rec.post_author !== loginData.cbpid) {
            Utility.nominateProcess(this, nominateParams, null, null, true, successCallback, failureCallback);
        } else {
            Ext.getBody().unmask();
        }
    },
    onComentTextClick: function () {
        var feedDataItem = this.getView(),
            existingCommentcollection = feedDataItem.down('existingCommentcollection');
        if(existingCommentcollection){
            var hiddenComments =  existingCommentcollection.hidden;
            if(hiddenComments){
                existingCommentcollection.setHidden(false);
                if(existingCommentcollection.items.items.length>1){
                    existingCommentcollection.up().down('container[name = likeAndComment]').setStyle('border-bottom','0.3px solid #EEE');
                    existingCommentcollection.updateLayout();
                    }
            }else{
                existingCommentcollection.setHidden(true);
                existingCommentcollection.up().down('container[name = likeAndComment]').setStyle('border-bottom','0');
            }
        }
    },


    onNewFollowClick:function(text){
        var me = this,
        text = me.getView().down('follow').text,

                login = Ext.getStore('login'),
                loginData = login.getData().items[0].data,
                loginID = loginData.ddo_employee_id,
                record = this.getViewModel().get('record'),
                postID = record.post_id;
                var gridView = this.getView().up('grid');

                params = {
                    postID:postID
                };

                 if(text == 'Follow'){
                     var config={
                          method:'POST',
                          url:Api.URL.feedfollow.CREATE
                     };
                    me.sendAjaxRequest(me,config,gridView);
                 }else if(text == 'Unfollow'){
                    var config={
                        method:'DELETE',
                        url:Api.URL.feedfollow.DELETE
                   };
                   me.sendAjaxRequest(me,config,gridView);
                 }
            },

            sendAjaxRequest:function(me,config,gridView){
                Ext.Ajax.request({
                    url: config.url,
                    method: config.method,
                    scope: me,
                    params: params,
                    success: function(response) {
                        var data = Ext.decode(response.responseText);
                        me.getView().updateFollowers(data);
                        // let scrollPosition = gridView.getEl().down('.x-grid-view').getScroll();
                        // gridView.getStore().reload();
                        // gridView.getEl().down('.x-grid-view').scrollTo(scrollPosition);
                    },
                    failure: function(data) {
                        Ext.Msg.alert('Status', 'row not inserted');
                    }
                });
            }
});