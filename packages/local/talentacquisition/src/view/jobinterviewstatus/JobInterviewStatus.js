Ext.define('TalentAcquisition.view.jobinterviewstatus.JobInterviewStatus', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobinterviewstatusview',

    requires: [
        'TalentAcquisition.view.jobinterviewstatus.JobInterviewStatusForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobinterviewstatus.JobInterviewStatusGrid',
        'TalentAcquisition.view.jobinterviewstatus.JobInterviewStatusController',
        'TalentAcquisition.view.jobinterviewstatus.JobInterviewStatusViewModel',
        'TalentAcquisition.store.jobinterviewstatus.JobInterviewStatusStore'
    ],
    controller: 'jobinterviewstatuscontroller',
    viewModel: {
        type: 'jobinterviewstatusviewmodel'
    },
    items: [{
        xtype: 'collapsiblecontainer',
        mainContainerTitle: 'Interview Status',
        grid: 'jobinterviewstatusgrid',
        gridStore: Ext.create('TalentAcquisition.store.jobinterviewstatus.JobInterviewStatusStore'),
        form: 'jobinterviewstatusform',
        fbButtonRequired: true
    }],
    listeners:{
        activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            this.down('jobinterviewstatusgrid').getStore().load();
        }
}
});