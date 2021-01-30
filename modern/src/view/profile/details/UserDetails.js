/**
 * This view is responsible for displaying user profile with the details of work.
 * @class 'DDO.view.profile.details.UserDetails'
 * @extends 'Ext.container.Container'
 * @alias 'userdetails'
 * @ViewModel 'DDO.view.profile.UserProfileModel'
 * @Controller 'DDO.view.profile.UserProfileController'
 */
Ext.define('DDO.view.profile.details.UserDetails', {
    extend: 'Ext.container.Container',
    xtype: 'userdetails',

    reference: 'userdetails',

    requires: [
        'DDO.view.profile.details.AboutList',
        'DDO.view.profile.details.ProfileSkills',
        'DDO.view.profile.details.JobsContainer',
        'DDO.view.profile.details.AboutList',
        'DDO.view.profile.details.Interest',
        'DDO.view.profile.details.Education',
        'DDO.view.profile.details.ExperienceView',
        'DDO.view.profile.details.EducationView'
    ],

    layout: {
        type: 'fit',
        align: 'stretch'
    },

    cls: 'ddo-user-details-container ddo-container',

    items: [{
        xtype: 'container',
        layout: {
            type: 'auto'
        },
        scrollable: 'y',
        reference: 'detailscenter',
        cls: 'ddo-profile-adddetails-container',
        margin: 5,
        items: [{
            xtype: 'aboutlist',
            flex: 1
        }, {
            xtype: 'experienceview',
            flex: 1
        }, {
            xtype: 'educationview',
            flex: 1
        }, {
            xtype: 'profileskills',
            flex: 1
        }, {
            xtype: 'interest',
            flex: 1
        }]
    }]
});