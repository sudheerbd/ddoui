Ext.define('DDO.model.loginlanding.Login', {
	extend: 'Ext.data.Model',
	storeId : "loginstore",

	fields: [{
		name: 'user_id'
	},{
		name: 'cbpid'
	}, {
		name: 'fullname'
	}, {
		name: 'email'
	}, {
		name: 'empcode'
	}, {
		name: 'designation'
	}, {
		name : 'roles'
	}, {
		name : "score"
	}]
});
