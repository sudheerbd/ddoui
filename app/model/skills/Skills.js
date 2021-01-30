Ext.define('DDO.model.skills.Skills', {
	extend: 'Ext.data.Model',

	fields: [{
		name: 'skillName'
	}, {
		name: 'skillTotalCount'
	}],

	proxy: {
		type: 'ajax',
        url: '/dashboard/employeeavailability/resources',
        reader: {
            type: 'json',
            rootProperty:'data'
        }
	}
});
