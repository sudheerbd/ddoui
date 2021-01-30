Ext.define('Redeem.order.product.ProductValue', {
    extend: 'Ext.container.Container',

    alias: 'widget.productvalue',

    requires: [
        'Redeem.order.product.ProductValueGrid',
        'Redeem.order.product.ProductValueToolbar',
        'Redeem.order.product.ProductValueViewController',
        'Redeem.order.product.ProductValueViewModel',
        'Redeem.order.product.SetAttributeWindow'
    ],


    scrollable: false,

    controller: 'productvalueviewcontroller',
    viewModel: {
        type: 'productvalueviewmodel'
    },

    initComponent: function() {
        this.callParent(arguments);

        var store = Ext.getStore('Redeem.store.ProductValueStore');
        if (!store.isLoaded()) {
            Utility.onStoreLoading(store);
           // store.load();
        }
        var attributeStore = Ext.getStore('Redeem.store.AttributeStore'),
            attributeValueStore = Ext.getStore('Redeem.store.AttributeValueStore');
        if (!attributeStore.isLoaded()) {
            attributeStore.load();
            attributeValueStore.load();
        }
    },

    items: [{
        xtype: 'productvaluetoolbar',
        cls: 'wallet-toolbar-cls',
        width: '100%',
        height: 70,
        html: '<h3>Product</h3>'
    }, {
        xtype: 'productvaluegrid',
        store: 'Redeem.store.ProductValueStore'
    }]
});