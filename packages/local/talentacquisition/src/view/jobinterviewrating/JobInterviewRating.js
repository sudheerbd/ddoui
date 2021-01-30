Ext.define('TalentAcquisition.view.jobinterviewrating.JobInterviewRating', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobinterviewratingview',

    requires: [
        'TalentAcquisition.view.jobinterviewrating.JobInterviewRatingForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobinterviewrating.JobInterviewRatingGrid',
        'TalentAcquisition.view.jobinterviewrating.JobInterviewRatingController',
        'TalentAcquisition.view.jobinterviewrating.JobInterviewRatingViewModel',
        'TalentAcquisition.store.jobinterviewrating.JobInterviewRatingStore'
    ],
    controller: 'jobinterviewratingcontroller',
    viewModel: {
        type: 'jobinterviewratingviewmodel'
    },
    items: [{
        xtype: 'collapsiblecontainer',
        mainContainerTitle: 'Interview Rating',
        grid: 'jobinterviewratinggrid',
        gridStore: Ext.create('TalentAcquisition.store.jobinterviewrating.JobInterviewRatingStore'),
        form: 'jobinterviewratingform',
        fbButtonRequired: true
    }],
    listeners:{
        activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            this.down('jobinterviewratinggrid').getStore().load();
        }
}
});