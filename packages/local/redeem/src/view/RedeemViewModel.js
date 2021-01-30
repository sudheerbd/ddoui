Ext.define('Redeem.view.RedeemViewModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.redeemview',

	data: {
		badgeText: null,
		currentVal: null,
		itemsCount: null,
		balanceVal: null,
		selectedItems: [],
		selectedSize: null,
		selectedColor: null
	},

	stores: {
		categorystore: {
			proxy: {
				type: 'ajax',
				url: '/productcategories',
				reader: {
					type: 'json',
					rootProperty: 'category'
				}
			}
		},
		productstore: {
			proxy: {
				type: 'ajax',
				url: '/products',
				method: 'POST',
				extraParams: {
					productCategoryId: 0
				},
				reader: {
					type: 'json',
					rootProperty: 'products'
				}
			},
			autoLoad: true
		}
	}
});