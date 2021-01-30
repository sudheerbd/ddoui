Ext.define('DDO.store.projects.MOMActionItemsStore', {
	extend: 'Ext.data.Store',
    alias: 'store.momActionItemsStore',
    
    storeId: 'momActionItemsStore',

	requires: [
		'DDO.model.projects.MOMACtionItemsStoreModel'
	],

	model: 'DDO.model.projects.MOMACtionItemsStoreModel',

	//storeId: 'profileskillsstore',
	autoLoad: false,

	proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.momActionItems.READ,
            // create: Api.URL.skills.CREATE
        },
        actionMethods: {
            read: 'GET',
            // create: 'POST'
        },

        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            writeAllFields: true
        }
    },

    // listeners: {
    //     beforeload: function(store, record, evt) {
    //         debugger;
    //         var view = Ext.ComponentQuery.query('mainviewport')[0],
    //             projectId = view.getViewModel().get('projectId') 
    //                 || window.location.hash.split('/')[1],

    //             params = {
    //                 projectId: projectId
    //             };

    //         store.getProxy().setExtraParams(params);
    //         // Utility.projectPeopleId = peopleProjectId;
    //     }
    // }
});