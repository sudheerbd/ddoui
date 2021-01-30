Ext.define('DDO.model.karmasetup.KarmaRuleModel', {
	extend: 'Ext.data.Model',

	alias: 'model.karmarulemodel',

	idProperty: 'ddo_karmarule_id',

	fields: ['name', 'description', 'ddo_karmarule_id','self_nominate']
});