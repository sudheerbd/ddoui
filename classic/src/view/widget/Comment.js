  /**
 * This view is responsible for displaying comments in feeds view.
 * @class 'DDO.view.widget.Comment'
 * @extends 'Ext.Widget'
 * @alias 'comment'
 */
Ext.define('DDO.view.widget.Comment', {
    extend: 'Ext.Widget',

    xtype: 'comment',

    userCls: 'comments',

    config: {
        commentCount: 0
    },

    element: {
        reference: 'element',
        // cls: 'x-fa fa-commenting',
        listeners: {
            click: 'onClickComment'
        },
        children: [
            {
            reference: 'heartelement',
            cls: 'like-heart-container',
            listeners: {
                // click: 'onClickHeartIcon'
            },
            children: [{
                refrence: 'heartInnerElement',
                cls: 'like-heart-animation-container',
                children: [{
                    reference: 'hearSubInnerElement',
                    cls: 'comment-icon-cls'
                }]
            }]
        }, 
         {
            reference: 'commentText',
            cls: 'comment-cls',
            tag: 'span',
            listeners: {
                click: 'onClickCommentsText'
            }

        },{
            reference: 'commentCount',
            cls: 'comment-count-cls',
            tag: 'span'
        },]
    },

    onClickComment: function() {
        this.fireEvent('onnewcommentclick');
    },

    updateCommentCount: function(value) {
        var commentText = "Comment";
        if (value <1) {
            commentText = "Comment";
        }else{
            commentText = "Comments";
        this.commentCount.setHtml("("+value+")");
        }
        this.commentText.setHtml(commentText);
    },

    onClickCommentsText:function(){
        this.fireEvent('onCommentTextClick', this);
    }
});