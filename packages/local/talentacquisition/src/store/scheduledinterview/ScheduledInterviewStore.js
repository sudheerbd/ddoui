Ext.define('TalentAcquisition.store.scheduledinterview.ScheduledInterviewStore', {
    extend: 'Ext.data.Store',

    alias: 'store.scheduledinterviewstore',

    requires: [
        'TalentAcquisition.model.scheduleinterview.ScheduleInterview'
    ],
    model: 'TalentAcquisition.model.scheduleinterview.ScheduleInterview',
    proxy: {
        type: 'ajax',
        api: {
            read:'/scheduleinterview',
        },
        actionMethods: {
            read:'GET'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    sorter: {
        property: 'ddo_scheduleinterview_id',
        order: 'DESC'
    }
});
