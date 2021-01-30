Ext.define('TalentAcquisition.view.jobsource.JobSource', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobsourceview',

    requires: [
        'TalentAcquisition.view.jobsource.JobSourceForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobsource.JobSourceGrid',
        'TalentAcquisition.view.jobsource.JobSourceController',
        'TalentAcquisition.view.jobsource.JobSourceViewModel',
        'TalentAcquisition.store.jobsource.JobSourceStore'
    ],
    controller: 'jobsourcecontroller',
    viewModel: {
        type: 'jobsourceviewmodel'
    },
    items: [{
        xtype: 'collapsiblecontainer',
        mainContainerTitle: 'Sourcing Partners',
        grid: 'jobsourcegrid',
        gridStore: Ext.create('TalentAcquisition.store.jobsource.JobSourceStore'),
        form: 'jobsourceform',
        fbButtonRequired: true
    }],
    listeners:{
        activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            this.down('jobsourcegrid').getStore().load();
            this.down('jobsourcegrid').getStore().sort({
                property: 'ddo_jobsource_id', 
                direction: 'DESC'
            });
        }
}
});