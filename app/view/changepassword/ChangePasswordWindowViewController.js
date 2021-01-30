Ext.define('DDO.view.changepassword.ChangePasswordWindowViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.changepasswordwindowviewcontroller',

    /**
     * This is the handler for window outer tap.
     * It will close the window when click on outside of the window.
     * @param event - The click event.    
     * @param target - dom area.    
     */
    // onWindowOutsideTap: function(event, target) {
    //     var view = this;
    //     Utility.onWindowOutterTap(event, target, view);
    // },

    /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param btn - The cancel button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormCancelClick: function(btn, e, eOpts) {
        var changePasswordWindow, form;

        changePasswordWindow = btn.up('window');
        form = changePasswordWindow.down('form');

        form.reset();
        changePasswordWindow.close();
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
        var changePasswordWindow, form, formRec;
        changePasswordWindow = btn.up('window');
        form = changePasswordWindow.down('form');
        formRec = form.getValues();
        if (formRec.new_password === formRec.re_enter_password) {
            form.submit({
                scope: this,
                method: 'POST',
                url: '/login/changepassword',
                success: function(form, action) {
                    form.reset();
                    changePasswordWindow.close();
                    Ext.Msg.alert('Success', JSON.parse(action.response.responseText).message);
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failure', JSON.parse(action.response.responseText).message);
                    // Ext.toast({
                    //     html: JSON.parse(action.response.responseText).message,
                    //     title: 'Failure',
                    //     width: 200,
                    //     align: 't'
                    // });
                }
            });
        } else {
            Ext.Msg.alert('Change Password', 'Enter new password and Reenter new password should be same.');
        }
    }
});
