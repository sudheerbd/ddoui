Ext.define('TalentAcquisition.view.jobapplication.JobApplication', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobapplicationmainview',

    requires: [
        'TalentAcquisition.view.jobapplication.jobapplications.JobApplication',
        'TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterview',
        'TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetails'
    ],
    cls: 'goalstab-cls',
    layout:'card',
    items:[
        {
            title:'Application',
            xtype:'jobapplicationview'
        },{
            title:'Schedule Interview',
            xtype:'scheduleinterviewview'
        },{
            title:'Interview Details',
            xtype:'interviewdetailsview'
        }
    ],
    listeners:{activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            this.down('[name=filterColumn]').reset()
        }}
});
