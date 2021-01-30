Ext.define( 'DDO.model.setup.AccountStateComboModel', {
	extend: 'Ext.data.Model',

	alias: 'model.accountstatecombomodel',

	fields: [{
		name:'statename',
		type: 'string'
	}, {
		name: 'stateid',
		type: 'string'
	}]
});