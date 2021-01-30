/**
 * This class provides the modal Ext.Window support for all Authentication forms.
 * It's layout is structured to center any Authentication dialog within it's center,
 * and provides a backGround image during such operations.
 */
Ext.define('DDO.view.login.LoginView', {
    extend: 'Ext.container.Container',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.plugin.Responsive',
        'DDO.view.main.Viewport',
        'DDO.view.loginlanding.login.Login',
        'DDO.view.loginlanding.forgotpassword.ForgotPassword',
        'DDO.view.vendoraccessapp.FindApplication'
    ],

    xtype: 'loginview',
    reference: 'loginview',

    layout: {
        type: 'card'
    },
    // activeItem: 1,

    items: [{
        html: '<h3>Loading, Please wait..</h3>'
    },{
        xtype: 'login',
        reference: 'login'
    },{
        xtype: 'forgotpassword',
        reference: 'forgotpassword'
    }, {
        xtype: 'mainviewport',
        reference: 'mainviewport'
    },{
        xtype:'findapplication',
        reference: 'findapplication'
    }]
});