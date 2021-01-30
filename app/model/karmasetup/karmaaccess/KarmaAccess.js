Ext.define('DDO.model.karmasetup.karmaaccess.KarmaAccess', {
    extend: 'Ext.data.Model',

    alias: 'model.karmaaccessgrid',

    idProperty: 'ddo_karmaaccess_id',

    fields: [{
        'name': 'ddo_karmaaccess_id'
    }, {
        'name': 'ddo_karma_id'
    }, {
        'name': 'ddo_employee_id'
    }, {
        'name': 'ddo_role_id'
    },{
        'name': 'karmaname'
    }, {
        name: 'rolename',
        convert: function(value, record) {
            if(Ext.isEmpty(record.data.role)){
                return "";

            }else{
                var empStr ="";
                record.data.role.forEach(function(rec){
                 empStr += rec.name+",";
                });

            return empStr.slice(0,-1);
            }
        }

    },{
        name: 'employeename',
        convert: function(value, record) {
            if(Ext.isEmpty(record.data.employee)){
                return "";

            }else{
                var empStr ="";
                record.data.employee.forEach(function(rec){
                 empStr += rec.name+",";
                });

            return empStr.slice(0,-1);
            }

        }

    }]
});