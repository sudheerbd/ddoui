/**
 * This view is responsible for displaying home page with the feed, navigation and few widgets.
 * @class 'DDO.view.home.Home'
 * @extends 'Ext.container.Container'
 */
Ext.define('DDO.view.home.Home', {
    extend: 'Ext.container.Container',
    requires: [
        'DDO.view.widget.karmscore.KarmaScore',
        'DDO.view.widget.todo.ToDoList',
        'DDO.view.home.PostView',
        'DDO.view.profile.UserProfile',
        'DDO.view.feeds.FeedsView',
        'Ext.window.Toast'
    ],
    
    layout: {
        type: 'hbox'
    },
    items: [{
        xtype: 'button',
        text: LabelsTitles.HOME.TOP,
        focusable:false,//added to remove focus from the scroll button on using the down button
        itemId: 'scrolltopbtn',
        floating: true,
        shadow: false,
        autoShow: true,
        iconCls: 'x-fa fa-angle-up fa-2x',
        cls: 'scrolltop-btn x-floating',
        bind : {
            hidden : '{scrolltopbtn}'
        },
        listeners: {
            click: 'scrollTopBtn',
            show : 'onShowScrollTopBtn',
            beforehide : 'onHideScrollTopBtn'
        }
    }, {
        xtype: 'feedsview',
        width:Constants.ViewportWidth * 0.541
    }, {
        xtype: 'postview',
        width:Constants.ViewportWidth * 0.205,
        height: 1720,
        style:{
            'margin-left': '10px'
        }
    }]
});