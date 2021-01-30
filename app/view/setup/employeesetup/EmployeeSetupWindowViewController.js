/**
 * The file EmployeeSetupWindowViewController is the viewController file of the Employee Setup Window.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.employeesetupwindowcontroller'.
 */
Ext.define('DDO.view.setup.employeesetup.EmployeeSetupWindowViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employeesetupwindowcontroller',
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
     * @param {e} - The click event.    
     * @param {eOpts} - Object.    
     */
    onFormCancelClick: function (btn, e, eOpts) {
        try{
            var employeeSetupWindow, form,
                employeeSetupTabpanel, empForm;

            employeeSetupWindow = btn.up('window');
            employeeSetupTabpanel = employeeSetupWindow.down('tabpanel');
            activetab = employeeSetupTabpanel.getActiveTab();
            form = activetab.getForm();
            empForm = employeeSetupWindow.down('form');
            employeeSetupWindow.getViewModel().set('istags', false);
            form.reset();
            empForm.reset();
            if (employeeSetupWindow) {
                employeeSetupWindow.destroy();
                employeeSetupWindow.close();
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.WIN.CANCELCLICK, err);
        }
    },
    /**
     * This is the handler for save button click.
     * It will save the data to the grid which is entered in form.
     * It add the record to the store,if it is modified record then it will update the record.
     * After that it close the window and reset the form.
     * @param {btn} - The Save button reference.
     * @param {e} - The click event.    
     * @param {eOpts} - Object.    
     */
    onFormSaveClick: function(btn, e, eOpts) {
        try {
            var store, employeeWindow, form, employeeLoading,
                loginStore = Ext.getStore('login'),
                userRecord = loginStore.getAt(0),
                userData = userRecord.data;

            store = Ext.getStore('setup.employeesetup.EmployeeSetupStore');
            employeeWindow = this.getView();
            form = employeeWindow.down('form');
            var rec = form.getValues();
            employeeLoading = new Ext.LoadMask({
                msg: '',
                target: employeeWindow
            });
            employeeLoading.show();
            if (employeeWindow.edit) {
                this.employeeEditProcess(form, store, employeeLoading, employeeWindow);
            } else {
                userData.roles.forEach(function(record) {
                    if (record.rolename == "Employee") {
                        rec.roleid = record.roleid;
                    }
                });
                this.employeeAddProcess(form, store, employeeLoading, employeeWindow);
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.WIN.SAVECLICK, err);
        }
    },

    /**
     * This handler is being called from onFormSaveClick.
     * Responsible for performing add employee operation.
     * @param {form} - Object, contains reference of employee window form.
     * @param {store} - Object, contains reference of EmployeeSetupStore.    
     * @param {employeeLoading} - Object, contains reference of loadmask.
     * @param {employeeWindow} - Object, contains reference of add employee window.    
     */
    employeeAddProcess: function(form, store, employeeLoading, employeeWindow){
        store.add(rec);
        store.sync({
            success: function (batch) {
                employeeLoading.hide();
                form.reset();
                employeeWindow.close();
                store.load();
                Ext.getStore('widget.karmascore.KarmaScore').load();
                var res = Ext.decode(batch.operations[0].getResponse().responseText);
                var msg = res.message;
                Ext.Msg.alert('success', msg);
            },
            failure: function (response, options) {
                employeeLoading.hide();
                var res = Ext.decode(response.operations[0].error.response.responseText);
                var msg = res.message;
                Ext.Msg.alert('failure', msg);
                store.clearData();
            }
        });
    },

    /**
     * This handler is being called from onFormSaveClick.
     * Responsible for performing update employee operation.
     * @param {form} - Object, contains reference of employee window form.
     * @param {store} - Object, contains reference of EmployeeSetupStore.    
     * @param {employeeLoading} - Object, contains reference of loadmask.
     * @param {employeeWindow} - Object, contains reference of add employee window.    
     */
    employeeEditProcess: function(form, store, employeeLoading, employeeWindow){
        form.updateRecord();
        store.sync({
            success: function(batch) {
                form.reset();
                employeeLoading.hide();
                employeeWindow.close();
                store.load();
                Ext.getStore('widget.karmascore.KarmaScore').load();
                var res = Ext.decode(batch.operations[0].getResponse().responseText);
                var msg = res.message;
                Ext.Msg.alert('success', msg);
            },
            failure: function(response, options) {
                employeeLoading.hide();
                var res = Ext.decode(response.operations[0].error.response.responseText);
                var msg = res.message;
                Ext.Msg.alert('failure', msg);
                store.clearData();
            }
        });
    },

    /**
     * This handler is responsible for action which executed before tab activate
     * @param {tabPanel} Object, Contains reference of tabpanel view.
     * @param {newCard} Object, Contains new tab reference which is being clicked.
     * @param {oldCard} Object, Contains reference of old tab view after changes.
     * @param {eOpts} Object, Contains event related Objects 
     */
    onBeforeTabChange: function(tabPanel, newCard, oldCard, eOpts) {
        try {
            var ddo_employee_id = this.getViewModel().get('ddo_employee_id');        
            if (Ext.isEmpty(ddo_employee_id)) {
            // Ext.Msg.alert('Alert', "please add and save employee first");
            // return false;
            }
            if(newCard.xtype == "accessdetails"){
                this.getViewModel().set('istags',true); 
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.WIN.BEFORETABCHANGE, err);
        }
    },
    /**
     * This handler is responsible for action which executed after tab activate
     * @param {tabPanel} Object, Contains reference of tabpanel view.
     * @param {newCard} Object, Contains new tab reference which is being clicked.
     * @param {oldCard} Object, Contains reference of old tab view after changes.
     * @param {eOpts} Object, Contains event related Objects 
     */
    onAftertabChange:function(tabPanel, newCard, oldCard, eOpts){
        try {
            var view = this.getView(),
                workDetailsView = view.down('workdetails');
            var reportingManager = workDetailsView.down('[name = reportingto]').getValue();
            Utility.reportingManagerOldVal = reportingManager;
            if(newCard.xtype == "workdetails" || newCard.xtype=="employeeaddress"){
                newCard.body.scrollTo('top', 0)
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.WIN.AFTERTABCHANGE, err);
        }
    }
});