Ext.define('TalentAcquisition.store.jobtype.JobTypeStore', {
    extend: 'Ext.data.Store',

    alias: 'store.jobtypestore',

    requires: [
        'TalentAcquisition.model.jobtype.JobType'
    ],
    storeId:'jobtypestores',
    model: 'TalentAcquisition.model.jobtype.JobType',
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobtype',
            update: '/jobtype',
            create: '/jobtype',
            destroy: '/jobtype'
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
