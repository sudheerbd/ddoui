Ext.define('TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.referredemployeegrid',

    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    requires: [
        'TalentAcquisition.store.employeereferral.EmployeeReferralStore'
    ],
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding:'0px 10px 0px 0px',
    columns: [{
        text: 'Job Opening',
        dataIndex: 'ddo_jobopenings_name',
        flex: 0.3,
    }, {
        text: 'Name',
        dataIndex: 'candidatename',
        flex: 0.4
    },{
        text: 'email',
        dataIndex: 'email',
        flex: 0.4
    },{
        text: 'Phone',
        dataIndex: 'phone',
        flex: 0.4
    },{
        text: 'Location',
        dataIndex: 'location',
        flex: 0.4
    },{
        text: 'Referred By',
        dataIndex: 'referredby_name',
        flex: 0.4
    },{
        text: 'Status',
        dataIndex: 'ddo_jobapplicationstatus_name',
        flex: 0.4,
        renderer: function(val){
          return Ext.isEmpty(val)? 'Processing' : val;
        }
    }],

    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});