Ext.define('Redeem.order.attributevalue.AttributeValueWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.attributevaluewindowcontroller',

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
        var attributevalueWindow, form;

        attributevalueWindow = btn.up('window');
        form = attributevalueWindow.down('form');

        form.reset();
        attributevalueWindow.close();
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
        var gridStore, attributevalueWindow,
            form, formRec, params,
            name, valueMatch = false,
            attributeValMatch = false, codeMatch = false;
        
        gridStore = Ext.getStore('Redeem.store.AttributeValueStore');
        attributevalueWindow = btn.up('window');
        form = attributevalueWindow.down('form');
        formRec = form.getValues();
        formRec.productattributevalue = Ext.String.trim(formRec.productattributevalue);
        formRec.code = Ext.String.trim(formRec.code);
        name = formRec.name;
        if (!attributevalueWindow.edit) {
            gridStore.each(function(rec) {
                if (((rec.data.ddo_productattribute_id == formRec.ddo_productattribute_id) && (rec.data.productattributevalue.toLowerCase() == formRec.productattributevalue.toLowerCase())) || (rec.data.code.toLowerCase() == formRec.code.toLowerCase())) {
                    valueMatch = true;
                 }
                if(rec.data.productattributevalue.toLowerCase() == formRec.productattributevalue.toLowerCase()){
                    attributeValMatch = true;
                }else if(rec.data.code.toLowerCase() == formRec.code.toLowerCase()){
                     codeMatch = true;
                }

            });
        } else {
            gridStore.each(function(rec) {
                if ((rec.data.ddo_productattribute_value_id !=formRec.ddo_productattribute_value_id) && (((rec.data.ddo_productattribute_id == formRec.ddo_productattribute_id) && (rec.data.productattributevalue.toLowerCase() == formRec.productattributevalue.toLowerCase())) || (rec.data.code.toLowerCase() == formRec.code.toLowerCase()))) {
                    valueMatch = true;
                }
                if((rec.data.ddo_productattribute_value_id !=formRec.ddo_productattribute_value_id) && (rec.data.productattributevalue.toLowerCase() == formRec.productattributevalue.toLowerCase())){
                    attributeValMatch = true;
                }else if((rec.data.ddo_productattribute_id == formRec.ddo_productattribute_id) && (rec.data.code.toLowerCase() == formRec.code.toLowerCase())){
                     codeMatch = true;
                }

            });
        }
        if (!valueMatch) {
            if (form.isDirty()) {

                if (attributevalueWindow.edit) {
                    form.updateRecord();
                    gridStore.sync({
                        callback: function() {
                            gridStore.load();
                        }
                    });

                } else {
                    gridStore.add(form.getValues());
                    gridStore.sync({
                        callback: function() {
                            gridStore.load();
                        }
                    });
                }
                form.reset();
                attributevalueWindow.close();
            } else {
                Utility.topAlertMessage('WARNING', "Record Already Exists!!");
            }
        } else {
          if(attributeValMatch){
            Ext.Msg.alert('Warning', "Current attribute value Already added. Please select other one");
          }else if(codeMatch){
             Ext.Msg.alert('Warning', "Current attribute code Already added. Please select other one");
          }
        }


    }
});