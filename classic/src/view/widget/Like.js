  /**
 * This view is responsible for displaying likes and related activity in feeds view.
 * @class 'DDO.view.widget.Like'
 * @extends 'Ext.Widget'
 * @alias 'like'
 */
Ext.define('DDO.view.widget.Like', {
    extend: 'Ext.Widget',

    xtype: 'like',

    userCls: 'like',

    config: {
        isLiked: true,
        totalNumberOfLikes: null,
        promoReactionData: null,
        postType: null
    },

    element: {
        cls: 'promo-like-btn',
        reference: 'element',
        children: [{
            reference: 'innerEl',
            children: [{
                reference: 'heartelement',
                cls: 'like-heart-container',
                listeners: {
                    click: 'onClickHeartIcon'
                },
                children: [{
                    refrence: 'heartInnerElement',
                    cls: 'like-heart-animation-container',
                    children: [{
                        reference: 'hearSubInnerElement',
                        cls: 'like-heart-animation'
                    }]
                }]
            }, {
                reference: 'likedTextElement',
                tag: 'SPAN',
                cls: 'like-cls',
                listeners: {
                    click: 'onClickLikeText'
                }
            }, {
                reference: 'likedNumberEl',
                tag: 'SPAN',
                cls: 'hearNumberCls'
            }, {
                tag: 'ul',
                cls: 'promo-reactions-box',
                reference: 'mainLikeAnimation',
                listeners: {
                    click: {
                        fn: 'onClickImage',
                        scope: this,
                        delegate: '.promo-reaction'
                    }
                }
            }]
        }]
    },

    onClickImage: function(e, ele) {
        this.fireEvent('onreactionlikeclick', ele.getAttribute('promo-reaction'));
    },

    onClickHeartIcon: function() {
        this.fireEvent('onhearticonclick');
    },

    onClickLikeText: function(event) {
        this.fireEvent('onliketextclick', this);
    },

    updateTotalNumberOfLikes: function(value, oldValue) {
        var likedText = "Likes";
        // this.likedNumberEl.setHtml(value);
        if (value < 1) {
            likedText = 'Like';
        }else{
            likedText = 'Like  ('+value+')'
        }
        this.likedTextElement.setHtml(likedText);
    },

    updateIsLiked: function(value, oldValue) {
        var headerElement = this.hearSubInnerElement;
        if (Utility.userLiked(value)) {
            headerElement.addCls('like-heart-active');

            //Only when like heart image animation needed
            if (Utility.likeImgAnim) {
                headerElement.addCls('likeAnim');
            } else {
                //remove the likeAnim cls
                headerElement.removeCls('likeAnim');
            }

        } else {
            headerElement.removeCls('like-heart-active');
            headerElement.removeCls('likeAnim');
        }
    },

    updatePromoReactionData: function(values) {
        var me = this,
            likeEle = me.mainLikeAnimation;
        //if (values.length > 0 && this.getPostType() == "idea") {
        var width = (values.length * 41) + 1;
        likeEle.setWidth(width + 'px');
        me.insertLikeReactions(values);
        //likeEle.removeCls('hideComponent');
        //}else{
        //  if(!likeEle.hasCls('hideComponent')){
        //      likeEle.addCls('hideComponent');
        // }

        //}
    },

    insertLikeReactions: function(values) {
        var cssText = '';

        this.mainLikeAnimation.setHtml('');

        var template = new Ext.Template('.{name}{ left: {left}px;transition-delay: {delay}s; background: url("{imgsrc}") 0 0/cover;}.promo-like-btn:hover .{name} {animation-delay: {delay}s}.{name}::before {content: "{reaction}"}');
        for (var i = 0; i < values.length; i++) {

            this.mainLikeAnimation.insertHtml('beforeEnd', '<li class="promo-reaction ' + values[i].name + '" promo-reaction=' + values[i].value + '></li>');
            values[i].left = ((i * 42) === 0) ? 6 : (6 * (i * 7));
            cssText += template.apply(values[i]);
        }
        if (!document.getElementById('LikeAnimCss')) {
            Ext.util.CSS.createStyleSheet(cssText, 'LikeAnimCss');
        }
    }
});