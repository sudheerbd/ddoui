Ext.define('DDO.model.projects.people.AddPeopleSearchModel', {
    extend: 'Ext.data.Model',
 
    field:[{
        name:'project_id'
    },
    {
        name:'employee_id'
    },
    {
        name:'startdate'
    },
    {
        name:'enddate'
    },
    {
        name:'projectrole'
    },
    {
        name:'projectrole_id'
    },
    {
        name:'allocationperct'
    },
    {
        name:'shadow_resource'
    },{
        name: 'empfullname'
    },{
        name: 'startdateval'
    },{
        name: 'enddateval'
    }]
});