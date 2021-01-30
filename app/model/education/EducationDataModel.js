Ext.define('DDO.model.education.EducationDataModel', {
	extend: 'Ext.data.Model',

	idProperty: 'ddo_empeducation_id',

	fields: [
	'ddo_empeducation_id',
	{
		name: 'school'
	}, {
		name: 'courseid'
	},  {
		name: 'course'
	}, {
		name: 'fromdateattended'
	}, {
		name: 'todateattended'
	}, {
		name: 'description'
	}]
});