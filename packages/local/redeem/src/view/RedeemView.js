Ext.define('Redeem.view.RedeemView', {
	extend: 'Ext.window.Window',

	alias: 'widget.redeem-view',

	requires: [
		'Redeem.category.CategoryView',
		'Redeem.product.ProductView',
		'Redeem.product.CheckoutWindow',
		'Redeem.view.RedeemViewController',
		'Redeem.view.RedeemViewModel'
	],

	controller: 'redeemview',
	viewModel: {
		type: 'redeemview'
	},

	width: '90%',
	height: 580,

	modal: true,
	draggable: false,
	resizable: false,

	cls: 'redeem-view',

	items: [{
		xtype: 'container',

		width: '100%',
		height: '100%',

		layout: {
			type: 'hbox'
		},

		items: [{
			xtype: 'categoryview',
			flex: 0.17
		}, {
			xtype: 'productview',
			flex: 0.83
		}]
	}],
	
	/*
		this method is called at the time of initialization of view 
	*/
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
		me.mon(Ext.getBody(), 'click', function(el, e) {
			me.close(me.closeAction);
		}, me, {
			delegate: '.x-mask'
		});
	}
});