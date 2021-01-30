Ext.define('Redeem.order.attribute.AttributeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.attributeviewcontroller',

    /**
     * This is the handler for the click event of the Add categories.
     * It will open the form panel then we can add record.
     * @param button - The add button reference.    
     * @param e - The click event
     * @param eOpts -Object    
     */
    onAddNewClick: function(btn, e, eOpts) {
        var attributeWindow = Ext.ComponentQuery.query('attributewindow')[0] 
            || Ext.create('Redeem.order.attribute.AttributeWindow'),
            form = attributeWindow.down('form');
        this.onFormLoadTrue(form);
        form.reset();   

        attributeWindow.down('[name=savebtn]').disable();    
       
        attributeWindow.show();
        attributeWindow.edit = false;
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
        var attributeWindow = Ext.ComponentQuery.query('attributewindow')[0] 
            || Ext.create('Redeem.order.attribute.AttributeWindow'),
            form = attributeWindow.down('form');

        this.onFormLoadDirtyFalse(form, record);
        form.reset();
        form.loadRecord(record);
        attributeWindow.edit = true;

        attributeWindow.show();
        Ext.defer(function(){

        attributeWindow.down('[name=savebtn]').disable();
        },200);
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
       
    }
});