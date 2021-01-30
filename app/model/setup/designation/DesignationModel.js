Ext.define('DDO.model.setup.designation.DesignationModel', {
	extend: 'Ext.data.Model',

	alias: 'model.designationmodel',

	fields: [{
		name: 'name'
	}, {
		name: 'description'
	}, {
		name: 'ddo_designation_id'
	}, {
		name: 'ddo_dup_designation_id',
		convert: function(value, record) {
			var rec = record.data,
				recid = rec.ddo_designation_id;
			if (Ext.isEmpty(recid)) {
				return false;
			} else {
				return true;
			}
		}
	},{
		name: 'acronym',
			convert: function (value, record) {
				var rec = record.data,
					recid = rec.acronym;
				if (recid) {
					return recid.trim();
				}
				return recid;
			}
	}]
});