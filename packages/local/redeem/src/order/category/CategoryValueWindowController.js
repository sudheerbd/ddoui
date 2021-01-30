Ext.define('Redeem.order.category.CategoryValueWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.categoryvaluewindowcontroller',

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
        var categoryvalueWindow, form;

        categoryvalueWindow = btn.up('window');
        form = categoryvalueWindow.down('form');

        form.reset();
        categoryvalueWindow.close();
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
        
        var gridStore, categoryvalueWindow,
            form, formRec, params,
            name, valueMatch;

        gridStore = Ext.getStore('Redeem.store.CategoryValueStore');
        categoryvalueWindow = btn.up('window');
        form = categoryvalueWindow.down('form');
        formRec = form.getValues();

        name = Ext.String.trim(formRec.productcategoryname);

        valueMatch = gridStore.findRecord('productcategoryname', name, 0, false, false, true);

        if (categoryvalueWindow.edit) {
            editRec = gridStore.findRecord('ddo_productcategory_id',formRec.ddo_productcategory_id);

            if (valueMatch && editRec && editRec.get('productcategoryname').toLowerCase() == valueMatch.get('productcategoryname').toLowerCase()) {
                valueMatch = null;
            }
        }

        if (!valueMatch) {
            if (form.isDirty()) {

                if (categoryvalueWindow.edit) {
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
                categoryvalueWindow.close();
            } else {
                Utility.topAlertMessage('WARNING', "Record Already Exists!!");
                gridStore.clearFilter(true);
                gridStore.load();;
            }
        } else {
            Ext.Msg.alert('Warning', "Current Category value Already added. Please select other one");
            gridStore.clearFilter(true);
            gridStore.load();
        }
    }
});
