/**
 * The file Education is the view file for the education view in the user profile.
 * @extends {Ext.container.Container}.
 * @alias 'widget.education'.
 * @model : 'DDO.view.education.EducationModel'.
 * @controller : 'DDO.view.education.EducationController'.
 */
Ext.define('DDO.view.profile.details.Education', {
    extend: 'Ext.container.Container',
    xtype: 'education',

    requires: [
        'DDO.view.profile.details.EducationData',
        'DDO.view.profile.details.AddEducationDetails',
        'DDO.view.education.EducationModel',
        'DDO.view.education.EducationController'
    ],

    controller: 'educationcontroller',
    viewModel: {
        type: 'educationmodel'
    },
     listeners:{
        render:'onViewRender'
    },

    cls: 'ddo-profile-add-details-container',

    items: [{
        xtype: 'toolbar',
        cls: 'ddo-profile-header-toolbar',
        items: [{
            xtype: 'label',
            text: LabelsTitles.PROFILE.EDUCATION.TITLE,
            cls: 'ddo-profile-header-label'
        }, '->', {
            xtype: 'button',
            margin: '5 0 10 0',
            cls: 'ddo-onaddeducation',
            iconCls: 'x-fa fa fa-plus',
            ui: 'roundedbutton',
            text: LabelsTitles.PROFILE.EDUCATION.ADDEDUCATION,
            handler: 'onAddEducationBtnClick',
            bind: {
                hidden: '{editing}'
            }
        }]
    }, {
        xtype: 'educationdata',
        reference: 'educationData',
        bind: {
            store: '{educationdatastore}'
        }
    }]
});
