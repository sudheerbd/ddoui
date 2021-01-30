/**
 * The file NominateViewWindowController is the controller for the 'DDO.view.karmascore.nominate.KarmaNominateWindow'.
 */

Ext.define('DDO.view.profile.nominateview.NominateViewWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.nominateviewwindowcontroller',

    /**
     * Handler responsible to perform window out focus actions
     * @param {Object} event, contains event details
     * @param {Object} target,  contains details regarding target from which event trigger.
     */
    onWindowOutsideTap: function(event, target) {
        try {
            if (Utility.nominatAlert) {
                var view = this;
                 Utility.onSetUpWinOutterTap(event, target, view);
                this.onWindowOutterTap(event, target, view);
            }
        } catch (err) {
            Utility.showToast(Messages.PROFILE.WINOUTSIDE, err);
        }
    },

    /**
     * Handler responsible to perform window out focus actions
     * @param {Object} event, contains event details
     * @param {Object} target,  contains details regarding target from which event trigger.,
     * @param {Object} sourceController, contains scope reference of current view.
     */
    onWindowOutterTap: function(event, target, sourceController) {
        var target = target || event.target,
            cls = target.getAttribute('class'),
            window;
        if (cls && (cls.indexOf('x-mask') !== -1)) {
            window = sourceController.getView();           
                window.close();
        }
    },

    /**
     * Handler responsible for window close actions.
     */
    windowBeforeClose : function(){
        try {
            var nominateWinodw = this.getView(),
                // nominateForm = this.getView().down("nominateviewform"),
                nominateForm = nominateWinodw.down("nominateothersviewform"),
                categoryStore = Ext.getStore('karmasetup.KarmaCategoriesStore');
            if (nominateForm && nominateForm.isDirty()) {
                Ext.Msg.show({
                    title: 'Confirmation',
                    message: 'Are you sure, You want to close Nomination Form ?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (button) {
                        if (button === 'yes') {
                            empCombo = nominateForm.down('combo[reference=comboTagview]').setValue("");
                            nominatekarmacombo = nominateForm.down('combo[reference=nominatekarmacombo]').setValue("");
                            karmaunits = nominateForm.down('numberfield[reference=karmaunits]').setValue("");
                            ratingcomment = nominateForm.down('textarea[reference=ratingcomment]').setValue("");
                            nominateForm.down('[reference=karmacategoryycombo]').setValue("");
                            nominateForm.down('[reference=karmaGivenDate]').setValue("");
                            categoryStore.clearFilter();
                            nominateWinodw.close();
                            Ext.getBody().unmask();
                        }
                    }
                });
            }
            var messageBox = Ext.ComponentQuery.query('window')[0];
            if (messageBox && messageBox.isVisible()) {
                return false;
            }
        } catch (err) {
            Utility.showToast(Messages.PROFILE.NOMINATECLOSE, err);
        }
    }
});