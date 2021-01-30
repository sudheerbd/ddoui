Ext.define('TalentAcquisition.store.jobapplicationstatus.JobApplicationStatusStore', {
    extend: 'Ext.data.Store',

    alias: 'store.jobapplicationstatusstore',

    requires: [
        'TalentAcquisition.model.jobapplicationstatus.JobApplicationStatus'
    ],
    model: 'TalentAcquisition.model.jobapplicationstatus.JobApplicationStatus',
    storeId:'jobapplicationstatusstore',
    autoLoad:true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobapplicationstatus',
            update: '/jobapplicationstatus',
            create: '/jobapplicationstatus',
            destroy: '/jobapplicationstatus'
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
