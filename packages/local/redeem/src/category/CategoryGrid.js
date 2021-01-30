Ext.define('Redeem.category.CategoryGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.categorygrid',

    requires: [
        'Ext.grid.column.Check'
    ],

    width: '100%',

    scrollable: 'y',

    header: false,

    rowLines: false,
    hideHeaders: true,
    columnLines: false,

    columns: [{
        xtype: 'checkcolumn',
        dataIndex: 'selected',
        align: 'right',
        flex: 0.07,
        listeners: {
            checkchange: 'onSelectionChange'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        flex: 0.93
    }],

    listeners: {
        afterrender: 'onCategoryGridRender'
    }
});