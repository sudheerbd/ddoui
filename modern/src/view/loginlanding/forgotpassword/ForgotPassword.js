Ext.define('DDO.view.loginlanding.forgotpassword.ForgotPassword', {
    //extend: 'DDO.view.loginlanding.LoginLanding',
    extend: 'Ext.Container',
    xtype: 'forgotpassword',

    requires: [
        'DDO.view.loginlanding.login.LoginController',
        'DDO.view.loginlanding.login.LoginModel'
    ],
    initialize: function() {
        /*var landingContainer;

        this.callParent();

        landingContainer = this.lookupReference('landingContainer');
        this.lookupReference('loginLabel').setHtml('Forgot Password');
        this.lookupReference('backbtn').show();

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
                    margin: '0 0 20 0',
                    placeHolder: 'Email',
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
                    html: '<span class="cross-icon-cls"><img height="20px" width="20px"  src="resources/images/cross_icon.jpg"/></span>',
                    cls: 'login-userId-clear',
                    reference: 'userId_label',
                    hidden: true
                }]

            }, {
                xtype: 'button',
                text: 'Submit',
                cls: 'DDO-loginBtn-cls'
            }]
        });*/
    }
});
