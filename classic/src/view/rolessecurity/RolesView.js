/**
 *   This file is responsible for Roles & Security view.
 *   ViewModel :  'DDO.view.rolessecurity.RolesViewModel'
 *   ViewController : 'DDO.view.rolessecurity.RolesViewController'.
 */
Ext.define("DDO.view.rolessecurity.RolesView", {
    extend: 'Ext.Container',
    xtype: 'rolesview',
    requires: [
        "DDO.view.rolessecurity.RolesViewController",
        "DDO.view.rolessecurity.RolesViewModel",
        "DDO.view.rolessecurity.RoleAccessGrid"
    ],
   
listeners:{
    activate: function ( comp, eOpts ) {
    var store = this.down('[reference = rolecombo]').getStore('rolesstore');
    store.load();
    }
    },
    controller: "rolessecurity-rolesview",
    viewModel: {
        type: "rolessecurity-rolesview"
    },
    layout: 'vbox',
    width: '100%',
    margin: '10 0 0 10',
    cls: 'rolesview-container-cls',
    items: [{
        xtype: 'fieldcontainer',
        layout: 'hbox',
        width: '100%',
        margin: '4 0 10 10',
        items: [{
            xtype: 'textfield',
            reference: 'searchroles',
            emptyText: LabelsTitles.ROLE.SEARCHROLE,
            cls: 'ddo-todo-detail-search-text',
            name: 'roles',
            enforceMaxLength: true,
            flex: 1,
            margin: '13 10 0 10',
            enableKeyEvents: true,
            listeners: {
                change: 'onSearchText'
            }
        }, {
            xtype: 'button',
            width: Constants.ViewportWidth * 0.008,
            height: Constants.ViewportHeight * 0.016,
            cls: 'search-icon-field'
        }, {
            xtype: 'tbfill'
        }, {
            xtype: 'combo',
            editable: true,
            editable: true,
            emptyText: LabelsTitles.ROLE.ROLE,
            cls: 'ddo-org-combo',
            margin: '13 10 0 10',
            queryMode: 'local',
            listConfig: {
                cls: 'ddo-org-combo-bound'
            },
            itemId: 'rolecombo',
            reference: 'rolecombo',
            bind: {
                store: '{rolesstore}'
            },
            displayField: 'role_name',
            valueField: "role_id",
            typeAhead:true,
            listeners: {
                change: 'onRoleChange'
            }
        }, {
            xtype: 'tbspacer',
            width: 30
        }, {
            xtype: 'button',
            text: LabelsTitles.ROLE.APPLY,
            bind: {
                disabled: '{applyEnable}'
            },
            margin: '13 10 0 10',
            handler: 'onApplyClick'
        }, {
            xtype: 'tbspacer',
            width: 30
        }]
    }, {
        xtype: 'roleaccessgrid',
        reference: 'roleaccessgrid',
        width: '100%',
        height: 'auto'
    }]
});
