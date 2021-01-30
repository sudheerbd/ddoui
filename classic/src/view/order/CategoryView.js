Ext.define('DDO.view.order.CategoryView', {
	extend: 'Ext.container.Container',

	alias: 'widget.categoryviews',

	cls:'attribute-cls',

	width: '100%',
	margin:5,
	requires: [
		'Redeem.order.category.CategoryValue'
	],
	defaults:{
		width: '100%'
	},
	items: [{
		xtype: 'categoryvalue'
	}]

});