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

    requires: [
        'DDO.view.profile.details.AboutList',
        'DDO.view.profile.details.ProfileSkills',
        'DDO.view.profile.details.JobsContainer',
        'DDO.view.profile.details.Interest',
        'DDO.view.profile.details.Education',
        'DDO.overrides.form.field.VTypes',
        'DDO.overrides.form.field.HtmlEditor',
        'DDO.view.profile.details.ProjectSummary',
        'DDO.view.profile.details.AppAccessSummary',
        'DDO.view.profile.details.RolesAndResponsibilities'
    ],

    initComponent: function() {
        this.callParent(arguments);
        var profileSkillsCombo = Ext.getStore('skillslist.ProfileSkillsComboStore');
        profileSkillsCombo.load();
    },

    layout: {
        type: 'hbox'
    },

    cls: 'ddo-user-details-container ddo-container',

    items: [{
        xtype: 'container',
        flex:1,
        layout:'vbox',
        items:[{
        xtype: 'aboutlist',
        width: '100%'
    },{
        xtype: 'projectsummary',
        width: '100%'
    },{
        xtype: 'appaccesssummary',
        width: '100%'
    },{
        xtype:'rolesandresponsibilities',
        width:'100%'
    },{
            xtype: 'button',
            reference: 'sendresignbutton',
            width:'100%',
            text: 'Send Resignation',
            cls:'sendresignation-cls',
            bind:{
               hidden:'{sendresignation}'
            },
            handler:'onsendresignation'
    }]
    }, {
        xtype: 'tbspacer',
        flex: 0.1
    }, {
        xtype: 'container',
        reference: 'detailscenter',
        cls: 'ddo-profile-adddetails-container',
        flex: 1.9,
        items: [{
            xtype: 'jobscontainer'
        }, {
            xtype: 'profileskills'
        }, {
            xtype: 'education'
        }, {
            xtype: 'interestsview'
        }]

    }]
});
