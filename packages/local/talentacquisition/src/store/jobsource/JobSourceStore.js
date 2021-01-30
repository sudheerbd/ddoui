Ext.define('TalentAcquisition.store.jobsource.JobSourceStore', {
    extend: 'Ext.data.Store',

    alias: 'store.jobsourcestore',

    requires: [
        'TalentAcquisition.model.jobsource.JobSource'
    ],
    storeId:'jobsourcestores',
    model: 'TalentAcquisition.model.jobsource.JobSource',
    autoLoad:true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobsource',
            update: '/jobsource',
            create: '/jobsource',
            destroy: '/jobsource'
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
