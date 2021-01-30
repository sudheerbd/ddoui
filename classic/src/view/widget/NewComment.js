  /**
 * This view is responsible for displaying new comment in feeds view.
 * @class 'DDO.view.widget.NewComment'
 * @extends 'Ext.Widget'
 * @alias 'newcomment'
 */
Ext.define('DDO.view.widget.NewComment', {
    extend: 'Ext.Widget',

    xtype: 'newcomment',

    config: {
        isIdeate: true
    },

    cachedConfig: {
        userProfilePicture: ''
    },

    cls: 'comment-input-container',

    element: {
        reference: 'element',
        cls: 'comment-inner-container',
        children: [{
            tag: 'table',
            children: [{
                reference: 'tr',
                tag: 'tr',
                children: [{
                    tag: 'td',
                    children: [{
                        reference: 'profilePicture',
                        tag: 'img',
                        cls: 'footer-profilepic-cls',
                        onerror: Utility.defaultUserImg,
                        alt: "user face"
                    }]
                }, {
                    tag: 'td',
                    reference: 'inputWrapElement',
                    cls: 'comment-text-cls',
                    children: [{
                        reference: 'inputElement',
                        tag: 'input',
                        placeholder:'Write a Comment...',
                        cls: 'comment-input-cls',
                        listeners: {
                            keyup: 'onInputKeyUp',
                            mousedown: 'onInputMouseDown'
                        }
                    }]
                }, {
                    // reference: 'sendElement',
                    // tag: 'button',  
                    // text:'Send',
                    // iconCls:"send-icon",
                    // cls: 'footer-send-icon',
                    // listeners: {                                                                             
                    //     click: 'onClickSend'
                    // }
                    reference: 'innerEl',
                    tag:'div',
                    cls:'send-element-divs',
                    children: [
                        {
                        reference: 'sendElementIcon',
                        cls: 'sendEl',
                        listeners: {
                            // click: 'onClickHeartIcon'
                        },
                        children: [{
                            refrence: 'sendInnerElement',
                            // cls: 'like-heart-animation-container',
                            children: [{
                                reference: 'sendSubInnerElement',
                                cls: 'send-icon'
                            }]
                        }]
                    }, {
                        reference: 'sendElement',
                        tag: 'SPAN',
                        cls: 'send-text-cls',
                        html:'Send',
                        listeners: {
                            click: 'onClickSend'
                        }
                    },]
                   
                }]
            }]
        }]
    },

    onInputMouseDown: function(e) {
        //this.inputElement.focus(false, 100);
        Ext.defer(function() {
            this.inputElement.focus();
        }, 100, this);
    },

    onInputKeyUp: function(e) {
        if (e.keyCode === 13 || e.getCharCode() === 13) {
            this.fireEvent('oncommentsubmit');
        }
        this.updateActiveIcon();
    },

    onClickSend: function() {
        this.fireEvent('oncommentsubmit');
    },

    updateIsIdeate: function(isIdeate) {
        var sendElement = this.sendElement,
            sendCls = "post-send-icon-cls";
        if(sendElement){
        if (isIdeate) {
            sendElement.removeCls('post-send-icon-cls');
            sendCls = "ideate-send-icon-cls";
        } else {
            sendElement.removeCls('ideate-send-icon-cls');
        }
        if (!sendElement.hasCls(sendCls)) {
            sendElement.addCls(sendCls);
        }
    }
    },

    updateUserProfilePicture: function(value) {
        this.profilePicture.dom.src = value;
    },

    updateActiveIcon: function(e) {
        var me = this,
            ele = me.element;

        if (this.inputElement.getValue()) {
            if (!ele.hasCls('send-icon-cls')) {
                ele.addCls('send-icon-cls');
            }
        } else {
            ele.removeCls('send-icon-cls');
        }
    },
    
    resetCommentData: function() {
        this.inputElement.dom.value = "";
        this.updateActiveIcon();
    }
});