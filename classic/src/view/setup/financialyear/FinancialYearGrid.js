/**
 * The file FinancialYearGrid is the grid view of 'DDO.view.setup.financialyear.FinancialYear'.
 * @extends {Ext.grid.Panel}
 * @alias 'widget.financialyeargrid'.
 * ViewController : 'DDO.view.setup.financialyear.FinancialYearViewController'
 */
Ext.define('DDO.view.setup.financialyear.FinancialYearGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.financialyeargrid',

    cls: 'karmalist-cls',

    plugins: 'gridfilters',
    
    viewConfig: {
        loadMask: false
    },

    height: Constants.ViewportHeight * 0.78,
    width: '100%',
    margin: '0 0 0 10',
    padding:'0px 10px 0px 0px',
    columns: [{
        text: LabelsTitles.EMPSETUP.FINANCIALYEAR.NAME,
        dataIndex: 'name',
        flex: 0.3,
        height: 42,
        filter: {
            type: 'string',
            itemDefaults: {
                emptyText: LabelsTitles.EMPSETUP.FINANCIALYEAR.SEARCH
            }
        }
    }, {
        text: LabelsTitles.EMPSETUP.FINANCIALYEAR.STARTDATE,
        xtype: 'datecolumn',
        dataIndex: 'startdate',
        flex: 0.3,
        height: 42
    }, {
        text: LabelsTitles.EMPSETUP.FINANCIALYEAR.ENDDATE,
        xtype: 'datecolumn',
        dataIndex: 'enddate',
        flex: 0.3,
        height: 42
    }, {
        xtype: 'actioncolumn',
        width: 50,
        align: 'center',
        items: [{
            iconCls: 'delete-plus',
            tooltip: LabelsTitles.EMPSETUP.FINANCIALYEAR.DELETE,
            handler: 'onDeleteClick'
        }]
    }],

    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});