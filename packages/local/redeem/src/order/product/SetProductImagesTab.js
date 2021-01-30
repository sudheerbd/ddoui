Ext.define('Redeem.order.product.SetProductImagesTab', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.setproductimagestab',
	title: 'Images',
	requires: [
		'Redeem.order.product.SetProductImages'
	],
	layout: {
		type: 'hbox'
	},
	bbar: {
		layout: {
			type: 'hbox'
		},
		padding: '25 0 20 0',
		items: [{
			xtype: 'button',
			text: 'Cancel',
			cls: 'karmaform-cancel-btn',
			listeners: {
				click: 'onFormCancelClick'
			}
		}, {
			xtype: 'button',
			text: 'Save',
			cls: 'karmaform-save-btn',
			formBind: true,
			listeners: {
				click: 'onFormSaveClick'
			}
		}]
	},
	items: [{
		xtype: 'setproductimages'
	}, {
		xtype: 'form',
		cls: 'karmasetup-feed-form',
		items: [{
			xtype: 'filefield',
			opType: 'upload',
			name: 'feedsImage',
			reference: "karmaUploadIcon",
			itemId: "karmaUploadIcon",
			accept: 'image',
			buttonOnly: true,
			buttonConfig: {
				iconCls: 'plus-upload-icon-cls',
				cls: 'upload-button-cls',
				width: 65,
				height: 65,
				margin: '40 0 0 12'
			},
			width: 80,
			buttonText: '',
			listeners: {
				change: 'onImgUpload'
			}

		}]
	}]
});