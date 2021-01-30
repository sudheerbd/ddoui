Ext.define('TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetailsGrid', {
    extend: 'Ext.grid.Panel',
    requires: ['TalentAcquisition.store.jobopenings.ApplicationDetailsStore',
        'TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetailsController'],
    alias: 'widget.applicationdetailsgrid',
    //store: type:{'applicationdetailstore'},
    /*store: {
     type: 'applicationdetailstore'
     },*/
    //store: Ext.create('TalentAcquisition.store.jobopenings.ApplicationDetailsStore'),
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    //controller: 'applicationdetailscontroller',
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
        dataIndex: 'firstname',
        flex: 0.4,
        renderer:function(value,cell,record){
            var data = record.data;
            return data.firstname+' '+data.lastname;
        }
    },  {
        text: 'Status',
        dataIndex: 'ddo_jobapplicationstatus_name',
        flex: 0.4
    }, {
        text: 'Address',
        dataIndex: 'address',
        hidden: true,
        flex: 0.4
    }, {
        text: 'Mobile Number',
        dataIndex: 'mobilenumber',
        flex: 0.4
    }, {
        text: 'Education',
        dataIndex: 'ddo_jobeducation_name',
        flex: 0.4
    }, {
        text: 'Email',
        dataIndex: 'email',
        flex: 0.4
    }],

    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});