Ext.define('DDO.store.projects.StatusComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.statuscombostore',

    requires: [
        'DDO.model.projects.StatusCombo'
    ],

    model: 'DDO.model.projects.StatusCombo',

    //autoLoad: true,
    autoLoad:false,

    proxy: {
        type: 'ajax',
        url: 'resources/data/statusnotes.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});