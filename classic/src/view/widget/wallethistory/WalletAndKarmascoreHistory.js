/**
 * This view is responsible for displaying karma and wallet history of logged user..
 * @class 'DDO.view.widget.wallethistory.WalletAndKarmascoreHistory'
 * @extends 'Ext.window.Window'
 * @alias 'widget.walletkarmascoreview'
 * @ViewModel 'DDO.view.widget.wallethistory.WalletAndKarmaHistoryViewModel'
 * @Controller 'DDO.view.widget.wallethistory.WalletAndKarmaHistoryController'
 */
Ext.define('DDO.view.widget.wallethistory.WalletAndKarmascoreHistory', {
    extend: 'Ext.window.Window',
    alias: 'widget.walletkarmascoreview',
    requires: ['DDO.view.widget.wallethistory.WalletHistory',
        'DDO.view.widget.wallethistory.KarmascoreHistory',
        'DDO.view.widget.wallethistory.WalletAndKarmaHistoryController',
        'DDO.view.widget.wallethistory.WalletAndKarmaHistoryViewModel'
    ],

    width: Constants.ViewportWidth * 0.494,
    height: Constants.ViewportHeight * 0.78,
    constrain: true,
    resizable: true,

    cls: 'wallethistorywin-cls',

    modal: true,

    viewModel: {
        type: 'walletkarmahistory'
    },

    controller: 'walletkarmahistory',

    layout: 'fit',
    items: [{
        xtype: 'tabpanel',
        cls: 'wallethistorytab-cls',
        tabBar: {
            layout: { pack: 'center' },
            height: 70
        },
        items: [{
            bind: {
                title: '<div class="wallet">{walletAmount}<br/>Wallet</div>'
            },
            layout: 'fit',
            items: [
                { xtype: 'wallethistory',
                  overflowY: 'auto' }
            ]
        }, {
            bind: {
                title: '<div class="wallet">{rewardsPoint}<br/>Karma Score</div>'
            },
            layout: 'fit',
            items: [
                { xtype: 'karmascorehistory',
                   overflowY: 'auto' }
            ]
        }]

    }]
});
