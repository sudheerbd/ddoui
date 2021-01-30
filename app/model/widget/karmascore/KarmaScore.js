Ext.define('DDO.model.widget.karmascore.KarmaScore', {
	extend: 'Ext.data.Model',

	fields: [
		'c_bpartner_id', 'employee_code', 'employee', {
			name: 'karmapoints',
			type: 'int'
		}, 'c_year_id', {
			name: 'hr_designation',
			convert: function(value, record) {
				if (!value) {
					value = 'No designation'
				}

				return value;
			}
		}, {
			name: 'hr_designation_id',
			convert: function(value, record) {
				if (!value) {
					value = 0;
				}

				return value;
			}
		}, 'image', 'departmentName', 'email', 'hr_department_id', 'hr_skilltype_id', 'skillName', {
			name: 'supervisor_id',
			convert: function(value, record) {
				if (!value) {
					value = 0;
				}

				return value;
			}
		}, {
			name: 'supervisorname',
			convert: function(value, record) {
				if (!value) {
					value = 'No supervisor'
				}

				return value;
			}
		}
	]
});