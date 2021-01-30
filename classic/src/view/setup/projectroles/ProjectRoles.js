Ext.define('DDO.view.setup.projectroles.ProjectRoles',{
    extend : 'Ext.container.Container',

    alias : 'widget.projectrolesview',

    cls:'projectrolesview-cls',

    requires:[
        'DDO.view.setup.department.DepartmentToolbar',
         'DDO.view.setup.projectroles.ProjectRolesGrid',
         'DDO.view.setup.projectroles.ProjectRolesController',
        'DDO.view.setup.projectroles.ProjectRolesWindow'
    ],


    controller:'projectrolescontroller',
    margin : '2px 2px 2px 8px',
    items:[{
        xtype: 'container',
         width:'100%',
         height:'100%',
         layout: 'vbox',
         pack: 'center',
         items: [ {
                    xtype: 'departmenttoolbar',
                    cls: 'wallet-toolbar-cls',
                    width: '100%',
                    height:'50%',
                    height: Constants.ViewportHeight*0.11,
                    html: '<h3>Project Roles</h3>',
                  } ,
                  {
                    xtype: 'textfield',
                    emptyText: 'Search name',
                    width: '25%',
                    margin: '0px 0px 10px 15px',
                    height:'50%',
                    enableKeyEvents: true,
                    triggers: {
                    clear: {
                      cls: Ext.baseCSSPrefix + 'fa fa-close',
                      hidden: true,
                      handler: "onClearIcon"
                    },
                    search: {
                      cls: Ext.baseCSSPrefix + 'fa fa-search'
                    }
                  },
                    listeners: {
                    change: "onSearchProjectRoll",
                    }
                  },
                ]
            },
            {
                    xtype:'projectrolesgrid',
                    // height: '60%'
            }
        ]
});