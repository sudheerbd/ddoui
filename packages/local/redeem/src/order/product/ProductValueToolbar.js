Ext.define('Redeem.order.product.ProductValueToolbar', {
    extend: 'Ext.toolbar.Toolbar',

    alias: 'widget.productvaluetoolbar',

    items: [{
        xtype: 'tbfill'
    },{
        xtype: 'button',
        text: 'Add New',
        iconCls: 'rule-plus',
        margin: 0,
        cls: 'rule-add-btn',
        listeners: {
            click: 'onAddNewClick'
        }
    }]
});