Ext.define('DDO.store.setup.employeesetup.ReportingStore', {
	extend: 'Ext.data.Store',
	alias: 'store.reportingstore',

	// requires: [
	// 	'DDO.model.skillslist.ProfileSkillsModel'
	// ],

	// model: 'DDO.model.skillslist.ProfileSkillsModel',

	//storeId: 'profileskillsstore',
	autoLoad: false,

	proxy: {
		type: 'ajax',
		url: Api.URL.repoprtingstore.READ,
        
        reader: {
            type: 'json',
            rootProperty : "data"
        }
    }
});