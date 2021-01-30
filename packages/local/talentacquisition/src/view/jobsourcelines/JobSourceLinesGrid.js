Ext.define('TalentAcquisition.view.jobsourcelines.JobSourceLinesGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.jobsourcelinesgrid',

    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    requires: [
        'TalentAcquisition.store.jobsourcelines.JobSourceLinesStore',
        'TalentAcquisition.store.jobsource.JobSourceStore',
        ],
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding:'0px 10px 0px 0px',
    columns: [{
        text: 'Source Line',
        dataIndex: 'ddo_jobsource_name',
        flex: 0.4
    },  {
        text: 'Name',
        dataIndex: 'name',
        flex: 0.3,
        height: 42,
        filter: {
            type: 'string',
            itemDefaults: {
                emptyText: 'Search...'
            }
        }
    }, {
        text: 'Description',
        dataIndex: 'description',
        flex: 0.4
    },{
        xtype: 'actioncolumn',
        width: 50,
        align: 'center',
        items: [{
            iconCls: 'delete-plus',
            tooltip: 'Delete',
           // handler: 'onGridDeleteClick'
            handler: function(grid, rowIndex, colIndex) {
                var gridStore = grid.getStore(),
                    rec = gridStore.getAt(rowIndex),
                    params;
                params = {
                    ddo_jobsourcelines_id: rec.get('ddo_jobsourcelines_id')
                };

                Ext.Ajax.request({
                    url: '/jobsourceline',
                    method: 'DELETE',
                    params: params,
                    success: function(resp, b) {
                        gridStore.removeAt(rowIndex)
                        gridStore.reload();
                        Ext.getBody().unmask();
                        var data = Ext.decode(resp.responseText);
                        Ext.toast(data.message, false, 't');
                    },
                    failure: function(resp, b) {
                        Ext.getBody().unmask();
                        Ext.toast('Unable to delete data',false,'t');
                        var data = Ext.decode(resp.responseText);
                        Ext.toast(data.message, false, 't');
                    }
                });
            }
        }]
    }],

    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});