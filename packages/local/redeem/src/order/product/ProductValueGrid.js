Ext.define('Redeem.order.product.ProductValueGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.productvaluegrid',

    cls: 'karmalist-cls',

    plugins: 'gridfilters',

    height: 500,

    reference: 'productvaluegrid',
    viewConfig: {
        loadMask: false
    },

    margin: '0 0 0 10',
    columns: [{
        text: 'Name',
        dataIndex: 'productname',
        flex: 0.3,
        height: 42,
        filter: {
            type: 'string',
            itemDefaults: {
                emptyText: 'Search...'
            }
        }
    }, {
        text: 'Category',
        dataIndex: 'categoryname',
        flex: 0.3,
        height: 42,
        filter: {
            type: 'string',
            itemDefaults: {
                emptyText: 'Search...'
            }
        }
    }, {
        text: 'Price',
        dataIndex: 'price',
        flex: 0.3,
        height: 42,
        filter: {
            type: 'string',
            itemDefaults: {
                emptyText: 'Search...'
            }
        }
    }, {
        text: 'Quantity',
        dataIndex: 'quantity',
        flex: 0.3,
        height: 42,
        filter: {
            type: 'string',
            itemDefaults: {
                emptyText: 'Search...'
            }
        }
    }, {
        text: 'Code',
        dataIndex: 'code',
        flex: 0.3,
        height: 42,
        filter: {
            type: 'string',
            itemDefaults: {
                emptyText: 'Search...'
            }
        }
    }, {
        xtype: 'actioncolumn',
        width: 50,
        align: 'center',
        items: [{
            iconCls: 'delete-plus',
            tooltip: 'Delete',
            handler: function(grid, rowIndex, colIndex) {
                var gridStore = grid.getStore(),
                    rec = gridStore.getAt(rowIndex),
                    params;

                params = {
                    ddo_product_id: rec.data.ddo_product_id
                };

                Ext.Ajax.request({
                    url: '/product',
                    method: 'DELETE',
                    params: params,
                    success: function(resp, b) {
                        gridStore.removeAt(rowIndex)
                        gridStore.reload();
                        Ext.getBody().unmask();

                    },
                    failure: function(resp, b) {
                         var responseTextData = Ext.decode(resp.responseText),
                            errDetail = responseTextData.message;
                            Ext.Msg.alert('Failed',errDetail);
                        Ext.getBody().unmask();
                    }
                });
            }
        }]
    }],

    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});