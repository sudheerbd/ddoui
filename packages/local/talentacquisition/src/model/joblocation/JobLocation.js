Ext.define('TalentAcquisition.model.joblocation.JobLocation', {
    extend: 'Ext.data.Model',

    fields: [
        'name',
        'description',
        {
            name: 'ddo_joblocation_id',
            type: 'number'
        }
    ]
});
