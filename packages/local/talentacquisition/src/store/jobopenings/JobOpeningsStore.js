Ext.define('TalentAcquisition.store.jobopenings.JobOpeningsStore', {
    extend: 'Ext.data.Store',

    alias: 'store.jobopeningsstore',

    requires: [
        'TalentAcquisition.model.jobopenings.JobOpenings'
    ],
    storeId:'jobopeningsstores',
    model: 'TalentAcquisition.model.jobopenings.JobOpenings',
    autoLoad:true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobopenings',
            update: '/jobopenings',
            create: '/jobopenings',
            destroy: '/jobopenings'
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
        }
    }
});
