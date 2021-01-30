/**
 * The file EmployeeSetupViewModel is the viewModel file of the Employee Setup View.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.employeesetupviewmodel'.
 */
Ext.define('DDO.view.setup.employeesetup.EmployeeSetupViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.employeesetupviewmodel',

    data: {
        addAssignRoleBtn: true,
        employeeCode: null,
        emailColoumn:false
    }
});
