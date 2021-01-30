Ext.define( 'DDO.model.loginlanding.createaccount.RegistrationStateComboModel', {
	extend: 'Ext.data.Model',

	alias: 'model.registrationstatecombomodel',

	fields: [{
		name:'statename',
		type: 'string'
	}, {
		name: 'stateid',
		type: 'number'
	}]
});