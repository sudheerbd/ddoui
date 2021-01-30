/**
 * The file DesignationViewController is the ViewController for 'DDO.view.setup.designation.Designation'.
 * @extends {Ext.app.ViewController}
 * @alias controller.designationviewcontroller.
 */
Ext.define('DDO.view.setup.designation.DesignationViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.designationviewcontroller',

    /**
     * This is the handler for the click event of the Add categories.
     * It will open the form panel then we can add record.
     * @param {button} - The add button reference.     
     */
    onAddNewClick: function(btn) {
        try{
            var view = this.getView();
        var designationWindow = Ext.ComponentQuery.query('designationwindow')[0] ||
            Ext.create('DDO.view.setup.designation.DesignationWindow',{
                parentViewRef : view
            }),
        form = designationWindow.down('form');
        this.onMakeFormLoadTrue(form);
        form.reset();
        designationWindow.show();
        designationWindow.edit = false;
        }catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.DESIGNATION.TOAST.ADDBUTTON, err);
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
        var designationWindow = Ext.ComponentQuery.query('designationwindow')[0] || Ext.create('DDO.view.setup.designation.DesignationWindow',{
            parentViewRef : view
        }),
            form = designationWindow.down('form');
        this.onMakeFormLoadDirtyFalse(form,record);
         form.reset();
        form.loadRecord(record);
        designationWindow.show();
        designationWindow.edit = true;
        }catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.DESIGNATION.TOAST.GRIDROW, err);
        }
    },
    /**
    * The function onMakeFormLoadDirtyFalse is responsible for assigning the record name to the originalvalue.
    * @param {DDO.ux.window.FormPanel} 'form' which contains the form.
    * @param {record} 'record' The grid selected record.
    */
    onMakeFormLoadDirtyFalse:function(form,record){
           form.items.items.forEach(function(rec){
                rec.originalValue = record.get(rec.name);
           });
    },
    /**
     * The function onMakeFormLoadTrue is responsible for making original value as an empty string.
     * @param {DDO.ux.window.FormPanel} 'form' which contains the form.
     */
    onMakeFormLoadTrue:function(form){
           form.items.items.forEach(function(rec){
                rec.originalValue ="";
           });
    },

    onSearchDesignation: function (searchField, searchValue) {
        var store =this.getView().down('designationgrid').getStore();
        var acronym,name;
        if (searchValue != '') {
            searchField.getTrigger('clear').setHidden(false);
            if (store) {
                store.clearFilter(true);
                store.filterBy(function (record) {                  
                    if(record.get('name')){
                        name = record.get('name').toLowerCase();
                    }

                    if(record.get('acronym')){
                        acronym = record.get('acronym').toLowerCase();
                    }
                    searchValue = searchValue.toLowerCase();
                    if (name.indexOf(searchValue) > -1 || acronym.indexOf(searchValue) > -1 ) {
                        return record;
                    }
                })
            }
        } else {
            searchField.getTrigger('clear').setHidden(true);
            if(store){
                store.clearFilter();
            }
        }
    },

    onClearSearchField:function(clearIcon){
        clearIcon.setValue('');
            clearIcon.getTrigger('clear').setHidden(true);
            var designationGrid = this.getView().down('designationgrid');
            if (designationGrid) {
                designationGrid.getStore().clearFilter();
            }
    }
});