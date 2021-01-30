Ext.define('Redeem.order.attribute.Attribute', {
    extend: 'Ext.container.Container',

    alias: 'widget.attribute',

    requires: [
        'Redeem.order.attribute.AttributeGrid',
        'Redeem.order.attribute.AttributeToolbar',
        'Redeem.order.attribute.AttributeViewController',
        'Redeem.order.attribute.AttributeViewModel',
        'Redeem.order.attribute.AttributeWindow'
    ],

    scrollable: false,

    controller: 'attributeviewcontroller',
    viewModel: {
        type: 'attributeviewmodel'
    },

    initComponent: function() {
        this.callParent(arguments);

        var store = Ext.getStore('Redeem.store.AttributeStore');
        if (!store.isLoaded()) {
            Utility.onStoreLoading(store);
            //store.load();
        }
    },

    items: [{
        xtype: 'attributetoolbar',
        cls: 'wallet-toolbar-cls',
        width: '100%',
        height: 70,
        html: '<h3>Attribute</h3>'
    }, {
        xtype: 'attributegrid',
        store: 'Redeem.store.AttributeStore'
    }]
});