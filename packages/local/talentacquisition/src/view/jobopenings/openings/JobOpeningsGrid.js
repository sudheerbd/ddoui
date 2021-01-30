Ext.define('TalentAcquisition.view.jobopenings.openings.JobOpeningsGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.jobopeningsgrid',

    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    requires: [
        'TalentAcquisition.store.jobopenings.JobOpeningsStore'
    ],
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding:'0px 10px 0px 0px',
    columns: [{
        text: 'Job Name',
        dataIndex: 'name',
        flex: 0.4,
        height: 42,
        filter: {
            type: 'string',
            itemDefaults: {
                emptyText: 'Search...'
            }
        }
    }, {
        text: 'Department',
        dataIndex: 'ddo_department_name',
        flex: 0.4,
        hidden:true
    },{
        text: 'Location',
        dataIndex: 'ddo_joblocation_name',
        flex: 0.4
    },{
        text: 'Designation',
        dataIndex: 'ddo_designation_name',
        flex: 0.4
    },/*{
     text: 'Description',
     dataIndex: 'description',
     flex: 0.4
     },*/{
        text: 'Qualification',
        dataIndex: 'ddo_jobeducation_name',
        flex: 0.4
    },{
        text: 'Total Experience',
        dataIndex: 'totalexperience',
        flex: 0.4
    },{
        text: 'Open Positions',
        dataIndex: 'openpositions',
        flex: 0.4
    },{
        text: 'Responsibilities',
        dataIndex: 'responsibilities',
        hidden: true,
        flex: 0.4
    },{
        text: 'Skills',
        dataIndex: 'primaryskills',
        flex: 0.4
    },{
        text: 'Status',
        dataIndex: 'jobstatus',
        flex: 0.4
    },{
        xtype: 'widgetcolumn',
        width: 120,
        align: 'center',
        widget: {
            xtype: 'button',
            text: 'Applications',
            tooltip: 'Applications Detail',
            //cls: 'request-access-btn',
            cls: 'request-access-btn',
            //glyph: 'xf0c7@FontAwesome',
            handler: 'onApplicationBtnClick'
        }
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
                    ddo_jobopenings_id: rec.get('ddo_jobopenings_id')
                };

                Ext.Ajax.request({
                    url: '/jobopenings',
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
        }]
    }],

    listeners: {
        rowdblclick: 'onGridRowClick'
        //select: 'onRecSelect'
    }
});