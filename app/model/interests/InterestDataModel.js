Ext.define('DDO.model.interests.InterestDataModel', {
	extend: 'Ext.data.Model',

	fields: [
		'ddo_empinterest_id	', {
			name: 'area',
			type: 'string'
		}, {
			name: 'ddo_employee_id',
			type: 'number'
		}
	]

	// idProperty: 'ddo_empinterest_id	'
});