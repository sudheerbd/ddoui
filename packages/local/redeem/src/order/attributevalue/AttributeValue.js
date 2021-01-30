Ext.define('Redeem.order.attributevalue.AttributeValue', {
    extend: 'Ext.container.Container',

    alias: 'widget.attributevalue',

    requires: [
        'Redeem.order.attributevalue.AttributeValueGrid',
        'Redeem.order.attributevalue.AttributeValueToolbar',
        'Redeem.order.attributevalue.AttributeValueViewController',
        'Redeem.order.attributevalue.AttributeValueViewModel',
        'Redeem.order.attributevalue.AttributeValueWindow'
    ],

    scrollable:false,

    controller: 'attributevalueviewcontroller',
    viewModel: {
        type: 'attributevalueviewmodel'
    },

    initComponent: function() {
        this.callParent(arguments);

       var store = Ext.getStore('Redeem.store.AttributeValueStore');
        if (!store.isLoaded()) {
            Utility.onStoreLoading(store);
            //store.load();
        }
    },

    items: [{
        xtype: 'attributevaluetoolbar',
        cls: 'wallet-toolbar-cls',
        width: '100%',
        height: 70,
        html: '<h3>Attribute Value</h3>'
    }, {
        xtype: 'attributevaluegrid',
        store: 'Redeem.store.AttributeValueStore'
    }]
});