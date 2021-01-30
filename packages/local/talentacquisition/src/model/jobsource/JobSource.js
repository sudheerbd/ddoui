Ext.define('TalentAcquisition.model.jobsource.JobSource', {
    extend: 'Ext.data.Model',

    fields: [
        'name',
        'description',
        {
            name: 'ddo_jobsource_id',
            type: 'number'
        }
    ]
});
