/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DDO.view.feeds.FeedsContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.feedscontainer',

    requires: [
        'DDO.store.feeds.Feeds',
        'DDO.view.feeds.FeedsIndividualImages',
        'DDO.view.feeds.likes.FeedsLikeWindow'
    ],

     initComponent:function(){
        this.callParent(arguments);

        Ext.Ajax.request({
            url: 'resources/data/share.json',
            method: 'GET',
            scope: this,
            success: function(response) {
                var data = Ext.decode(response.responseText);
                this.items.items[0].getTpl('tpl').ownerView = data;
            }
        });
         Ext.Ajax.request({
            url: 'resources/data/likes.json',
            method: 'GET',
            scope: this,
            success: function(response) {
                var data = Ext.decode(response.responseText);
                this.items.items[0].getTpl('tpl').ownerLikesView = data;
            }
        });

   },

    padding: '0px 0px 50px 50px',
    items: [{
        xtype: 'dataview',
        reference: "feedsdataview",
        loadMask: false,
        store: {
            type: 'feeds'
        },
        tpl: [
            '<tpl for=".">',
            '<div class="comment-container-cls">',
            '<tpl if="this.isLoadIndicator(values)">',
            '<tpl else>',
            '<div class="head-commment-cls">',
            '<img class="ideate-cls" src="{[this.getPostTypeImage(values)]}" alt="Post Type"/>',
            '{[this.getPostMenuImage(values)]}',
            '<div class="header-content-cls">',
            '<img class="header-profilepic-cls" src="{[this.getUserImg(values)]}" alt="user face"/>',
            '<table class="head-comment-header">',
            '<tr>',
            '<td class="header-username-cls"><span class="header-usernamespan-cls">{user.user_full_name}</span>',
            '<span class="minus-gray">|</span>',

            '<span class="header-designation-cls">{user.user_designation}</span>',
            '</td>',
            '<td class="comment-time-cls">',
            '<span class="{[this.getClockIcon(values.post_date)]}"></span>',
            '<span class="header-from-now">&nbsp;{[this.getTime(values.post_date)]}</span>',
            '</td>',
            '</tr>',
            '</table>',
            '</div>',
            '<div class="comment">',
            '<div class="comments-form"></div>',
            '<tpl if="post_content">',
            '<pre>{[this.getPostContent(values.post_content)]}</pre>',
            '</tpl>',
            '<br>',

            //Replacing the metdata to this div based on post_id
            '<div id="post_id_{post_id}" class="url-img-view-wrap"></div>',

            //Single or Multi-Images TPL block
            '<tpl if="this.getSpace(values)">',
            '<div class="space-between-comment-cls"></div>',
            '</tpl>',
            '<tpl if="this.getImagePostedValuesAccess(values)">',
                '<div class="feed-uploaded-multi-img">',
                    '<tpl for="post_images_path">',
                        '<tpl if="xindex < 4">',
                            '<img class="feeds-nontemp-upload-img" action-post-id="{[this.getMultiImages(values, true)]}" src="{[this.getMultiImages(values, false)]}" width="210px" height="210px">',
                        '<tpl elseif="xindex === 4">',
                            '<span class="feeds-nontemp-upload-img feed-uploaded-extra-images" action-post-id="{[this.getMultiImages(values, true)]}">&#43; {[xcount-(xindex-1)]}</span>',
                        '</tpl>',
                    '</tpl>',
                '</div>',
            '</tpl>',

            '</div>',
            '</div>',
            //View More text goes here
            // '<div class="viewMore-Comments-cls" style={[this.getMoreDivHeight(values)]}>{[this.getMoreComments(values)]}</div>',
            '<div class="subcomment-outer-container">',
            '<div class="subcomment-innner-container noscrollbar">',
            
                //Filter commnets array goes here
                '{%',
                'var filterdArrayComments =[],filterdArrayCommentsless=[],commentCloneArray,i,len = values.comments.length;',
                'for (i=0; i < len; i++) {',
                'if(values.limit>i){filterdArrayComments.push(values.comments[i]);}',
                'else{break;}',
                '}',
                'commentCloneArray = Ext.Array.clone(values.comments);',
                'commentCloneArray.reverse();',
                'for (i=0; i < len; i++) {',
                'if(values.limit>i){filterdArrayCommentsless.push(commentCloneArray[i]);}',
                'else{break;}',
                'filterdArrayCommentsless.reverse();',
                '}',
                'if(values.less_or_more){values.filteredComments = filterdArrayCommentsless;}',
                'else{values.filteredComments = filterdArrayComments;}',
                '%}',
            
            //Comments Begin Here
            '<tpl for="filteredComments">',
            '<table class="comment-view-cls">',
            '<tr>',

            '<td class="subcomments-pic-cls">',
            '<img class="subcommentspic-cls" src="{[this.getUserImg(values)]}" alt="Smiley face"/>',
            '</td>',

            '<td class="subcomment-post">',
            '<div class="subcomments-username-cls">{user.user_full_name}</div>',
            '<div class="subcomments-cls">{[this.getSubComment(values.comment_content)]}</div>',
            '</td>',
            '<td class="subcomments-time-cls">',
            '<span class="{[this.getClockIcon(values.comment_date)]}"></span>',
            '<span class="subcomments-from-now">&nbsp;{[this.getTime(values.comment_date)]}</span>',
            '{[this.getPostMenuCommentsImage(values)]}',
            '</td>',
            '</tr>',
            '</table>',
            '</tpl>',
            
            //Comments End Here
            '</div>',
            '<div class="user-footer-cls">',
            '<ul>',
             '<tpl if ="this.getIdeatPost(values)">',
            '<li>',

            '<style>', 
                          
               '<tpl for="this.ownerLikesView.data">',

                 '.{name} {',
                 'left: {[this.reacLikesPosition(values.count)]}px;',
                 'transition-delay: {delay}s;',
                 'background: url("{imgsrc}") 0 0/cover;',
                 '}',
                 '.promo-like-btn:hover .{name} {animation-delay: {delay}s}',
                 '.{name}::before {content: "{reaction}"}',
               '</tpl>',
               '</style>',
               '<div class="promo-main-like-wrap">',
                 '<span class="promo-like-btn">',
                    // for heart shaped like button animation
                    '<div class="like-heart-container">',
                    '<div class="like-heart-animation-container">',
                    '<div class="like-heart-animation {[this.isUserLiked(values) ? "like-heart-active" : ""]} {[this.isUserLikedAnim(values) ? "likeAnim" : ""]}"></div>',
                    '</div>',
                    '</div>',
                    //
                    '<tpl if ="post_like_count != 0">',
                    '<span>{post_like_count}</span>',
                    '</tpl>',
                    '<tpl if ="post_like_count <= 1">',
                    '<span class="like-cls">Like</span>',
                    '<tpl else>',
                    '<span class="like-cls">Likes</span>',
                    '</tpl>',
                    '<ul style="width:{[this.reacLikesContWidth(this.ownerLikesView.data)]}px;" class="promo-reactions-box">',                
                        '<tpl for="this.ownerLikesView.data">',
                           //'<li class="promo-reaction {name} {[this.getLikesPostDetails(parent, values.name)]}" promo-reaction="{reaction}"></li>',
                        '<li class="promo-reaction {name}" promo-reaction="{value}"></li>',
                        '</tpl>',
                     '</ul>',
                  '</span>',
                '</div>',
                '</li>',
                '<tpl else>',
            '<li>',
            // for heart shaped like button animation
            '<div class="like-heart-container">',
            '<div class="like-heart-animation-container">',
            '<div class="like-heart-animation {[this.isUserLiked(values) ? "like-heart-active" : ""]} {[this.isUserLikedAnim(values) ? "likeAnim" : ""]}"></div>',
            '</div>',
            '</div>',
            //
            '<tpl if ="post_like_count != 0">',
            '<span>{post_like_count}</span>',
            '</tpl>',
            '<tpl if ="post_like_count <= 1">',
            '<span class="like-cls">Like</span>',
            '<tpl else>',
            '<span class="like-cls">Likes</span>',
            '</tpl>',
            '</li>',
            '</tpl>',
            '<li class="x-fa fa-commenting">',
            '<tpl if ="this.getCommentsCount(values) != 0">',
            '<span>{[this.getCommentsCount(values)]}</span>',
            '</tpl>',
            '<tpl if ="this.getCommentsCount(values) <= 1">',
            '<span class="comment-cls">Comment</span>',
            '<tpl else>',
            '<span class="comment-cls">Comments</span>',
            '</tpl>',
            '</li>',
             //tagged values
            '<tpl if ="this.getTaggedIdeatePost(values)">',
            '<li class="menuTags">',
            '<span>&nbsp;{[this.getTaggedImage(values)]}</span>',
            '</li>',
            '</tpl>',
            '<tpl if ="values.post_share">',
            '<li>',
            '<style>',                
               '<tpl for="this.ownerView.data">',
                 '.{name} {',
                 'left: {[this.reacPosition(values.count)]}px;',
                 'transition-delay: {delay}s;',
                 'background: url("{imgsrc}") 0 0/cover;',
                 '}',
                 '.promo-like-btn:hover .{name} {animation-delay: {delay}s}',
                 '.{name}::before {content: "{reaction}"}',
               '</tpl>',
               '</style>',
               '<div class="promo-main-wrap">',
                 '<span class="promo-like-btn">',
                    '<img src="resources/images/feeds/socialmedia/Share-logo.png" ',
                    'class="promo-like-fb-logo" width="12px" height="12px">',
                    '<span class="promo-like-btn-text">Share</span>',
                    '<ul style="width:{[this.reacContWidth(this.ownerView.data)]}px;" class="promo-reactions-box">',                
                        '<tpl for="this.ownerView.data">',
                            '<li class="promo-reaction {name} {[this.getSharedPostDetails(parent, values.name)]}" promo-reaction="{reaction}"></li>',
                        '</tpl>',
                     '</ul>',
                  '</span>',
                '</div>',
                '</li>',
                '</tpl>',
            '</ul>',
            '</div>',
            '<div class="comment-input-container">',
            '<div class="comment-inner-container">',
            '<table style="width:100%">',
            '<tr>',
            '<td>',
            '<img class="footer-profilepic-cls" src="{[this.getUserProfileImg(values)]}" alt="user face"/>',
            '</td>',
            '<td class="comment-text-cls">',
            '<input type="text" class="comment-input-cls"></input>',
            '</td>',
            '<td class="footer-send-icon {[this.getPostTypeCls(values)]}">',
            //'<img class="footer-send-icon" src="resources/images/feeds/push_Comment.png" alt="Smiley face"/>',

            '</td>',
            '</tr>',
            '</table>',
            '</div>',
            '</div>',
            '</div>',
            '</tpl>',
            '</div>',
            '</tpl>',{

            getClockIcon: function (values) {
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

            getCommentsCount: function(count) {
                return (count.comments.length);
            },
            
            //To set the animation for like heart shaped button to burst-up
            isUserLikedAnim: function (values) {
                if (Utility.likeImgAnim) {
                    var likedUser = Utility.userLiked(values);
                    return likedUser;
                }
                return false;
            },
            isUserLiked: function (values) {
                var likedUser = Utility.userLiked(values);
                return likedUser;
            },

            isLoadIndicator: function (post) {
                return post.post_type === "progressloader" ? true : false;
            },

            getPostTypeImage: function (post) {
                if (post.post_type === "idea") {
                    return "resources/images/feeds/ideate.png";
                }
                return "resources/images/feeds/share-an-update.png";
            },

            getTime: function (postDate) {
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
                    return '<span class="ddo-feeds-time-justnow">Just now</span>';
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
            },

            getUserImg: function (values) {
                if (values.user.user_profile_pic_url) {
                    return Utility.imageCheck(values.user.user_profile_pic_url);

                   
                }
            },

            getUserProfileImg: function (values) {
                var mainviewport = Ext.ComponentQuery.query('mainviewport')[0],
                        mainviewmodel = mainviewport.getViewModel(),
                        profileImg = mainviewmodel.get('profileImg');

                if (profileImg) {
                    return profileImg;
                } else {
                    return Utility.profileImg();
                }

            },

            getSubComment: function (subComment) {
                var urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                    refUrl;

                subComment = subComment.replace(urlRegex, function (url) {
                    if(!url.match(/http/)) {
                        refUrl = "http://" + url;
                    } else {
                        refUrl = url;
                    }

                    return '<a href="' + refUrl + '"  target="_blank">' + url + '</a>';
                });

                return subComment;
            },

            getMoreComments: function (values) {
                if (values.comments.length <= 2) {
                    return '';
                }
                if (values.limit < values.comments.length) {
                    return 'comments';
                } else {
                    return  'Comments';
                }
            },

            getMoreDivHeight: function (values) {
                if (values.comments.length <= 2) {
                    return 'height:0px;padding-top:0px;';
                } else {
                    return 'height:30px;padding-top:10px;';
                }
            },

            getPostContent: function (post_content) {
                if (typeof (post_content) === "object") {
                    post_content = post_content.post_content;
                    var linkContent = post_content.split('undefined');
                    if (linkContent.length === 2) {
                        post_content = linkContent[0] + linkContent[1];
                    } else {
                        post_content = linkContent[0];
                    }
                }
                post_content = post_content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                var urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

                post_content = post_content.replace(urlRegex, function (url) {
                    var refUrl;

                    if(!url.match(/http/)) {
                        refUrl = "http://" + url;
                    } else {
                        refUrl = url;
                    }

                    return '<a href="' + refUrl + '" target="_blank">' + url + '</a>';
                });
                return post_content;
            },

            getImagePostedValuesAccess: function (values) {
                if (values.post_images_path) {
                    return true;
                }
                return false;
            },

            getImagePostedValues: function (values) {
                if (values.post_images_path) {
                    if (Ext.isArray(values.post_images_path)) {
                        return false;
                    }
                    return true;
                }
            },

            getSpace: function (values) {
                if (values.post_title && !Ext.isEmpty(values.post_images_path)) {
                    return true;
                }
            },

            getMultiImages: function (value, access) {
                if (!access) {
                    return value;
                } else {
                    var store = this.owner.getStore(),
                            imgPath, postId;

                    if (store) {
                        store.each(function (rec) {
                            imgPath = rec.data.post_images_path;
                            if(Ext.isArray(imgPath)) {
                                for (var i=0, len=imgPath.length; i<len; i++) {
                                    if (imgPath[i] === value) {
                                        postId = rec.data.post_id;
                                    }
                                }
                            } else {
                                if(imgPath === value) {
                                    postId = rec.data.post_id;
                                }                                
                            }                            
                        }, this);
                    }
                    return postId;
                }
            },

            getSharedPostDetails: function (value, type) {
                var detailsLength = value.post_share_details.length,
                    access, userId;
                if (detailsLength > 0) {
                    userId = Ext.getStore('login').getData().items[0].data.user_id;

                    for (var i = 0; i < detailsLength; i++) {
                        for (var j = 0; j < value.post_share_details[i].share_post_list.length; j++) {
                            if (userId === value.post_share_details[i].share_user_id && value.post_share_details[i].share_post_list[j] === type) {
                                access = true;
                            }
                        }
                    }
                }
                if (access) {
                    return "post-share-exist-cls";
                } else {
                    return "post-share-cls";
                }
            },

            getPostMenuImage: function (post) {
                var login = Ext.getStore('login'),
                    loginData = login.getData().items[0].data,
                    cbpId = parseInt(loginData.cbpid);

                if (post.user.c_bpartner_id === cbpId) {
                    //return  '<img class="post-menu-cls" src="resources/images/feeds/Edit-Arrow.png" alt="Post Type"/>';
                    return  '<span class="post-menu-cls"></span>';
                } else {
                    return "";
                }

            },

            getPostMenuCommentsImage: function (post) {
                var login = Ext.getStore('login'),
                    loginData = login.getData().items[0].data,
                    cbpId = parseInt(loginData.cbpid);

                if (post.user.c_bpartner_id == cbpId) {
                   // return  '<img class="post-menu-comments-cls" src="resources/images/feeds/Edit-Arrow.png" alt="Post Type"/>';
                   return  '<span class="post-menu-comments-cls"></span>';
                } else {
                    return "";
                }

            },
            
            getTaggedImage: function(values) {
                //return 'Tagged'  + '<img class="tagMenu-img" width="16px" height="9px" src="resources/images/feeds/Edit-Arrow.png" alt="Post Type"/>';
                return 'Tagged'  + '<span class="tagMenu-img"></span>';
            },

            reacPosition: function(count) {
                return ((count * 42) === 0) ? 6 : (6 * (count * 7));
            },

            reacContWidth: function(values) {
                if (values.length > 0) {
                    return (values.length * 41) + 1;
                }
            },
            
            reacLikesPosition: function(count) {
                return ((count * 42) === 0) ? 6 : (6 * (count * 7));
            },

            reacLikesContWidth: function(values) {
                if (values.length > 0) {
                    return (values.length * 41) + 1;
                }
            },
            
            getIdeatPost:function(values) {
                if(values.post_type === "idea"){
                     return true;
                }
            },
            
            getTaggedIdeatePost:function(values) {
               if(values.post_type === "idea"){
                 if(values.tagged_group_details && values.tagged_group_details.length > 0){
                    return true;
                 }
               }
            },
             getPostTypeCls: function (post) {
                if (post.post_type === "idea") {
                    return "ideate-send-icon-cls";
                }
                return "post-send-icon-cls";
            }
            
        }
        ],
        itemSelector: 'div.comment-container-cls',
        deferEmptyText: false,
        emptyText: LabelsTitles.HOME.FEEDS.NOFEED,
        listeners: {
            itemclick: "onFeedItemClick",
            beforerender: 'beforeFeedsLoad',
            render: 'afterFeedsLoad',
            itemkeydown: 'onFeedEnterClick',
            beforerefresh: 'beforeAnimFeedsLoad',
            itemkeyup:'onFeedItemKeyUp' 
        }
    }]

});