Ext.define('TalentAcquisition.model.jobinterviewstatus.JobInterviewStatus', {
    extend: 'Ext.data.Model',

    fields: [
        'name',
        'description',
        {
            name: 'ddo_jobinterviewstatus_id',
            type: 'number'
        }
    ]
});
