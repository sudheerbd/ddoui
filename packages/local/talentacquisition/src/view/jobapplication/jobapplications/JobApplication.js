Ext.define('TalentAcquisition.view.jobapplication.jobapplications.JobApplication', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobapplicationview',

    requires: [
        'TalentAcquisition.view.jobapplication.jobapplications.JobApplicationForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobapplication.jobapplications.JobApplicationGrid',
        'TalentAcquisition.view.jobapplication.jobapplications.JobApplicationController',
        'TalentAcquisition.view.jobapplication.jobapplications.JobApplicationViewModel',
        'TalentAcquisition.store.jobapplication.JobApplicationStore'
    ],
    controller: 'jobapplicationcontroller',
    viewModel: {
        type: 'jobapplicationviewmodel'
    },
    items: [{
        xtype: 'collapsiblecontainer',
        mainContainerTitle: 'Job Applications',
        grid: 'jobapplicationgrid',
        name:'jobapplicationviewcolps',
        gridStore: Ext.create('TalentAcquisition.store.jobapplication.JobApplicationStore'),
        form: 'jobapplicationform',
        bigForm: true,
        filterData:[{
            name:"Job openings",
            value:"ddo_jobopenings_name"
        },{
            name:"Candidate Name",
            value:"candidatename"
        },{
            name:"Email",
            value:"email"
        },{
            name:"Mobile Number",
            value:"mobilenumber"
        }],
        fbButtonRequired: true
    }],
    listeners:{
        activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            this.down('grid').getStore().load();
        }
    }
});
