/**
 * The file RedeemWindowViewController is the controller file for the order history pop-up.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.redeemwindowviewcontroller'.
 */
Ext.define('DDO.view.redeem.RedeemWindowViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.redeemwindowviewcontroller',

    /**
     * This is the handler for window outer tap.
     * It will close the window when click on outside of the window.
     * @param event - The click event.    
     * @param target - dom area.    
     */
    onWindowOutsideTap: function(event, target) {
        try {
            var view = this;
            Utility.onWindowOutterTap(event, target, view);
        } catch (err){
            Utility.showToast(Messages.REDEEM.WINOUTSIDECLICK, err);
        }
    },

    /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param {btn} - The cancel button reference.
     * @param {e} - The click event.    
     * @param {eOpts} - Object.    
     */
    onFormCancelOrderClick: function(btn, e, eOpts) {
        try {
            var departmentWindow, form, ddo_redeemhistory_id,
                me = this;
            redeemWindow = btn.up('window');
            form = redeemWindow.down('form');
            var ddo_redeemhistory_id = form.down('hiddenfield').getValue();
            me.callCancelOrderService(ddo_redeemhistory_id, me);
            form.reset();
            redeemWindow.close();
        } catch (err) {
            Utility.showToast(Messages.REDEEM.FORMCANCEL, err);
        }
    },

    /**
     * This handler is responsible for sending request for cancelling order process.
     * @param {Number} ddo_redeemhistory_id, Contains Id for redeem order items.
     * @param {Object} me, Contains scope reference for redeem window view.
     */
    callCancelOrderService: function(ddo_redeemhistory_id, me){
        Ext.Ajax.request({
            url: '/redeemhistory/cancel',
            method: 'POST',
            scope: me,
            params: {
                ddo_redeemhistory_id: ddo_redeemhistory_id
            },
            success: function(response, opts) {
                var obj, loginStore;
                obj = Ext.decode(response.responseText);
                if (obj.success) {
                    loginStore = Ext.getStore('login');
                    Ext.getStore('Redeem.store.ProductValueStore').load();
                    Ext.getStore('redeem.RedeemGridStore').load();
                    loginStore.getAt(0).get('score').rewardpoints = obj.reward_points;
                    me.getView().close();
                }
            },
            failure: function(response, opts) {}
        });
    },

    /**
     * This is the handler for complete order button click.
     * It will call completeOrderService and close the window when click on this button and reset the form.
     * @param {btn} - The complete order button reference.
     * @param {e} - The click event.    
     * @param {eOpts} - Object.    
     */
    onFormCompleteOrderClick: function(btn, e, eOpts) {
        try {
            var departmentWindow, form, ddo_redeemhistory_id,
                me = this;
            redeemWindow = btn.up('window');
            form = redeemWindow.down('form');
            var ddo_redeemhistory_id = form.down('hiddenfield').getValue();
            me.callCompleteOrderService(me, ddo_redeemhistory_id);
            form.reset();
            redeemWindow.close();
        } catch (err) {
            Utility.showToast(Messages.REDEEM.COMPLETEORDER, err);
        }
    },

    /**
     * This handler is responsible for sending request for cancelling order process.
     * @param {Object} me, Contains scope reference for redeem window view.
     * @param {Number} ddo_redeemhistory_id, Contains Id for redeem order items.
     */
    callCompleteOrderService: function(me, ddo_redeemhistory_id){
        Ext.Ajax.request({
            url: '/redeemhistory/complete',
            method: 'POST',
            scope: me,
            params: {
                ddo_redeemhistory_id: ddo_redeemhistory_id
            },
            success: function(response, opts) {
                Ext.getStore('redeem.RedeemGridStore').load();
            },
            failure: function(response, opts) {}
        });
    }
});