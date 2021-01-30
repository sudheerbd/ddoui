Ext.define('DDO.store.projects.NotesStore', {
    extend: 'Ext.data.Store',

    alias: 'store.notesstore',

    requires: [
        'DDO.model.projects.Note'
    ],

    model: 'DDO.model.projects.Note',
    
    proxy: {
        type: 'ajax',

        api: {
            read: Api.URL.projects.READ,
            create: Api.URL.projects.CREATE,
            update: Api.URL.projects.UPDATE,
            destroy: Api.URL.projects.DELETE
        },

        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },

        reader: {
            type: 'json',
            rootProperty: "notes"
        }
    }
});