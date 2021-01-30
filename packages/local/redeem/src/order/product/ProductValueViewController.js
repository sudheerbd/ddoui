Ext.define('Redeem.order.product.ProductValueViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productvalueviewcontroller',

    /**
     * This is the handler for the click event of the Add Product.
     * It will open the form panel then we can add record.
     * @param button - The add button reference.    
     * @param e - The click event
     * @param eOpts -Object    
     */
    onAddNewClick: function(btn, e, eOpts) {
        var productvalueWindow = Ext.ComponentQuery.query('setattributewindow')[0] || Ext.create('Redeem.order.product.SetAttributeWindow'),
            form = productvalueWindow.down('form'),
            viewModel = productvalueWindow.getViewModel(),
            tabpanel = productvalueWindow.down('tabpanel');
            tabpanel.setActiveTab(0);
        this.onFormLoadTrue(form);
        form.reset();
        viewModel.set('product_id', "");

        productvalueWindow.show();
        productvalueWindow.edit = false;
    },

    /**
     * This is the handler for the row double click event for display propmpted data in form.
     * It will open the form panel with selected record data.
     * @param grid - The grid list reference.
     * @param record - The grid selected record.
     * @param tr - The TR element for the cell. 
     * @param rowIndex - Number(row index number).   
     * @param e - The click event
     * @param eOpts -Object    
     */
    onGridRowClick: function(row, record, tr, rowIndex, e, eOpts) {
        var productvalueWindow = Ext.ComponentQuery.query('setattributewindow')[0] || Ext.create('Redeem.order.product.SetAttributeWindow'),
            form = productvalueWindow.down('form'),
            viewModel = productvalueWindow.getViewModel(),
            paramsData,
            setAttributeStore = Ext.getStore('Redeem.store.SetAttributeStore'),
            productImgStore = Ext.getStore('Redeem.store.ProductImagesStore');
            tabpanel = productvalueWindow.down('tabpanel');
            tabpanel.setActiveTab(0);

        this.onFormLoadDirtyFalse(form, record);
        form.reset();
        form.loadRecord(record);
        viewModel.set('product_id', record.data.ddo_product_id);
        viewModel.set('product_name',record.data.productname);
        paramsData = {
            ddo_product_id: record.data.ddo_product_id
        };
        Ext.apply(setAttributeStore.getProxy().extraParams, paramsData);
        Ext.apply(productImgStore.getProxy().extraParams, paramsData);
        setAttributeStore.load();
        productImgStore.load();

        productvalueWindow.show();
        productvalueWindow.edit = true;
    },
    onFormLoadDirtyFalse: function(form, record) {
        form.items.items.forEach(function(rec) {
            rec.originalValue = record.get(rec.name);
        });
    },
    onFormLoadTrue: function(form) {
        var formValues = form.getValues();
        var items = form.getForm().getFields().items,
            i = 0,
            len = items.length;
        for (; i < len; i++) {
            var formField = items[i];
            formField.value = '';
            if (formField.mixins && formField.mixins.field && typeof formField.mixins.field['initValue'] == 'function') {
                formField.mixins.field.initValue.apply(formField);
                formField.wasDirty = false;
            }
        }

    },
    // on grid row click assign set attribute button enables and product id  setting in viewmodel
    onRowClick: function(view, record, tr, rowIndex, e, eOpts) {
        var viewModel = this.getViewModel();
        viewModel.set('setAttributeBtn', false);
    }
});