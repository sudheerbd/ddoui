Ext.define('DDO.store.projects.people.ProjectRole', {
    extend: 'Ext.data.Store',

    alias: 'store.projectrole',

    requires: [
        'DDO.model.projects.people.ProjectRole'
    ],

    model: 'DDO.model.projects.people.ProjectRole',

    proxy: {
        type: 'ajax',
        // url: Api.URL.projects.ROLEREAD,
        api:{
            read: Api.URL.projects.ROLEREAD,
            update: Api.URL.projects.ROLEUPDATE,
            create: Api.URL.projects.ROLECREATE,
            delete: Api.URL.projects.ROLEDELETE
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

    sorters: [{
        property: 'ad_role_id',
        direction: 'ASC'
    }]
});