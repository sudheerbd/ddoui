Ext.define('DDO.store.jobopenings.JobOpeningsDataStore', {
    extend: 'Ext.data.Store',
    alias: 'store.jobopeningsdatastore',

    //storeId: 'jobopenings',

    requires: [
        'DDO.model.jobopenings.JobOpeningsDataModel'
    ],

    model: 'DDO.model.jobopenings.JobOpeningsDataModel',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'resources/data/jobopenings/jobopeningsdata.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});