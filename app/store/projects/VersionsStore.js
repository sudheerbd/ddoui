Ext.define('DDO.store.projects.VersionsStore', {
    extend: 'Ext.data.Store',

    alias: 'store.versionsstore',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url:'resources/data/projects/Versions.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});