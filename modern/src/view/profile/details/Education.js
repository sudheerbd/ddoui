Ext.define('DDO.view.profile.details.Education', {
    extend: 'Ext.container.Container',
    xtype: 'education',

    cls: 'ddo-profile-education-container ddo-profile-add-details-container',

    requires: [
        'DDO.view.profile.details.EducationData',
        'DDO.view.profile.details.EducationFormViewController',
        'DDO.view.profile.details.EducationFormViewModel'
    ],

    items: [{
        xtype: 'toolbar',
        cls: 'ddo-education-header-toolbar',
        items: [{
            xtype: 'label',
            html: 'Education',
            cls: 'ddo-education-header-label'
        }, '->', {
            cls: 'ddo-onaddeducation',
            iconCls: 'x-fa fa-plus',
            bind: {
                hidden: '{editing}'
            },
            listeners: {
                tap: 'onAddNewClick'
            }
        }]
    }, {
        xtype: 'educationdata',
        reference: 'educationData',
        bind: {
            store: '{educationdatastore}'
        }
    }, {
        xtype: 'button',
        iconCls: 'fa fa-chevron-down',
        cls: 'expandcollapse-btn',
        handler: 'expandOrCollapse',
        reference: 'expandOrCollapse'
    }]
});