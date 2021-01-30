Ext.define("DDO.view.profile.details.ProfileSkills", {
    extend: "Ext.container.Container",
    alias: 'widget.profileskills',

    requires: [
        "DDO.view.profile.details.ProfileSkillsAdded",
        "DDO.view.profile.details.ProfileSkillsForm",
        "DDO.view.profile.details.ProfileSkillsViewController",
        "DDO.view.profile.details.ProfileSkillsViewModel"
    ],

    controller: "profileskillsviewcontroller",

    viewModel: {
        type: "profileskillsviewmodel"
    },

    cls: 'ddo-profileskills-maincontainer',

    items: [{
        xtype: 'toolbar',
        cls: 'ddo-profileskills-toolbar',
        items: [{
            xtype: 'label',
            html: 'Skills',
            cls: 'ddo-profileskills-label'
        }, '->', {
            cls: 'ddo-profileskils-addbutton',
            iconCls: 'x-fa fa-plus',
            handler: 'onAddSkillsBtnClick',
            bind: {
                hidden: '{editing}'
            }
        }]
    }, {
        xtype: 'profileskillsadded',
        reference: 'profileskillsadded',
        cls: 'ddo-profileskills-template'
    }, {
        xtype: 'button',
        iconCls: 'fa fa-chevron-down',
        cls: 'ddo-profileskills-expandcollapse-btn',
        handler: 'onSkillsExpandOrCollapse',
        reference: 'expandOrCollapse'
    }]
});