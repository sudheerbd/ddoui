/**
 * This is controller file for 'DDO.view.karmasetup.wallet.WalletView'
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.walletview'
 */
Ext.define('DDO.view.karmasetup.wallet.WalletViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.walletview',

    /**
     * This is the handler for the Button event of the walletwindowView.
     * update the names if user modifies name of icons.
     * @param {btn} :  button reference view.
     * @param {evt} :  Ext.event.Event The raw event object.
     * @param {eOpts} : Object.
     */
    onAddNewClick: function(btn, e, eOpts) {
        try {
            var win, winViewModel, formRef, walletType,
                view = this.getView();
            win = Ext.ComponentQuery.query('ddowalletwindow')[0] ||
            Ext.create('DDO.view.karmasetup.wallet.WalletWindowView',{
                parentViewRef : view
            });
            winViewModel = win.getViewModel();
            formRef = win.down('form');
            walletType = win.down('[name = walletType]');
            winViewModel.set('nonEditablePermit', false);
            walletType.clearValue();
            winViewModel.set('hideEmpId',true);
            win.edit = false;
            formRef.reset();
            win.show();
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.NEWWALLET, err);
        }
    }
});