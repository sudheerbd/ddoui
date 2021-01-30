Ext.define('Redeem.order.product.SetAttributeWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.setattributewindowcontroller',

    /**
     * This is the handler for window outer tap.
     * It will close the window when click on outside of the window.
     * @param event - The click event.    
     * @param target - dom area.    
     */
    onWindowOutsideTap: function(event, target) {
        if (Utility.nominatAlert) {
            var view = this;
            Utility.onSetUpWinOutterTap(event, target, view);
        }
    },

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
            form, formRec, params, tabpanel, setAttributesTab,
            name, valueMatch, viewmodel, activeView;

        productvalueWindow = btn.up('window');
        form = productvalueWindow.down('form'),
            viewmodel = productvalueWindow.getViewModel();
        tabpanel = productvalueWindow.down('tabpanel');
        activeView = tabpanel.getActiveTab(),
            setAttributesTab = productvalueWindow.down('setproductimagestab');
        formRec = form.getValues();
        var setAttributesArray = [],
            imagesArray = [];


        var gridStore = productvalueWindow.down('grid').getStore();
        var productValueStore = Ext.getStore('Redeem.store.ProductValueStore');
        var imagesDataview = productvalueWindow.down('setproductimages');
        var imagesStore = imagesDataview.getStore();
        if (activeView.xtype == "setproductimagestab") {
            imagesStore.sync({
                success: function(batch, opt) {
                    gridStore.load();
                    tabpanel.setActiveItem(setAttributesTab);
                    productvalueWindow.close();
                    productValueStore.load();
                }
            });

        } else {

            gridStore.sync({
                success: function(batch, opt) {
                    gridStore.load();
                    tabpanel.setActiveItem(setAttributesTab);
                    productValueStore.load();
                }
            });
        }



    },

    onAttributeComboSelect: function(combo, record, eOpts) {
        var comboRefs = this.getReferences(),
            attributeValueRef, store, comboValue;
        attributeValueRef = comboRefs.attributevalueref;
        store = attributeValueRef.getStore();
        comboValue = combo.getValue();
        store.clearFilter(true);
        store.filterBy(function(rec) {
            if (rec.data.ddo_productattribute_id == comboValue) {
                return true;
            }
        });

        if (store.getCount() == 0) {
            attributeValueRef.setReadOnly(true);
        } else {
            attributeValueRef.setReadOnly(false);
        }

    },

    onAddItemClick: function(btn, e, eOpts) {

        var windowViewModel = btn.up('window').getViewModel();
        var product_id = windowViewModel.get('product_id');
        var form = btn.up('form'),
            comboRefs = this.getReferences(),
            setAttributeStore = Ext.getStore('Redeem.store.SetAttributeStore'),
            attributeValueStore = Ext.getStore('Redeem.store.AttributeValueStore'),
            attributeref = comboRefs.attributeref,
            attributevalueref = comboRefs.attributevalueref,
            rec = form.getValues(),
            attributeRec = false;
        var attribute_code = "";
        var attribute_ids = "";
        var attribute_value_ids = "";

        form.items.items.forEach(function(rec) {
            if (rec.value) {
                if (rec.xtype == "combobox") {
                    var record = attributeValueStore.findRecord('ddo_productattribute_value_id', rec.value);
                    attribute_code = attribute_code + "-" + record.data.code;
                    attribute_value_ids = attribute_value_ids + "," + record.data.ddo_productattribute_value_id;
                    attribute_ids = attribute_ids + "," + record.data.ddo_productattribute_id;
                }
            }
        }, this);

        var code = attribute_code.substring(1);
        var codeArray = code.split("-");
        setAttributeStore.each(function(rec) {
            var recCodeArray = rec.data.attribute_code.split("-");
            var diffArray = Ext.Array.difference(recCodeArray, codeArray);
            if (diffArray.length == 0) {
                attributeRec = true;
            }
        });
        if (attributeRec) {
            Ext.Msg.alert('Alert', "already attribute added");
        } else {
            setAttributeStore.add({

                ddo_product_id: product_id,
                attribute_code: attribute_code.substring(1),
                attribute_ids: attribute_ids.substring(1),
                attribute_value_ids: attribute_value_ids.substring(1),
                quantity: rec.quantity
            });

        }

        form.reset();
    },

    onImgUpload: function(filefield, value, eOpts) {
        var me = this,
            file = filefield.fileInputEl.dom.files[0],
            fileValue = filefield.value,
            reader = new FileReader(),
            format = file.type,
            iconsView = filefield.up('setproductimagestab').down('setproductimages'),
            iconsViewStore = iconsView.getStore(),
            product_id = filefield.up('window').getViewModel().get('product_id'),
            isdefault = false,
            imgCount = iconsViewStore.getCount();
        if (imgCount <= 4) {
            reader.onload = function() {
                if (format == "image/png" || format == "image/jpg" || format == "image/jpeg") {
                    filefield.up('form').submit({
                        url: "/feed/feedsPostedPics",
                        success: function() {
                            var text = Ext.JSON.decode(arguments[1].response.responseText),
                                pathImg = text.data;

                            if (iconsViewStore.getCount() == 0) {
                                isdefault = true;
                            }
                            iconsViewStore.add({
                                imagepath: pathImg,
                                isdefault: isdefault,
                                ddo_product_id: product_id
                            });
                            if (isdefault) {
                                iconsView.getSelectionModel().select(0);

                            }

                        },
                        failure: function() {
                            Ext.toast({
                                html: 'Image not added',
                                width: 150,
                                align: 't'
                            });
                        }
                    });

                } else {
                    Ext.toast({
                        html: 'Invalid Format',
                        width: 150,
                        align: 't'
                    });
                }
            };
            reader.readAsDataURL(file);
        } else {
            Utility.topAlertMessage("Alert", "You can't add more than 5 images");

        }
    },

    productSetupItemClick: function(dataview, record, item, index, evt, eOpts) {

        var me = this,
            targetDom = evt.getTarget(),
            targetEl = Ext.get(targetDom),
            store = dataview.getStore();
        if (targetEl.hasCls('ddo-product-icon-delete')) {
            store.remove(record);
        } else {

            if (record) {

                dataview.getSelectionModel().select(record);
            }
            var rec = store.findRecord('isdefault', true);
            if (rec) {

                rec.set('isdefault', false);
            }

            record.set('isdefault', true);

        }


    },

    SetProductImagesRender: function(productimageview) {
        var store = productimageview.getStore();

        productimageview.getSelectionModel().select(
            store.findRecord('isdefault', true));

    },

    onBeforeTabChange: function(tabPanel, newCard, oldCard, eOpts) {
        var product_id = this.getViewModel().get('product_id');
        if (Ext.isEmpty(product_id)) {
            Utility.topAlertMessage('Alert', "please add and save product first");
            return false;
        }
        if (newCard.xtype == "setproductimagestab") {
            var imagesDataview = newCard.down('dataview'),
                imagesStore = newCard.down('dataview').getStore();
            record = imagesStore.findRecord('isdefault', true);
            if (record) {

                imagesDataview.getSelectionModel().select(record);
            }
        }

    },

    onSetAttributesGridRowClick: function(row, record, tr, rowIndex, e, eOpts) {

    }
});