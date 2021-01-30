/**
 * This view is responsible for displaying user profile with the details of skills.
 * @class 'DDO.view.profile.details.ProfileSkills'
 * @extends 'Ext.container.Container'
 * @alias 'profileskills'
 * @ViewModel 'DDO.view.skillslist.ProfileSkillsModel'
 * @Controller 'DDO.view.skillslist.ProfileSkillsController'
 */
Ext.define("DDO.view.profile.details.ProfileSkills", {
    extend: "Ext.container.Container",
    alias: 'widget.profileskills', //skillsview
    requires: [
        "DDO.view.skillslist.ProfileSkillsController",
        "DDO.view.skillslist.ProfileSkillsModel",
        "DDO.view.profile.details.ProfileSkillsAdded",
        "DDO.view.profile.details.ProfileSkillsForm"
    ],
    controller: "profileskills", 
    viewModel: {
        type: "profileskills"
    },

    cls: 'ddo-profile-add-details-container',
    listeners:{
          render:'onViewRender'
    },

    items: [{
        xtype: 'toolbar',
        cls: 'ddo-profile-header-toolbar',
        items: [{
            xtype: 'label',
            text: LabelsTitles.PROFILE.SKILLS,
            cls: 'ddo-profile-header-label'
        }, '->', {
            xtype: 'button',
            text: LabelsTitles.PROFILE.ADDSKILLS,
            reference: 'addskills',
            ui: 'roundedbutton',
            iconCls: 'x-fa fa fa-plus',
            margin: '5 0 10 0',
            handler: 'onAddSkills',
            bind: {
                hidden: '{!editable}'
            }
        }]
    }, {
        xtype: 'profileskillsadded',
        reference: 'profileskillsadded',
        cls: 'ddo-profile-skills-added',
        bind: {
            hidden: '{skillsediting}'
        }
    }]
});
