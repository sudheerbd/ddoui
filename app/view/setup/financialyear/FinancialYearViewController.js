/**
 * The file FinancialYearViewController is the ViewController for 'DDO.view.setup.financialyear.FinancialYear'.
 * @extends {Ext.app.ViewController}
 * @alias controller.financialyearviewcontroller
 */
Ext.define('DDO.view.setup.financialyear.FinancialYearViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.financialyearviewcontroller',

    /**
     * This is the handler for the click event of the Add categories.
     * It will open the form panel then we can add record.
     * @param {button} - The add button reference.    
     * @param {e} - The click event
     * @param {eOpts} -Object    
     */
    onAddNewClick: function(btn, e, eOpts) {
        try {
            var view = this.getView();
            var financialyearWindow = Ext.ComponentQuery.query('financialyearwindow')[0] || Ext.create('DDO.view.setup.financialyear.FinancialYearWindow',{
                parentViewRef : view
            }),
                form = financialyearWindow.down('form');

            this.onFormLoadTrue(form);
            form.reset();       
            financialyearWindow.show();
            financialyearWindow.edit = false;
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.FINANCIALYEAR.ADDNEWCLICK, err);
        }
    },

    /**
     * This is the handler for the row double click event for display propmpted data in form.
     * It will open the form panel with selected record data.
     * @param {grid} - The grid list reference.
     * @param {record} - The grid selected record.
     * @param {tr} - The TR element for the cell. 
     * @param {rowIndex} - Number(row index number).   
     * @param {e} - The click event
     * @param {eOpts} - Event Object    
     */
    onGridRowClick: function(row, record, tr, rowIndex, e, eOpts) {
        try {
            var view = this.getView();
            var financialyearWindow = Ext.ComponentQuery.query('financialyearwindow')[0] || Ext.create('DDO.view.setup.financialyear.FinancialYearWindow',{
                parentViewRef : view
            }),
                form = financialyearWindow.down('form'),
                startdt, startdateVal ,enddt , enddateVal;

            this.onFormLoadDirtyFalse(form, record);
            form.reset();
            form.loadRecord(record);

            startdt = form.getForm().findField('startdate');
            enddt = form.getForm().findField('enddate');
            startdateVal = Ext.Date.format(new Date(record.data.startdate),'Y-m-d');
            enddateVal = Ext.Date.format(new Date(record.data.enddate),'Y-m-d');

            startdt.setValue(startdateVal);
            enddt.setValue(enddateVal);

            financialyearWindow.show();
            financialyearWindow.edit = true;
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.FINANCIALYEAR.GRIDROWCLICK, err);
        }
    },
    onSearchFinancialYear:function(textfield, e, eOpts){
   var store  = this.getView().down('financialyeargrid').getStore('setup.financialyear.FinancialYearStore');
   searchString = textfield.getValue();
   if (!store.isLoaded()) {
       store.load();
   }
   if (store) {
    store.filter({
        property: 'name',
        value: searchString,
        anyMatch: true,
        caseSensitive: false
    });
}    
else if (searchString.length == 0) {
    store.clearFilter(true);
    store.load();
    this.getView().down('financialyeargrid').refresh();
}
},
    /**
     * this handler is responsible for post action after form fields contain data.
     * @param {form} - add financial year form reference.    
     * @param {record} - record from grid selected row    
     */
    onFormLoadDirtyFalse: function(form, record) {
        form.items.items.forEach(function(rec) {
            rec.originalValue = record.get(rec.name);
        });
    },

    /**
     * this handler is called from onAddNewClick for post action after add window appears.
     * @param {form} - add financial year form reference. 
     */
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

    /**
     * This is the handler for deleting record from grid.
     * It will delete selected record by clicking on delete icon.
     * @param {grid} - The grid list reference.
     * @param {rowIndex} - Number(row index number).
     * @param {colIndex} - Number(column index number).
     */
    onDeleteClick :function(grid, rowIndex, colIndex) {
        try {
            var gridStore = grid.getStore(),
                rec = gridStore.getAt(rowIndex),
                params;
            params = {
                fyearId: rec.data.ddo_fyear_id
            };
            Ext.Ajax.request({
                url: Api.URL.financialyear.DELETE,
                method: 'DELETE',
                params: params,
                success: function(resp, b) {
                    gridStore.removeAt(rowIndex)
                    gridStore.reload();
                    Ext.getBody().unmask();
                },
                failure: function(resp, b) {
                    Ext.getBody().unmask();
                }
            });
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.FINANCIALYEAR.DELETECLICK, err);
        }
    }
});