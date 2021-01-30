Ext.define('Redeem.category.CategoryView', {
	extend: 'Ext.container.Container',

	alias: 'widget.categoryview',

	requires: [
		'Redeem.category.CategoryGrid'
	],

	layout: {
		type: 'vbox'
	},

	cls: 'redeem-category-view',

	items: [{
		xtype: 'displayfield',
		value: 'Category',
		cls: 'redeem-category-field',
		height: 36,
		margin: '0 0 0 15'
	}, {
		xtype: 'categorygrid',
		reference: 'categorygrid',
		cls: 'category-grid',
		bind: {
			store: '{categorystore}'
		}
	}]
});