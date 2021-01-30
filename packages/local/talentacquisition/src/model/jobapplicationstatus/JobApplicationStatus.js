Ext.define('TalentAcquisition.model.jobapplicationstatus.JobApplicationStatus', {
    extend: 'Ext.data.Model',

    fields: [
        'name',
        'description',
        {
            name: 'ddo_jobapplicationstatus_id',
            type: 'number'
        }
    ]
});
