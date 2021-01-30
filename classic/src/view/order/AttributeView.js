Ext.define('DDO.view.order.AttributeView', {
	extend: 'Ext.container.Container',

	alias: 'widget.attributeview',

	cls:'attribute-cls',

	width: '100%',
	margin:5,
	requires: [
		'Redeem.order.attribute.Attribute'
	],
	defaults:{
		width: '100%'
	},
	items: [{
		xtype: 'attribute'
	}]

});