Ext.define('DDO.store.groups.GroupsComboStore', {
    extend: 'Ext.data.Store',
    alias: 'store.groupscombostore',
    requires: [
        'DDO.model.groups.GroupsComboModel'
    ],
    model: 'DDO.model.groups.GroupsComboModel',
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.groups.READ,
            create: Api.URL.groups.CREATE,
            update: Api.URL.groups.UPDATE,
            destroy: Api.URL.groups.DELETE
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        sorters: [{
            property: "group_name",
            direction: "ASC"
        }]
    }
});