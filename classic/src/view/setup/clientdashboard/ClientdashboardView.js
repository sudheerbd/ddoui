Ext.define('DDO.view.setup.clientdashboard.ClientdashboardView',{

    extend : 'Ext.container.Container',
    
    alias : 'widget.clientdashboard',
    cls:'skillsview-cls',
    
    requires:[
        'DDO.view.setup.clientdashboard.ClientDashboardToolbar',
        'DDO.view.setup.clientdashboard.ClientDashboardGrid',
        'DDO.view.setup.clientdashboard.ClientDashboardController',
        'DDO.view.setup.clientdashboard.ClientdashboardWindow',
        'DDO.view.setup.clientdashboard.ClientDashboardViewmodel',
        'DDO.view.setup.clientdashboard.ClientDashboardEditWindow'
    ],
    
        controller : "clientdashboardcontroller",
        viewModel:{
         type:'clientdashboardviewmodel'
        },
    items:[
        {
        xtype: 'clienttoolbar',
        cls: 'wallet-toolbar-cls',
        width: '100%',
        height: Constants.ViewportHeight*0.11,
        html: '<h3>Clients</h3>'
    },
    {
        xtype: 'textfield',
        emptyText: 'Search name',
        width: '25%',
        margin: '0px 0px 10px 15px',
        height:'7%',
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
    {
        xtype:'clientdashboardgrid'
    }]
    });