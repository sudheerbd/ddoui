/**
 * The file GroupsViewModel is the viewmodel for the 'DDO.view.groups.GroupsView'.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.groupsviewmodel'.
 */
Ext.define('DDO.view.groups.GroupsViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.groupsviewmodel',

	data: {
		groupName: '',
		scoreCls: '',
		searchForm: true,
		addPeopleLabel: true,
		comboGroupName: null,
		selectEmpDetails: [],
		empListVisibility: true,
		disableFormFields: false,
		nonEditSelections: false,
		addPeopleVisibility: true,
		editOrSaveBtnDisable: true,
		editOrSaveButtonText: 'Edit'
	},
	formulas: {
		getGroupTextFieldValue: function (get) {
			var text = get('groupName');
			if (text) {
				text = Ext.String.trim(text);
			}
			return text ? false : true;
		},
		getGroupSearchField: function (get) {
			var text = get('groupSearchFieldValue');
			if (text) {
				text = Ext.String.trim(text);
			}
			return text ? false : true;
		}
	},
	// stores: {
	// 	groupcombostore: {
	// 		model: 'DDO.model.groups.GroupsComboModel',
	// 		autoLoad: true,
	// 		proxy: {
	// 			type: 'ajax',
	// 			api: {
	// 				read: Api.URL.groups.READ,
	// 				create: Api.URL.groups.CREATE,
	// 				update: Api.URL.groups.UPDATE,
	// 				destroy: Api.URL.groups.DELETE
	// 			},
	// 			actionMethods: {
	// 				read: 'GET',
	// 				create: 'POST',
	// 				update: 'PUT',
	// 				destroy: 'DELETE'
	// 			},
	// 			reader: {
	// 				type: 'json',
	// 				rootProperty: 'data'
	// 			},
	// 			sorters: [{
	// 				property: "group_name",
	// 				direction: "ASC"
	// 			}]
	// 		}
	// 	}
	// selectemployeestore:{
	// 	fields: [
	// 		'c_bpartner_id', 'employee_code', 'employee', 'hr_designation', 'hr_designation_id', 'image'
	// 	],
		
	// 	proxy: {
	// 		type: 'ajax',
	// 		url: Api.URL.selectedempstore.READ,
	// 		reader: {
	// 			type: 'json',
	// 			rootProperty: 'data'
	// 		}
	// 	}
	// },
	// autoLoad: true,
	// }

});