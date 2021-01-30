Ext.define('DDO.view.loginlanding.login.Login', {
    extend: 'DDO.view.loginlanding.LoginLanding',

    xtype: 'login',
    width: '50%',
	height: 210,

    requires: [
        'DDO.view.loginlanding.login.LoginController',
        'DDO.view.loginlanding.login.LoginModel',
        'DDO.view.loginlanding.LoginCarousel',
        'DDO.view.forgotpassword.ForgotPasswordWindow'
    ],

    controller: 'login',
    viewModel: {
        type: 'login'
    },

    initComponent: function() {
        var landingContainer;
        this.callParent();

        landingContainer = this.lookupReference('landingContainer');

        landingContainer.add({
            xtype:'loginCarousel'
            
            // height: '140px',
            // margin: '0px 0px 0px 270px',
            // cls: 'DDO-loginFormCls',

            // layout: {
            //     type: 'hbox',
            //     align: 'center'
            // },

            // plugins: 'responsive',

            // responsiveConfig: {
            //     'width <= 810': {
            //         width: '100%'
            //     },
            //     'width > 810': {
            //         width: '50%'
            //     }
            // },

            // items: [
            //     {
            //         xtype: 'button',
            //          align:'center',
            //          width: 160,
            //          height: 39,
            //          text: 'Create Account',
            //          cls: 'createaccountbtn',
            //          handler: 'onCreateAccount'
                    
            //      },
            //      {
            //     xtype: 'button',
            //     width: 191,
            //     hidden: true,
            //     height: 55,
            //     cls: 'DDO-linkendinCls',
            //     listeners: {
            //         click: 'onLinkedinBtnClick'
            //     }
            // },
            //  {
            //     xtype: 'component',
            //     cls: 'DDO-orStatement',
            //     hidden: true,
            //     width: 320,
            //     html: '<div class="or-outer-div"><div class="or-seperator">OR</div></div>'
            // }, {
            //     xtype: 'textfield',
            //     name: 'username',
            //     margin: '5 0 5 0',
            //     // vtype: 'email',
            //     emptyText: 'Username',
            //     blankText: 'Username is required',
            //     cls: 'DDO-txtbx',
            //     allowBlank: false,
            //     hidden: true,
            //     listeners: {
            //         render: 'onLoginEnterClick',
            //         afterrender: 'onRenderTextFocus'
            //     }

            // }, {
            //     xtype: 'textfield',
            //     name: 'password',
            //     margin: '5 0 5 0',
            //     emptyText: 'Password',
            //     inputType: 'password',
            //     blankText: 'Password is required',
            //     allowBlank: false,
            //     hidden: true,
            //     cls: 'DDO-txtbx',
            //     listeners: {
            //         render: 'onLoginEnterClick'
            //     }
            // }, 
            // {
            //     xtype: 'button',
            //     text: 'Login',
            //     width: 160,
            //     height: 39,
            //     // align:'center',
            //     // formBind: true,
            //     cls: 'DDO-loginBtnCls',
            //     handler: 'onLoginClick'
            // }, {
            //     html: '<div class="DDO-forgotContent">Forgot&nbsp;Password?</div>',
            //     cls: 'DDO-forgot',
            //     listeners: {
            //         click: {
            //             element: 'el',
            //             fn: 'onForgotPasswordEleClick'
            //         }
            //     }
            // }]
        });
    }
});