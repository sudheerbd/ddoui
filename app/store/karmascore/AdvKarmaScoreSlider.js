Ext.define('DDO.store.karmascore.AdvKarmaScoreSlider', {
	extend: 'Ext.data.Store',
	alias: 'store.advkarmascoreslider',

	requires: [
		'DDO.model.widget.karmascore.KarmaScoreSlider'
	],

	model: 'DDO.model.widget.karmascore.KarmaScoreSlider',

	proxy: {
		type: 'ajax',
		url: 'resources/data/karmascoreview/Slider.json',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
});