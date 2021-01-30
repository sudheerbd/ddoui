Ext.define('Redeem.order.attribute.AttributeWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.attributewindowcontroller',

    /**
     * This is the handler for window outer tap.
     * It will close the window when click on outside of the window.
     * @param event - The click event.    
     * @param target - dom area.    
     */
    onWindowOutsideTap: function(event, target) {
        var view = this;
        Utility.onSetUpWinOutterTap(event, target, view);
    },

    /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param btn - The cancel button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormCancelClick: function(btn, e, eOpts) {
        var departmentWindow, form;

        departmentWindow = btn.up('window');
        form = departmentWindow.down('form');

        form.reset();
        departmentWindow.close();
    },

    /**
     * This is the handler for save button click.
     * It will save the data to the grid which is entered in form.
     * It add the record to the store,if it is modified record then it will update the record.
     * After that it close the window and reset the form.
     * @param btn - The Save button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormSaveClick: function(btn, e, eOpts) {
        var gridStore, attributeWindow,
            form, formRec, params,
            name, valueMatch;

        gridStore = Ext.getStore('Redeem.store.AttributeStore');
        attributeWindow = btn.up('window');
        form = attributeWindow.down('form');
        formRec = form.getValues();

        name = Ext.String.trim(formRec.name);

        valueMatch = gridStore.findRecord('name', name, 0, false, false, true);

        if (attributeWindow.edit) {

            editRec = gridStore.findRecord('ddo_productattribute_id',formRec.ddo_productattribute_id);
            if (valueMatch && editRec && editRec.get('name').toLowerCase() == valueMatch.get('name').toLowerCase()) {
                valueMatch = null;
            }


        }

        if (!valueMatch) {
            if (form.isDirty()) {

                if (attributeWindow.edit) {
                    form.updateRecord();
                    gridStore.sync({
                        callback: function() {
                            gridStore.clearFilter(true);
                            gridStore.load();
                        }
                    });
                } else {
                    gridStore.add(form.getValues());
                    gridStore.sync({
                        callback: function() {
                            gridStore.clearFilter(true);
                            gridStore.load();
                        }
                    });
                }
                form.reset();
                attributeWindow.close();
            } else {
                gridStore.clearFilter(true);
                gridStore.load();
                Utility.topAlertMessage('WARNING', "Record Already Exists!!");
            }
        } else {
            Ext.Msg.alert('Warning', "Current attribute Already added. Please select other one");
            gridStore.clearFilter(true);
            gridStore.load();
        }


    },


    onEmployeeClick:function(combo){
        
        var attributeWindow = combo.up('window');
        if(attributeWindow.edit){
            attributeWindow.down('[name=savebtn]').enable();
        }
    },

    onCodeChange:function(txtfld){
        
        var attributeWindow = txtfld.up('window');
        if(attributeWindow.edit){
            attributeWindow.down('[name=savebtn]').enable();
        }
    }
});
