Ext.define('TalentAcquisition.model.jobeducation.JobEducation', {
    extend: 'Ext.data.Model',

    fields: [
        'name',
        'description',
        {
            name: 'ddo_jobeducation_id',
            type: 'number'
        }
    ]
});
