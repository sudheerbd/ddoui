Ext.define('DDO.view.feeds.ShareUpdate', {
    extend: 'Ext.container.Container',
    xtype: 'shareupdate',
    requires: [
        'Ext.Spacer',
        'DDO.view.feeds.ShareHeader'
    ],
    cls: 'share-container',
    layout: {
        type: 'vbox'
    },
    items: [{
        xtype: 'panel',
        cls: 'share-update-cls',
        width: '100%',
        items: [{
            xtype: 'textareafield',
            placeHolder: "What's on your mind?",
            reference:'shareupdate',
            cls: 'share-text-cls',
            bind: "{postContent}",
            name: 'feedTextField',
            clearIcon: false
        }, {
            xtype: 'toolbar',
            docked: 'bottom',
            cls: 'share-bootom-toolbar',
            items: [{
                    xtype: 'button',
                    iconCls: 'x-fa fa-paperclip',
                    cls: 'attechment-cls',
                    hidden: true
                }, {
                    xtype: 'button',
                    iconCls: 'x-fa fa-camera',
                    cls: 'camera-cls',
                    hidden: true
                }, {
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    text: 'Update',                    
                    //icon:'resources/images/feeds/share-an-update.png',
                    iconCls:'share-update-btn-icon',
                    //cls: 'share-toolbar-btn',
                    cls:'share-update-btn',
                    test:'standard',                    
                    listeners:{
                        tap: "onShareTypeTap"
                    }
                    
                }, {
                    xtype: 'button',
                    text: 'Ideate',                    
                    test:'idea',
                    //icon:'resources/images/feeds/ideate.png',
                    iconCls:'share-ideate-btn-icon',
                    //cls: 'share-toolbar-btn',                    
                   cls:'share-ideate-btn',
                    listeners:{
                        tap: "onShareTypeTap"
                    }

                }/*, {
                        xtype: 'button',
                        text: 'Post',
                        cls: 'share-toolbar-btn',
                        handler: "onPostButtonTap"
                    }
                 */

            ]
        }]
    }, {
        xtype: 'shareheader'
    }]


});
