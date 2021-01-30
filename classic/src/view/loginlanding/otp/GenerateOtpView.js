Ext.define('DDO.view.loginlanding.otp.GenerateOtpView', {
    extend: 'Ext.container.Container',
    xtype: 'generateotp',
    width: '100%',
    height: '100%',
    cls:'otpview-cls',
    requires: [
        'DDO.view.loginlanding.LoginCarousel'
    ],
    viewModel: {
        type: 'createaccount'
    },
    items: [
        {
            xtype: 'toolbar',
            width:'100%',
            cls: 'sencha-dash-headerbar',
            width: '100%',
            itemId: 'headerBar',
            items: [{
                xtype: 'component',
                reference: 'senchaLogo',
                cls: 'sencha-logo',
                bind: {
                    html: '<div class="main-logo"><img src="{companyLogoUrl}" alt="Walking Tree"></div>'
                },
                width: Constants.ViewportWidth * 0.147
            },{
                xtype:'button',
                cls:'login-button',
                text:'Log In',
                handler:'onLoginClick'
            }]
        },{
            xtype:'container',
            layout:'hbox',
            width:'100%',
            height:'100%',
            cls:'inner-container-cls',
            items:[{
                xtype: 'form',
                reference: 'form',
                width:'40%',
                cls:'otp-form-cls',
                items: [{
                        xtype:'label',
                        cls:'labelcls',
                        html:'Verify OTP<br>'
                },{
                    xtype:'label',
                    cls:'extra-text',
                    reference:'extratext',
                    html:'OTP will be sent to your Mobile Number<br>or EmailID'
            },
            // {
            //     xtype:'label',
            //     cls:'after-validation',
            //     reference:'aftervalidate',
            //     html:'OTP Validated Succesfully.<br>Please Login.',
            //     hidden: true
            // },
            {
                    xtype: 'textfield',
                    name: 'otp',
                    reference:'otp',
                    allowBlank: false,
                    emptyText: 'Enter OTP',
                    hidden: false,
                    emptyCls:'emptytext'
                },{
                    // xtype:'label',
                    // cls:'resendotp',
                    // html:'Resend OTP',
                    // listeners : {
                    //     click : 'resendOtp'
                    // }
                    xtype: 'button', 
                    cls:'resendotp',
                    text: 'Resend OTP', 
                    reference:'resendotp',
                    hidden: false,
                    handler:'onResendOtp'
            },{
                    xtype:'button',
                    cls:'button-cls',
                    iconCls:'icon',
                    // formBind: true,
                    reference:'confirmotp',
                    text: 'Confirm',
                    hidden: false,
                    handler:'onConfirmOtp'
                }]
            },{
                xtype: 'loginCarousel'
            }
        ]
    }]
});