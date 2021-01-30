Ext.define( 'DDO.model.setup.AccountCountryComboModel', {
	extend: 'Ext.data.Model',

	alias: 'model.accountcountrycombomodel',

	fields: [{
		name: 'countryname',
		type: 'string'
	},{
		name: 'countryid',
		type: 'string'
	}]
});