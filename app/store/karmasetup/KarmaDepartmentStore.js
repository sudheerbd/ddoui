Ext.define('DDO.store.karmasetup.KarmaDepartmentStore', {
    extend: 'Ext.data.Store',

    alias: 'store.karmadepartmentstore',

    requires: [
        'DDO.model.karmasetup.KarmaDepartmentModel'
    ],

    model: 'DDO.model.karmasetup.KarmaDepartmentModel',

    autoLoad: false,

     proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.department.READ,
            update: Api.URL.department.UPDATE,
            create: Api.URL.department.CREATE,
            delete:  Api.URL.department.DELETE
        },
        reader: {
            type: 'json',
            rootProperty: "data"
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        }
    }
});