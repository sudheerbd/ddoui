 /**
 * This view is responsible for displaying posts and related activity in feeds view.
 * @class 'DDO.view.feeds.components.FeedsDataItem'
 * @extends 'Ext.container.Container'
 * @alias 'widget.feedsdataitem'
 */
Ext.define('DDO.view.feeds.components.FeedsDataItem', {
    extend: 'Ext.container.Container',

    alias: 'widget.feedsdataitem',

    cls: 'feedsMainContainer',

    requires: [
        'DDO.view.widget.Tag',
        'DDO.view.widget.Like',
        'DDO.store.feeds.Feeds',
        'DDO.view.widget.Share',
        'DDO.view.widget.Comment',
        'DDO.view.widget.OwnerEdit',
        'DDO.view.widget.NewComment',
        'DDO.view.widget.PostContent',
        'DDO.view.widget.profile.Profile',
        'DDO.view.widget.ExistingComment',
        'DDO.view.widget.PostAttachments',
        'DDO.view.widget.PostCommentDuration',
        'DDO.view.feeds.likes.FeedsLikeWindow',
        'DDO.view.feeds.FeedsIndividualImages',
        'DDO.view.widget.PostContentDescription',
        'DDO.view.feeds.components.FeedsDataItemController',
        'DDO.view.feeds.components.ExistingCommentCollection',
        'DDO.view.widget.Follow'
    ],

    controller: 'feedsdataitemcontroller',
    viewModel: {
        data: {
            record: null
        }
    },

    initComponent: function() {
        this.callParent(arguments);

        var feedStore = Ext.getStore('feeds');

        if (feedStore && !feedStore.isLoaded()) {
            Ext.getBody().mask();
            feedStore.load({
                scope: this,
                callback: function(records, operation, success) {
                    Ext.getBody().unmask();
                }
            });
        }
    },

    addLoadIndicator: function() {
        return [{
            xtype: 'component',
            cls: 'x-mask-msg-text'
        }]
    },

    addItems: function() {
        return [{
            xtype: 'container',
            cls: 'IdeateView',
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'end'
            },
            items: []
        }, {
            xtype: 'container',
            cls: 'feedProfileContainer',
            height:'40px',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [this.getProfileView(), {
                xtype: 'postcommentduration',
                width: 50,
                name: 'feedCommentDuration'

            },
            {
                xtype: 'owneredit',
                    name: 'postOwnerEdit',
                    listeners: {
                        onclickediticon: 'onClickPostEditIcon'
                    }
            }, ]

        }, {
            xtype: 'postcontent'
        }, {
            xtype: 'postattachments',
            listeners: {
                onclickattachedimage: 'attachedImagesFullView'
            }
        }, {
            xtype: 'postcontentdescription'
        }, {
            xtype: 'container',
            name :'likeAndComment',
            cls: 'LikeContainerCls containerOverFlowVisible',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                xtype: 'like',
                bind: {
                    promoReactionData: '{ownerLikesView}'
                },
                listeners: {
                    onliketextclick: 'onLikeClick',
                    onhearticonclick: 'onLikeClick',
                    onreactionlikeclick: 'onlikeAnimClick'
                }
            }, {
                xtype: 'comment',
                listeners: {
                    onnewcommentclick: 'onCommentIconClick',
                    onCommentTextclick: 'onComentTextClick',
                }
            }, {
                xtype: 'follow',
                listeners: {
                    onnewfollowclick: 'onNewFollowClick',
                }
            }, {
                xtype: 'share',
                bind: {
                    reactionBoxComponent: '{ownerView}'
                },
                listeners: {
                    onsharebtnclick: 'onShareBtnClick'
                }
            }, {
                xtype: 'taglist',
                listeners: {
                    onclicktagmenuimg: 'onTagMenuCommentsClick'
                }
            }]
        }, {
            xtype: 'existingCommentcollection',
            hidden:true
        },{
            xtype: 'newcomment',
            listeners: {
                oncommentsubmit: 'onSendCommentsClick'
            }
        }];
    },

    getProfileView: function() {
        return {
            xtype: 'profile',
            flex: 1,
        };
    },

    updateLikeContent: function(data) {
        var me = this,
            likeWidget = me.down('like'),
            viewModel = me.getViewModel();

        viewModel.set('record.post_like_count', data.post_like_users.length || 0);
        viewModel.set('record.post_like_users', data.post_like_users || []);
        /*
            Updating the Like Widget Values
        */
        likeWidget.setPostType(data.post_type);
        likeWidget.updateTotalNumberOfLikes(data.post_like_users.length || 0);
        likeWidget.updateIsLiked(data.post_like_users || []);
    },

    updateFollowers:function(data){
            var followWidget = this.down('follow');
            var viewModel = this.getViewModel();
                viewModel.set('record.followers', data.followData);
                var filterArray = [];
                var login = Ext.getStore('login'),
                loginData = login.getData().items[0].data;
                 if(!Ext.isEmpty(data.followData)){
                    var followers =data.followData;

                    followers.some(function(value){
                        if(value.follow_author_id == loginData.ddo_employee_id){
                            filterArray.push(value)
                        }
                    })

            }else{
                var followText = 'Follow';
                followWidget.updateFollowCount(data.followData.length,followText);
            }

            if(!Ext.isEmpty(filterArray)){
                var unfollowText = 'Unfollow';
                followWidget.updateFollowCount(data.followData.length,unfollowText);
            }else{
                var followText = 'Follow';
                followWidget.updateFollowCount(data.followData.length,followText);
            }
    },

    updateCommentContent: function(data, isNotification) {
        var me = this,
            commentWidget = me.down('existingCommentcollection'),
            newComment = me.down('newcomment'),
            comment = me.down('comment'),
            viewModel = me.getViewModel();

        viewModel.set('record.comments', data);
        viewModel.set('commentsCount', data.length);
        commentWidget.updateComments(data);
        if(!isNotification){
          newComment.resetCommentData();   
        }
        comment.setCommentCount(data.length);
    },

    updateOwnerEditDetails: function(userId) {
        var ownerEdit = this.down('owneredit[name="postOwnerEdit"]');
        if(ownerEdit){
            ownerEdit.updateUserId(parseInt(userId));
        }
    },

    updateIdeateDetails: function(values) {
        var ideateComponent = this.down('component[name="ideate"]');
        if(ideateComponent){
        ideateComponent.setData(values);
        }
    },

    updatePostContentDetails: function(values) {
        var postContent = this.down('postcontent');
        this.getViewModel().set('record.post_content', values.post_content);
        postContent.updatePostContent(values.post_content, values.url_meta_content);
    },

    updatePostAttachmentsAndContent: function(record) {
        var postAttachment = this.down('postattachments');
        postAttachment.setPostId(record.post_id);
        postAttachment.updatePostAttachment(record.post_attachments);
        this.getViewModel().set('record.post_images_path', record.post_attachments);

        var postContentDescription = this.down('postcontentdescription');
        postContentDescription.setPostId(record.post_id);
        postContentDescription.updatePostContentDescription(record.url_meta_content);
        this.getViewModel().set('record.post_content', record.post_content);
    },

    updateProfileDetails: function(userDetails) {
        var profile = this.down('profile');

        profile.updatecontent(userDetails);
    },

    updateTagContent: function(record) {
        var tagList = this.down('taglist'),
            tagVisible = false;

        if (record.post_type === "idea") {
            var taggedGroupDetails = record.tagged_group_details;
            //Need to Update after the Service is updated
            this.getViewModel().set('record.tagged_group_details', record.tagged_group_details);
            if (taggedGroupDetails && taggedGroupDetails.length > 0) {
                tagVisible = true;
            }
        }
        tagList.updateTagVisible(tagVisible);
    },

    updateNewCommentData: function(postType) {
        var newComment = this.down('newcomment'),
            isIdeate = (postType == "idea") ? true : false;

        newComment.updateIsIdeate(isIdeate);
        newComment.updateUserProfilePicture(Utility.profileImg());
    },

    updateShareDetails: function(record) {
        var shareEl = this.down('share');

        shareEl.updateHideComponent(record.post_share);
        this.getViewModel().set('record.post_share', record.post_share);
        shareEl.setDataRec(record.post_share_details);
    },

    updatePostCommentDuration: function(post_date) {
        var commentDuration = this.down('postcommentduration[name="feedCommentDuration"]');

        commentDuration.setPostDate(post_date);
    },

    updateWidgetValues: function(values) {
        var me = this;
        /*
            Updating Owner Edit
        */
        me.updateOwnerEditDetails(values.user.c_bpartner_id);
        /*
            Updating Comments Content and Comment Count Value
        */
        me.updateCommentContent(values.comments);
        /*
            Updating the Like Widget Value
        */
        me.updateLikeContent(values);

        me.updateFollowers(values);
        /*
            Updating the Ideate Content
        */
        me.updateIdeateDetails(values);
        /* 
            Updating postcontent
        */
        me.updatePostContentDetails(values);

        /*
            Updating Postattachments and post Content Description
        */
        me.updatePostAttachmentsAndContent(values);

        /*
            Updating Share Details
        */
        me.updateShareDetails(values);
        /*
            Update Tag List
        */
        me.updateTagContent(values);

        /*
            updating newcomment Data
        */
        me.updateNewCommentData(values.post_type);
        /*
            updating the profile Details 
        */
        me.updateProfileDetails(values.user);
        /*
            Update postCommentDuration
        */
        me.updatePostCommentDuration(values.post_date);
    }
});