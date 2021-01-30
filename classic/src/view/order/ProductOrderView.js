Ext.define('DDO.view.order.ProductOrderView', {
	extend: 'Ext.container.Container',

	alias: 'widget.productorderview',

	cls:'attribute-cls',

	width: '100%',
	margin:5,
	requires: [
		'Redeem.order.product.ProductValue'
	],
	defaults:{
		width: '100%'
	},
	items: [{
		xtype: 'productvalue'
	}]

});