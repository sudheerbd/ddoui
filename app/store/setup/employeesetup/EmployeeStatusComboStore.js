
Ext.define('DDO.store.setup.employeesetup.EmployeeStatusComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.employeestatuscombostore',

    requires: [
        'DDO.model.setup.employeesetup.EmployeeStatus'
    ],

    autoLoad:false,

    model: 'DDO.model.setup.employeesetup.EmployeeStatus',
    
    proxy: {
        type: 'ajax',
        url: 'resources/data/employeesetup/employeestatuscombo.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});