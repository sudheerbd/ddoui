Ext.define('DDO.store.setup.employeesetup.StatusStore', {
	extend: 'Ext.data.Store',
	alias: 'store.statusstore',

	// requires: [
	// 	'DDO.model.skillslist.ProfileSkillsModel'
	// ],

	// model: 'DDO.model.skillslist.ProfileSkillsModel',

	//storeId: 'profileskillsstore',
	autoLoad: false,

	proxy: {
        type: 'ajax',
        url: '/resources/data/StatusData.json',
        
        reader: {
            type: 'json',
            rootProperty : "data"
        }
    }
});