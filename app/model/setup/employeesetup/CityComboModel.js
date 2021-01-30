Ext.define('DDO.model.setup.employeesetup.CityComboModel', {
    extend: 'Ext.data.Model',
    alias: 'model.citycombomodel',
    
	fields: [{
		name:'cityname',
		type: 'string'
	}, {
		name: 'cityid',
		type: 'string'
	} ]
});