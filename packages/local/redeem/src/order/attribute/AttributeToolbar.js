Ext.define('Redeem.order.attribute.AttributeToolbar', {
    extend: 'Ext.toolbar.Toolbar',

    alias: 'widget.attributetoolbar',
    
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