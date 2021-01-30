/**
 * This is controller file for 'DDO.grid.Panel'.
 * @extends {Ext.app.ViewController}
 * @alias controller.walletgridview
 */
Ext.define('DDO.view.karmasetup.WalletGridViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.walletgridview',
     
    /**
    * This is the handler for the Button event of the walletwindowView.
    * update the names if user modifies name of icons.
    * @param {view} ,The gridview reference.
    * @param {record} (Ext.data.Model) belongs to the item.
    */
    itemClick:function (view, record) {
        try {
            var view = this.getView(),
            walletView = view.up('walletview');
            var formWindow = Ext.ComponentQuery.query('ddowalletwindow')[0]||
                Ext.create('DDO.view.karmasetup.wallet.WalletWindowView',{
                    parentViewRef: walletView
                }),
                formRef = formWindow.down('form'),
                formWinViewModel = formWindow.getViewModel(),
                vm = formWindow.getViewModel();

            formWinViewModel.set('nonEditablePermit', true);
            formWindow.edit = true;
            formWindow.show();
            formRef.loadRecord(record);
            if(!Ext.isEmpty(record.data.empid)){
                vm.set('walletTypeValue','Employee');
            } else {
                vm.set('walletTypeValue','Organization');
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.EDITWALLET, err);
        }
    }
});