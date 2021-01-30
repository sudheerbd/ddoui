Ext.define('TalentAcquisition.view.referemployee.ReferEmployeeGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.referemployeegrid',

    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    requires: [
        'TalentAcquisition.store.jobopenings.JobOpeningsStore'
    ],
    tbar:{
        height:30,
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype:'tbspacer',
            width:'70%'
        },{
            xtype:'label',
            html:'<b>Job not listed? </b>'
            // <span style="font-size:17px;>
        },{
            xtype: 'button',
            text: '<font color="blue"><b>Enter details</font>',
            handler: 'onEnterCandidateDetailsBtnClick',
            //scale: 'large',
            //cls: 'back-btn-cls'
        }]
    },
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding:'0px 10px 0px 0px',
    columns: [{
        text: 'Job Name',
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
        text: 'Department',
        dataIndex: 'ddo_department_name',
        flex: 0.4,
        hidden: true
    },{
        text: 'Location',
        dataIndex: 'ddo_joblocation_name',
        flex: 0.4
    },{
        text: 'Designation',
        dataIndex: 'ddo_designation_name',
        flex: 0.4
    },{
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
        hidden:true,
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
        width: 150,
        align: 'center',
        widget: {
            xtype: 'button',
            text: 'Refer a friend',
            cls: 'request-access-btn',
            tooltip: 'Refer a friend',
            handler: 'onReferAnEmployeeBtnClick'
        }
    }]
});