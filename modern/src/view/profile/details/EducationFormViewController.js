/**
 * The file EducationFormViewController is the  controller for 'DDO.view.profile.details.AddEducationDetails'
 * @extends {Ext.app.ViewController}
 * @alias 'controller.educationformviewcontroller'.
 */
Ext.define('DDO.view.profile.details.EducationFormViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.educationformviewcontroller',

    /**
     * The function onSaveBtnClick function creates a new dataview by getting the form values and run code when
     * a user clicks the button,and to set the form panel values.
     * @param {Ext.button.Button} 'btn' the save button.
     * @param {Event} 'e' The click event
     */
    onSaveFormBtnClick: function(btn, e) {
        try{
        var formPanel = btn.up('addeducationdetails'),
            formValues = formPanel.getValues(),
            educationView = Ext.ComponentQuery.query('educationview')[0],
            dataView = educationView.lookupReference('educationData'),
            store = educationView.getViewModel().get('educationdatastore'),
            rec, record, statusMsg;
        Ext.Viewport.setActiveItem(1);
        if (Ext.isEmpty(Ext.String.trim(formValues.school_college))) {
            Ext.Msg.alert('ERROR', 'Please provide the Mandatory Fields');
        } else {
            if (formPanel.operation == "editform") {
                rec = store.data.items[formPanel.index];
                rec.set('school_college', formValues.school_college);
                rec.set('hr_degrees_id', formValues.hr_degrees_id);
                rec.set('year_of_passing', formValues.year_of_passing);
                rec.set('remark', formValues.remark);
                educationView.suspendLayout = true;
                statusMsg = 'Successfully Updated';
            } else { 
                store.add(formValues);
                statusMsg = 'Successfully Created';
            }
            store.sync({
                callback: function() {
                    Ext.Msg.alert('Status', statusMsg);
                    store.load();
                    // wait till editable is calculated
                    Ext.defer(function() {
                        if (dataView) {
                            dataView.refresh();
                            educationView.suspendLayout = false;
                            educationView.updateLayout();
                            Ext.Viewport.setActiveItem(0);
                        }
                    }, 500);
                }
            });
            Utility.isFormDirty = false;
            formPanel.destroy();
        }
    }catch(err){
        Utility.showToast(Messages.EDUCATIONFORM.SAVEBUTTON, err);
    }
    },

    /**
     * The funciton  'onCancelBtnClick'  function cancel the data which are modified from  to run code when
     * a user clicks the button
     * @param {Ext.button.Button} 'btn' which is the back button.
     */
    onBackFormBtnClick: function(btn) {
        try{
        var form = btn.up('addeducationdetails'),
            educationView = Ext.ComponentQuery.query('education')[0],
            dataView = educationView.lookupReference('educationData');
        Utility.isFormDirty = false;
        form.destroy();
        // wait till editable is calculated
        Ext.defer(function() {
            if (dataView) {
                dataView.refresh();
                dataView.updateLayout();
            }
        }, 500);
    }catch(err){
        Utility.showToast(Messages.EDUCATIONFORM.BACKICON, err);
    }
    },
    /**
     * The function onTextEnter is responsible to disable and enable the save button based on the the entered school/college name.
     * @param {Ext.form.Field.Text} 'field' which is the text field.
     * @param {Ext.event.Event} 'e'.
     * @param {object} 'eOpts' the options object passed.
     */
    onTextEnter: function(field, e, eOpts) {
        try{
        var form = field.up('addeducationdetails'),
            record = form.getValues(),
            saveButton = form.lookupReference('savebutton');
        if (Ext.isEmpty(record.school_college) || Ext.isEmpty(record.hr_degrees_id) || Ext.isEmpty(record.year_of_passing)) {
            saveButton.setDisabled(true);
        } else {
            saveButton.setDisabled(false);
        }
    }catch(err){
        Utility.showToast(Messages.EDUCATIONFORM.SAVEBTNACCESS, err);
    }
    }
});