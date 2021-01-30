Ext.define('TalentAcquisition.view.jobapplicationstatus.JobApplicationStatusGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.jobapplicationstatusgrid',

    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding:'0px 10px 0px 0px',
    columns: [{
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
            handler: function(grid, rowIndex, colIndex) {
                var gridStore = grid.getStore(),
                    rec = gridStore.getAt(rowIndex),
                    params;

                    if (rec.data.name == 'Joined' || rec.data.name == 'No Show' || rec.data.name == 'Offer Rejected' || rec.data.name == 'Offer Revoked') {
                        Ext.toast('This value cannot be deleted as it is being used in another screen', false, 't');
                    } else {

                params = {
                    ddo_jobapplicationstatus_id: rec.get('ddo_jobapplicationstatus_id')
                };

                    Ext.Ajax.request({
                        url: '/jobapplicationstatus',
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
                            var data = Ext.decode(resp.responseText);
                            Ext.toast(data.message, false, 't');
                        }
                    });
                }
            }
        }]
    }],

    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});