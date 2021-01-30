/**
 * This view is responsible for displaying for descripition of wallet and karma logs.
 * @class 'DDO.view.widget.wallethistory.WalletDescriptionWindow'
 * @extends 'Ext.window.Window'
 * @alias 'widget.walletdescwindow'
 * @ViewModel 'DDO.view.widget.wallethistory.WalletAndKarmaHistoryViewModel'
 * @Controller 'DDO.view.widget.wallethistory.WalletAndKarmaHistoryController'
 */
Ext.define('DDO.view.widget.wallethistory.WalletDescriptionWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.walletdescwindow',
    requires: ['DDO.view.widget.wallethistory.WalletHistory',
        'DDO.view.widget.wallethistory.KarmascoreHistory',
        'DDO.view.widget.wallethistory.WalletAndKarmaHistoryController',
        'DDO.view.widget.wallethistory.WalletAndKarmaHistoryViewModel'
    ],

    width: Constants.ViewportWidth*0.22,
    maxHeight: 270,
    constrain: true,
    resizable: false,
    header:false,
    bodyPadding:10,

    cls: 'walletdescwin-cls',

    modal: true,

    viewModel: {
        type: 'walletkarmahistory'
    },

    controller: 'walletkarmahistory',
    // bind:{
    //     html:'{description}'
    // },

    initComponent: function() {
        this.callParent(arguments);
        var me = this;
        var controller = me.getController();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    }

    // layout: 'fit',
    // items: [{
    //     xtype: 'tabpanel',
    //     cls: 'wallethistorytab-cls',
    //     tabBar: {
    //         layout: { pack: 'center' },
    //         height: 70
    //     },
    //     items: [{
    //         bind: {
    //             title: '<div class="wallet">{walletAmount}<br/>Wallet</div>'
    //         },
    //         layout: 'fit',
    //         items: [
    //             { xtype: 'wallethistory' }
    //         ]
    //     }, {
    //         bind: {
    //             title: '<div class="wallet">{rewardsPoint}<br/>Karma Score</div>'
    //         },
    //         layout: 'fit',
    //         items: [
    //             { xtype: 'karmascorehistory' }
    //         ]
    //     }]

    // }]
});
