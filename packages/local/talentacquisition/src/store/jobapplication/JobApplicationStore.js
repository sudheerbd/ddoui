Ext.define('TalentAcquisition.store.jobapplication.JobApplicationStore', {
    extend: 'Ext.data.Store',

    alias: 'store.jobapplicationstore',

    requires: [
        'TalentAcquisition.model.jobapplication.JobApplication'
    ],
    model: 'TalentAcquisition.model.jobapplication.JobApplication',
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobapplications',
            update: '/jobapplications',
            create: '/jobapplications',
            destroy: '/jobapplications'
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
