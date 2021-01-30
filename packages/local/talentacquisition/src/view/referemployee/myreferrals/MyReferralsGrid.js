Ext.define('TalentAcquisition.view.referemployee.myreferrals.MyReferralsGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.myreferralsgrid',
    title: 'My Referrals',
    cls: 'karmalist-cls ta-header',
    viewConfig: {
        loadMask: false
    },
    requires: [
        'TalentAcquisition.store.employeereferral.MyReferralsStore'
    ],
    height: 500,
    width: '100%',
    store: Ext.create('TalentAcquisition.store.employeereferral.MyReferralsStore'),
    margin: '0 0 0 10',
    padding:'0px 10px 0px 0px',
    columns: [{
        text: 'Job Opening',
        dataIndex: 'ddo_jobopenings_name',
        flex: 0.3,
    }, {
        text: 'Candidate Name',
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
        text: 'Status',
        dataIndex: 'ddo_jobapplicationstatus_name',
        flex: 0.4,
        renderer: function(val){
          return Ext.isEmpty(val)? 'Processing' : val;
        }
    },{
        text: 'Referred By',
        dataIndex: 'referredby_name',
        hidden: true,
        flex: 0.4
    }],

    listeners:{
        activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            var store = this.getStore();
            var loggedInEmployeeId = Ext.getStore('login').data.items[0].getData().ddo_employee_id;
            store.load();
            store.filter([
                  {property: 'referredby', value: loggedInEmployeeId}
                ]);
        }
}
});