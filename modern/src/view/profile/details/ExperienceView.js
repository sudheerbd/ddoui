Ext.define('DDO.view.profile.details.ExperienceView', {
    extend: 'Ext.container.Container',
    alias: 'widget.experienceview',

    requires: [
        'DDO.view.profile.details.AddJobsForm',
        'DDO.view.profile.details.JobDetailsView',
        'DDO.view.profile.details.JobsContainer',
        'DDO.view.jobs.JobsContainerModel',
        'DDO.view.profile.details.ExperienceViewController'
    ],

    controller: 'experienceviewcontroller',

    viewModel: {
        type: 'jobscontainer'
    },

    layout: {
        type: 'fit'
    },

    reference: 'experienceview',
    itemId: 'experienceviewid',

    items: [{
        xtype: 'jobscontainer',
        reference: 'jobscontainer'
    }]
});