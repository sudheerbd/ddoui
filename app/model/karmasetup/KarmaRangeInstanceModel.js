Ext.define('DDO.model.karmasetup.KarmaRangeInstanceModel', {
	extend: 'Ext.data.Model',

	alias: 'model.karmarangeinstancemodel',

	idProperty: 'ddo_karmarange_instnace_id',

	fields: ['ddo_karma_id', 'ddo_karmarange_instnace_id', 'endrange', 'startrange', {
		name: 'factor',
		convert: function(value, record) {
			if (value) {
				Math.round(value);
			}
		}
	}]
});