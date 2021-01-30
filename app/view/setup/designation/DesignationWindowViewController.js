/**
 * The file DesignationWindowViewController is the controller for 'DDO.view.setup.designation.DesignationWindow'.
 * @extends {Ext.app.ViewController}
 * @alias controller.designationwindowviewcontroller.
 */
Ext.define('DDO.view.setup.designation.DesignationWindowViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.designationwindowviewcontroller',

    /** 
     * This is the handler for window outer tap.
     * It will close the window when click on outside of the window.
     * @param {event} - The click event.    
     * @param {target} - dom area.    
     */
    onWindowOutsideTap: function(event, target) {
        var view = this;
        Utility.onSetUpWinOutterTap(event, target, view);
    },

    /** 
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param {btn} - The cancel button reference. 
     */
    onFormCancelClick: function(btn) {
        try{
        var designationWindow, form;

        designationWindow = btn.up('window');
        form = designationWindow.down('form');

        form.reset();
        designationWindow.close();
        }catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.DESIGNATION.TOAST.CANCELCLICK, err);
        }
    },

    /** 
     * This is the handler for save button click.
     * It will save the data to the grid which is entered in form.
     * It add the record to the store,if it is modified record then it will update the record.
     * After that it close the window and reset the form.
     * @param {btn} - The Save button reference.
     * @param {e} - The click event.    
     * @param {eOpts} - Object.    
     */
    onFormSaveClick: function(btn, e, eOpts) {
        try{
        var store, designationWindow, form,
            recObj, karmaUrl, karmaGridStore,
            name, valueMatch,
            editRec,me=this,
             view =me.getView(),
             parentRef = view.parentViewRef,
               designationGrid= parentRef.down('designationgrid');
                    store = designationGrid.getStore('setup.designation.DesignationStore');

        designationWindow = Ext.ComponentQuery.query('designationwindow')[0] ||
            Ext.create('DDO.view.setup.designation.DesignationWindow');

        form = designationWindow.down('form');
        rec = form.getValues();
        name = Ext.String.trim(rec.name).toLowerCase();
        valueMatch = store.findRecord('name', name, 0, false, false, true);
        if(rec.role_and_responsibility){
                    var roleAndResponsibility = rec.role_and_responsibility;
                }else{
                    var roleAndResponsibility = null; 
                }
        if (designationWindow.edit) {
            editRec = store.findRecord('ddo_designation_id', rec.ddo_designation_id);

            if (valueMatch && editRec && editRec.get('name').toLowerCase() == valueMatch.get('name').toLowerCase()) {
                valueMatch = null;
            }
        }
   this.updateAjaxSave(form,designationWindow,store,rec,valueMatch,roleAndResponsibility);
    }catch(err){
        Utility.showToast(Messages.EMPLOYEESETUP.DESIGNATION.TOAST.SAVECLICK, err);
    } 
    },
    /**
     * The function OnAcronym is responsible for converting lower case values to upper case in the field.
     * @param {textfield} 'field' which takes the textfield.
     */
    OnAcronym : function(field){
        if(field){
            var value = field.getValue();
            value = value.toUpperCase();
            field.setValue(value);
        }
    },
    /**
     * The function updateAjaxSave is responsible to update the ajax request when clicking the save button.
     * @param {form} 'from' the form of designation window.
     * @param {DDO.ux.window.FormPanel} 'designationWindow' which contains designation window.
     * @param {setup.designation.DesignationStore} 'store' which contains the designation store.
     * @param {object} 'rec' which contains the records of the form.
     * @param 'valueMatch' which contains the matching values from store.
     * @param {string} 'roleAndResponsibility' which contains the string value of the form field.
     */
    updateAjaxSave:function(form,designationWindow,store,rec,valueMatch,roleAndResponsibility){
        if (!valueMatch) {
        if (form.isDirty()) {
            if (designationWindow.edit) {
                form.updateRecord();
                params = {
                        ddo_designation_id: rec.ddo_designation_id,
                        name: rec.name,
                        description: rec.description,
                        acronym: rec.acronym,
                        role_and_responsibility : roleAndResponsibility
                    },
                    this.ajaxCallUpdate(params,form,store);
                    
            } else {
                var formValues = form.getValues();
                 this.postAjaxSave(formValues,form,store,roleAndResponsibility)
               }
            form.reset();
            designationWindow.close();
        } else {
            form.reset();
            designationWindow.close();
        }
    } else {
        Ext.Msg.alert('Warning', AlertMessages.existDesignation);
    }
},
/**
 * The function postAjaxSave is responsible for the ajax request when we click on save button.
 * @param {values of the form} 'formValues' which contains for, values object.
 * @param {form} 'from' the form of designation window..
 * @param {setup.designation.DesignationStore} 'store' which contains the designation store.
 * @param {string} 'roleAndResponsibility' which contains the string value of the form field.
 */
postAjaxSave:function(formValues,form,store,roleAndResponsibility){
    if(formValues &&formValues.role_and_responsibility ){
         formValues.role_and_responsibility = roleAndResponsibility;
    }
    Ext.Ajax.request({
        url: Api.URL.designation.CREATE,
        method: 'POST',
        params: formValues,
        success: function(resp, b) {
            form.reset();
            store.load();
            Ext.getBody().unmask();
        },
        failure: function(resp, b) {
            Ext.getBody().unmask();
        }
    });
},
/**
 * The function ajaxCallUpdate is responsible for the updation of values in the store.
 * @param {params} 'params' which are passed.
 * @param {form} 'from' the form of designation window.
 * @param {setup.designation.DesignationStore} 'store' which contains the designation store.
 */
ajaxCallUpdate:function(params,form,store){
    Ext.Ajax.request({
        url: Api.URL.designation.UPDATE,
        method: 'PUT',
        params: params,
        success: function(resp, b) {
            form.reset();
            store.reload();
            Ext.getBody().unmask();
        },
        failure: function(resp, b) {
            Ext.getBody().unmask();
         }
    });
}
});
