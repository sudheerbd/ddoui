Ext.define('Redeem.product.ProductView', {
	extend: 'Ext.panel.Panel',

	alias: 'widget.productview',

	requires: [
		'Redeem.product.Product',
		'Redeem.product.CheckoutWindow'
	],

	cls: 'redeem-product-view',

	bodyPadding: 20,
	scrollable: true,
	height:550,
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'top',
		items: [{
			xtype: 'tbspacer',
			width: 30
		}, {
			xtype:'button',
			text: '',
			iconCls: 'x-fa fa-google-wallet',
			cls: 'redeem-wallet',
			disabled:true,
			bind: {
				text: '{rewardPoints}'
			}
		}, '->', {
			bind: {
				text: 'Checkout {badgeText}'
			},
			iconCls: 'x-fa fa-shopping-cart',
			width: 130,
			cls: 'redeem-checkout',
			itemId:'Checkout_button',
			handler: 'onClickCheckOut',
			disabled:true
		}, {
			xtype: 'tbspacer',
			width: 27
		}]
	}],
	items: [{
		xtype: 'product',
		reference: 'product',
		bind: {
			store: '{productstore}'
		}
	}]
});