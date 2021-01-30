/**
 * The file DDO.view.projects.ProjectsView is the view file for the Projects tab in the application.
 * @extends {Ext.container.Container}.
 * @alias widget.projectsview.
 * ViewModel : 'DDO.view.projects.ProjectsViewModel'.
 * ViewController : 'DDO.view.projects.ProjectsViewController'.
 */
Ext.define("DDO.view.projects.ProjectsView", {
  extend: "Ext.container.Container",

  xtype: "projectsview",
  reference:'projectsView',
  requires: [
    "DDO.view.projects.ProjectsViewController",
    "DDO.view.projects.ProjectsViewModel",
    "DDO.view.projects.ProjectDashboardView",
    "DDO.view.projects.ProjectsTabsView",
    "DDO.view.projects.ExternalUploadForm",
    "DDO.view.projects.AddProjectWindow",
    "DDO.store.projects.ProjectDashboardStore",
    "DDO.ux.button.FabButton",
    'DDO.view.projects.Projectlistview',
    "DDO.view.projects.ProjectsTabsDetailsView",
  ],

  controller: "projectsviewcontroller",
  viewModel: {
    type: "projectsviewmodel",
  },
      // layout: {
      //     type: 'card'
      // },

  cls: "project-view-cls",
  selectedProjectId : null,
  scrollable: false,
  height: '100%',
  margin: "10px 0px 8px 8px",
  //     items: [{
  //         xtype: 'container',
  //         items: [
  //             {
  //             xtype: 'toolbar',
  //             cls: 'projectview-toolbar-cls',
  //             // width: '100%',
  //             // height: '50px',
  //             items: [{
  //                 // xtype: 'allocationsheetcontainer',
  //                 layout:'fit',
  //                 text: "Project",
  //                 iconCls: 'charticon-cls',
  //                 collapsed: false
  //             },
  //             {
  //                 xtype: 'tbfill'
  //             },
  //               {
  //                 xtype: 'button',
  //                 width: 15,
  //                 cls: 'project-search-icon',
  //                 height: 15
  //             },
  //             {
  //                 xtype: 'textfield',
  //                 reference: 'agendaRef',
  //                 // height: '12%',
  //                 // width : '25%',
  //                 emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.EMPTYSEARCHPROJECT,
  //                 name: 'agendasearch',
  //                 enableKeyEvents: true,
  //                 iconCls: 'charticon-cls',
  //                 listeners: {
  //                     keyup: 'onProjectSearchText'
  //                 },
  //                 cls: 'projecttodo-search-text'
  //             },
  //             {
  //                 xtype: 'tagfield',
  //                 // height: "12%",
  //                 width : '45%',
  //                 reference: 'statustagview',
  //                 matchFieldWidth: false,
  //                 clearOnBackspace: false,
  //                 forceSelection: true,
  //                 maxWidth: '45%',
  //                 maxheight: '13%',
  //                 bind : {
  //                         store: '{projectStatus}',
  //                        },
  //                 emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PROJECTSTATUS,
  //                 displayField: 'status',
  //                 multiSelect: true,
  //                 valueField: 'status',
  //                 disabledCls: 'mom-item-disabled',
  //                 queryMode: 'local',
  //                 cls: 'projecttodo-tag-text',
  //                 filterPickList: true,
  //                 listConfig: {
  //                          cls: 'tag-view-list',
  //                          width: Constants.ViewportWidth*0.22
  //                         },
  //                  listeners: {
  //                          change: 'onProjectStatusSelect'
  //                         }
  //             },

  //         ]
  //         },

  //         {
  //             xtype: 'fabbutton',
  //             fabUi: 'add',
  //             position: 'br',
  //             // cls: 'add-btn-view',
  //             bind: {
  //                  hidden: '{addNewProject}'
  //                 },
  //             listeners: {
  //                 click: 'onAddProjectClick'
  //                 }

  //         },
  //        {
  //             xtype: 'projectdashboardview',
  //             store: 'projects.ProjectDashboardStore',

  //         }
  //       //   ,{
  //       //       xtype: 'projectstabsview'
  //       //   }
  //     ]
  //     },
  //      {
  //         xtype: 'projectstabsview'
  //     }
  // ]

  
     
      items: [
        {
          xtype:'button',
          cls:'add-project-cls',
          handler:'onAddProjectClick'
        },
        {
          xtype: "toolbar",
          cls: "projectview-toolbar-cls",
          items: [
            {
            
              layout: "fit",
              text: "Project",
              iconCls: "charticon-cls",
              collapsed: false,
            },
            {
              xtype: "tbfill",
            },
            {
              xtype: "button",
              width: 15,
              cls: "project-search-icon",
              height: 15,
            },
            {
              xtype: "textfield",
              reference: "agendaRef",
              emptyText:
                LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.EMPTYSEARCHPROJECT,
              name: "agendasearch",
              enableKeyEvents: true,
              iconCls: "charticon-cls",
              listeners: {
                keyup: "onProjectSearchText",
              },
              cls: "projecttodo-search-text",
            },
            {
              xtype: "tagfield",
              // height: "12%",
              width: "45%",
              reference: "statustagview",
              matchFieldWidth: false,
              clearOnBackspace: false,
              forceSelection: true,
              maxWidth: "45%",
              // maxheight: "13%",
              bind: {
                store: "{projectStatus}",
              },
              emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PROJECTSTATUS,
              displayField: "status",
              multiSelect: true,
              valueField: "status",
              disabledCls: "mom-item-disabled",
              queryMode: "local",
              cls: "projecttodo-tag-text",
              filterPickList: true,
              listConfig: {
                cls: "tag-view-list",
                width: Constants.ViewportWidth * 0.22,
              },
              listeners: {
                change: "onProjectStatusSelect",
              },
            },
          ],
        },
        {
            xtype:'container',
            layout:'hbox',
            height:'100%',
            width:'100%',
            items:[ {
                //      xtype: 'fabbutton',
                //     fabUi: 'add',
                //      position: 'br',
                //             // cls: 'add-btn-view',
                //     bind: {
                //        hidden: '{addNewProject}'
                //           },
                //      listeners: {
                //               click: 'onAddProjectClick'
                //         }
              
                //  },{
                xtype:'projectdashboardview',
                store: 'projects.ProjectDashboardStore',
                // height:'100%',
                width:'25%'
            },{
                
                xtype:'container',
                reference:'tabscontainer',
                cls:'tabscontainer-cls',
                activeItem :0,
                width:'75%',
                // height:'100%',
                layout: {
                     type: 'card'
                 },
                 items:[
                     {
                    //  id: 'card-111',
                     xtype: 'projectlistview'
                   
                 },
                 {
                    // id: 'card-121',
                    xtype: 'projectstabsdetailsview'
                }
            ]
            }
        ]
        }
    
    ],
  
     
});
