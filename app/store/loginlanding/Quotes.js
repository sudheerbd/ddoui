Ext.define('DDO.store.loginlanding.Quotes', {
	extend: 'Ext.data.Store',

	requires: [
		'DDO.model.loginlanding.Quote'
	],

	model: 'DDO.model.loginlanding.Quote',

	storeId: 'quotestore',

	proxy: {
		type: 'ajax',
		url: 'resources/data/quotes.json',
		reader: {
			type: 'json',
			rootProperty: 'details'
		}
	}
});