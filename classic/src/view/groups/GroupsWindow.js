
/**
 *   This file  is responsible for GroupsWindow.
 *   @extends {DDO.ux.window.FormPanel}
 *   @alias widget.groupswindow
 *   ViewModel: 'DDO.view.groups.GroupsWindowViewModel',.
 *   ViewController :'DDO.view.groups.GroupsWindowViewController'.
 */
Ext.define('DDO.view.groups.GroupsWindow', {
    extend: 'DDO.ux.window.FormPanel',
    requires: [
        'DDO.ux.window.FormPanel',
        'DDO.view.groups.GroupsWindowViewController',
        'DDO.view.groups.GroupsWindowViewModel',
        'DDO.view.groups.GroupsSearchView',
        'DDO.view.groups.GroupsSearchForm'
    ],
    alias: 'widget.groupswindow',
    title: LabelsTitles.EMPLOYEEDASHBOARD.GROUPS.ADDGRPEMP,
    controller: 'groupswindowviewcontroller',
    viewModel: {
        type: 'groupswindowviewmodel'
    },
    initComponent: function() {
        this.callParent(arguments);
        var controller = this.getController();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    width: '90%',
    cls: 'addpeopleview-cls',
    title: LabelsTitles.EMPLOYEEDASHBOARD.GROUPS.ADDPPL,
    closeAction: 'destroy',
    closable: true,
    draggable: false,
    items: [{
        xtype: 'container',
        width: '100%',

        items: [{
            xtype: 'groupssearchform',
            reference: 'groupsSearchForm'
        }, {
            xtype: 'groupssearchview',
            reference: 'groupssearchview',
            height: Constants.ViewportHeight * 0.787,
            scrollable: true
        }]
    }]
});
