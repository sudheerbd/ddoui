Ext.define('DDO.store.setup.employeesetup.EmployeeStore', {
    extend: 'Ext.data.Store',

    alias: 'store.employeestore',

    requires: [
       'DDO.model.setup.employeesetup.EmployeeModel'
    ],

    autoLoad:false,

    model: 'DDO.model.setup.employeesetup.EmployeeModel',

     proxy: {
        type: 'ajax',
        api: {
           read: Api.URL.empsetup.READ,
            update: Api.URL.empsetup.UPDATE,
            create: Api.URL.empsetup.CREATE
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