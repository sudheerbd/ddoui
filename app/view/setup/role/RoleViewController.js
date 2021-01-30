/**
 * The file RolesViewController is the Controller of the 'DDO.view.setup.role.Role'.
 * @extends {Ext.app.ViewController}.
 * @alias roleviewcontroller
 */
Ext.define('DDO.view.setup.role.RoleViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.roleviewcontroller',

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
            var roleWindow = Ext.ComponentQuery.query('rolewindow')[0] ||
                Ext.create('DDO.view.setup.role.RoleWindow',{
                    parentViewRef : view
                }),
                form = roleWindow.down('form');

            this.onMakeFormLoadTrue(form);
            form.reset();
            roleWindow.show();
            roleWindow.edit = false;
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.ROLE.ADDNEWCLICK, err);
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
     * @param {eOpts} -Object    
     */
    onGridRowClick: function(row, record, tr, rowIndex, e, eOpts) {
        try {
            var view = this.getView();
            var roleWindow = Ext.ComponentQuery.query('rolewindow')[0] || Ext.create('DDO.view.setup.role.RoleWindow',{
                parentViewRef : view
            }),
                form = roleWindow.down('form');
            
            this.onMakeFormLoadDirtyFalse(form,record);
            form.reset();
            form.loadRecord(record);
            roleWindow.show();
            roleWindow.edit = true;
        }  catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.ROLE.GRIDROWCLICK, err);
        }
    },

    /**
     * onMakeFormLoadDirtyFalse is called from method onGridRowClick to set custom flag.
     * Represents edit case.
     * @param {form} - The add window form reference.    
     * @param {record} - The grid selected record   
     */
    onMakeFormLoadDirtyFalse:function(form,record){
           form.items.items.forEach(function(rec){
                rec.originalValue = record.get(rec.name);
           });
    },

    /**
     * onMakeFormLoadTrue is called from method onAddNewClick to set custom flag.
     * Represents add case.
     * @param {form} - The add window form reference.
     */
    onMakeFormLoadTrue:function(form){
           form.items.items.forEach(function(rec){
                rec.originalValue ="";
           });
    },
    onSearchRoles: function (textfield, e, eOpts) {
        var store =this.getView().down('rolegrid').getStore(),
               // grpView = this.getView().parentViewRef,
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
               this.getView().down('rolegrid').refresh();
           }
     
    }
});