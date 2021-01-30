Ext.define('Redeem.product.CheckoutWindow', {
	extend: 'Ext.window.Window',

	alias: 'widget.checkoutwindow',

	requires: [
		'Redeem.product.Checkout',
		'Redeem.product.CheckoutWindowController'
	],

	width: '50%',
	height: '50%',

	// header  : false,

	autoShow: true,

	scrollable: true,
	resizable: false,
	maskClickAction:'hide',
	modal: true,
	title: 'Checkout',
	titleAlign: 'center',
	
	cls: 'checkoutwindow',

	controller: 'checkoutwindow',

	initComponent: function() {
		var me = this;
		this.dockedItems = this.buildTbar();
		this.bbar = this.buildBbar();
		this.items = this.buildItems();
		this.callParent(arguments);
		me.mon(Ext.getBody(), 'click', function(el, e) {
			me.close(me.closeAction);
		}, me, {
			delegate: '.x-mask'
		});
	},

	buildTbar: function() {
		return [{
			xtype: 'toolbar',
			dock: 'top',
			layout: {
				pack: 'center'
			},
			items: [/*{
				xtype: 'label',
				cls: 'lbl-checkout',
				text: 'Checkout'
			}*/
			{
			xtype: 'label',
			cls: 'lbl-redeemed',
			itemId:'valuepoints',
			text: 'Redeemed ' + this.currentVal,
			prize:this.currentVal
		}, {
			xtype: 'label',
			cls: 'lbl-available',
			itemId:'orignalvalue',
			text: 'Available ' + this.balanceVal,
			prize:this.balanceVal
		}]
		}];
	},

	buildBbar: function() {
		return ['->',{
			text: 'Cancel',
			cls: 'btn-cancel',
			handler: function() {
				this.up('checkoutwindow').close();
			}
		},{
			text: 'Confirm',
			cls: 'btn-confirm',
			handler: 'onConfirmBtnClick'
		}]
	},

	buildItems: function() {
		return [{
			xtype: 'checkout',
			store: this.store
		}];
	}
});