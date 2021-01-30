Ext.define('DDO.store.setup.department.DepartmentStore', {
    extend: 'Ext.data.Store',

    alias: 'store.departmentstore',

    requires: [
        'DDO.model.setup.department.DepartmentModel'
    ],

    model: 'DDO.model.setup.department.DepartmentModel',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.department.READ,
            update: Api.URL.department.UPDATE,
            create: Api.URL.department.CREATE,
            delete: Api.URL.department.DELETE
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
    },
    filters: [{
        property: 'ddo_dup_department_id',
        value: true
    }],
    sorters: [{
        transform: function(item) {
            if(item)          
            return item.toLowerCase();
        },
        property: "name",
        direction: "ASC"
    },{
        transform: function(item) {
            if(item)          
            return item.toLowerCase();
        },
        property: "description",
        direction: "ASC"
    }]
});