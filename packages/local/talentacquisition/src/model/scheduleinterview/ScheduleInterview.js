Ext.define('TalentAcquisition.model.scheduleinterview.ScheduleInterview', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'ddo_scheduleinterview_id',
            type: 'number'
        },
        'interviewtype',
        {
            name: 'interviewdate',
            type: 'date'
        },'time',
        {
            name:'ddo_jobopenings_id',
            type:'number'
        },
        {
            name:'ddo_jobapplications_id',
            type:'number'
        },
        {
            name:'intervieweremployeeid',
            type:'number'
        },
        {
            name:'ddo_designation_id',
            type:'number'
        },
        'candidatename',
        'isdone',
        'curriculumvitae',
        'ddo_designation_name',
        'ddo_jobopenings_name',
        'intervieweremployeeid_name',
        'isconfirmed'
    ]
});
