/**
 * The file RedeemViewController is the controller file for the order history view.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.redeemviewcontroller'.
 */
Ext.define('DDO.view.redeem.RedeemViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.redeemviewcontroller',

    /**
     * This handler is resposible for updation on any record related order history.
     * @param {Object} cmp, contains 'Ext.view.Table' reference.
     * @param {Html Element} td, Html element for column in table.
     * @param {Number} cellIndex, Index of column which is selected.
     * @param {Object} record,  contains reference of record which is selected.
     * @param {Html Element} tr, Html element for row in table.
     * @param {Number} rowIndex, Index of row which is being selected.
     * @param {Ext.event.Event} e, contains event object
     * @param {Object} eOpts, contains event related details 
     */
    onRedeemGridClick: function(cmp, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        try {
            var redeemWindow = Ext.ComponentQuery.query('redeemwindow')[0] || Ext.create('DDO.view.redeem.RedeemWindow'),
                form = redeemWindow.down('form'),
                winViewModel = redeemWindow.getViewModel(),
                isadmin = false;

            var roles = Ext.getStore('login').getData().items[0].data.roles;
            for (var i = 0, length = roles.length; i < length; i++) {
                if (roles[i].rolename == "Admin") {
                    isadmin = true;
                }
            }
            this.updateOrderStatusProcess(record, winViewModel, isadmin);
            winViewModel.set('created', Ext.Date.format(new Date(record.data.created), "d-m-Y"));
            form.loadRecord(record);
            var itemsStore = Ext.getStore('redeem.RedeemHistoryItemsGridStore'),
                paramsData = {
                    ddo_product_order_id: record.data.ddo_product_order_id
                };
            Ext.apply(itemsStore.getProxy().extraParams, paramsData);
            itemsStore.load();
            redeemWindow.show();
            redeemWindow.edit = true;
        } catch (err) {
            Utility.showToast(Messages.REDEEM.GRIDCLICK, err);
        }
    },

    /**
     * This handler is responsible for verify order status.
     * @param {Object} record, contains reference of record which is selected.
     * @param {Object} winViewModel, contains reference of redeem window viewmodel.
     * @param {Boolean} isadmin, contains boolean value to represent admin access.
     */
    updateOrderStatusProcess: function(record, winViewModel, isadmin){
        if (record.data.status == "Pending") {
            winViewModel.set('cancelbtnDisable', false);
            if (isadmin) {
                winViewModel.set('completebtnDisable', false);
                winViewModel.set('completebtnVisible', false);
            }
        } else {
            winViewModel.set('cancelbtnDisable', true);
            if (isadmin) {
                winViewModel.set('completebtnDisable', true);
                winViewModel.set('completebtnVisible', false);
            }
        }
    }
});
