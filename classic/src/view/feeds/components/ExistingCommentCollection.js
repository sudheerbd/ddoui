  /**
 * This view is responsible for displaying existing comments list in feeds view.
 * @class 'DDO.view.widget.ExistingCommentCollection'
 * @extends 'Ext.Widget'
 * @alias 'existingCommentcollection'
 */
Ext.define('DDO.view.feeds.components.ExistingCommentCollection', {
    extend: 'Ext.container.Container',

    xtype: 'existingCommentcollection',

    requires: [
        'DDO.view.widget.LoadMoreComments'
    ],

    cls: 'commentMainCls',
    maxHeight:300,
    scrollable:'y',

    config: {
        comments: null
    },

    viewModel: {
        data: {
            isMoreVisible: false,
            isMoreText: false
        }
    },

    items: [{
        xtype: 'loadmorecomments',
        bind: {
            isMoreText: '{isMoreText}',
            isMoreVisible: '{isMoreVisible}'
        }
    }],

    createsubCommentContainer: function(value, index) {
        var commentComponent = this.down('container[commentId=' + value.comment_id + ']');
        if (commentComponent) {
            commentComponent.show();
            var existingComment = commentComponent.down('existingComment');
            existingComment.setImgSrc(this.getUserImg(value));
            existingComment.setName(value.user_full_name);
            existingComment.setComment(this.formatContent(value.comment_content));
            var postcommentduration = commentComponent.down('postcommentduration');
            postcommentduration.setPostDate(value.comment_modified_date);
        } else {
            commentComponent = this.add({
                xtype: 'container',
                maxHeight:'auto',
                // minHeight:'80px',
                name: 'commentContainer',
                layout: 'hbox',
                commentId: value.comment_id,
                items: [{
                    xtype: 'existingComment',
                    ui: 'profile-box',
                    employeeCode: value.comment_author,
                    flex: 0.8,
                    imgSrc: this.getUserImg(value),
                    name: value.user_full_name,
                    comment: this.formatContent(value.comment_content)
                }, {
                    xtype: 'postcommentduration',
                    width: 50,
                    clas:'post-comment-duration',
                    postDate: value.comment_modified_date
                }, {
                    xtype: 'owneredit',
                    userId: value.comment_author,
                    comment: value.comment_id,
                    listeners: {
                        onclickediticon: 'onClickCommentEditIcon'
                    }
                }]
            });
        }
        // var lastCommentIndex = this.ORIGINALCOMMENTS.length;
        // if (index > lastCommentIndex - 3 || this.SHOWALLCOMMENTS) {
        //     commentComponent.show();
        // } else {
        //     commentComponent.hide();
        // }
    },

    updateComments: function(value) {
        var me = this,
            viewModel = me.getViewModel(),
            loadMoreComments = me.down('loadmorecomments');
        //   newComment        = me.down('newcomment');

        if (value && value.length > 0) {
            if (value.length > 2) {
                viewModel.set('isMoreText', true);
                viewModel.set('isMoreVisible', true);
            } else {
                viewModel.set('isMoreText', false);
                viewModel.set('isMoreVisible', false);
            }
            me.ORIGINALCOMMENTS = value;
            me.createComments(value);
        } else {
            me.removeAllComponents();
            loadMoreComments.updateIsMoreVisible(false);
        }
        //   newComment.updateActiveIcon();
    },

    removeAllComponents: function() {
        this.items.each(function(item) {
            if (item.name == "commentContainer") {
                item.destroy();
            }
        });
    },

    createComments: function(value) {
        this.removeAllComponents();
        for (var i = 0; i < value.length; i++) {
            this.createsubCommentContainer(value[i], i);
        }
    },

    getUserImg: function(user) {
        if (user.user_profile_pic_url) {
            return user.user_profile_pic_url;
        }
    },

    formatContent: function(subComment) {
        var urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
            refUrl;

        subComment = subComment.replace(urlRegex, function(url) {
            if (!url.match(/http/)) {
                refUrl = "http://" + url;
            } else {
                refUrl = url;
            }

            return '<a href="' + refUrl + '"  target="_blank">' + url + '</a>';
        });

        return subComment;
    }
});