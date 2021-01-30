/**
 * The file EducationFormController is the controller for the education form view.
 * @extends {Ext.app.ViewController}.
 * @alias 'controller.educationformcontroller'
 */
Ext.define('DDO.view.education.EducationFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.educationformcontroller',

    /**
     * {@link #handler handler} onSaveBtnClick function creates a new dataview by getting the form values.
     * Specify a {@link #handler handler} to run code when
     * a user clicks the button, or use {@link #listeners listeners} for other events such as
     * {@link #mouseover mouseover}.
     * @param {Ext.button.Button} 'btn'
     * @param {Event} e The click event
     */
    onSaveBtnClick: function(btn, e) {
        try{
        var formPanel = btn.up('form'),
            formValues = formPanel.getValues(),
            educationView = Ext.ComponentQuery.query('education')[0],
            dataView = educationView.lookupReference('educationData'),
           store = educationView.getViewModel().get('educationdatastore');
        if (Ext.isEmpty(Ext.String.trim(formValues.school)) || Ext.isEmpty(formValues.courseid)) {
            Ext.Msg.alert('ERROR', 'Please provide the Mandatory Fields');
        } else {
            this.updateForm(formPanel,store,formValues);
            store.sync();
            Utility.isFormDirty = false;
            formPanel.destroy();
            educationView.getViewModel().set('editing', false);
            // wait till editable is calculated
            Ext.defer(function() {
                if (dataView) {
                    dataView.refresh();
                    dataView.getStore().load();
                }
            }, 500);
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDEDUCATIONFORM.SAVECLICK, err);
    }
    },
    /**
     * The function updateForm is responsible to update the form when doing the save functionality of edit buton.
     * @param {Ext.form.Panel} 'formPanel' education details form. 
     * @param {store} 'store' the education date store. 
     * @param {object} 'formValues' the form values. 
     */
    updateForm:function(formPanel,store,formValues){
        if (formPanel.operation == "editform") {
            formPanel.updateRecord();
            var formNode = formPanel.formNode;
            formNode.style.display = "none";
           var dataNode = formPanel.educationDataNode;
            dataNode.style.display = "block";
        } else {
            store.add(formValues);
            return store;
        }
    },
    /**
     * {@link #handler handler} onCancelBtnClick function cancel the data which are modified from form.
     * Specify a {@link #handler handler} to run code when
     * a user clicks the button, or use {@link #listeners listeners} for other events such as
     * {@link #mouseover mouseover}.
     * @param {Ext.button.Button} 'btn'
     */
    onCancelBtnClick: function(btn) {
        try{
        var form = btn.up('form'),
            educationView = Ext.ComponentQuery.query('education')[0],
            dataView = educationView.lookupReference('educationData'),
            formNode, dataNode;
        Utility.isFormDirty = false;
        if (form.operation == "editform") {
            formNode = form.formNode;
            formNode.style.display = "none";
            dataNode = form.educationDataNode;
            dataNode.style.display = "block";
        } else {
        }
        form.destroy();
        educationView.getViewModel().set('editing', false);
        // wait till editable is calculated
        Ext.defer(function() {
            if (dataView) {
                dataView.refresh();
            }
        }, 500);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDEDUCATIONFORM.CANCELCLICK, err);
    }
    },
   /**
    * The function educationFromYear is responsible to take the fromyear selected to validate.
    * @param {Ext.form.field.Combo} 'combo' the year combobox. 
    * @param {year} 'formYear' the from year which is selected. 
    * @param {object} 'eOpts' the events option object passed. 
    */
    educationFromYear: function(combo, formYear, eOpts) {
      try{
        var toYear = this.getView().down('[name=todateattended]').getValue();
        this.validateFn(combo, formYear, toYear, true);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDEDUCATIONFORM.YEAR, err);
    }
    },
   /**
    * The function educationToYear is responsible to take the toyear selected to validate.
    * @param {Ext.form.field.Combo} 'combo' the year combobox. 
    * @param {year} 'toYear' the to year which is selected. 
    * @param {object} 'eOpts' the events option object passed. 
    */
    educationToYear: function(combo, toYear, eOpts) {
        try{
        var formYear = this.getView().down('[name=fromdateattended]').getValue();
        this.validateFn(combo, formYear, toYear, false);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDEDUCATIONFORM.YEAR, err);
    }
    },
   /**
    * The function validateFn is responsible to validate the from year to to year to give the alert message based on the condition.
    * @param {Ext.form.field.Combo} 'combo' the year combobox. 
    * @param {year} 'formYear' the from year which is selected. 
    * @param {year} 'toYear' the to year which is selected. 
    * @param {boolean} 'startdate' which takes the boolean value. 
    */
    validateFn: function(combo, formYear, toYear, startdate) {
        var alertMessage;
        if(startdate 
            && toYear
                && (formYear > toYear)) {
            alertMessage = "Start year should be lesser than to end year";
        } else if(!startdate 
            && formYear
                && (toYear < formYear)) {
            alertMessage = "End year should be greater than to start year";
        } else {
        }
        if(alertMessage) {
            Ext.Msg.alert('Warning', alertMessage);
            combo.reset();
        }
    }
});
