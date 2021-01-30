Ext.define('DDO.model.setup.department.DepartmentModel', {
	extend: 'Ext.data.Model',

	alias: 'model.departmentmodel',

	idProperty: 'ddo_department_id',

	fields: [{
		name: 'name',
		type: 'string'
	}, {
		name: 'description',
		type: 'string'
	}, {
		name: 'ddo_department_id'
	}, {
		name: 'ddo_dup_department_id',
		convert: function(value, record) {
			var rec = record.data,
				recid = rec.ddo_department_id;
			if (Ext.isEmpty(recid)) {
				return false;
			} else {
				return true;
			}
		}
	}]
});