Ext.define('DDO.model.setup.employeesetup.CountryComboModel', {
    extend: 'Ext.data.Model',
    alias: 'model.countrycombomodel',
    
	fields: [{
		name: 'countryname',
		type: 'string'
	},{
		name: 'countryid',
		type: 'string'
	}]
});