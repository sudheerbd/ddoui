Ext.define('DDO.model.setup.financialyear.FinancialYearModel', {
	extend: 'Ext.data.Model',

	alias: 'model.financialyearmodel',

	idProperty: 'ddo_fyear_id',

	fields: [{
		name: 'name'
	}, {
		name: 'startdate'
	},{
		name: 'enddate'
	}, {
		name: 'ddo_fyear_id'
	}, {
		name: 'ddo_dup_financialyear_id',
		convert: function(value, record) {
			var rec = record.data,
				recid = rec.ddo_fyear_id;
			if (Ext.isEmpty(recid)) {
				return false;
			} else {
				return true;
			}
		}
	}]
});
