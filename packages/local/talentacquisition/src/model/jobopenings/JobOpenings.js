Ext.define('TalentAcquisition.model.jobopenings.JobOpenings', {
    extend: 'Ext.data.Model',

    fields: [
	    'jobcode',
        'name',
		'totalexperience',
		'openpositions',
		'responsibilities',
		'primaryskills',
		'secondaryskills',
		'jobstatus',
        {
           name: 'validfrom', type: 'date'
        },{
           name: 'validto',type: 'date'
        },		
		'isbillable',		
		{
            name: 'ddo_department_id',
            type: 'number'
        },
		{
            name: 'ddo_joblocation_id',
            type: 'number'
        },
		{
            name: 'ddo_jobopenings_id',
            type: 'number'
        },
		{
            name: 'ddo_designation_id',
            type: 'number'
        },
		{
            name: 'ddo_jobeducation_id',
            type: 'number'
        }    
        
    ]
});
/*jobcode character varying(20) NOT NULL,
    name character varying(20) NOT NULL,
    totalexperience  NUMERIC (2, 2) NOT NULL,
    openpositions INTEGER  NOT NULL,
    responsibilities text NOT NULL,
    primaryskills text NOT NULL,
    secondaryskills text,
    jobstatus character (20),
    validfrom timestamp without time zone NOT NULL,
    validto timestamp without time zone,
    isbillable character (1) DEFAULT 'N',
    DDO_Client_ID INTEGER NOT NULL, 
    DDO_Department_ID INTEGER NOT NULL,
    DDO_JobLocation_ID INTEGER NOT NULL,
    DDO_JobEducation_ID INTEGER NOT NULL,
    DDO_Designation_ID INTEGER NOT NULL,*/