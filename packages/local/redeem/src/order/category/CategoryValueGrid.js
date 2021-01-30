Ext.define('Redeem.order.category.CategoryValueGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.categoryvaluegrid',

    cls: 'karmalist-cls',

    plugins: 'gridfilters',

    height: 500,
    // width: '100%',
    viewConfig: {
        loadMask: false
    },
    margin: '0 0 0 10',
    columns: [{
        text: 'Name',
        dataIndex: 'productcategoryname',
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
                    categoryId: rec.data.ddo_productcategory_id
                };

                Ext.Ajax.request({
                    url: '/productcategory',
                    method: 'DELETE',
                    params: params,
                    success: function(resp, b) {
                        gridStore.removeAt(rowIndex)
                        gridStore.reload();
                        Ext.getBody().unmask();

                    },
                    failure: function(resp, b) {
                        var responseTextData = Ext.decode(resp.responseText),
                            errDetail = responseTextData.data,
                            errDetailFormat, errorMsg;

                        if (errDetail && errDetail.detail) {
                            errDetailFormat = errDetail.detail.split('=');
                            errorMsg = errDetailFormat[1].replace(/\(/g, "").replace(/\)/g, "");
                            var errRef = errorMsg.match("still referenced");
                            if (errRef) {
                                Ext.Msg.alert('Failed', "Already this category is mapped to products");
                            } else {
                                Ext.Msg.alert('Failed', errorMsg);
                            }
                        }
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