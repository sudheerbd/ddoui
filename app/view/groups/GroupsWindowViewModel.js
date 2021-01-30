/**
 * The file GroupsViewModel is the viewmodel for the 'DDO.view.groups.GroupsView'.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.groupsviewmodel'.
 */
Ext.define('DDO.view.groups.GroupsWindowViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.groupswindowviewmodel',
    data:{
    	emloyeeTotalCount: 0,
		emloyeeSelectedCount: 0,
		addGroupBtnDisable: true,
		groupSearchFieldValue: null
    }

});
