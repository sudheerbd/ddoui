Ext.define('DDO.store.widget.karmascore.KarmaScoreSlider', {
	extend: 'Ext.data.Store',
	alias: 'store.karmascoreslider',

	storeId: 'karmascoreslider',

	requires: [
		'DDO.model.widget.karmascore.KarmaScoreSlider'
	],

	model: 'DDO.model.widget.karmascore.KarmaScoreSlider',

	autoLoad: false,

	proxy: {
		type: 'ajax',
		url: 'resources/data/Slider.json',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
});