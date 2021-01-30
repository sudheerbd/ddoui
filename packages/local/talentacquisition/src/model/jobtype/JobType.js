Ext.define('TalentAcquisition.model.jobtype.JobType', {
    extend: 'Ext.data.Model',

    fields: [
        'name',
        'description',
        {
            name: 'ddo_jobtype_id',
            type: 'number'
        }
    ]
});
