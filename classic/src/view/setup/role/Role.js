/**
*   This file is responsible for containing views of all available roles and creation of new roles.
*   @extends {Ext.container.Container} - containing grid, toolbar and window.
*   @alias role
*   ViewController : 'DDO.view.setup.role.RoleViewController'.
*/
Ext.define('DDO.view.setup.role.Role', {
    extend: 'Ext.container.Container',

    alias: 'widget.role',

    cls: 'karmarule-cls roleview-cls',
    requires: [
        'DDO.view.setup.role.RoleGrid',
        'DDO.view.setup.department.DepartmentToolbar',
        'DDO.view.setup.role.RoleViewController',
        'DDO.view.setup.role.RoleWindow'
    ],

    controller: 'roleviewcontroller',
    initComponent: function() {
        this.callParent(arguments);
        var roleGrid = this.down('rolegrid'),
            gridStore = roleGrid.getStore();
        if (!gridStore.isLoaded()) {
            Utility.onStoreLoading(gridStore);
        }
    },
    items:[{
        xtype: 'container',
        width:'100%',
        height:'100%',
        layout: 'vbox',
        pack: 'center',
    items: [{
        xtype: 'departmenttoolbar',
        cls: 'wallet-toolbar-cls',
        width: '100%',
        height: Constants.ViewportHeight*0.11,
        html: LabelsTitles.EMPSETUP.ROLE.ROLES
    },
    {
        xtype: 'textfield',
        emptyText: 'Search by Role name',
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
        change: "onSearchRoles",
        }
    }
]
}, {
        xtype: 'rolegrid',
        store:  'setup.role.RoleStore'
    }]
});