Ext.define('DDO.view.loginlanding.Greeting', {
	extend: 'Ext.view.View',
	xtype: 'logingreeting',

	width: '50%',
	height: 210,

	initComponent: function() {
		this.updateStatus();
		this.callParent(arguments);
	},

	updateStatus: function() {
		var store = Ext.getStore('quotestore');

		if (!store.isLoaded()) {
			store.load();
		}
		if (store) {
			store.on('load', this.statusPerRefresh, this);
		}
	},

	statusPerRefresh: function(store, data) {
		var array = data,
			currentTime = Ext.Date.format(new Date(), 'H'),
			i = Math.floor(Math.random() * array.length);
		this.setData(array[i]);
	},


	tpl: [
		'<div class="ddo-quote-wrap">',
		'<tpl for=".">',
		'<div class="quote"><h1>Good {[this.noonUpdate()]},<h1>',
		'<h2>"{quote}"</h2><span class="DDO-thoughtAuthor"><h3> - {author}</h3></span></div></tpl>',
		'</div>', {
			noonUpdate: function() {
				return Utility.getNoonText();
			}
		}
	],

	itemSelector: ''
});