Ext.define('DDO.store.jobopenings.JobopeningsActions', {
    extend: 'Ext.data.Store',
    alias: 'store.jobopeningsactions',

    
    autoLoad: false,

    proxy: {
        type: 'ajax',
        url:'resources/data/jobopenings/actionslist.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});