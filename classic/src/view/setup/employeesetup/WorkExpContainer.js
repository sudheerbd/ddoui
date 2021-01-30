Ext.define('DDO.view.setup.employeesetup.WorkExpContainer',{
    extend: 'Ext.container.Container',
    alias: 'widget.workexpcontainer',
    requires:[
        // 'DDO.view.setup.employeesetup.WorkExpDetailsView',
        'DDO.view.profile.details.JobDetailsView',
        'DDO.view.setup.employeesetup.WorkExpContainerController',
        'DDO.view.setup.employeesetup.WorkExpForm',
        'DDO.view.setup.employeesetup.WorkExpContainerModel'
    ],
    viewModel:{
        type:'workexpmodel'
    },
    // listeners:{
    //     render:'onViewRender'
    //   },
      
    controller:'workexpcontainercontroller',
    // scrollable:true,
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
            margin: '0 10 10 0',
            itemId: 'addbutton',
            ui: 'roundedbutton',
            listeners: {
                click: 'onAddJobClick'
            },
            // bind: {
            //     hidden: '{editing}'
            // }
        }]
    }, 
    {
        xtype: 'jobdetailsview',
        reference: 'jobdetailsview',
        bind: {
            store: '{jobsdatastore}'
        }
    }
]
});