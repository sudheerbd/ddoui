Ext.define('DDO.model.setup.employeesetup.EmployeeSetupModel', {
    extend: 'Ext.data.Model',
    alias: 'model.employeesetupmodel',
    fields: [{
        name: 'name'
    }, {
        name: 'c_bpartner_id'
    }, {
        name: 'c_city_id'
    }, {
        name: 'c_location_id'
    }, {
        name: 'c_region_id'
    }, {
        name: 'c_temp_location_id'
    }, {
        name: 'currentlocation'
    }, {
        name: 'hr_department_id'
    }, {
        name: 'hr_designation_id'
    }, {
        name: 'permanentlocation'
    }, {
        name: 'primaryskill'
    }, {
        name: 'first_name',
        convert: function(value, record) {
            if (value) {
                return value;
            } else if (record.data.name) {
                var nameArray = record.data.name.split(" "),
                    last_name = nameArray[nameArray.length - 1];
                return record.data.name.split(last_name)[0];

            } else {
                return "";
            }
        }
    }, {
        name: 'last_name',
        convert: function(value, record) {
            if (value) {
                return value;
            } else if (record.data.name) {
                var nameArray = record.data.name.split(" ");
                return nameArray[nameArray.length - 1];

            } else {
                return "";
            }
        }

    }, {
        name: 'email'
    }, {
        name: 'employee_code'
    }, {
        name: 'department'
    }, {
        name: 'primary_skill'
    }, {
        name: 'designation'
    }, {
        name: 'reporting to'
    }, {
        name: 'joined_date',
        type: 'date',
        dateFormat: 'c'
    }, {
        name: 'confirmed_date',
        type: 'date',
        dateFormat: 'c'
    }, {
        name: 'relieve_date',
        type: 'date',
        dateFormat: 'c'
    }, {
        name: 'employee_status'
    }, {
        name: 'pan_number'
    }, {
        name: 'address1'
    }, {
        name: 'currentcityid'
    }, {
        name: 'currentregionid'
    }, {
        name: 'currentcountryid'
    },{
        name:'ischecked'
    },{
        name:'currentaddress1'
    },{
        name:'currentaddress2'
    },{
        name:'currentaddress3'
    },{
        name:'currentcityid'
    },{
        name:'currentcountryid'
    },{
        name:'currentregionid'
    },{
        name:'permanentaddress1'
    },{
        name:'permanentaddress2'
    },{
        name:'permanentaddress3'
    },{
        name:'permanentcityid'
    },{
        name:'permanentcountryid'
    },{
        name:'permanentlocationid'
    },{
        name:'permanentregionid'
    },{
        name:'isbillable'
    }]
});

