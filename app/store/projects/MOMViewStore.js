Ext.define('DDO.store.projects.MOMViewStore', {
	extend: 'Ext.data.Store',

	alias: 'store.momviewstore',

	requires: [
		'DDO.model.projects.MOMCmpModel'
	],
	model: 'DDO.model.projects.MOMCmpModel',
    autoLoad:false,
	proxy: {
		type: 'ajax',
		url: Api.URL.momviewstore.READ,

		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	},

	sorters: [{
		property: "created_date",
		direction: "DESC"
	}],

	sortRoot: 'created_date',
	
	sortOnLoad: true,
	remoteSort: false
});