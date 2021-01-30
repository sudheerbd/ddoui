Ext.define('TalentAcquisition.store.scheduleinterview.ScheduleInterviewStore', {
    extend: 'Ext.data.Store',

    alias: 'store.scheduleinterviewstore',

    requires: [
        'TalentAcquisition.model.scheduleinterview.ScheduleInterview'
    ],
    model: 'TalentAcquisition.model.scheduleinterview.ScheduleInterview',
    proxy: {
        type: 'ajax',
        api: {
            update: '/scheduleinterview',
            create: '/scheduleinterview',
            destroy: '/scheduleinterview'
        },
        actionMethods: {
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
