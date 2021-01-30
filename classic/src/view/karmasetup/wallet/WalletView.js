/**
 * This view is responsible for display list of already exist wallets, add and edit wallets.
 * @class DDO.view.karmasetup.wallet.WalletView,
 * @extends Ext.container.Container
 * @alias widget.walletview
 * @viewModel : 'DDO.view.karmasetup.wallet.WalletViewModel'
 * @controller : 'DDO.view.karmasetup.wallet.WalletViewController'
 */
Ext.define('DDO.view.karmasetup.wallet.WalletView', {
    extend: 'Ext.container.Container',

    alias: 'widget.walletview',

    cls: 'walletview-cls',

    requires: [
        'DDO.view.karmasetup.wallet.WalletViewController',
        'DDO.view.karmasetup.wallet.WalletViewModel',
        'DDO.view.karmasetup.wallet.WalletWindowView',                
        'DDO.grid.Panel',
        'DDO.view.karmasetup.toolbar.RuleToolbar'
       ],

    controller: 'walletview',
    viewModel: {
        type: 'walletview'
    },
    initComponent: function() {
        this.callParent(arguments);
        var walletEmpComboStore = Ext.getStore('karmasetup.wallet.EmployeeComboStore');
        if (!walletEmpComboStore.isLoaded()) {
            walletEmpComboStore.load();
        }
    },
    items: [{
        xtype: 'ruletoolbar',
        cls: 'wallet-toolbar-cls',
        width: '100%',
        height: 70
    },{
        xtype:'ddowalletgrid'
    }]
});