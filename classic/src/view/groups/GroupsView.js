/**
 *   This file  is responsible for GroupsView.
 *   @extends {Ext.container.Container}
 *   @alias widget.groupsview
 *   ViewModel: 'DDO.view.groups.GroupsViewModel',.
 *   ViewController :'DDO.view.groups.GroupsViewController'.
 */
Ext.define('DDO.view.groups.GroupsView', {
    extend: 'Ext.container.Container',
    alias: 'widget.groupsview',
    requires: [
        'DDO.view.groups.GroupsCombo',
        'DDO.view.groups.GroupsViewModel',
        'DDO.view.groups.GroupsSearchView',
        'DDO.view.groups.GroupsSearchForm',
        'DDO.view.groups.GroupsViewController',
        'DDO.view.groups.SelectedGroupsView',
        'DDO.view.groups.GroupsWindow'
    ],
    layout: {
        type: 'hbox'
    },
    width: '100%',
    controller: 'groupsviewcontroller',
    viewModel: {
        type: 'groupsviewmodel'
    },
    items: [{
        xtype: 'container',
        items: [{
            xtype: 'groupscombo',
            width: '100%'
        }, {
            xtype: 'selectedgroupsview',
            minHeight: 200,
            reference: 'addpeopletogroupcnt'
        }],
        width: '100%'
    }],
    listeners: {
        afterrender: 'groupOnRender'
    }
});