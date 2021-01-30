Ext.define('DDO.store.skillslist.ProfileSkillsStore', {
	extend: 'Ext.data.Store',
	alias: 'store.profileskillsstore',

	requires: [
		'DDO.model.skillslist.ProfileSkillsModel'
	],

	model: 'DDO.model.skillslist.ProfileSkillsModel',

	//storeId: 'profileskillsstore',
	autoLoad: false,

	proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.skills.READ,
            create: Api.URL.skills.CREATE
        },
        actionMethods: {
            read: 'GET',
            create: 'POST'
        },

        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            writeAllFields: true
        }
    }
});