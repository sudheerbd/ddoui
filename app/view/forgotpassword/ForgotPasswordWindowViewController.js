Ext.define('DDO.view.forgotpassword.ForgotPasswordWindowViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.forgotpasswordwindowviewcontroller',

    /**
     * This is the handler for window outer tap.
     * It will close the window when click on outside of the window.
     * @param event - The click event.    
     * @param target - dom area.    
     */
    onWindowOutsideTap: function(event, target) {
        var view = this;
        Utility.onWindowOutterTap(event, target, view);
    },

    /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param btn - The cancel button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormCancelClick: function(btn, e, eOpts) {
        var forgotPasswordWindow, form;

        forgotPasswordWindow = btn.up('window');
        form = forgotPasswordWindow.down('form');

        form.reset();
        forgotPasswordWindow.close();
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
        this.getView().mask('Sending...');
        var forgotPasswordWindow, form, formValues;

        forgotPasswordWindow = this.getView();
        form = forgotPasswordWindow.down('form');

        formValues = form.getValues();

        form.submit({
            scope: this,
            method: 'POST',
            url: '/login/forgotpassword',
            success: function(form, action) {
                this.getView().unmask();
                form.reset();
                forgotPasswordWindow.close();
                Ext.Msg.alert('Success', 'Delivered your password to provided EmailID: ' + formValues.forgotmailid);
            },
            failure: function(form, action) {
                this.getView().unmask();

                var errMsg = JSON.parse(action.response.responseText).err_msg;

                if(!errMsg) {
                    errMsg = JSON.parse(action.response.responseText).message;
                }

                Utility.toastReuseFn('t', errMsg);
            }
        });
    }
});