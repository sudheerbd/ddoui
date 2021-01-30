Ext.define('DDO.view.profile.details.EducationView', {
    extend: 'Ext.container.Container',
    alias: 'widget.educationview',

    xtype: 'educationview',

    requires: [
        'DDO.view.profile.details.EducationData',
        'DDO.view.profile.details.Education',
        'DDO.view.profile.details.AddEducationDetails',
        'DDO.view.education.EducationModel',
        'DDO.view.profile.details.EducationDataController'
    ],

    controller: 'educationdatacontroller',

    viewModel: {
        type: 'educationmodel'
    },

    layout: {
        type: 'fit'
    },

    reference: 'educationview',
    itemId: 'educationviewId',

    items: [{
        xtype: 'education',
        reference: 'education'
    }]
});