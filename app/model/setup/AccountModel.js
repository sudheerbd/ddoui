Ext.define('DDO.model.setup.AccountModel', {
	extend: 'Ext.data.Model',

	alias: 'model.accountmodel',

	fields: [{
		name: 'ad_org_id',
		type: 'int'
	}, {
		name: 'orgname',
		type: 'string'
	}, {
		name: 'name',
		type: 'string'
	}, {
		name: 'ad_client_id',
		type: 'int'
	}, {
		name: 'description',
		type: 'string'
	}, {
		name: 'requestemail',
		type: 'string'
	}, {
		name: 'c_location_id',
		type: 'int'
	}, {
		name: 'city',
		type: 'string'
	}, {
		name: 'address1',
		type: 'string'
	}, {
		name: 'address2',
		type: 'string'
	}, {
		name: 'address3',
		type: 'string'
	}, {
		name: 'address4',
		type: 'string'
	}, {
		name: 'postal',
		type: 'int'
	}, {
		name: 'c_country_id',
		type: 'int'
	}, {
		name: 'c_region_id',
		type: 'int'
	}, {
		name: 'c_city_id',
		type: 'int'
	}, {
		name: 'countryname',
		type: 'string'
	}, {
		name: 'stateid',
		type: 'int'
	}, {
		name: 'statename',
		type: 'string'
	}, {
		name: 'cityid',
		type: 'int'
	},{
		name: 'countryid',
		type: 'number'
	}, {
		name: 'cityname',
		type: 'string'
	},'city','country','details','state','zipcode']



});
