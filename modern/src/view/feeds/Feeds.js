Ext.define('DDO.view.feeds.Feeds', {
    extend: 'Ext.dataview.component.DataItem',
    alias: 'widget.feedlistitem',
    xtype: 'feedlistitem',
    requires: [
        'Ext.Img'
    ],
    config: {
        postType: {
            xtype: 'image',
            docked: 'right',
            cls: 'ideate-cls'
        },
        avatar: {
            docked: 'left',
            cls: 'header-profilepic-cls'
        },
        userName: {
            cls: 'header-username-cls'
        },
        feed: {
            cls: 'comment'
        },
        footer: {
            cls: 'user-footer-cls'
        }
    },
    applyUserName: function(config) {
        return Ext.factory(config, Ext.Component, this.getUserName());
    },

    updateUserName: function(newUserName) {
        if (newUserName) {
            this.insert(0, newUserName);
        }
    },
    applyFeed: function(config) {
        return Ext.factory(config, Ext.Component, this.getFeed());
    },

    updateFeed: function(newFeed) {
        if (newFeed) {
            this.insert(1, newFeed);
        }
    },
    applyFooter: function(config) {
        return Ext.factory(config, Ext.Component, this.getFooter());
    },

    updateFooter: function(newFooter) {
        if (newFooter) {
            this.insert(2, newFooter);
        }
    },

    applyAvatar: function(config) {
        return Ext.factory(config, Ext.Img, this.getAvatar());
    },

    updateAvatar: function(newAvatar) {
        if (newAvatar) {
            this.add(newAvatar);
        }
    },

    applyPostType: function(config) {
        return Ext.factory(config, Ext.Img, this.getPostType());
    },

    updatePostType: function(newPostType) {
        if (newPostType) {
            this.add(newPostType);
        }
    },

    updateRecord: function(record) {
        if (!record) {
            return;
        }
        var prfImg;

        this.getUserName().setHtml(this.frameHeader(record));

        prfImg = record.get('user').user_profile_pic_url || Utility.gravatarImageUrl(record.get('user').user_emilid);

        this.getAvatar().setSrc(prfImg);
        this.getPostType().setSrc(this.getPostTypeImage(record));
        this.getFeed().setHtml(this.getPostContent(record.get('post_content')));
        this.getFooter().setHtml(this.frameFooter(record));
        this.callParent(arguments);

    },
    getPostContent: function(post_content) {
        if (typeof(post_content) === "object") {
            post_content = post_content.post_content;
        }
        post_content = post_content.replace(/(?:\r\n|\r|\n)/g, '<br />');
        post_content = post_content.replace(/ /g, '&nbsp;');
        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        post_content = post_content.replace(urlRegex, function(url) {
            return '<a href="' + url + '"  target="_blank">' + url + '</a>';
        });
        return post_content;
    },

    getPostTypeImage: function(post) {
        if (post.get('post_type') === "idea") {
            return "resources/images/feeds/ideate.png";
        }
        return "resources/images/feeds/share-an-update.png";
    },

    getTime: function(record) {
        var one_day = 1000 * 60 * 60 * 24,
            postGmt = new Date(record.get('post_date')),
            postTimeMiliseconds = postGmt.getTime(),
            currentDate = new Date(),
            currentTimeMiliseconds = currentDate.getTime(),
            difference_ms = currentTimeMiliseconds - postTimeMiliseconds,
            days = Math.round(difference_ms / one_day);
        if (difference_ms < 60000) {

            return 'Now';
        } else if (difference_ms < 3600000) {
            minuteDifference = (difference_ms / (60 * 1000));
            minute = Math.floor(minuteDifference);
            return minute + 'm'
        } else if (difference_ms < 86400000 && difference_ms > 3600000 && days < 1) {
            hoursDifference = (difference_ms / (60 * 60 * 1000));
            hours = Math.floor(hoursDifference);
            return hours + 'h';
        } else {
            return days + 'd';
        }
    },

    frameHeader: function(post) {
        return '<span class="uname-cls">' + post.get('user').user_full_name + '</span><span class="minus-gray">&nbsp;</span><span class="header-designation-cls">' + post.get('user').user_designation + '</span><br/><div class="header-from-now">' + this.getTime(post) + '</div>';
    },

    frameFooter: function(post) {
        return '<ul><li><div class="like-heart-container"><div class="like-heart-animation-container"><div class="like-heart-animation ' + this.isUserLiked(post) + " " + this.isUserLikedAnim(post) + '"></div></div></div><span class="like-cls">' + this.getPostLikeCount(post) + ' ' + this.getLikeLabel(post) + '</span></li><li class="x-fa fa-commenting"><span>' + this.getCommentsCount(post) + '</span><span class="comment-cls">' + this.getCommentLabel(post) + '</span></li></ul>';
    },

    //To set the animation for like heart shaped button to burst-up
    isUserLikedAnim: function(values) {
        if (Utility.likeImgAnim) {
            var likedUser = Utility.mobileUserLikedAnim(values.data);
            return likedUser;
        }
        //return false;
    },
    isUserLiked: function(values) {
        var likedUser = Utility.mobileUserLiked(values.data);
        return likedUser;
    },
    getLikeLabel: function(post) {
        var likeLabel = post.get('post_like_count');
        if (likeLabel > 1) {
            return 'Likes';
        } else {
            return 'Like';
        }
    },
    getCommentLabel: function(post) {
        var commentLabel = post.get('comments').length;
        if (commentLabel > 1) {
            return 'Comments';
        } else {
            return 'Comment';
        }
    },
    getCommentsCount: function(post) {
        var postComment = post.get('comments').length;
        if (postComment) {
            return postComment;
        } else {
            return ''
        }
    },
    getPostLikeCount: function(post) {
        var postLike = post.get('post_like_count');
        if (postLike) {
            return postLike;
        } else {
            return ''
        }
    }
});