Ext.define('TalentAcquisition.view.jobtype.JobType', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobtypeview',

    requires: [
        'TalentAcquisition.view.jobtype.JobTypeForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobtype.JobTypeGrid',
        'TalentAcquisition.view.jobtype.JobTypeController',
        'TalentAcquisition.view.jobtype.JobTypeViewModel',
        'TalentAcquisition.store.jobtype.JobTypeStore'
    ],
    controller: 'jobtypecontroller',
    viewModel: {
        type: 'jobtypeviewmodel'
    },
    items: [{
        xtype: 'collapsiblecontainer',
        mainContainerTitle: 'Job Type',
        grid: 'jobtypegrid',
        gridStore: Ext.create('TalentAcquisition.store.jobtype.JobTypeStore'),
        form: 'jobtypeform',
        fbButtonRequired: true
    }],
    listeners:{
        activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            this.down('jobtypegrid').getStore().load();
        }
}
});