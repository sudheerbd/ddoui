Ext.define('TalentAcquisition.view.jobapplicationstatus.JobApplicationStatus', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobapplicationstatusview',

    requires: [
        'TalentAcquisition.view.jobapplicationstatus.JobApplicationStatusForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobapplicationstatus.JobApplicationStatusGrid',
        'TalentAcquisition.view.jobapplicationstatus.JobApplicationStatusController',
        'TalentAcquisition.view.jobapplicationstatus.JobApplicationStatusViewModel',
        'TalentAcquisition.store.jobapplicationstatus.JobApplicationStatusStore'
    ],
    controller: 'jobapplicationstatuscontroller',
    viewModel: {
        type: 'jobapplicationstatusviewmodel'
    },
    items: [{
        xtype: 'collapsiblecontainer',
        mainContainerTitle: 'Application Status',
        grid: 'jobapplicationstatusgrid',
        gridStore: Ext.create('TalentAcquisition.store.jobapplicationstatus.JobApplicationStatusStore'),
        form: 'jobapplicationstatusform',
        fbButtonRequired: true
    }],
    listeners:{
        activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            this.down('jobapplicationstatusgrid').getStore().load();
        }
}
});