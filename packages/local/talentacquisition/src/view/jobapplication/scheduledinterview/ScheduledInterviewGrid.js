Ext.define('TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.scheduledinterviewgrid',

    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding:'0px 10px 0px 0px',
    columns: [{
        text: 'Candidate Name',
        dataIndex: 'intervieweename',
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
    }],

    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});