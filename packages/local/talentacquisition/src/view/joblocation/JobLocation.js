Ext.define('TalentAcquisition.view.joblocation.JobLocation', {
    extend: 'Ext.container.Container',
    alias: 'widget.joblocationview',

    requires: [
        'TalentAcquisition.view.joblocation.JobLocationForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.joblocation.JobLocationGrid',
        'TalentAcquisition.view.joblocation.JobLocationController',
        'TalentAcquisition.view.joblocation.JobLocationViewModel',
        'TalentAcquisition.store.joblocation.JobLocationStore'
    ],
    controller: 'joblocationcontroller',
    viewModel: {
        type: 'joblocationviewmodel'
    },
    items: [{
        xtype: 'collapsiblecontainer',
        mainContainerTitle: 'Job Location',
        grid: 'joblocationgrid',
        gridStore: Ext.create('TalentAcquisition.store.joblocation.JobLocationStore'),
        form: 'joblocationform',
        fbButtonRequired: true
    }],
    listeners:{
        activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            this.down('joblocationgrid').getStore().load();
        }
}
});