/**
 * The file DepartmentWindowController is the controller for 'DDO.view.setup.department.DepartmentWindow'.
 * @extends {Ext.app.ViewController}.
 * @alias controller.departmentwindowcontroller.
 */
Ext.define('DDO.view.setup.department.DepartmentWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.departmentwindowcontroller',

    /**
     * This is the handler for window outer tap.
     * It will close the window when click on outside of the window.
     * @param {event} - The click event.    
     * @param {target} - dom area.    
     */
    onWindowOutsideTap: function(event, target) {
        var view = this;
        Utility.onSetUpWinOutterTap(event, target, view);
    },

    /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param {btn} - The cancel button reference.  
     */
    onFormCancelClick: function(btn) {
        try{
        var departmentWindow, form;

        departmentWindow = btn.up('window');
        form = departmentWindow.down('form');

        form.reset();
        departmentWindow.close();
        }catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.DEPARTMENT.TOAST.CANCELCLICK, err);
        }
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
        try{
        var gridStore, departmentWindow,
            form, formRec, params,
            name, valueMatch,
            editRec,me=this,
            view =me.getView(),
            parentRef = view.parentViewRef,
            departmentGrid= parentRef.down('departmentgrid'),
            gridStore=  departmentGrid.getStore('setup.department.DepartmentStore');
        departmentWindow = btn.up('window');
        form = departmentWindow.down('form');
        formRec = form.getValues();
        name = Ext.String.trim(formRec.name);
        valueMatch = gridStore.findRecord('name', name, 0, false, false, true);
        if (departmentWindow.edit) {
            editRec = gridStore.findRecord('ddo_department_id', formRec.ddo_department_id);

            if (valueMatch && editRec && editRec.get('name').toLowerCase() == valueMatch.get('name').toLowerCase()) {
                valueMatch = null;
            }
        }
       this.matchValues(valueMatch,gridStore,departmentWindow,form,formRec,name);
    }catch(err){
        Utility.showToast(Messages.EMPLOYEESETUP.DEPARTMENT.TOAST.SAVECLICK, err);
    }
    },
    /**
     * The function matchValues is responsible for matching the form values.
     * @param {null} 'valueMatch' no value.
     * @param {setup.department.DepartmentStore} 'gridStore' which is a store.
     * @param {DDO.ux.window.FormPanel} 'departmentWindow' which holds the current form window.
     * @param {DDO.ux.window.FormPanel} 'form' which holds the form.
     * @param {object} 'formRec' which holds the form record.
     * @param {name} 'name' form record name.
     */
    matchValues:function(valueMatch,gridStore,departmentWindow,form,formRec,name){
         if (!valueMatch) {
        if (form.isDirty()) {
            if (departmentWindow.edit) {
                form.updateRecord();
                params = {
                    ddo_department_id: formRec.ddo_department_id,
                    name: formRec.name,
                    description: formRec.description
                };
             this.updateAjax(params,gridStore);
               } else {
                gridStore.add(form.getValues());
                gridStore.sync({
                    callback: function() {
                        gridStore.load();
                    }
                });
            }
            form.reset();
            departmentWindow.close();
        } else {
            form.reset();
            departmentWindow.close();
        }
    } else {
        Ext.Msg.alert('Warning', AlertMessages.existDepartment);
    }},
    /**
     * The function updateAjax is responsible for the ajax request after updating form values.
     * @param {params} 'params' the params which it holds.
     * @param {setup.department.DepartmentStore} 'gridStore' which contains the store.
     */
    updateAjax: function(params,gridStore){
        Ext.Ajax.request({
            url: Api.URL.department.UPDATE,
            method: 'PUT',
            params: params,
            success: function(resp, b) {
                gridStore.reload();
                Ext.getBody().unmask();

            },
            failure: function(resp, b) {
                Ext.getBody().unmask();

            }
        });
    }
});
