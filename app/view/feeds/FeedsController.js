/**
 * This is controller for view 'DDO.view.feeds.FeedsView'.
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.feedscontroller'
 */
var bt = null;
Ext.define('DDO.view.feeds.FeedsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedscontroller',
    requires: ["DDO.util.Utility", 
    //"DDO.util.Socket"
],
    listen: {
        controller: {
            '*': {
                loadfeedscrolldata: 'onLoadFeedScrollData'
            }
        },
        global: {
            tagsSelectRedirectEvent: 'onTagsSelect',
            tagsDeSelectRedirectEvent: 'onTagsDeSelect'
        }

    },


    init: function() {
        var me = this;
        // Socket.on({
        //     newfeed: me.onNewFeedNotification,
        //     newcomment: me.onNewCommentNotification,
        //     feedliked: me.onNewFeedLiked,
        //     feedunliked: me.onNewFeedLiked,
        //     scope: me
        // });
    },

    //Empty function
    onLikeClick: function() {},

    /**
     * this handler will be responsible for performing new feed notification operation
     * @param {Object} post, contains reference of post view scope.
     */
    onNewFeedNotification: function(post) {
        try {
            var me = this,
                viewModel = me.getViewModel(),
                feedsDataView = me.lookupReference("feedsdataview"),
                feedsStore = feedsDataView.getStore(),
                post_id = post.post_id,
                postRecord = feedsStore.findRecord("post_id", post_id),
                values = post,
                loginStore = Ext.getStore("login"),
                userRecord = loginStore.getAt(0),
                notificationShow = false;
        
            if (post && (post.user.clientid == userRecord.data.ddo_client_id) && (post.user.ddo_org_id == userRecord.data.ddo_org_id)) {
                if (!postRecord) {
                me.addNewNotificationFeed(post);
            }
                if (!(post.user.c_bpartner_id == userRecord.data.ddo_employee_id)) {
                    if (values.post_tagged_users_list && values.post_tagged_users_list.length > 0) {
                        if (!(values.post_tagged_users_list.indexOf(userRecord.data.ddo_employee_id) == -1)) {
                            notificationShow = true;

                        } else {
                            notificationShow = false;
                        }
                    } else {
                        notificationShow = true;
                    }
                }
            }
            if (notificationShow) {
                var NotificationParams = {
                    username: post.user.user_full_name,
                    message: post.post_content,
                    feedsView: feedsDataView,
                    postId: post_id,
                    userpic: Utility.gravatarImageUrl(post.user.user_emilid),
                    type: "post"
                }
                Utility.notificationAlert(NotificationParams);
            }
        } catch (err) {
            Utility.showToast(Messages.HOME.NEWFEEDNOTIFICATION, err);
        }
    },

    /**
     * this handler will be responsible for performing new commnet notification operation
     * @param {Object} data, contains reference of new post data.
     */
    onNewCommentNotification: function(data) {
        try {
            var me = this,
                viewModel = me.getViewModel(),
                feedsDataView = me.lookupReference("feedsdataview"),
                feedsStore = feedsDataView.getStore(),
                post_id = data.post_id,
                comment = data.comment || {},
                postRecord = feedsStore.findRecord("post_id", post_id),
                loginStore = Ext.getStore("login"),
                userRecord = loginStore.getAt(0),
                notificationShow = false;

            if (postRecord && (postRecord.getData().user.clientid == userRecord.data.ddo_client_id) && (postRecord.getData().user.ddo_org_id == userRecord.data.ddo_org_id)) {
            if (postRecord) {
                var comments = postRecord.get("comments") || [],
                    hasComment, values;

                values = postRecord.data;
                hasComment = Ext.Array.findBy(comments, function(o) {
                    return o.comment_id == comment.comment_id;
                });

                if (!hasComment) {
                    comments.push(comment);
                    postRecord.set("comments", Ext.Array.clone(comments));
                    //Update Comments to the Widget
                    var widgetColumn = feedsDataView.down('widgetcolumn');
                    widgetColumn.getWidget(postRecord).updateCommentContent(comments, true);
                }
            }
                if (!(data.comment.comment_author == userRecord.data.ddo_employee_id)) {
                    if (values.post_tagged_users_list && values.post_tagged_users_list.length > 0) {
                        if (!(values.post_tagged_users_list.indexOf(userRecord.data.ddo_employee_id) == -1)) {
                            notificationShow = true;

                        } else {

                            notificationShow = false;
                        }

                    } else {
                        notificationShow = true;
                    }
                }
            }
            if (notificationShow) {
                var NotificationParams = {
                    username: data.comment.user_full_name,
                    message: data.post_title,
                    postId: post_id,
                    feedsView: feedsDataView,
                    userpic: Utility.gravatarImageUrl(data.comment.user_emilid),
                    type: "comment"
                }
                Utility.notificationAlert(NotificationParams);
            }
        } catch (err) {
            Utility.showToast(Messages.HOME.NEWCOMMENTNOTIFICATION, err);
        }
    },

    /**
     * this handler will be responsible for adding loading indicatior operation
     * @param {string} direction, contains string value for direction.
     */
    addLoadingIndicator: function(direction) {
        var me = this,
            feedsDataView = me.lookupReference("feedsdataview"),
            feedsStore = feedsDataView.getStore(),
            record;

        me.removeLoadingIndicator();
        if (direction === "top") {
            feedsStore.add([{
                post_type: "progressloader",
                post_id: Number.MAX_VALUE
            }]);
        } else {
            feedsStore.add([{
                post_type: "progressloader",
                post_id: -1
            }]);
        }
    },

    /**
     * this handler will be responsible for remove loading indicatior operation
     */
    removeLoadingIndicator: function() {
        var me = this,
            feedsDataView = me.lookupReference("feedsdataview"),
            feedsStore = feedsDataView.getStore(),
            record;

        record = feedsStore.findRecord("post_type", "progressloader");

        if (record) {
            feedsStore.remove(record);
        }
    },

    /**
     * this handler will be responsible for loading feed data while scrolling.
     */
    onLoadFeedScrollData: function() {
        try {
            var filterParms = {},
                me = this;
            if (Object.keys(Utility.filterObj).length) {
                filterParms = Utility.filterObj;
                me.isfeedsfilter = true;
            } else {
                me.isfeedsfilter = false;
            }
            var viewModel = me.getViewModel(),
                feedsDataView = me.lookupReference("feedsdataview"),
                feedsStore = feedsDataView.getStore(),
                start;
            start = Utility.feedsStartValue + 10;
            if (me.isFeedLoading || (me.isfeedsfilter === true && me.hasOlderFeeds === false)) {
                return;
            }
            me.isFeedLoading = true;
            if(Ext.Object.isEmpty(filterParms)) {
                filterParms.postType = viewModel.get('postType');
                filterParms.filter = true
            }
            if (location.hash.split('#')[1] == 'home' && Utility.isFeedScrollLoad) {
                me.addLoadingIndicator("top");
                Utility.isFeedScrollLoad = false;
                Utility.feedsStartValue = start;
                feedsStore.read({
                    addRecords: true,
                    start: start,
                    limit: 10,
                    // params: {
                    //     maxPostId: feedsStore.min("post_id") || -1
                    // },
                    params: filterParms,
                    callback: function(records, operation, success) {
                        //To fetch the meta url data and set to the feed posts with start_url's block
                        Utility.metaUrlMap();
                        Utility.isFeedScrollLoad = true;

                        //Remove the loading indicator
                        me.removeLoadingIndicator();

                        //Check Whether we have any older feeds
                        if (success && records.length == 0) {
                            me.hasOlderFeeds = false;
                            me.isfeedsfilter = true;
                        }

                        //After 1000ms interval isFeedLoading will be enabled. 
                        setTimeout(function() {
                            me.isFeedLoading = false;
                        }, 1000);

                    }
                });
            }
        } catch (err) {
            Utility.showToast(Messages.HOME.LOADFEEDSCROLLDATA, err);
        }
    },

    /**
     * handler responsible for new notification for posts.
     * @param {Object} post, Feeds related content 
     */
    addNewNotificationFeed: function(post) {
        var me = this,
            viewModel = me.getViewModel(),
            feedsDataView = me.lookupReference("feedsdataview"),
            feedsStore = feedsDataView.getStore(),
            newFeeds;

        if (me.isFeedLoading) {
            return false;
        }
        me.isFeedLoading = true;

        setTimeout(function() {

            feedsStore.add([post]);
            me.isFeedLoading = false;
        }, 1000);
    },

    // onLoadNewFeedsData: function() {
    //     var me = this,
    //         viewModel = me.getViewModel(),
    //         feedsDataView = me.lookupReference("feedsdataview"),
    //         feedsStore = feedsDataView.getStore(),
    //         newFeeds;

    //     if (me.isFeedLoading) {
    //         return false;
    //     }
    //     me.isFeedLoading = true;

    //     newFeeds = viewModel.get("newFeeds");
    //     //Disabled loading indicator.
    //     me.addLoadingIndicator("top");

    //     setTimeout(function() {
    //         //Remove the loading indicator
    //         me.removeLoadingIndicator();

    //         feedsStore.add(newFeeds);
    //         me.isFeedLoading = false;
    //     }, 1000);
    // },

    // onNewFeedLiked: function(notification) {
    //     var me = this,
    //         feedsDataView = me.lookupReference("feedsdataview"),
    //         feedsStore = feedsDataView.getStore(),
    //         post_id = notification.post_id,
    //         record = feedsStore.findRecord("post_id", post_id);
    //     if (record) {
    //         var widgetColumn = feedsDataView.down('widgetcolumn');
    //         widgetColumn.getWidget(record).updateLikeContent(notification);
    //     }
    // },

    /**
     * handler responsible for posting feeds.
     * @param {Object} btn, View reference of button clicked. 
     * @param {Object} evt, Event Object 
     */
    onPostButtonClick: function(btn, evt) {
        try {
            var me = this,
                shareFieldValue = me.lookupReference('sharefield').value,
                postShare = me.lookupReference('sharePostRef').value,
                shareIdeateView = me.getView().down('shareideate'),
                shareIdeateTags = shareIdeateView.down('tagfield[reference = comboview]'),
                shareIdeateTagvalues = [],
                taggedArray = shareIdeateTags.getValue();

            if (shareIdeateTags.lastSelectedRecords) {
                var shareIdeateTagsLen = shareIdeateTags.lastSelectedRecords.length;

                for (var i = 0; i <= shareIdeateTagsLen - 1; i++) {

                    if (taggedArray.indexOf(shareIdeateTags.lastSelectedRecords[i].data.tagId) != -1) {
                        shareIdeateTagvalues.push({
                            isGroup: (shareIdeateTags.lastSelectedRecords[i].data.isGroup) ? 'Y' : 'N',
                            tagId: shareIdeateTags.lastSelectedRecords[i].data.tagId
                        });

                    }
                }
            }

            if (postShare && !Ext.isEmpty(shareFieldValue.trim())) {
                Ext.Msg.show({
                    title: 'Confirm Social Sharing',
                    message: 'You have selected "Share" option and this post will be shareable on social sites. People outside this company will be able to see these details. Do you want to proceed?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button === 'yes') {
                            me.onCofirmSharePost(me, btn, postShare);
                        } else {
                            me.lookupReference('sharePostRef').setValue(false);
                        }
                    }
                });
            } else {
                me.onCofirmSharePost(me, btn, shareIdeateTagvalues);
            }

        } catch (err) {
            Utility.showToast(Messages.HOME.POSTBTNCLICK, err);
        }
    },

    /**
     * Handler responsible for share type process
     * @param {Object} view, View Reference of dataview 
     * @param {Object} record,  Selected record
     * @param {Object} item, Reference for item selected
     * @param {Number} idx, index number for selected record
     * @param {Object} opts, Event objects
     */
    onShareTypeSelect: function(view, record, item, idx, evt, opts) {
        try {
            var me = this,
                shareView = me.getView().down('shareupdate'),
                shareideateView = me.getView().down('shareideate'),
                shareComboView = shareideateView.items.items[0],
                
                //btnRef = shareView.down('button[reference = groupsicon]'),
                shareableRef = shareView.down('checkbox[reference = sharePostRef]'),
                viewModel = me.getViewModel();

            if (record.data.id == "idea") {
                Ext.getStore('feeds.Groups').load();
                //if (btnRef.isHidden()) {
                if (shareComboView.isHidden()) {
                    Utility.IdeatePostSetInterval(true, me);
                    this.getViewModel().set('postEmptyText', "Believe in your IDEAS! Express yourself!");
                // btnRef.show();
                    shareableRef.hide();
                    shareComboView.clearValue();
                    shareComboView.show();
                    shareideateView.setStyle('border-bottom','1px solid #eee');
                }
                document.getElementsByClassName('share-icon')[0].children[0].src = '/resources/images/feeds/icon_whats_on_your_mind.svg';
            } else {
            // Ext.getStore('feeds.Groups').removeAll();
                shareableRef.show();
                shareideateView.setStyle('border-bottom-width','0px')
                //if (!btnRef.isHidden()) {
                if (!shareComboView.isHidden()) {
                    Utility.IdeatePostSetInterval(false, me);
                    this.getViewModel().set('postEmptyText', "What's on your mind?");
                // btnRef.hide();
                    shareComboView.hide();
                }
                document.getElementsByClassName('ideate-icon')[0].children[0].src = '/resources/images/feeds/icon_ideation.svg';
            }
            viewModel.set("postType", record.get("id"));
            item.children[0].children[0].children[0].src = '';

            var filterValues = {};
            filterValues.postType = record.get("id");
            me.filterFeeds(filterValues);  
        } catch (err) {
            Utility.showToast(Messages.HOME.SHARETYPESELECT, err);
        }      
    },

    filterFeeds : function(filterValues) {
        Ext.getBody().mask();
        filterValues.filter = "true";
        var feedsStore = Ext.getStore("feeds");
        feedsStore.load({
            params: filterValues,
            callback: function(records, options, success) {
                if (success) {
                    Ext.getBody().unmask();
                } else {
                    Ext.getBody.unmask();
                    Ext.Msg.alert("Error", 'Invalid selection');
                }
            }
        });
    },

    /**
     * Handler is responsible for process related to content enter for post.
     * @param {Object} me, Scope of this
     * @param {Object} e, Event Object
     * @param {Object} eOpts, Event Object 
     */
    onFeedsPostTextEnter: function(me, e, eOpts) {
        try {
            var me = this,
                contentView = me.getView(),
                promise;
            var contentReference = contentView.lookupReference('sharefield'),
                content = contentReference.getValue(),
                urlSplit = content.replace(/(?:\r\n|\r|\n)/g, '<br />'),
                urlreg = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                urllink = urlSplit.match(urlreg);

            if (urllink && urllink.length < 2 &&
                ((e.keyCode === 32 || e.keyCode === 13 || e.keyCode === 86) || e.getCharCode() === 32 || e.getCharCode() === 13 || e.getCharCode() === 86) && !this.getViewModel().get('statusBoxAcc')) {

                promise = Utility.feedsUrlLinkView(urllink);
                promise.then(
                    function(data) {
                        if (data.data.success && data.data.data) {
                            dataData = data.data.data.ogDescription.trim()
                            if(dataData.length>445){

                                var descriptionData = data.data.data.ogDescription.substring(0,445);
                                var stringLength = descriptionData.lastIndexOf('.');
                                descriptionData = descriptionData.substring(0,stringLength);
                                data.data.data.ogDescription = descriptionData;
                            }
                            me.getView().down('shareupdate').down('postUrlLinkView').setData(data.data.data);
                        }
                    }
                );
                this.getViewModel().set('statusBoxAcc', true);

            } else if (!urllink && this.getViewModel().get('statusBoxAcc')) {
                me.getView().down('shareupdate').down('postUrlLinkView').setData('');
                this.getViewModel().set('statusBoxAcc', false);
            }
        } catch (err) {
            Utility.showToast(Messages.HOME.POSTTEXTENTER, err);
        }
    },

    /**
     * Share post confirmation process
     * @param {Object} me, Scope Reference of this.
     * @param {Object} btn, view reference for Button clicked
     * @param {Array} shareIdeateTagvalues, Contains data for share ideate tags selections 
     */
    onCofirmSharePost: function(me, btn, shareIdeateTagvalues) {
        Ext.getBody().mask('');
        var viewModel = me.getViewModel(),
            postContent = viewModel.get("postContent"),
            postShare = (me.lookupReference('sharePostRef').value) ? 'Y' : 'N',
            config, successCallback, failureCallback, callback, attachmentsData = [];

        if (Utility.feedUploadsImage.length > 0) {
            for (var i = Utility.feedUploadsImage.length - 1; i >= 0; i--) {
                attachmentsData.push(Utility.feedUploadsImage[i].src);
            }
        }
        shareIdeateTagvalues = shareIdeateTagvalues.length > 0 ? shareIdeateTagvalues : [];
        // shareIdeateTagvalues = (viewModel.get("postType") == "idea") ? shareIdeateTagvalues : [];

        var postLinkUrlView = Ext.ComponentQuery.query('postUrlLinkView')[0];

        var staticUrl = null;
        var metaDataContent = null;

        var stepProcess = true;

        if (postContent.trim().length > 0 || attachmentsData.length > 0) {
            config = {
                url: '/feed/create',
                method: "POST",
                params: {
                    post_content: viewModel.get("postContent"),
                    post_type: viewModel.get("postType"),
                    post_share: postShare,
                    post_attachments: attachmentsData,
                    tagIds: Ext.encode(shareIdeateTagvalues),
                    meta_data_content: metaDataContent,
                    static_url: staticUrl
                }
            };

            if (postLinkUrlView && postLinkUrlView.data && postLinkUrlView.getEl() && postLinkUrlView.getEl().dom && postLinkUrlView.getEl().dom.innerHTML) {
                var resData = postLinkUrlView.data;
                if (resData.ogTitle || resData.ogDescription) {
                    var refUrl = resData.staticUrl;

                    if (!refUrl.match(/http/)) {
                        refUrl = "http://" + refUrl;
                    } else {
                        refUrl = refUrl;
                    }

                    var metaDataContent = '<div><a class="link-ref-cls" href="' + refUrl + '" target="_blank"><table><tr>';

                    metaDataContent = metaDataContent.concat('<td class="postUrlView-feed-div">');

                    if (resData.ogTitle) {
                        metaDataContent = metaDataContent.concat('<span class="postUrl-title">' + resData.ogTitle + '</span><br>');
                    }

                    if (resData.ogDescription) {
                        metaDataContent = metaDataContent.concat('<span class="postUrl-description">' + resData.ogDescription + '</span>');
                    }

                    metaDataContent = metaDataContent.concat('</td>');

                    metaDataContent = metaDataContent.concat('</tr></table></a></div>');

                    staticUrl = (postLinkUrlView.data) ? postLinkUrlView.data.staticUrl : null;
                }

            } else {
                var post_content = viewModel.get('postContent');
                console.log('post_content: ', post_content);

                var urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
                var urllink = post_content.match(urlRegex);
                var promise;

                if (urllink && urllink.length > 0) {
                    stepProcess = false;
                    staticUrl = urllink[0];

                    var linkUrl = [staticUrl];

                    promise = Utility.feedsUrlLinkView(linkUrl);

                    promise
                        .then(function(data) {
                            if (data.data.success && data.data.data) {
                                me.getView().down('shareupdate').down('postUrlLinkView').setData(data.data.data);
                                if (postLinkUrlView && postLinkUrlView.data && postLinkUrlView.getEl() && postLinkUrlView.getEl().dom && postLinkUrlView.getEl().dom.innerHTML) {
                                    var resData = postLinkUrlView.data;
                                    if (resData.ogTitle || resData.ogDescription) {
                                        var refUrl = resData.staticUrl;

                                        if (!refUrl.match(/http/)) {
                                            refUrl = "http://" + refUrl;
                                        } else {
                                            refUrl = refUrl;
                                        }

                                        var metaDataContent = '<div><a class="link-ref-cls" href="' + refUrl + '" target="_blank"><table><tr>';

                                        metaDataContent = metaDataContent.concat('<td class="postUrlView-feed-div">');

                                        if (resData.ogTitle) {
                                            metaDataContent = metaDataContent.concat('<span class="postUrl-title">' + resData.ogTitle + '</span><br>');
                                        }

                                        if (resData.ogDescription) {
                                            metaDataContent = metaDataContent.concat('<span class="postUrl-description">' + resData.ogDescription + '</span>');
                                        }

                                        metaDataContent = metaDataContent.concat('</td>');

                                        metaDataContent = metaDataContent.concat('</tr></table></a></div>');

                                        staticUrl = (postLinkUrlView.data) ? postLinkUrlView.data.staticUrl : null;
                                    }

                                    me.getView().down('shareupdate').down('postUrlLinkView').setData('');
                                    me.getViewModel().set('statusBoxAcc', false);
                                }
                            }
                            me.createFeedAPIcall(me, config, metaDataContent, staticUrl, btn);
                        });
                }
            }

            if (stepProcess) {
                me.createFeedAPIcall(me, config, metaDataContent, staticUrl, btn);
            }
        } else {
            Ext.getBody().unmask();
        }

    },
  
    /**
     * Preparing for create feeds process
     * @param {Object} me, Scope of this.
     * @param {Object} config, Api request Object details
     * @param {Object} metaDataContent, meta information about content for new feed
     * @param {Object} staticUrl, Static value of URL path
     * @param {Object} btn, View Reference of button clicked 
     */
    createFeedAPIcall: function(me, config, metaDataContent, staticUrl, btn) {
        if (config) {
            config.params.static_url = staticUrl;
            config.params.meta_data_content = metaDataContent;
             
            var successCallback = function(data) {
                Ext.getBody().unmask();
                // Animation effect for newly added item

                Utility.feedUploadsImage = [];

                var scopeView = me.getView();

                var scopeViewModel = me.getViewModel();

                var shareUpdate = scopeView.down('shareupdate');

                var shareIdeate = scopeView.down('shareideate');

                shareUpdate.down('feedsuploadedimage').setData(Utility.feedUploadsImage);

                shareUpdate.down('postUrlLinkView').setData('');

                shareIdeate.down('tagfield[reference = comboview]').setValue('');

                scopeViewModel.set('statusBoxAcc', false);

                scopeView.down('shareupdate').down('feedsuploadedimage').removeCls('feed-upload-view-pad');
                
                var feedsStore = Ext.getStore('feeds');
                feedsStore.add(data);

                if (scopeViewModel) {
                    scopeViewModel.set("postContent", "");
                }
                if (me.lookupReference('sharePostRef')) {
                    me.lookupReference('sharePostRef').setValue(false);
                }
            };
            failureCallback = function() {
                Ext.getBody().unmask();
                Utility.toastReuseFn('t', AlertMessages.unableCreateFeed);
            };
            callback = function() {
                Ext.getBody().unmask();
                btn.setDisabled(false);
            };
            Utility.fireAjax(config, successCallback, failureCallback, callback);
        }
        Ext.getBody().unmask();
    },

    /**
     * Image upload process rendering view.
     * @param {Object} view, Object Reference of view.
     * @param {Object} events, Event object
     */
    onFeedUploadImagesViewRender: function(view, events) {
        try {
            var viewModel = this.getViewModel();
            
            if (!viewModel.get('delegateActionPerformed')) {
                view.getEl().on({
                    scope: this,
                    click: function(mouseevent, tempUploadedImg, events) {
                        var selecImgPath = tempUploadedImg.nextSibling.getAttribute('src');
                        var hostUrl = Api.URL.imageUrl || Api.URL.hostUrl;
                        if (hostUrl && selecImgPath.includes(hostUrl)) {
                            selecImgPath = selecImgPath.replace(hostUrl, "");
                        }
                        Ext.Ajax.request({
                            url: '/feeduploadimages/feedsPostedPicsUnlink',
                            scope: this,
                            params: {
                                imgPath: selecImgPath
                            },
                            success: function(conn, response) {
                                if (response.params && response.params.imgPath && response.params.imgPath.includes('amazonaws.com')) {
                                    var imagePath = response.params.imgPath.split(".com/");
                                    imagePath=imagePath[1];
                                }else{
                                    var imagePath = response.params.imgPath;
                                }
                                for (var i = Utility.feedUploadsImage.length - 1; i >= 0; i--) {
                                    if (Utility.feedUploadsImage[i].src === imagePath) {
                                        Utility.feedUploadsImage.splice(i, 1);
                                        view.setStyle('border-bottom','0px');
                                    }
                                }

                                if (Utility.feedUploadsImage.length === 0) {
                                    view.removeCls('feed-upload-view-pad');
                                }

                                view.setData(Utility.feedUploadsImage);
                            },
                            failure: function(conn, response) {
                                Ext.Msg.alert('Status', 'Image not deleted');
                            }
                        });
                    },
                    delegate: 'span.cross-upload-img'
                });
                viewModel.set('delegateActionPerformed', true);
            }
        } catch (err) {
            Utility.showToast(Messages.HOME.IMGUPLOADRENDER, err);
        }
    },

    /**
     * Image upload functionality for feeds view.
     * @param {Object} filefield, Object reference of file upload.  
     * @param {String} value, String formated image path
     * @param {Object} eOpts, Event object
     */
    imageUploadBtnClick: function(filefield, value, eOpts) {
        try {
            var file = filefield.fileInputEl.dom.files[0],
                format = file.type;
            if (format == "image/png" || format == "image/jpg" || format == "image/jpeg") {
                AmazonS3.uploadFile(filefield).then(function (rec) {
                    var feedImgView = filefield.up('shareupdate').down('feedsuploadedimage');
                    Utility.feedUploadsImage.push({
                        src: rec
                    });
        
                if (Utility.feedUploadsImage.length > 0) {
                    feedImgView.addCls('feed-upload-view-pad');
                    feedImgView.setStyle('border-bottom','1px solid #eee');
                }
        
                feedImgView.setData(Utility.feedUploadsImage);
                });
            }
        }  catch (err) {
            Utility.showToast(Messages.HOME.IMGUPLOADCLICK, err);
        }
    // This code is commented because we are using S3 Bucket implementation

        // var scb = function(formPanel, action) {
        //     var text = Ext.JSON.decode(action.response.responseText),
        //         pathImg = text.data,
        //         feedImgView = filefield.up('shareupdate').down('feedsuploadedimage');

        //     Utility.feedUploadsImage.push({
        //         src: pathImg
        //     });

        //     if (Utility.feedUploadsImage.length > 0) {
        //         feedImgView.addCls('feed-upload-view-pad');
        //     }

        //     feedImgView.setData(Utility.feedUploadsImage);
        // };

        // var fcb = function() {
        //     Utility.toastReuseFn('t', AlertMessages.imageNotCreated);
        // };

        // Utility.uploadImgFormatFn(this, filefield, Api.URL.feed.FEEDS_UPLOAD_IMAGES, scb, fcb);

},

    /**
     * comments functionality
     * @param {Object} view, Object reference of comment dataview.
     * @param {Object} record, Selected Item Record.
     * @param {Object} itemDom, Dom Structure of selected dataview item
     * @param {Number} idx, Number for index for selected item
     * @param {Object} opts, Event object
     */

    onSendCommentsClick: function(view, record, itemDom, idx, evt, opts) {
        try {
            Utility.likeImgAnim = false;

            //To replace only for the particular post_id - MetaUrlData, based on like operation
            Utility.metaUrlReplaceStatus(record.data.post_content, record.data.post_id, true);

            var me = this,
                itemEl = Ext.get(itemDom),
                feedsView = this.getView(),
                feedsContainer = feedsView.down('feedscontainer'),
                feedsDataView = feedsContainer.down('dataview'),
                commentTextEl = itemEl.down("input.comment-input-cls");

            if (commentTextEl) {
                var commentValue = commentTextEl.getValue();
                Utility.menuform = true;
                if (commentValue.trim().length && commentTextEl.hasCls("updated-comment")) {

                    Utility.commentsData.content = commentValue;
                    var config = {
                            url: "/feedcomment/comment/update",
                            method: "POST",
                            params: {
                                //Utility.commentsData
                                ddo_posts_comments_id: record.get("ddo_posts_comments_id"),
                                content: Utility.commentsData
                            }
                        },
                        successCallback = function(data) {

                            feedsDataView.getStore().load();
                            feedsDataView.refresh();
                            feedsContainer.updateLayout();
                        },
                        failureCallback = function() {
                            Utility.toastReuseFn('t', AlertMessages.unableUpdateComment);
                        };
                    Utility.fireAjax(config, successCallback, failureCallback);
                } else if (commentValue.trim().length) {
                    var config = {
                        url: "/feedcomment/comment/create",
                        method: "POST",
                        params: {
                            ddo_posts_id: record.get("post_id"),
                            content: commentValue
                        }
                    };
                    var successCallback = function(data) {
                        var comments = record.get("comments"),
                            //added for removing the animation cls for comments
                            html = view.tpl.html,
                            split = html.split('feeds-container-animation'),
                            finals = split[0];
                        if (split.length > 1) {
                            finals = split[0] + split[1];
                        }
                        //
                        comments.push(data);
                        //added for removing the animation cls for comments
                        view.tpl.set(finals);
                        //
                        record.set("comments", Ext.Array.clone(comments));

                        feedsDataView.getStore().load();
                        feedsDataView.refresh();
                    };
                    var failureCallback = function() {
                        Utility.toastReuseFn('t', AlertMessages.unableAddComment);
                    };
                    Utility.fireAjax(config, successCallback, failureCallback);
                } else {
                    return false;
                }

            }
        } catch (err) {
            Utility.showToast(Messages.HOME.SENDCOMMENTCLICK, err);
        }
    },

    //removed as feed group btn is not showing now,directly tag view is shown.

  /*  BtnClick: function(btn) {
        var me = this,
            shareideateView = me.getView().down('shareideate'),
            comboIdeateView = shareideateView.items.items[0];

        if (comboIdeateView.isHidden()) {
            comboIdeateView.show();
        }
    },*/


    /**
     * Tag Functionality for feeds view
     * @param {Object} combo, Reference of tag combo box in share ideate view.
     * @param {Object} record, Selected record
     * @param {Number} index, number for selected  record
     * @param {Object} eOpts, Event objects
     */
    onTagsDeSelect: function(combo, record, index, eOpts) {},
    onTagsSelect: function(combo, record, index, eOpts) {
        combo.inputEl.dom.value = '';
        combo.collapse();

    },
    onCheckChange: function(check, newValue, oldValue, eOpts){
        var me = this;
        var checked = newValue;
        me.getViewModel().set('peopleChecked', newValue);
        if(newValue){
            me.getViewModel().set('postType', 'idea');
        }
    }
});