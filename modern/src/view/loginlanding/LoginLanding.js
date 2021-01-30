Ext.define('DDO.view.loginlanding.LoginLanding', {
    extend: 'Ext.container.Container',
    xtype: 'loginlanding',
    requires: [
        'DDO.view.loginlanding.LoginHeader',
        'DDO.view.loginlanding.login.LoginViewController',
        'DDO.store.loginlanding.HeaderText'
    ],
    controller: 'loginviewcontroller',
    viewModel: {
        type: "login"
    },
    layout: {
        type: 'fit'
    },
    width: '100%',
    height: '100%',
    scrollable: true,
    bind: {
        style: {
            'background': '{bgColor}'
        }
    },
    items: [{
        xtype: 'container',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'toolbar',
            cls: 'forgotPwdToolbar-cls',
            flex: 0.4,
            reference: 'forgotPwdTollbar',
            items: [{
                xtype: 'button',
                iconCls: 'x-fa fa-arrow-left',
                cls: 'backBtn-cls',
                hidden: true,
                reference: 'backbtn',
                handler: 'showLogin'
            }, {
                xtype: 'label',
                html: 'Login',
                cls: 'forgotLbl-cls',
                reference: 'loginLabel',
                flex: 1
            }]
        }, {
            xtype: 'loginheader',
            flex: 3.0,
            reference: 'loginheaderimage'
        }, {
            xtype: 'carousel',
            flex: 0.5,
            cls: 'DDO-login-carousel',
            itemId: 'carousel_indicator',
            reference: 'carousel_indicator',
            autoSlide: true,
            carouselSlideDelay: 3500,
            defaults: {
                styleHtmlContent: true
            },
            items: [{
                style: '#E94435'
            }, {
                style: '#F8BB15'
            }, {
                style: '#34A751'
            }],
            listeners: {
                show: function() {
                    var carousel = this;                    
                    carousel.pageTurner = new Ext.util.DelayedTask(function() {

                        if (carousel.getActiveIndex() == carousel.items.length - 2) {
                            carousel.setActiveItem(0, 'slide');
                        } else {
                            carousel.next();
                        }
                    }, carousel);
                    carousel.pageTurner.delay(4000);
                },
                activeitemchange: function(value, oldValue, eOpts) {
                    var LoginHeader = this.up('container');
                    var LoginContainer = LoginHeader.up('container');
                    var loginImage = LoginContainer.lookupReference('loginheaderimage');
                    var viewModel = LoginContainer.getViewModel();

                    var headerstore = loginImage.store;
                    var idx = value.activeIndex;

                    loginImage.setActiveItem(idx);
                    viewModel.set('bgColor', headerstore.getAt(idx).data.color);
                    value.pageTurner.delay(4000);
                }
            }
        }, {
            xtype: 'container',
            flex: 2.5,
            reference: 'landingContainer'
        }]
    }],
    initialize: function() {
        viewModel = this.getViewModel(),

            viewModel.set('bgColor', '#E94435');
        this.callParent(arguments);
        var carousel = this.getReferences('carousel_indicator')

        carousel.carousel_indicator.fireEvent('show', this);
    }
});
