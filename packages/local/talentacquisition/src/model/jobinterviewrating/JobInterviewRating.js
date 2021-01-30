Ext.define('TalentAcquisition.model.jobinterviewrating.JobInterviewRating', {
    extend: 'Ext.data.Model',

    fields: [
        'name',
        'description',
        {
            name: 'ddo_jobinterviewrating_id',
            type: 'number'
        }
    ]
});
