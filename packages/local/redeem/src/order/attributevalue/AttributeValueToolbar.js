Ext.define('Redeem.order.attributevalue.AttributeValueToolbar', {
    extend: 'Ext.toolbar.Toolbar',

    alias: 'widget.attributevaluetoolbar',
    
    items: [{
        xtype: 'tbfill'
    }, {
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