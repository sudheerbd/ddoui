Ext.define('DDO.model.setup.employeesetup.StateComboModel', {
    extend: 'Ext.data.Model',
    alias: 'model.statecombomodel',
    fields: [{
		name:'statename',
		type: 'string'
	}, {
		name: 'stateid',
		type: 'string'
	}]
});