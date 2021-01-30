Ext.define('DDO.model.karmasetup.KarmaProratedInstanceModel', {
	extend: 'Ext.data.Model',

	alias: 'model.karmaproratedinstancemodel',

	idProperty: 'ddo_karmaprorated_instnace_id',

	fields: [{
		name: 'ddo_karma_id'
	}, {
		name: 'ddo_karmaprorated_instnace_id',
		mapping: 'ddo_proratedkarma_id'
	}, {
		name: 'designation',
		mapping: 'designation_id'
	}, {
		name: 'hours',
		mapping: 'work_hours'
	}, {
		name: 'frequency'
	}, {
		name: 'karma',
		mapping: 'karma_points'
	}]
});