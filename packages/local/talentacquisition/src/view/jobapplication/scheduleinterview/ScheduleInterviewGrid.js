Ext.define('TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterviewGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.scheduleinterviewgrid',

    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding:'0px 10px 0px 0px',
    columns: [{
        text: 'Interviewer Name',
        dataIndex: 'intervieweremployeeid_name',
        flex: 0.4
    }, {
        text: 'Interview Type',
        dataIndex: 'interviewtype',
        flex: 0.4
    }, {
        text: 'Date',
        dataIndex: 'interviewdate',
        flex: 0.4,
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    }, {
        text: 'Time',
        dataIndex: 'time',
        flex: 0.4
    }, {
        text: 'Job Opening',
        dataIndex: 'ddo_jobopenings_name',
        flex: 0.4
    }, {
        text: 'Designation',
        dataIndex: 'ddo_designation_name',
        flex: 0.4
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
                    ddo_scheduleinterview_id: rec.get('ddo_scheduleinterview_id')
                };

                Ext.Ajax.request({
                    url: '/scheduleinterview',
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