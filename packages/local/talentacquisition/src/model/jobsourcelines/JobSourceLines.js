Ext.define('TalentAcquisition.model.jobsourcelines.JobSourceLines', {
    extend: 'Ext.data.Model',

    fields: [
        'name',
        'description',
        'ddo_jobsource_name',
        {
            name: 'ddo_jobsourcelines_id',
            type: 'number'
        },
		{
            name: 'ddo_jobsource_id',
            type: 'number'
        }
    ]
});
