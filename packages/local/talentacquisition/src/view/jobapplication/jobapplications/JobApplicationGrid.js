Ext.define('TalentAcquisition.view.jobapplication.jobapplications.JobApplicationGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.jobapplicationgrid',

    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding:'0px 10px 0px 0px',
    columns: [{
        text: 'Application No.',
        dataIndex: 'ddo_jobapplications_id',
        flex: 0.4,
        hidden: true,
        height: 42
    }, {
        text: 'Job Opening',
        dataIndex: 'ddo_jobopenings_name',
        flex: 0.4
    }, {
        text: 'Candidate Name',
        dataIndex: 'candidatename',
        flex: 0.4
    }, {
        text: 'Status',
        dataIndex: 'ddo_jobapplicationstatus_name',
        flex: 0.3
    }, {
        text: 'Address',
        dataIndex: 'address',
        hidden: true,
        flex: 0.4
    }, {
        text: 'Mobile No.',
        dataIndex: 'mobilenumber',
        flex: 0.4
    }, {
        text: 'Education',
        dataIndex: 'ddo_jobeducation_name',
        flex: 0.4
    }, {
        text: 'Email',
        dataIndex: 'email',
        flex: 0.5
    },{
        xtype: 'widgetcolumn',
        width: 120,
        align: 'center',
        widget: {
            xtype: 'button',
            text: 'Interview',
            tooltip: 'Schedule Interview',
            cls: 'request-access-btn',
            handler: 'onAScheduleInterviewBtnClick'
        }
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
                params = {
                    ddo_jobapplications_id: rec.get('ddo_jobapplications_id')
                };

                Ext.Ajax.request({
                    url: '/jobapplications',
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
    }
});