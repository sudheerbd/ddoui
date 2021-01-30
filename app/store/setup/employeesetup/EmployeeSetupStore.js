Ext.define('DDO.store.setup.employeesetup.EmployeeSetupStore', {
    extend: 'Ext.data.Store',

    alias: 'store.employeesetupstore',

    requires: [
       'DDO.model.setup.employeesetup.EmployeeSetupModel'
    ],

    autoLoad:false,

    model: 'DDO.model.setup.employeesetup.EmployeeSetupModel',

     proxy: {
        type: 'ajax',
        api: {
           read: Api.URL.employeesetup.READ,
            update: Api.URL.employeesetup.UPDATE,
            create: Api.URL.employeesetup.CREATE
           // delete:  Api.URL.employeesetup.DELETE
        },
        reader: {
            type: 'json',
            rootProperty: "data"
        },
        writer: {
            writeAllFields: true
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT'
            //destroy: 'DELETE'
        }
    }
});