  /**
 * This view is responsible for displaying likes and related activity in feeds view.
 * @class 'DDO.view.widget.Share'
 * @extends 'Ext.Widget'
 * @alias 'share'
 */
Ext.define('DDO.view.widget.Share', {
    extend: 'Ext.Widget',

    xtype: 'share',

    userCls: 'share',

    config: {
        dataRec: null,
        hideComponent: null,
        shareVisibility: false,
        reactionBoxComponent: null
    },

    element: {
        reference: 'element',
        cls: 'promo-main-share-div-wrap',
        children: [{
            reference: 'promoShareBtn',
            tag: 'SPAN',
            cls: 'promo-share-btn',
            children: [{
                reference: 'shareImg',
                tag: 'IMG',
                src: 'resources/images/share.svg',
                width: '16px',
                height: '16px',
                cls: 'promo-share-media-logo'
            }, {
                reference: 'shareText',
                tag: 'SPAN',
                html: 'Share',
                cls: 'promo-share-btn-text'
            }, {
                reference: 'reactionBox',
                tag: 'UI',
                cls: 'promo-reactions-box promo-reactions-share-box',
                listeners: {
                    click: {
                        fn: 'onActivityClick',
                        scope: this,
                        delegate: '.promo-reaction'
                    }
                }
            }]
        }]
    },

    onActivityClick: function(evt, ele) {
        if (ele.classList.contains('post-share-cls')) {
            var reactionValue = ele.getAttribute('promo-reaction');

            this.fireEvent('onsharebtnclick', reactionValue);
        }
    },

    updateHideComponent: function(value) {
        if (value == 'Y') {
            this.element.show();
            this.setShareVisibility(true);
            this.element.dom.style.display = 'inline-block';
        } else {
            this.element.hide();
            this.setShareVisibility(false);
            this.element.dom.style.display = 'none';
        }
    },

    updateReactionBoxComponent: function(values) {
        if (this.getShareVisibility()) {
            var me, shareUlTagEl, widthBox;

            me = this;
            shareUlTagEl = me.reactionBox;

            widthBox = (values.data.length * 41) + 1;
            shareUlTagEl.setWidth(widthBox + 'px');

            me.insertShareTagReactions(values.data);
        }
    },

    insertShareTagReactions: function(values) {
        if (this.getShareVisibility()) {
            var me, cssText, template;
            me = this;
            cssText = '';
            me.reactionBox.setHtml('');
            template = new Ext.Template('.{name}{ left: {left}px;transition-delay: {delay}s; background: url("{imgsrc}") 0 0/cover;}.promo-share-btn:hover .{name} {animation-delay: {delay}s}.{name}::before {content: "{reaction}"}');

            for (var i = 0; i < values.length; i++) {
                var activityExistCls = me.getSharedPostDetails(this.getDataRec(), values[i].reaction);

                this.reactionBox.insertHtml('beforeEnd', '<li class="promo-reaction ' + values[i].name + ' ' + activityExistCls + ' " promo-reaction=' + values[i].reaction + '></li>');
                values[i].left = ((i * 42) === 0) ? 6 : (6 * (i * 7));
                cssText += template.apply(values[i]);
            }

            if (!document.getElementById('ShareAnimCss')) {
                Ext.util.CSS.createStyleSheet(cssText, 'ShareAnimCss');
            }
        }
    },

    getSharedPostDetails: function(value, type) {

        var detailsLength = (value) ? value.length : 0,
            access, cbpId;
        if (detailsLength > 0) {
            cbpId = Ext.getStore('login').getData().items[0].data.ddo_employee_id;

            for (var i = 0; i < detailsLength; i++) {
                for (var j = 0; j < value[i].share_post_list.length; j++) {
                    if (cbpId === value[i].share_user_id && value[i].share_post_list[j] === type) {
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
    }
});