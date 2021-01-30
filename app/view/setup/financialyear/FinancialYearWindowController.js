Ext.define('DDO.view.setup.financialyear.FinancialYearWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.financialyearwindowcontroller',

    /**
     * This is the handler for window outer tap.
     * It will close the window when click on outside of the window.
     * @param {event} - The click event.    
     * @param {target} - dom area.    
     */
    onWindowOutsideTap: function(event, target) {
        try {
            var view = this;
            Utility.onSetUpWinOutterTap(event, target, view);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.FINANCIALYEAR.WINDOWOUTSIDECLICK, err);
        }
    },

    /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param {btn} - The cancel button reference.
     * @param {e} - The click event.    
     * @param {eOpts} - Object.    
     */
    onFormCancelClick: function(btn, e, eOpts) {
        try {
            var financialyearWindow, form;
            financialyearWindow = btn.up('window');
            form = financialyearWindow.down('form');
            form.reset();
            financialyearWindow.close();
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.FINANCIALYEAR.CANCELCLICK, err);
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
            var gridStore, financialyearWindow, editRec,
                form, formRec, name, valueMatch, 
                view = this.getView(),
                parentRef = view.parentViewRef,
                financialGrid = parentRef.down('financialyeargrid');
            var gridStore = financialGrid.getStore('setup.financialyear.FinancialYearStore');

            form = this.getView().down('form');
            financialyearWindow = btn.up('window');
            form = financialyearWindow.down('form');
            formRec = form.getValues();
            if (form.isDirty()) {
                if (financialyearWindow.edit) {
                    form.updateRecord();
                    this.callUpdateService(formRec, gridStore);
                } else {
                    this.callCreateServices(formRec, gridStore);
                }
                form.reset();
                financialyearWindow.close();
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.FINANCIALYEAR.SAVECLICK, err);
        }
    },

    /**
     * This is the handler for calling update service.
     * It will send request with modified data to update.
     * @param {formRec} - contains form values.
     * @param {gridStore} - contains financialYearStore reference.    
     */
    callUpdateService: function(formRec, gridStore){
        var params = {
            fyearId: formRec.ddo_fyear_id,
            startdate: Ext.Date.format(new Date(formRec.startdate),'Y-m-d'),
            enddate: Ext.Date.format(new Date(formRec.enddate),'Y-m-d')
        };
        Ext.Ajax.request({
            url: Api.URL.financialyear.UPDATE,
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
    },
    /**
     * This is the handler for calling create new record service.
     * It will send request with data to create.
     * @param {formRec} - contains form values.
     * @param {gridStore} - contains financialYearStore reference.    
     */
    callCreateServices: function(formRec, gridStore){
        var params = {
            startdate: Ext.Date.format(new Date(formRec.startdate),'Y-m-d'),
            enddate: Ext.Date.format(new Date(formRec.enddate),'Y-m-d')
        };
        Ext.Ajax.request({
            url: Api.URL.financialyear.CREATE,
            method: 'POST',
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