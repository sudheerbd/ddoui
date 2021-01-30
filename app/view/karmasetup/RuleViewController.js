/**
 * The file RuleViewController is the view controller for Rule window.
 * @extends {Ext.app.ViewController}.
 * @alias controller.ruleviewcontroller.
 */
Ext.define('DDO.view.karmasetup.RuleViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ruleviewcontroller',
    /** 
     * This is the handler for window outer tap.
     * It will close the window when click on outside of the window.
     * @param {event} - The click event.    
     * @param {target} - dom area.    
     */
    onWindowOutsideTap: function(event, target) {
        try{
        var view = this;
        Utility.onWindowOutterTap(event, target, view);
        }catch(err){
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.OUTSIDETAP, err);
        }
    },
    /** 
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param {btn} - The cancel button reference.
     * @param {e} - The click event.    
     * @param {eOpts} - Object.    
     */
    onFormCancelClick: function(btn, e, eOpts) {
        try{
        var ruleWindow, form;
        ruleWindow = Ext.ComponentQuery.query('rule')[0] ||
            Ext.create('DDO.view.karmasetup.window.RuleWindow');
        form = ruleWindow.down('form');
        form.reset();
        ruleWindow.close();
        }catch(err){
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.CANCELCLICK, err);
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
        var gridStore, store, ruleWindow, form,
            categoryStore, recObj, karmaUrl, karmaGridStore,
            recName, recNameTrim, nameMatch;
             var view = this.getView(),
                 parentView = view.parentViewRef;
               store = parentView.down('karmalist').getStore(),
        gridCategoryStore = Ext.getStore('karmasetup.KarmaCategoriesStore'),
            ruleWindow = Ext.ComponentQuery.query('rule')[0] ||
            Ext.create('DDO.view.karmasetup.window.RuleWindow');
        form = ruleWindow.down('form');
        recObj = form.getValues();
        if (ruleWindow.getTitle() == "Karma Rule") {
            karmaUrl = Api.URL.karmarule.UPDATE;
            karmaGridStore = store;
        } else {
            karmaUrl = Api.URL.karmacategory.UPDATE;
            karmaGridStore = gridCategoryStore;
        }
        recName = recObj.name;
        recNameTrim = recName.trim();
        nameMatch = karmaGridStore.findRecord('name', recNameTrim, 0, false, false, true);
        if (ruleWindow.edit) {
            var editRec = karmaGridStore.findRecord('ddo_karmarule_id', recObj.ddo_karmarule_id, 0, false, false, true),
                editCategoryRec = karmaGridStore.findRecord('ddo_karmacategory_id', recObj.ddo_karmacategory_id, 0, false, false, true);
            if (nameMatch && editRec
                && editRec.get('name') == nameMatch.get('name')) {
                nameMatch = null;
            } else if (nameMatch && editCategoryRec
                && editCategoryRec.get('name') == nameMatch.get('name')) {
                nameMatch = null;
            }
        }
        if (!nameMatch) {
            if (form.isDirty()) {
                this.updateAjaxRequestSave(ruleWindow, form, karmaUrl, recObj, karmaGridStore);
            } else {
                form.reset();
                ruleWindow.close();
            }
        } else if (ruleWindow.getTitle() == "Karma Rule") {
            Ext.Msg.alert('Warning', AlertMessages.existRule);
        } else {
            Ext.Msg.alert('Warning', AlertMessages.existCategory);
        }
    }catch(err){
        Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.SAVECLICK, err);
    }
    },
    /**
     * The function updateAjaxRequestSave is to call the ajax request when the save button is clicked in the window.
     * @param {window} 'ruleWindow' which consists of rule window. 
     * @param {form.Panel} 'form' contains the form of the window. 
     * @param {url} 'karmaUrl' which holds the url call. 
     * @param {object} 'recObj' the values of the form. 
     * @param {store} 'karmaGridStore' which contains the store based on title. 
     */
    updateAjaxRequestSave:function(ruleWindow,form,karmaUrl,recObj,karmaGridStore){
        if (ruleWindow.edit) {
            form.updateRecord();
            Ext.Ajax.request({
                url: karmaUrl,
                method: 'PUT',
                params: recObj,
                success: function (resp, b) {
                    karmaGridStore.load();
                    Ext.getBody().unmask();
                },
                failure: function (resp, b) {
                    Ext.getBody().unmask();
                }
            });
        } else {
            karmaGridStore.add(form.getValues());
            karmaGridStore.sync({
                callback: function () {
                    karmaGridStore.load();
                }
            });
        }
        form.reset();
        ruleWindow.close();
    },
    /**
     * The function enterTrimValue responsible to set trim value when component loses focus.
     * @param {Ext.Component} 'comp' the component
     */
    enterTrimValue : function(comp) {
        var val=comp.getValue().trim(),
            valTrim = val.replace(/[ ]{2,}/gi, " ");
            comp.setValue(valTrim);
    },
    /**
     * The function onRuleNameChange is to set the button visibility when the value in the form is modified.
     * @param { Ext.form.field.Field} 'field' differs from xtype. 
     * @param {value} 'newValue' the new value in the field. 
     * @param {value} 'oldValue' the old value in the field. 
     * @param {object} 'eOpts' events object passed. 
     */
    onRuleNameChange: function( field, newValue , oldValue , eOpts) {
        try{
        var ruleWindow = Ext.ComponentQuery.query('rule')[0] 
            || Ext.create('DDO.view.karmasetup.window.RuleWindow'),
            form = ruleWindow.down('form'),
            rec = form.getValues();
        var viewModelData = this.getViewModel().getData();
        if(viewModelData){    
            if(viewModelData.checkBoxHidden){
                if(newValue && (!Ext.isEmpty(rec.name)) && (!Ext.isEmpty(rec.ruletype))){
                    ruleWindow.getViewModel().set('karmarulesavebutton',false);
                }else{
                    ruleWindow.getViewModel().set('karmarulesavebutton',true);
                }
            }else{
                if(newValue && (!Ext.isEmpty(rec.name))){
                    ruleWindow.getViewModel().set('karmarulesavebutton',false);
                }else{
                    ruleWindow.getViewModel().set('karmarulesavebutton',true);
                }
            }
        }
    }catch(err){
        Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.NAMECHANGE, err);
    }
    }
});