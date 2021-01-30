Ext.define('DDO.view.order.AttributeValueView', {
	extend: 'Ext.container.Container',

	alias: 'widget.attributevalueview',

	cls:'attribute-cls',

	width: '100%',
	margin:5,
	requires: [
		'Redeem.order.attributevalue.AttributeValue'
	],
	defaults:{
		width: '100%'
	},
	items: [{
		xtype: 'attributevalue'
	}]
});