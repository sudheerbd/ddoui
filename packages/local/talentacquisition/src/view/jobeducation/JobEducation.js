Ext.define('TalentAcquisition.view.jobeducation.JobEducation', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobeducationview',

    requires: [
        'TalentAcquisition.view.jobeducation.JobEducationForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobeducation.JobEducationGrid',
        'TalentAcquisition.view.jobeducation.JobEducationController',
        'TalentAcquisition.view.jobeducation.JobEducationViewModel',
        'TalentAcquisition.store.jobeducation.JobEducationStore'
    ],
    controller: 'jobeducationcontroller',
    viewModel: {
        type: 'jobeducationviewmodel'
    },
    items: [{
        xtype: 'collapsiblecontainer',
        mainContainerTitle: 'Job Education',
        grid: 'jobeducationgrid',
        gridStore: Ext.create('TalentAcquisition.store.jobeducation.JobEducationStore'),
        form: 'jobeducationform',
        fbButtonRequired: true
    }],
    listeners:{
        activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            this.down('jobeducationgrid').getStore().load();
        }
}
});