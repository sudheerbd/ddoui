Ext.define('DDO.view.loginlanding.login.CreateAccount', {
    extend: 'Ext.container.Container',

    xtype: 'createaccount',
    width: '100%',
    height: '100%',
    cls:'main-container-cls',
    requires: [
        'DDO.view.loginlanding.login.CreateAccountModel',
        'DDO.view.loginlanding.LoginCarousel'
    ],
    viewModel: {
        type: 'createaccount'
    },
    layout: {
        type: 'vbox'
    },
    items: [
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
            },{
                xtype:'button',
                cls:'login-button',
                text:'Log In',
                docked:'right',
                handler:'onLoginClick'
            }]
        },{
            xtype:'container',
            layout:'hbox',
            width:'100%',
            cls:'formcontainer-cls',
            items:[{
                xtype: 'form',
                reference: 'form',
                cls:'form-cls',
                items: [{
                        xtype:'label',
                        cls:'createaccount',
                        html:'Create Account<br>'
                },{
                    xtype:'label',
                    cls:'extra-text',
                    html:'Set up your Organization and Build a<br>Performance-Driven culture!'
            },{
                    xtype: 'textfield',
                    name: 'company',
                    allowBlank: false,
                    emptyText: 'Organization Name',
                    emptyCls:'emptytext'
                }, {
                    xtype: 'textfield',
                    name: 'firstname',
                    allowBlank: false,
                    emptyText: 'First Name',
                    emptyCls:'emptytext'
                },{
                    xtype: 'textfield',
                    name: 'lastname',
                    allowBlank: false,
                    emptyText: 'Last Name',
                    emptyCls:'emptytext'
                },{
                    xtype: 'textfield',
                    name: 'email',
                    allowBlank: false,
                    emptyText: 'E-Mail',
                    vtype: 'email',
                    emptyCls:'emptytext'
                },{
                    xtype: 'textfield',
                    name: 'phnum',
                    allowBlank: false,
                    emptyText: 'Mobile Number',
                    emptyCls:'emptytext'
                },{
                    xtype: 'textfield',
                    name: 'otherdesignation',
                    allowBlank: false,
                    emptyText: 'Designation',
                    emptyCls:'emptytext'
                },{
                    xtype:'button',
                    cls:'button-cls',
                    iconCls:'icon',
                    formBind: true,
                    handler:'onAccountRegistration',
                    text: 'Create Account'
                }],
            },{
                xtype: 'loginCarousel'
            }
        ]
            }]
});