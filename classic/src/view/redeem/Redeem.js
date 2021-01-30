/**
 * The file Redeem is the view file of the order history.
 * @extends {Ext.container.Container}
 * @alias 'widget.redeem'.
 * ViewModel : 'DDO.view.redeem.RedeemViewModel'.
 * ViewController : 'DDO.view.redeem.RedeemViewController'.
 */
Ext.define('DDO.view.redeem.Redeem', {
    extend: 'Ext.container.Container',

    alias: 'widget.redeem',
    cls: 'karmarule-cls designation-cls',
    requires: [
        'DDO.view.redeem.RedeemViewController',
        'DDO.view.redeem.RedeemViewModel',
        'DDO.view.redeem.RedeemGrid',
        'DDO.view.redeem.RedeemWindow'
    ],

    controller: 'redeemviewcontroller',
    viewModel: {
        type: 'redeemviewmodel'
    },

    //This lifecycle method of the view resposible for checking admin access for logged in use.
    initComponent: function() {
        this.callParent(arguments);
        var redeemGridStore = Ext.getStore('redeem.RedeemGridStore');
        if (!redeemGridStore.isLoaded()) {
            Utility.onStoreLoading(redeemGridStore);
        }
        var vm = this.getViewModel(),
            isadmin = false;
        var roles = Ext.getStore('login').getData().items[0].data.roles;
        for (var i = 0, length = roles.length; i < length; i++) {
            if (roles[i].rolename == "Admin") {
                isadmin = true;
            }
        }
        if (isadmin == true) {
            vm.set('isadmin', true);
        } else {
            vm.set('isadmin', false);
        }
    },

    items: [{
        xtype: 'toolbar',
        cls: 'wallet-toolbar-cls',
        width: '100%',
        height: 70,
        html: LabelsTitles.REDEEM.ORDERHISTORY
    }, {
        xtype: 'redeemgrid',
        margin: '0 0 0 10',
        store: 'redeem.RedeemGridStore'
    }]
});