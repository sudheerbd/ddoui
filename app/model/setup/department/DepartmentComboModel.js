Ext.define('DDO.model.setup.department.DepartmentComboModel', {
	extend: 'Ext.data.Model',

	alias: 'model.departmentcombomodel',

	fields: ['department_name', 'department_value',{
		name:'name',
		convert:function(record,data){
			 return record.toLowerCase();
		}
	}]
});