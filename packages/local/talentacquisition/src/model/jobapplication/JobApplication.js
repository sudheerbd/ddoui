Ext.define('TalentAcquisition.model.jobapplication.JobApplication', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'ddo_jobapplications_id',
            type: 'number'
        }, {
            name:"candidatename",
            type:"string",
            convert: function(value, record) {
                var middlename = Ext.isEmpty(record.get('middlename')) ? " " : record.get('middlename')+" "
                value = record.get('firstname') + ' ' + middlename + record.get('lastname');
                return value;
            }
        },
        'fathersname',
        {
            name:'yearofpassing',
            type:'date'
        },
        'skilltype',
        'mobilenumber',
        'email',
        'address',
        'currentcity',
        'currentemploymentstatus',
        'ddo_jobsource_name',
        'ddo_jobopenings_name',
        'ddo_jobeducation_name',
        'ddo_designation_name',
        'ddo_jobapplicationstatus_name',
        {
            name: 'totalexperience',
            type: 'number'
        },
        'idproof',
        'idproofnumber',
        {
            name: 'appliedon',
            type: 'date'
        },{
            name:'availablefrom',
            type:'date'
        },{
            name:'noticeperiodindays',
            type:'number'
        },
        'curriculumvitae',
        {
            name:'ddo_jobsource_id',
            type:'number'
        },
        {
            name:'jobsourcevalue',
            type:'number'
        },
        'comments',
        {
            name:'ddo_jobopenings_id',
            type:'number'
        },
        {
            name:'ddo_jobeducation_id',
            type:'number'
        },
        {
            name:'ddo_designation_id',
            type:'number'
        },
        {
            name:'recruitedby',
            type:'number'
        },
        {
            name:'referredby',
            type:'number'
        },
        {
            name:'vendorname',
            type:'number'
        },
        {
            name:'jobportalname',
            type:'number'
        },
        {
            name:'ddo_jobapplicationstatus_id',
            type:'number'
        }
    ]
});
