Ext.define('TalentAcquisition.view.jobopenings.openings.JobOpenings', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobopeningsview',

    requires: [
        'TalentAcquisition.view.jobopenings.openings.JobOpeningsForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobopenings.openings.JobOpeningsGrid',
        'TalentAcquisition.view.jobopenings.openings.JobOpeningsController',
        'TalentAcquisition.view.jobopenings.openings.JobOpeningsViewModel',
        'TalentAcquisition.store.jobopenings.JobOpeningsStore'
    ],
    controller: 'jobopeningscontroller',
    viewModel: {
        type: 'jobopeningsviewmodel'
    },    
    items: [{
        xtype: 'collapsiblecontainer',
        mainContainerTitle: 'Job Openings',
        grid: 'jobopeningsgrid',
        gridStore: Ext.create('TalentAcquisition.store.jobopenings.JobOpeningsStore'),
        form: 'jobopeningsform',
        bigForm: true,
        filterData:[{
            name:"Job Name",
            value:"name"
        },/*{
            name:"Department",
            value:"ddo_department_name"
        },*/{
            name:"Location",
            value:"ddo_joblocation_name"
        },{
            name:"Designation",
            value:"ddo_designation_name"
        },{
            name:"Skills",
            value:"primaryskills"
        },{
            name:"Status",
            value:"jobstatus"
        }],
        fbButtonRequired: true
    }],
    listeners:{
        activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            this.down('jobopeningsgrid').getStore().load();
        }
}
});