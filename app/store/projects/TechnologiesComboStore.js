Ext.define('DDO.store.projects.TechnologiesComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.technologiescombostore',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url:'resources/data/projects/Technologies.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});