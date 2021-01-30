Ext.define('DDO.view.loginlanding.login.Login', {
    extend: 'DDO.view.loginlanding.LoginLanding',
    xtype: 'login',

    requires: [
        'DDO.view.loginlanding.login.LoginController',
        'DDO.view.loginlanding.login.LoginModel'
    ],
    initialize: function() {
        var landingContainer;

        this.callParent();
        landingContainer = this.lookupReference('landingContainer');

        landingContainer.add({
            xtype: 'formpanel',
            cls: 'DDO-formPanel-cls',
            reference: 'loginFormReference',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'formpanel',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'textfield',
                    name: 'username',
                    //value:'anil.sandrapati',
                    margin: '0 0 20 0',
                    placeHolder: 'User Id',
                    width: '100%',
                    cls: 'login-userId-cls',
                    clearIcon: true,
                    listeners: {
                        render: 'onLoginEnterClick',
                        afterrender: 'onRenderTextFocus',
                        keyup: function(textfield, e, eOpts) {
                            if (textfield.getValue()) {
                                formlabel = this.up('formpanel').down('label[reference=userId_label]');
                                formlabel.hide(true);
                            }
                        }
                    }
                }, {
                    xtype: 'label',
                    html: '<span class="cross-icon-cls"><img height="20px" width="20px" src="resources/images/cross_icon.jpg"/></span>',
                    cls: 'login-userId-clear',
                    reference: 'userId_label',
                    hidden: true
                }]

            }, {
                xtype: 'formpanel',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'passwordfield',
                    name: 'password',
                    //value:'@nil',
                    placeHolder: 'Password',
                    width: '100%',
                    cls: 'login-password-cls',
                    clearIcon: false,
                    revealable: true,
                    margin: '0 0 20 0',
                    listeners: {
                        render: 'onLoginEnterClick',
                        afterrender: 'onRenderTextFocus',
                        keyup: function(textfield, e, eOpts) {
                            if (textfield.getValue()) {
                                formlabel = this.up('formpanel').down('label[reference=password_label]');
                                formlabel.hide(true);
                            }
                        }
                    }
                }, {
                    xtype: 'label',
                    html: '<span class="cross-icon-cls"><img style="top:54%;right:2%;" height="20px" width="20px" src="resources/images/cross_icon.jpg"/></span>',
                    cls: 'login-password-clear',
                    reference: 'password_label',
                    hidden: true
                }]

            }, {
                xtype: 'label',
                html: 'Forgot Password?',
                cls: 'DDO-forgotPwd-cls',
                itemId: 'forgotlblid',
                listeners: {
                    element: 'element',
                    tap: function(ths, e) {
                        this.up('login').getController('loginviewcontroller').onForgotPasswordTap();
                    }
                }

            }, {
                xtype: 'button',
                text: 'Login',
                cls: 'DDO-loginBtn-cls',
                handler: 'onLoginBtnTap'
            }]
        });
    }
});
