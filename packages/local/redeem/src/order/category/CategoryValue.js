Ext.define('Redeem.order.category.CategoryValue', {
    extend: 'Ext.container.Container',

    alias: 'widget.categoryvalue',

    requires: [
        'Redeem.order.category.CategoryValueGrid',
        'Redeem.order.category.CategoryValueToolbar',
        'Redeem.order.category.CategoryValueViewController',
        'Redeem.order.category.CategoryValueViewModel',
        'Redeem.order.category.CategoryValueWindow'
    ],

    scrollable:false,

    controller: 'categoryvalueviewcontroller',
    viewModel: {
        type: 'categoryvalueviewmodel'
    },

    initComponent: function() {
        this.callParent(arguments);

       var store = Ext.getStore('Redeem.store.CategoryValueStore');
        if (!store.isLoaded()) {
            Utility.onStoreLoading(store);
            //store.load();
        }
    },

    items: [{
        xtype: 'categoryvaluetoolbar',
        cls: 'wallet-toolbar-cls',
        width: '100%',
        height: 70,
        html: '<h3>Category</h3>'
    }, {
        xtype: 'categoryvaluegrid',
        store: 'Redeem.store.CategoryValueStore'
    }]
});