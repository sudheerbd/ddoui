Ext.define('DDO.store.mom.MomComponent', {
	extend: 'Ext.data.Store',

	alias: 'store.momcomponent',

	requires: [
		'DDO.model.mom.MomComponent'
	],
	model: 'DDO.model.mom.MomComponent',

	proxy: {
		type: 'ajax',
		url: Api.URL.momcomponent.READ,

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