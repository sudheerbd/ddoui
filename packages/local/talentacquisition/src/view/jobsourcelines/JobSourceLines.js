Ext.define('TalentAcquisition.view.jobsourcelines.JobSourceLines', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobsourcelinesview',

    requires: [
        'TalentAcquisition.view.jobsourcelines.JobSourceLinesForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobsourcelines.JobSourceLinesGrid',
        'TalentAcquisition.view.jobsourcelines.JobSourceLinesController',
        'TalentAcquisition.view.jobsourcelines.JobSourceLinesViewModel',
        'TalentAcquisition.store.jobsourcelines.JobSourceLinesStore'
    ],
    controller: 'jobsourcelinescontroller',
    viewModel: {
        type: 'jobsourcelinesviewmodel'
    },
    items: [{
        xtype: 'collapsiblecontainer',
        mainContainerTitle: 'Profile Sources',
        grid: 'jobsourcelinesgrid',
        gridStore: Ext.create('TalentAcquisition.store.jobsourcelines.JobSourceLinesStore'),
        form: 'jobsourcelinesform',
        fbButtonRequired: true
    }],
    listeners:{
        activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            this.down('jobsourcelinesgrid').getStore().load();
            Ext.getStore('jobsourcestores').load();
            this.down('jobsourcelinesgrid').getStore().sort({
                property: 'ddo_jobsourcelines_id', 
                direction: 'DESC'
            });
        }
}
});