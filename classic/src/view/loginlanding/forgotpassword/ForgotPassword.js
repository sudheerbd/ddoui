Ext.define('DDO.view.loginlanding.forgotpassword.ForgotPassword', {
    extend: 'DDO.view.loginlanding.LoginLanding',
    xtype: 'forgotpassword',
    
    requires: [
        'DDO.view.loginlanding.forgotpassword.ForgotPasswordController',
        'DDO.view.loginlanding.forgotpassword.ForgotPasswordModel'
    ],

    controller: 'forgotpassword',
    viewModel: {
        type: 'forgotpassword'
    },

    initComponent: function() {
        var landingContainer;
        this.callParent();
        landingContainer = this.lookupReference('landingContainer');
        landingContainer.add({
            xtype: 'container',
            height: 270,
            cls: 'DDO-loginFormCls',
            layout: {
                type: 'vbox',
                align: 'middle'
            },
            plugins: 'responsive',
            responsiveConfig: {
                'width <= 810': {
                    width: '100%'
                },
                'width > 810': {
                    width: '50%'
                }
            },
            items: [{
                xtype: 'component',
                html: 'Forgot Password',
                width: 216,
                height: 36,
                cls: 'DDO-forgotPasswordTitle'

            }, {
                xtype: 'textfield',
                name: 'username',
                margin: '21 0 5 0',
                emptyText: 'Email',
                cls: 'DDO-txtbx'

            }, {
                xtype: 'component',
                html: '"You will receive a password reset link"',
                cls: 'DDO-forgot'
            }, {
                xtype: 'button',
                text: 'Submit',
                width: 156,
                height: 37,
                cls: 'DDO-loginBtnCls'
            }, {
                html: '<div><a href="#login" class="DDO-forgotContent"><&nbsp;Back&nbsp;To&nbsp;Login</a></div>',
                cls: 'DDO-forgot'
            }]

        });
    }
});
