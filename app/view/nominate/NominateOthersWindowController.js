/**
 * The file DDO.view.nominate.NominateOthersWindowController is a controller for 'DDO.view.nominate.nominateothers.NominateOthersWindow'.
 */
Ext.define('DDO.view.nominate.NominateOthersWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.nominateotherswindowcontroller',
   /**
    * The function 'onWindowOutsideTap' will performed when the 'click' is fired from the NominateOthersWindow.
    * @param {Ext.event.Event} 'event'
    * @param {HTML element} 'target' the target of the event.                                                                                                                                                                     
    */
    onWindowOutsideTap: function (event, target) {
       
        try{
            if (Utility.nominatAlert) {
                var view = this;
                Utility.onSetUpWinOutterTap(event, target, view);
            }
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.WINDOWOUTSIDECLICK, err);
        }
        
    },
  
    onWindowOutterTap: function (event, target, sourceController) {
        
        try{
            var target = target || event.target,
                cls = target.getAttribute('class'),
                window;
            if (cls && (cls.indexOf('x-mask') !== -1)) {
                window = sourceController.getView();
                window.close();
            }
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.WINDOWOUTSIDECLICK, err);
        }
    },
    /**
     * The function 'onResetValues' will perform when the resetform event is fired from the NominateOthersWindow to reset the form values in the Nominate Others View Form.
     */
    onResetValues: function () {
        try{
            var nominateView = this.getView(),
                catStore, karmaStore,
                nomViewModel, nomWindowForm, employeeCombo;

            Utility.nominateProjectId = null;
            catStore = Ext.getStore('karmasetup.KarmaCategoriesStore');
            karmaStore = Ext.getStore('karmasetup.KarmaStore');
            this.resetStoreOperation(karmaStore, catStore);
            employeeCombo = nominateView.down('combo[reference=employee]');
            nomWindowForm = nominateView.down('nominateothersviewform');
            nomViewModel = nomWindowForm.getViewModel();
            nomWindowForm.reset();
            employeeCombo.clearValue();
            this.resetViewModelProcess(nomViewModel);
            nomWindowForm.lookupReference('ratingcomment').setValue(null);
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.RESETFORMVALUES, err);
        }
    },
/**
 * The function 'resetViewModelProcess' is fired from the function 'onResetValues' in NominateOthersWindowController.
 * @param {viewModel} 'nomViewModel' which takes the viewModel of the NominateOthersWindow.
 */
    resetViewModelProcess: function(nomViewModel){
        
        nomViewModel.set('profileNominationType', false);
        nomViewModel.set('iconSelection', null);
        nomViewModel.set('points', null);
        nomViewModel.set('ratingView', true);
        nomViewModel.set('ruleView', true);
    },
  /**
   * The function 'resetStoreOperation' is fired from the function 'onResetValues' in the NominateOthersWindowController.
   */
    resetStoreOperation: function(karmaStore, catStore){
      
        
        if (!karmaStore.isLoaded()) {
            karmaStore.load();
        }
        karmaStore.clearFilter(true);
        karmaStore.filterBy(function (rec) {
            return false;
        });

        catStore.clearFilter(true);
        catStore.filterBy(function (rec) {
            if (rec.get('name') == 'Project') {
                return false;
            }
            return true;
        });
    },
  /**
   * The function windowBeforeClose will perform when the 'beforeclose' event is fired in the NominateViewWindow.
   */
    windowBeforeClose: function () {
    
        try{
            var nominateWinodw = this.getView(),
                nominateForm = nominateWinodw.down("nominateothersviewform"),
                categoryStore = Ext.getStore('karmasetup.KarmaCategoriesStore');
            if (nominateForm && nominateForm.isDirty()) {
                this.showCloseConfirmation(nominateForm, categoryStore, nominateWinodw);
            }
            var messageBox = Ext.ComponentQuery.query('window')[0];
            if (messageBox && messageBox.isVisible()) {
                return false;
            }
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.WINDOWCLOSEBEFORE, err);
        }
    },
  /**
   * The function 'showCloseConfirmation' is fired from the function 'windowBeforeClose' in the NominateOthersWindowController.
   * @param {Ext.form.Panel} 'nominateForm' which takes the 'nominateothersviewform'.
   * @param {Ext.data.Store} 'categoryStore' which takes the 'karmacategoriesstore'.
   * @param {Ext.window.Window} 'nominateWinodw' which takes the 'nominateotherswindow'. 
   */ 
    showCloseConfirmation: function(nominateForm, categoryStore, nominateWinodw){
        
        Ext.Msg.show({
            title: 'Confirmation',
            message: Messages.NOMINATION.CLOSECONFIRMATION,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (button) {
                if (button === 'yes') {
                    nominateForm.down('combo[reference=comboTagview]').setValue("");
                    nominateForm.down('combo[reference=nominatekarmacombo]').setValue("");
                    nominateForm.down('numberfield[reference=karmaunits]').setValue("");
                    nominateForm.down('textarea[reference=ratingcomment]').setValue("");
                    nominateForm.down('[reference=karmaGivenDate]').setValue('');
                    nominateForm.down('[reference=karmacategoryycombo]').setValue("");
                    categoryStore.clearFilter();
                    nominateWinodw.close();
                }
            }
        });
    },

    /**
     * The function onNominateOtherClose will perform when the 'close' event is fired from the NominateothersWindow.
    */
    onNominateOtherClose: function () {
        try{
            var view = this.getView(),
                submitBtn = view.down("form").down('button[reference=submit]');
            if (submitBtn) {
                submitBtn.disable(true);
            }
            var categoryStore = Ext.getStore('karmasetup.KarmaCategoriesStore');
            var karmaList = Ext.ComponentQuery.query('karmalist')[1];
            if (karmaList) {
                karmaList = karmaList.getView();
                karmaList = karmaList.refresh();
            }
            categoryStore.clearFilter();
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.NOMINATIONWINDOWCLOSE, err);
        }
    }
});