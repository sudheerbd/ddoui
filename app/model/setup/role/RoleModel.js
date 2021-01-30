Ext.define('DDO.model.setup.role.RoleModel', {
	extend: 'Ext.data.Model',

	alias: 'model.rolemodel',

	//idProperty: 'ddo_karmarole_id',

	fields: [{
		name:'name'
	},{
		name:'description'
	},{
		name:'ddo_role_id'
	},{
		name:'ddo_dup_role_id',
		convert: function(value, record) {
			var rec = record.data,
				recid = rec.ddo_role_id;
			if (Ext.isEmpty(recid)) {
				return false;
			} else {
				return true;
			}
		}
	}]
});