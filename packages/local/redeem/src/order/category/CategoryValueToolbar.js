Ext.define('Redeem.order.category.CategoryValueToolbar', {
    extend: 'Ext.toolbar.Toolbar',

    alias: 'widget.categoryvaluetoolbar',

    //cls: 'rule-tb-cls',

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