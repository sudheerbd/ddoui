/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DDO.view.main.Viewport', {
    extend: 'Ext.Container',

    xtype: 'mainviewport',

    requires: [
        'DDO.view.widget.karmascore.KarmaScoreList',
        'DDO.view.feeds.FeedsView',
        'DDO.view.main.Menu',
        'DDO.view.widget.todo.ToDoContainer',
        'DDO.view.main.ViewportModel',
        'DDO.view.main.ViewportController',
        'DDO.view.profile.UserProfile'
    ],

    controller: 'mainviewport',
    reference: 'mainviewport',
    viewModel: {
        type: 'mainviewport'
    },

    layout: {
        type: 'fit'
    },
    cls: 'ddo-maincontainer',
    hideOnMaskTap: true,

    items: [{
        xtype: 'toolbar',
        cls: 'ddo-main-toolbar',
        itemId: 'mainvieporttoolbar',
        docked: 'top',
        layout: 'hbox',
        height: 70,
        items: [{
            xtype: 'image',
            reference: 'senchaLogo',
            cls: 'ddo-sencha-logo',
            src: 'resources/images/wtc_logo.png',
            listeners: {
                tap: 'onModernImageLogoClick'
            }
        }, {
            xtype: 'textfield',
            flex: 1,
            hidden: true,
            cls: 'ddo-search-textfield',
            reference: 'searchtextfield'
        }, '->', {
            xtype: 'button',
            text: 'Text',
            itemId: 'headertitle',
            reference: 'headertitle',
            bind: {
                cls: 'headerTitle {headerTitleCls}',
                text: '{titleName}'
            }
        }, {
            iconCls: 'x-fa fa-search',
            cls: 'ddo-searchicon-cls',
            reference: 'searchicon',
            handler: 'onSearchButton',
            hidden: true
        }, '->', {
            xtype: 'button',
            cls: 'ddo-header-right-profile-image-button',
            height: 45,
            width: 45,
            arrowVisible: false,
            alt: 'Current user image',
            bind: {
                style: {
                    'background': 'url("{profileImg}") 0 0/cover no-repeat',
                    'border': 0
                },
                hidden: '{profileBtnMobileVisible}'
            },
            handler: 'onModernProfileBtnClick'
        }]
    }, {
        xtype: 'container',
        activeItem: 0,
        reference: 'mainviewcontainer',
        itemId: 'mainviewcontainer',
        layout: {
            type: 'card'
        },
        items: [{
            xtype: 'tabpanel',
            reference: 'tabpanel',
            tabBarPosition: 'bottom',
            ui: 'tabui',
            cls: 'ddo-maintab',
            defaults: {
                tab: {
                    layout: {
                        type: 'hbox'
                    },
                    flex: 1,
                    iconAlign: 'center'
                        //width:85,
                },
                listeners: {
                    activate: 'onTabChange'
                }
            },
            tabBar: {
                //minWidth :500,
                //iconAlign:'center',
                cls: 'mainview-tab-cls'
            },
            items: [{
                xtype: 'feedsview',
                iconCls: 'x-fa fa-home',
                scrollable: 'y'
            }, {
                xtype: 'karmascorelist',
                titleName: 'Karma Score',
                iconCls: 'ddo-karmaicon',
                scrollable: 'y'
            }, {
                xtype: 'todocontainer',
                titleName: 'To-Do',
                iconCls: 'x-fa fa-hourglass-half',
                scrollable: 'y'
            }, {
                xtype: 'mainmenu',
                iconCls: 'x-fa fa-bars',
                scrollable: 'y'
            }]
        }, {
            xtype: 'userprofile',
            reference: 'userprofile'
        }]
    }],

    listeners: {
        painted: 'onBoxReady'
    }
});