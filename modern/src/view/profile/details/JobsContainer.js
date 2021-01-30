Ext.define('DDO.view.profile.details.JobsContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobscontainer',

    requires: [
        'DDO.view.profile.details.AddJobsForm',
        'DDO.view.profile.details.JobDetailsView'
    ],

    cls: 'ddo-profile-jobs-container ddo-profile-add-details-container',

    reference: 'jobscontainer',

    items: [{
        xtype: 'toolbar',
        cls: 'ddo-jobscontainer-toolbar',
        title: 'Experience',
        hidden: false,
        items: [{
            xtype: 'spacer'
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-plus',
            reference: 'addnewbutton',
            itemId: 'addbutton',
            ui: 'roundedbutton',
            cls: 'ddo-addnew-btn',
            bind: {
                hidden: '{editing}'
            },
            listeners: {
                tap: 'addNewJobButtonTap'
            }
        }]
    }, {
        xtype: 'jobdetailsview',
        reference: 'jobdetailsview',
        bind: {
            store: '{jobsdatastore}'
        }
    }, {
        xtype: 'button',
        iconCls: 'fa fa-chevron-down',
        cls: 'jobsexpandcollapse-btn',
        handler: 'jobsExpandOrCollapse',
        reference: 'jobsExpandOrCollapse'
    }]
});