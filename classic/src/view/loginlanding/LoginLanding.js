Ext.define('DDO.view.loginlanding.LoginLanding', {
    extend: 'Ext.container.Container',
    xtype: 'loginlanding',
    reference:'loginlanding',
    height:'100%',
    requires: [
        'DDO.view.loginlanding.Greeting',
        'DDO.view.loginlanding.LoginHeader',
        'DDO.view.loginlanding.LoginLandingModel',
        'DDO.view.loginlanding.LoginLandingController',
        'DDO.view.loginlanding.createaccount.CreateAccountWindow'
    ],
    viewModel: {
        type: 'loginlanding'
    },
    controller:'loginlanding',

    items: [
        {
            xtype:'container',
            height:'100%',
            width:'100%',
            cls:'landing-main-container',
            items:[
                {
                    xtype: 'toolbar',
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
                    }]
                },{
                    xtype: 'container',
                    height:'100%',
                    // width:'100%',
                    cls:'landingContainer',
                    reference: 'landingContainer',
                        layout: {
                            type: 'hbox'
                        },
                        items:[{
                        xtype: 'form',
                        height:'100%',
                        cls:'createaccount',
                        width:'50%',
                        // layout: {
                        //     type: 'hbox'
                        //     // align: 'center'
                        // },
            
                        items: [
                            {
                                xtype:'label',
                                html:'Welcome To EngazeWell<br>',
                                cls:'labeltext'
                            },{
                                xtype:'label',
                                cls:'extra-text',
                                html:'The Most Effective Employee Engagement Solution'
                            },
                            {
                                xtype:'container',
                                layout:'hbox',
                                cls:'btns-container',
                                items:[{
                                    xtype: 'button',
                                    text: 'Create Account',
                                    cls: 'createaccountbtn',
                                    handler: 'onCreateAccount'
                                },{
                                    xtype: 'button',
                                    text: 'Login',
                                    cls: 'loginbtn',
                                    handler: 'onLoginClick'
                                }]
                                   
                            }
                                ]
                                 
                                
                             }]
                        }
            ]
        }
        ]
});
