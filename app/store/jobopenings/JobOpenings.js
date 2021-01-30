Ext.define('DDO.store.jobopenings.JobOpenings', {
    extend: 'Ext.data.Store',
    alias: 'store.jobopenings',

    //storeId: 'jobopenings',

    requires: [
        'DDO.model.jobopenings.JobOpenings'
    ],

    model: 'DDO.model.jobopenings.JobOpenings',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: Api.URL.currentjobopenings.READ,
                reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});