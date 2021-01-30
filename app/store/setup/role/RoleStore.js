Ext.define('DDO.store.setup.role.RoleStore', {
    extend: 'Ext.data.Store',

    alias: 'store.rolestore',

    requires: [
        'DDO.model.setup.role.RoleModel'
    ],

    model: 'DDO.model.setup.role.RoleModel',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.role.READ,
            create: Api.URL.role.CREATE,
            update: Api.URL.role.UPDATE
        },
        reader: {
            type: 'json',
            rootProperty: "data"
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT'
        }
    },
    filters:[{
        property:'ddo_dup_role_id',
        value:true
    }]
});