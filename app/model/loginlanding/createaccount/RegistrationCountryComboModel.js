Ext.define( 'DDO.model.loginlanding.createaccount.RegistrationCountryComboModel', {
	extend: 'Ext.data.Model',

	alias: 'model.registrationcountrycombomodel',

	fields: [{
		name: 'countryname',
		type: 'string'
	},{
		name: 'countryid',
		type: 'int'
	}]
});