/**
 * The file EmployeeSetUpView is the view file of the Employee Setup View.
 * @extends {Ext.panel.Panel}
 * @alias 'widget.employeesetupview'.
 * ViewModel : 'DDO.view.setup.employeesetup.EmployeeSetupViewModel'.
 * ViewController : 'DDO.view.setup.employeesetup.EmployeeSetupViewController'.
 */

Ext.define('DDO.view.setup.employeesetup.EmployeeSetUpView', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.employeesetupview',

    requires: [
        'DDO.view.setup.employeesetup.EmployeeSetupGrid',
        'DDO.view.setup.employeesetup.EmployeeSetupToolbar',
        'DDO.view.setup.employeesetup.EmployeeSetupViewController',
        'DDO.view.setup.employeesetup.EmployeeSetupViewModel',
        'DDO.view.setup.employeesetup.EmployeeSetupWindow',
        'DDO.view.setup.employeesetup.PersonalDetailsTab'
    ],

    cls: 'karmarule-cls employee-cls',

    controller: 'employeesetupviewcontroller',
    viewModel: {
        type: 'employeesetupviewmodel'
    },

    initComponent: function() {
        this.callParent(arguments);
        var store = Ext.getStore('setup.employeesetup.EmployeeStore');
        if (!store.isLoaded()) {
            store.load();
        }
    },
    dockedItems: [{
        xtype: 'employeesetuptoolbar',
        cls: 'wallet-toolbar-cls',
        width: '100%',
        height: 70
    }],
   
    layout: 'fit',
    items: [{
        xtype: 'employeesetupgrid',
        reference: 'employeesetupgrid',
        store: 'setup.employeesetup.EmployeeStore'
    }]
});