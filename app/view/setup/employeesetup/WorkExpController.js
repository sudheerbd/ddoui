Ext.define('DDO.view.setup.employeesetup.WorkExpController',{
    extend:'Ext.app.ViewController',
    alias:'controller.workexpcontroller',
           /**
     * This handler is responsible for cancelling work details form progress.
     * @param {btn} Object, contain reference of click button.
     * @param {e} Object, event object
     * @param {eOpts} Object, event related details like target, sourceElements.
     */
    onFormCancelClick: function (btn, e, eOpts) {
        try {
            var empWindow = this.getView().up('employeesetupwindow'),
                empWinController = empWindow.getController();
            empWinController.onFormCancelClick(btn, e, eOpts);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.CANCELCLICK, err);
        }
    },
    onFormSaveClick: function (btn) {
        var win = Ext.ComponentQuery.query('personaldetailstab')[0] ;
        win.show();
    
//     var form = btn.up('form'),
//         formValues = form.getValues();
//         if(form.isValid()){
//     if (Ext.isEmpty(formValues.departmentname) && Ext.isEmpty(formValues.designationname) && Ext.isEmpty(formValues.empstatus) && Ext.isEmpty(formValues.pskill) && Ext.isEmpty(formValues.reportingto)) {
//         //do nothing
//     } else {
//         this.processFormData(btn, form, formValues);
//     }
// } else {
//     Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.INVALID);
// }
// } catch (err) {
//     Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.SAVECLICK, err);
// }
},

})