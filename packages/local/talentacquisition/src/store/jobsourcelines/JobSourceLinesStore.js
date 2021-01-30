Ext.define('TalentAcquisition.store.jobsourcelines.JobSourceLinesStore', {
    extend: 'Ext.data.Store',

    alias: 'store.jobsourcelinesstore',

    requires: [
        'TalentAcquisition.model.jobsourcelines.JobSourceLines'
    ],
    storeId:'jobsourcelinesstores',
    model: 'TalentAcquisition.model.jobsourcelines.JobSourceLines',
    autoLoad:true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobsourceline',
            update: '/jobsourceline',
            create: '/jobsourceline',
            destroy: '/jobsourceline'
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
