Ext.define('TalentAcquisition.model.employeereferral.EmployeeReferral', {
    extend: 'Ext.data.Model',

    fields: [
        'primaryskills',
        'candidatename',
        'email',
        'phone',
        'location',
        'recommendation',
        'relation',
        'referredby',
        'curriculumvitae',
        {
            name: 'ddo_jobopenings_id',
            type: 'number'
        },
        {
            name: 'ddo_jobapplicationstatus_id',
            type: 'number'
        },
        {
            name: 'ddo_employeereferral_id',
            type: 'number'
        }
    ]
});
