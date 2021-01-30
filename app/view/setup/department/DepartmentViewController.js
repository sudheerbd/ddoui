/**
 * The file DepartmentViewController is the controller 'DDO.view.setup.department.Department'.
 * @extends {Ext.app.ViewController}.
 * @alias controller.departmentviewcontroller.
 */
Ext.define('DDO.view.setup.department.DepartmentViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.departmentviewcontroller',

    /**
     * This is the handler for the click event of the Add categories.
     * It will open the form panel then we can add record.
     * @param {button} - The add button reference.    
     * @param {e} - The click event
     * @param {eOpts} -Object    
     */
    onAddNewClick: function(btn, e, eOpts) {
        try{
            var view = this.getView();
        var departmentWindow = Ext.ComponentQuery.query('departmentwindow')[0] || Ext.create('DDO.view.setup.department.DepartmentWindow',{
            parentViewRef : view
        }),
            form = departmentWindow.down('form');
        this.onFormLoadTrue(form);
        form.reset();       
       
        departmentWindow.show();
        departmentWindow.edit = false;
        }catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.DEPARTMENT.TOAST.ADDBUTTON, err);
        }
    },

    /**
     * This is the handler for the row double click event for display propmpted data in form.
     * It will open the form panel with selected record data.
     * @param {grid} - The grid list reference.
     * @param {record} - The grid selected record.
     * @param {tr} - The TR element for the cell. 
     * @param {rowIndex} - Number(row index number).    
     */
    onGridRowClick: function(row, record, tr, rowIndex) {
        try{
            var view = this.getView();
        var departmentWindow = Ext.ComponentQuery.query('departmentwindow')[0] || Ext.create('DDO.view.setup.department.DepartmentWindow',{
            parentViewRef : view
        }),
            form = departmentWindow.down('form');
        this.onFormLoadDirtyFalse(form, record);
        form.reset();
        form.loadRecord(record);
        departmentWindow.show();
        departmentWindow.edit = true;
        }catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.DEPARTMENT.TOAST.GRIDROW, err);
        }
    },
    /**
     * The function onFormLoadDirtyFalse is responsible for checking form fields.
     * @param {DDO.ux.window.FormPanel} 'form' which gets the window form.
     * @param {array} 'record' which gets the records.
     */
    onFormLoadDirtyFalse: function(form, record) {
        form.items.items.forEach(function(rec) {
            rec.originalValue = record.get(rec.name);
        });
    },
    /**
     * The function onFormLoadTrue is responsible for checking for negotiating the dirty field in the form.
     * @param {DDO.ux.window.FormPanel} 'form' which gets the window form.
     */
    onFormLoadTrue: function(form) {
        var formValues = form.getValues();
         var items = form.getForm().getFields().items,
            i = 0,
            len = items.length;
        for (; i < len; i++) {
            var formField = items[i];
            formField.setValue('');
            if (formField.mixins && formField.mixins.field && typeof formField.mixins.field['initValue'] == 'function') {
                formField.mixins.field.initValue.apply(formField);
                formField.wasDirty = false;
            }
        }
       
    },
    /**
     * The function onGridRowClick is responsible for deleting the grid row.
     * @param {Ext.grid.Panel} 'grid' which takes the grid view.
     * @param {number} 'rowIndex' which holds the number at which row the user clicks.
     * @param {number} 'colIndex'  which holds the number at which column the user clicks.
     */
    deleteGridRow:function(grid, rowIndex, colIndex) {
        var gridStore = grid.getStore(),
            rec = gridStore.getAt(rowIndex),
            params;
        params = {
            ddo_department_id: rec.data.ddo_department_id
        };
        Ext.Ajax.request({
            url: Api.URL.department.DELETE,
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
    },
    onSearchDepartment: function (textfield, e, eOpts) {
        var store =this.getView().down('departmentgrid').getStore(),
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
               this.getView().down('departmentgrid').refresh();
           }
     
    }
});