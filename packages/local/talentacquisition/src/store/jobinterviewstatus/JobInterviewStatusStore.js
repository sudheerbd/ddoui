Ext.define('TalentAcquisition.store.jobinterviewstatus.JobInterviewStatusStore', {
    extend: 'Ext.data.Store',

    alias: 'store.jobinterviewstatusstore',

    requires: [
        'TalentAcquisition.model.jobinterviewstatus.JobInterviewStatus'
    ],
    model: 'TalentAcquisition.model.jobinterviewstatus.JobInterviewStatus',
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobinterviewstatus',
            update: '/jobinterviewstatus',
            create: '/jobinterviewstatus',
            destroy: '/jobinterviewstatus'
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
