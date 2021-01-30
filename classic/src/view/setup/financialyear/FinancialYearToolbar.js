Ext.define('DDO.view.setup.financialyear.FinancialYearToolbar', {
    extend: 'Ext.toolbar.Toolbar',

    alias: 'widget.financialyeartoolbar',

    cls: 'rule-tb-cls',

    items: [{
        xtype: 'tbfill'
    }, {
        xtype: 'button',
        text: LabelsTitles.EMPSETUP.FINANCIALYEAR.ADDBTN,
        iconCls: 'rule-plus',
        margin: 0,
        cls: 'rule-add-btn',
        listeners: {
            click: 'onAddNewClick'
        }
    }]
});