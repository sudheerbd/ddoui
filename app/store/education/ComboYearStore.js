Ext.define('DDO.store.education.ComboYearStore', {
	extend: 'Ext.data.Store',
	alias: 'store.comboyearstore',
        storeId:'comboyearstore',
	requires: [
		'DDO.model.education.ComboYearModel'
	],
	model: 'DDO.model.education.ComboYearModel',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		
		url: 'resources/data/profile/educationcomboyears.json',
		reader: {
			type: 'json',
			rootProperty: 'yearperiod'
		}
	},
	 filters: [{
        property: 'currentyear',
        value: true
    }]
});