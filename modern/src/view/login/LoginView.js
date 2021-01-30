Ext.define('DDO.view.login.LoginView', {
    extend: 'Ext.Container',

    requires: [
        'DDO.view.loginlanding.login.Login',
        'DDO.view.main.Viewport',
        'DDO.view.login.LoadingMask',
        'DDO.view.loginlanding.forgotpassword.ForgotPassword'
    ],

    xtype: 'loginview',
    reference: 'loginview',
    cls: 'login-cls',

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'container',
        activeItem: 5,
        reference: 'logincontainer',
        itemId: 'logincontainer',
        layout: {
            type: 'card'
        },
        items: [{
            xtype: 'login',
            reference: 'login'
        }, {
            xtype: 'mainviewport',
            reference: 'mainviewport'
        }, {
            xtype: 'forgotpassword',
            reference: 'forgotpasword'
        }, {
            xtype: 'userprofile',
            reference: 'userprofile'
        }, {
            xtype: 'loadingmask',
            reference: 'loadingmask'
        },
        {
        html: ''
        }]
    }]
});