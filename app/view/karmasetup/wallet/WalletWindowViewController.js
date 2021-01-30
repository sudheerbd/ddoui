/**
 * This is controller file for 'DDO.view.karmasetup.wallet.WalletWindowView'
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.walletwindowview'
 */
Ext.define('DDO.view.karmasetup.wallet.WalletWindowViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.walletwindowview',

    /**
     * This is the handler for the Button event of the walletwindowView.
     * update the wallet details as changes in form.
     * @param {btn} :  button reference view.
     * @param {evt} :  Ext.event.Event The raw event object.
     * @param {eOpts} : Object.
     */
    onFormSaveClick: function(btn, e, eOpts) {
        try {
            var win = btn.up('window'),
                winViewModel = win.getViewModel(),
                formRef = win.down('form'),
                formRec = formRef.getValues(),
                record = formRef.getRecord(),
                winParentRef = win.parentViewRef,
                gridView = winParentRef.down('ddowalletgrid'),
                gridStore = gridView.getStore(),
                employeeName = win.down('[name=empid]').lastMutatedValue,
                year = win.down('[name=yearid]').lastMutatedValue,
                yearValue = year.split("-")[0].slice(0, -2) + year.split("-")[1];
            formRec.employeename = employeeName;
            formRec.sharable = formRec.sharable || 'N';
            formRec.year = yearValue;
            if (win.edit) {
                this.winEditOperation(win, gridStore, formRec, formRef);
            } else {
                this.winAddOperation(win, formRef, gridStore, formRec);
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.UPDATEWALLETREC, err);
        }
    },

    /**
     * This is the handler is called from onFormSaveClick method.
     * Responsible for only edit operation on already exist wallet records.
     * @param {win} :  Window view reference of 'DDO.view.karmasetup.wallet.WalletWindowView'.
     * @param {gridStore} :  grid reference of wallet view.
     * @param {formRec} : contains values of wallet form.
     * @param {formRef} : contains ref of wallet form field reference.
     */
    winEditOperation: function (win, gridStore, formRec, formRef) {
        var walletRec = gridStore.findRecord('ddo_wallet_id', formRec.ddo_wallet_id),
            walletTypeVal = formRef.down('[name = walletType]').getValue();

        walletRec.set('walletType', walletTypeVal);
        walletRec.set('walletId', formRec.ddo_wallet_id);
        walletRec.set('description', formRec.description);
        walletRec.set('sharable', formRec.sharable || 'N');
        walletRec.set('points', formRec.points);

        gridStore.sync({
            callback: function () {
                gridStore.load();
                formRef.reset();
                win.close();
            }
        });
    },

    /**
     * This is the handler is called from onFormSaveClick method.
     * Responsible for only add operation to create new wallet records.
     * @param {win} :  Window view reference of 'DDO.view.karmasetup.wallet.WalletWindowView'.
     * @param {gridStore} :  grid reference of wallet view.
     * @param {formRec} : contains values of wallet form.
     * @param {formRef} : contains ref of wallet form field reference.
     */
    winAddOperation: function (win, formRef, gridStore, formRec) {
        var rec = gridStore.findRecord("empid", formRec.empid);
        if (rec) {
            win.close();
            Ext.Msg.alert('Warning', "Duplicate wallet !!, employee must be unique.");
        } else {
            gridStore.add(formRec);
            gridStore.sync({
                callback: function () {
                    gridStore.load();
                    formRef.reset();
                    win.close();
                }
            });
        }
    },

    /**
     * This is the handler for the window out Tap event of the walletwindowView.
     * @param {event} :  Ext.event.Event The raw event object.
     * @param {target} : Object.
     */
    onWindowOutsideTap: function(event, target) {
        try {
            var view = this;
            if (Utility.nominatAlert) {
                Utility.onWindowOutterTap(event, target, view);
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.WINOUTSIDECLICK, err);
        }
    },

    /**
     * This is the handler for the Button event of the walletwindowView.
     * perform the cancel operation for wallet form.
     * @param {btn} :  button reference view.
     * @param {evt} :  Ext.event.Event The raw event object.
     * @param {eOpts} : Object.
     */
    onFormCancelClick: function(btn, e, eOpts) {
        try {
            var winView = this.getView();
            winView.close();
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.FORMCANCEL, err);
        }
    }
});