/**
 * The file KarmaAccessWindowViewController is the controller for 'DDO.view.karmasetup.karmaaccess.KarmaAccessWindowView'.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.karmaaccesswindowview'.
 */
Ext.define('DDO.view.karmasetup.karmaaccess.KarmaAccessWindowViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.karmaaccesswindowview',

    requires: [
        'DDO.overrides.form.field.Tag'
    ],

    /**
     * This is the handler for the Button event of the karmaaccesswindowView.
     * update the names if user modifies name and clicked on save button.
     * @param {Ext.button.Button} 'btn'  button reference view.
     * @param {Event} 'evt' Ext.event.Event The raw event object.
     * @param {eOpts} 'eOpts' the events Object passed.
     */
    onFormSaveClick: function(btn, e, eOpts) {
        try{
        var win = btn.up('window'),
            formRef = win.down('form'),
            formValues = formRef.getValues(),
            valueMatch,
            view = this.getView(),
            karmaAccessView = view.parentRefView,
            gridStore = karmaAccessView.down('grid').getStore();
        if (win.edit) {
             gridStore.each(function(rec) {
                 if((rec.data.ddo_karmaaccess_id != formValues.ddo_karmaaccess_id) && (rec.data.ddo_karma_id == formValues.ddo_karma_id) ) {
                    valueMatch = true;
                }
             });
             if (!valueMatch) {
                 this.updateAjaxRequest(formValues,gridStore,formRef,win);
        }else{
           Utility.topAlertMessage('WARNING', "Record Already Exists!!"); 
        }
        } else {
            valueMatch = gridStore.findRecord('ddo_karma_id', formValues.ddo_karma_id);
            if (!valueMatch) {
                this.createAjaxRequest(formValues,gridStore,formRef,win);
            } else {
               Utility.topAlertMessage('WARNING', "Record Already Exists!!");
             }
        }
    }catch(err){
        Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.SAVECLICK, err);
    }
    },
    /**
     * The function updateAjaxRequest is responsible for update ajax request by clicking on save button.
     * @param {object} 'formValues' the form values. 
     * @param {store} 'gridStore' karma access store. 
     * @param {form} 'formRef' the form in the window. 
     * @param {window} 'win' karma access window. 
     */
    updateAjaxRequest:function(formValues,gridStore,formRef,win){
        Ext.Ajax.request({
            scope: this,
            params: {
                karmaaccessvalues: Ext.encode(formValues)
            },
            method: 'PUT',
            url: '/karmaaccess',
            success: function() {
                gridStore.load();
                formRef.reset();
                win.close();
            },
            failure: function() {
                gridStore.load();
            }
        });
    },
     /**
     * The function createAjaxRequest is responsible for create the record by making ajax request by clicking on save button.
     * @param {object} 'formValues' the form values. 
     * @param {store} 'gridStore' karma access store. 
     * @param {form} 'formRef' the form in the window. 
     * @param {window} 'win' karma access window. 
     */
    createAjaxRequest:function(formValues,gridStore,formRef,win){
        Ext.Ajax.request({
            scope: this,
            params: {
                karmaaccessvalues: Ext.encode(formValues)
            },
            method: 'POST',
            url: '/karmaaccess',
            success: function() {
                gridStore.load();
                formRef.reset();
                win.close();
            },
            failure: function() {
                gridStore.load();
            }
        });
    },
    /**
     * This is the handler for the window out Tap event of the karmaaccesswindowView.
     * update the names if user modifies name of icons.
     * @param evt :  Ext.event.Event The raw event object.
     * @param target : Object.
     */
    onWindowOutsideTap: function(event, target) {
        try{
        var view = this;
        if (Utility.nominatAlert) {
            Utility.onWindowOutterTap(event, target, view);
        }
    }catch(err){
        Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.OUTSIDETAP, err);
    }
    },
    /**
     * The function windowShowCenter is responsible to show the window at the center of the page.
     * @param {Ext.window.Window} 'win' which is karma access window. 
     * @param {object} 'opts' the options object passed. 
     */
    windowShowCenter:function(win, opts){
        win.center();
    },
    /**
     * This is the handler for the Button event of the karmaaccesswindowView.
     * update the names if user modifies name of icons.
     * @param {Ext.button.Button} 'btn' cancel button reference.
     * @param {Event} 'e'  Ext.event.Event The click event.
     * @param {object} 'eOpts' the events object passed.
     */
    onFormCancelClick: function(btn, e, eOpts) {
        try{
        var winView = this.getView();
        winView.close();
        }catch(err){
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.CANCELCLICK, err);
        }
    },
    /**
     * The function onAccessDetailsSelect is responsible to access buttons when the field values are changed.
     * @param {Ext.form.field.Field} 'combo' the text field. 
     * @param { Object} 'record' the new value. 
     * @param {Object} 'oldRecord' the old value. 
     */
    onAccessDetailsSelect: function(combo, record, oldRecord) {
        try{
        var form = combo.up('form')
        var saveBtn = form.down('[name=savebtn]'),
            karmaCombo = form.down('[name=ddo_karma_id]'),
            employeeTag = form.down('tagfield[name=employee]'),
            roleTag = form.down('tagfield[name=role]'),
            win = saveBtn.up('window'),
            isTag = false;
            if((!Ext.isEmpty(employeeTag.getValue())) || (!Ext.isEmpty(roleTag.getValue()))){
              isTag = true;
            }
            if((isTag == true) && (!Ext.isEmpty(karmaCombo.getValue()))){
                win.getViewModel().set('saveBtnAccess',false);
            }else{
                win.getViewModel().set('saveBtnAccess',true);
            }
            if(combo.inputEl){
        combo.inputEl.dom.value = '';
    }
        combo.collapse();
     }catch(err){
        Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.ACCESSDETAILS, err);
      }
    },
    /**
     * The function onKarmaSelect is responsible for access of view model buttons when the new value is selected from the combobox.
     * @param {Ext.form.field.Field} combo 
     * @param { Object} 'record' the new value. 
     * @param {Object} 'oldRecord' the old value.
     */
    onKarmaSelect:function(combo, record, eOpts){
        try{
        var saveBtn = combo.up('form').down('[name=savebtn]'),
            roleCombo = combo.up('form').down('[name=role]'),
            employeeCombo = combo.up('form').down('[name=employee]'),
            win = saveBtn.up('window');
        if(combo.getValue()){
            if(roleCombo.getValue().length>0 || employeeCombo.getValue().length>0){
            win.getViewModel().set('saveBtnAccess',false);
        }
    }else{
            win.getViewModel().set('saveBtnAccess',true);
        }
    }catch(err){
        Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.KARMASELECT, err);
    }
    }
});