Ext.define('DDO.store.projects.NoteComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.notecombostore',
    
    requires: [
        'DDO.model.projects.NoteTypeCombo'
    ],

    model: 'DDO.model.projects.NoteTypeCombo',

    //autoLoad: true,
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
        url: 'resources/data/notetype.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});