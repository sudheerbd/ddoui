/**
 *   This file is responsible for Account.
 *   @extends {Ext.form.Panel}
 *   @alias widget.account
 *   ViewModel :  'DDO.view.setup.AccountViewModel'
 *   ViewController :'DDO.view.setup.AccountViewController'.
 */
Ext.define('DDO.view.setup.Account', {
    extend: 'Ext.form.Panel',
    alias: 'widget.account',
    requires: [
        'DDO.view.setup.AccountViewController',
        'DDO.view.setup.AccountViewModel',
        'DDO.view.setup.AccountDetail',
        'DDO.util.AmazonS3'
    ],
    controller: 'accountviewcontroller',
    viewModel: {
        type: 'accountviewmodel'
    },
    initComponent: function () {
        this.callParent(arguments);
        var store = Ext.getStore('setup.AccountStore');
            var me = this;
        if (!store.isLoaded()) {
            Utility.accountInitialLoad(me);
        }
    },
    title: LabelsTitles.EMPSETUP.ACCOUNT.ACCOUNT,
    reference: 'accountform',
    cls: 'accountview-cls',
    margin: '20 10 10 10',
    bodyPadding: 10,
    layout: {
        type: 'vbox'
    },
    items: [{
        width: '100%',
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'tbfill'
        }, {
            xtype: 'form',
            items: [
                {
                xtype: 'image',
                height: Constants.ViewportHeight * 0.07,
                width: Constants.ViewportWidth * 0.14,
                padding: '0 30 0 0',
                alt: LabelsTitles.EMPSETUP.ACCOUNT.ALTMSG,
                cls: 'logo-img-cls',
                bind: {
                    src: '{companyLogoUrl}'
                },
            }, 
            {
                xtype: 'filefield',
                opType: 'upload',
                buttonConfig: {
                    xtype: 'filebutton',
                    text: 'MyButton',
                    tooltip: 'upload image',
                    tooltipType: 'title'
                },
                name: 'LogoImage',
                cls: 'logo-url-path-cls',
                buttonOnly: true,
                buttonText: '',
                width: Constants.ViewportWidth * 0.04,
                listeners: {
                    change: 'onLogoImgUrlClick',
                    afterrender:'imageTypeExtension'
                }
            }]
        }]
    }, {
        xtype: 'accountdetail',
        name : 'accountdetail',
        width: '82.5%',
    }]
});