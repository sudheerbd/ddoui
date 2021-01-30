Ext.define('Redeem.order.product.ProductValueFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.productvalueformcontroller',

    /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param btn - The cancel button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormCancelClick: function(btn, e, eOpts) {
        var productvalueWindow, form;

        productvalueWindow = btn.up('window');
        form = productvalueWindow.down('form');

        form.reset();
        productvalueWindow.close();
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
        var gridStore, productvalueWindow,
            form, formRec, params,
            name, valueMatch, tabpanel, setAttributesTab, viewModel,
            setAttributeStore, productImgStore, paramsData;

        gridStore = Ext.getStore('Redeem.store.ProductValueStore');
        productvalueWindow = btn.up('window');
        tabpanel = productvalueWindow.down('tabpanel');
        setAttributesTab = productvalueWindow.down('setattributes');
        setAttributeStore = Ext.getStore('Redeem.store.SetAttributeStore');
        productImgStore = Ext.getStore('Redeem.store.ProductImagesStore');
        form = productvalueWindow.down('form');
        formRec = form.getValues();
        viewModel = productvalueWindow.getViewModel();

        name = Ext.String.trim(formRec.productname);

        valueMatch = gridStore.findRecord('productname', name, 0, false, false, true);

    if (productvalueWindow.edit) {
        editRec = gridStore.findRecord('ddo_product_id',formRec.ddo_product_id);

        if (valueMatch && editRec && editRec.get('productname').toLowerCase() == valueMatch.get('productname').toLowerCase() && editRec.get('ddo_productcategory_id') == valueMatch.get('ddo_productcategory_id')) {
            valueMatch = null;
        }
    }

    if (!valueMatch) {
        if (form.isDirty()) {

            if (productvalueWindow.edit) {
                form.updateRecord();
                gridStore.sync({
                    callback: function() {
                        gridStore.clearFilter(true);
                        gridStore.load();
                        tabpanel.setActiveItem(setAttributesTab)
                    }
                });

            } else {
                gridStore.add(form.getValues());
                gridStore.sync({
                    success: function(batch) {
                        if (batch.operations[0].getResponse()) {
                            var jsonData = batch.operations[0].getResponse().responseText,
                                product_id = Ext.decode(jsonData).product_id;
                            viewModel.set('product_id', product_id);
                            viewModel.set('product_name', formRec.productname);

                            paramsData = {
                                ddo_product_id: product_id
                            };
                            Ext.apply(setAttributeStore.getProxy().extraParams, paramsData);
                            Ext.apply(productImgStore.getProxy().extraParams, paramsData);
                            setAttributeStore.load();
                            productImgStore.load();
                        }

                        gridStore.clearFilter(true);
                        tabpanel.setActiveItem(setAttributesTab)
                        gridStore.load();
                    },
                    failure: function(batch) {
                        var error = batch.operations[0].getError(),
                            response = batch.operations[0].error.response,
                            errorMsg;
                        if (Ext.isObject(error)) {
                            if (error.status && error.statusText) {
                                var responseTextData = Ext.decode(response.responseText),
                                    errDetail = responseTextData.data,
                                    errDetailFormat, errorMsg;

                                if (errDetail) {
                                    errDetailFormat = errDetail.detail.split('=');
                                    errorMsg = errDetailFormat[1].replace(/\(/g, "").replace(/\)/g, "");
                                    Ext.Msg.alert('Failed', errorMsg);
                                }
                            }
                        }
                        gridStore.load();
                        form.reset();
                    }
                });
            }
            //form.reset();
            // productvalueWindow.close();
        } else {
            gridStore.clearFilter(true);
            gridStore.load();
            Utility.topAlertMessage('WARNING', "Record Already Exists!!");
        }
    } else {
        gridStore.clearFilter(true);
        gridStore.load();
        Ext.Msg.alert('Warning', "Current Product value Already added. Please select other one");
    }


}
});
