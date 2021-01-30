Ext.define('TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetailsGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.interviewdetailsgrid',

    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding:'0px 10px 0px 0px',
    columns: [{
        text: 'Interviewer',
        dataIndex: 'interviewername',
        flex: 0.4,
        height: 42
    }, {
        text: 'Date',
        dataIndex: 'interviewdate',
        flex: 0.4,
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    }, {
        text: 'Interview Sequence Level',
        dataIndex: 'interviewtype',
        flex: 0.4,
    }, {
        text: 'Rating',
        dataIndex: 'rating',
        flex: 0.4
    }, {
        text: 'Feedback',
        dataIndex: 'feedback',
        flex: 0.4
    }]
});