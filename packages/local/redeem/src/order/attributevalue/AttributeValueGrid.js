Ext.define('Redeem.order.attributevalue.AttributeValueGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.attributevaluegrid',

    cls: 'karmalist-cls',

    plugins: 'gridfilters',

    height: 500,
    margin: '0 0 0 10',
    viewConfig: {
        loadMask: false
    },
    columns: [{
        text: 'Attribute',
        dataIndex: 'productattribute',
        flex: 0.3,
        height: 42,
        filter: {
            type: 'string',
            itemDefaults: {
                emptyText: 'Search...'
            }
        }
    }, {
        text: 'Attribute Value',
        dataIndex: 'productattributevalue',
        flex: 0.4
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
                    ddo_productattributevalue_id: rec.data.ddo_productattribute_value_id
                };

                Ext.Ajax.request({
                    url: '/productattributevalues',
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
                                Ext.Msg.alert('Failed', "Already this attribute values is mapped to products");
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