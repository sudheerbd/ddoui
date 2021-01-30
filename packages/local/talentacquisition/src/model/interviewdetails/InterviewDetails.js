Ext.define('TalentAcquisition.model.interviewdetails.InterviewDetails', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'ddo_jobapplications_id',
            type: 'number'
        },
        'username',
        {
            name:'interviewdate',
            type:'date'
        },
        'skilltype',
        'mobilenumber',
        'email',
        'status',
        {
            name: 'intervieweremployeeid',
            type: 'number'
        },
        'interviewtype',
        'feedback',
        'rating',
    ]
});
