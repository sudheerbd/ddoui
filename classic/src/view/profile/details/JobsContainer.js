/**The file JobsContainer is the view file for add job view in the user profile.
 * @extends {Ext.container.Container}.
 * @alias 'widget.jobscontainer'.
 * @model :  DDO.view.jobs.JobsContainerModel.
 * @controller : DDO.view.jobs.JobsContainerController.
 */
Ext.define('DDO.view.profile.details.JobsContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobscontainer',

    requires: [
        'DDO.view.jobs.JobsContainerModel',
        'DDO.view.jobs.JobsContainerController',
        'DDO.view.profile.details.AddJobsForm',
        'DDO.view.profile.details.JobDetailsView'
    ],

    controller: 'jobscontainer',
    viewModel: {
        type: 'jobscontainer'
    },
    listeners:{
      render:'onViewRender'
    },
    
    cls: 'ddo-profile-jobs-container ddo-profile-add-details-container',

    items: [{
        xtype: 'toolbar',
        cls: 'ddo-jobscontainer-toolbar',
        items: [{
            xtype: 'label',
            text: LabelsTitles.PROFILE.ADDJOB.EXPERIENCE,
            cls: 'ddo-profile-header-label'
        }, {
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-plus',
            text:LabelsTitles.PROFILE.ADDJOB.ADD ,
            reference: 'addjobbutton',
            margin: '0 0 10 0',
            itemId: 'addbutton',
            ui: 'roundedbutton',
            listeners: {
                click: 'onAddJobClick'
            },
            bind: {
                hidden: '{editing}'
            }
        }]
    }, {
        xtype: 'jobdetailsview',
        reference: 'jobdetailsview',
        bind: {
            store: '{jobsdatastore}'
        }
    }]
});
