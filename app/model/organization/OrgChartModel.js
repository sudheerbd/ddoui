Ext.define('DDO.model.organization.OrgChartModel', {
	extend: 'Ext.data.Model',

	fields: [{
		name: 'employee_code'
	}, {
		name: 'employee_name'
	}, {
		name: 'employee_emailid'
	}, {
		name: 'employee_designation'
	}, {
		name: 'supervisor_code'
	}, {
		name: 'supervisor_name'
	}, {
		name: 'location',
		convert: function(value, record) {
			var locValue, loc;

			if (value) {
				locValue = value.split(' ')[2];

				if (locValue) {

					if (locValue === 'Hyd') {
						loc = 'Hyderabad';
					} else if (locValue === 'Ban') {
						loc = 'Bangalore';
					} else if (locValue === 'LLC') {
						loc = 'US';
					} else {
						loc = value.split(' ')[2];
					}

					return loc;
				} else {
					return value;
				}
			}

			return record.data.location;
		}
	}, {
		name: 'supervisor_email'
	}, {
		name: 'user_profile_pic_url'
	},{
		name:'testCount',
		defaultValue:0
	}]
});