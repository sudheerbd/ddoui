Ext.define('DDO.model.projects.people.PeopleModel', {
    extend: 'Ext.data.Model',

    alias: 'model.people.peoplemodel',

    fields: ['c_bpartner_id',
        'email',
        'employee',
        'employee_code',
        'hr_designation',
        'hr_designation_id',
        'project_id',
        'project_name',
        'department_name',
        'hr_department_id',
        'shadow_resource',
        'startdateval',
        'enddateval',
        'user_profile_pic_url', {
            name: 'sequence',
            convert: function(value, record) {
                var roles = {
                    'Customer': 1,
                    'Stake Holder': 2,
                    'Project Manager': 3,
                    'Architect': 4,
                    'Lead': 5,
                    'Developer': 6,
                    'QA Lead': 7,
                    'Tester': 8,
                    'UX Designer': 9
                };
                var sequence = roles.hasOwnProperty(record.data.projectRole) ? roles[record.data.projectRole] : 10;

                return sequence;
            }
        },{
            name:'projectrole',
            default: 'No Role',
            convert:function(value,record){
                var role = value;
                if(role == null){
                    return "No Role"
                }else{
                    return role;
                }

            }
        },'processed','approved','rejected'
    ]
});