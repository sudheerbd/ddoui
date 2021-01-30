/**
 * The file RolesViewController is the Controller of the 'DDO.view.rolessecurity.RolesView'.
 */
Ext.define('DDO.view.rolessecurity.RolesViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.rolessecurity-rolesview',

	/**
	 * The function onApplyClick will initate the process of updating role access for selected role.
	 * @param {Ext.button.Button} 'btn' when button is being clicked.
	 */
	onApplyClick: function (btn) {
		try {
			var view = this.getView(),
				selectedRoleId = view.lookupReference('rolecombo').getValue(),
				viewsGrid = view.lookupReference('roleaccessgrid'),
				viewsData = viewsGrid.getStore().data.items,
				viewAccessData = [],
				isDirtyRec = false;

			isDirtyRec = this.getReadCheckData(viewsData, viewAccessData);
			if (isDirtyRec) {
				this.doFireAjaxProcess(selectedRoleId, viewAccessData);
			} else {
				Utility.toastReuseFn('t', Messages.ROLE.NOTHINGMODIFIED);
			}
		} catch (err) {
			Utility.showToast(Messages.ROLE.TOAST.APPLYACCESS, err);
		}

	},

	/**
	 * The function getReadCheckData is responsiable for checking any modified access record.
	 * @param {Array} 'viewsData' Contains all record for roles access.
	 * @param {Array} 'viewAccessData' is empty array.
	 * @returns {boolean} 'isDirtyRec' it represents whether the record is being modified or not.
	 */
	getReadCheckData: function (viewsData, viewAccessData) {
		var readCheck,
			isDirtyRec = false;
		Ext.each(viewsData, function (obj) {
			if (obj.dirty) {
				isDirtyRec = true;
				readCheck = obj.get('isRead');
				if (!readCheck) {
					obj.data.isWrite = false;
				} else {
					obj.data.isWrite = true;
				}
				viewAccessData.push(obj.data);
				obj.commit();
			}
		});
		return isDirtyRec;
	},

	/**
	 * The function doFireAjaxProcess is responsiable for checking any modified access record.
	 * @param {Array} 'selectedRoleId' contains id of selected role.
	 * @param {Array} 'viewAccessData' contains modified role record.
	 */
	doFireAjaxProcess: function (selectedRoleId, viewAccessData) {
		try {
			var config = {
				url: Api.URL.role.ADDORUPDATE,
				method: 'POST',
				params: {
					roleId: parseInt(selectedRoleId),
					access: JSON.stringify(viewAccessData)
				}
			}
			var successCallback = function (data) {
				Utility.toastReuseFn('t', Messages.ROLE.VIEWUPDATED);
			}
			var failureCallback = function () {
				Ext.Msg.alert('Status', Messages.ROLE.ADDACCESSFAIL);
			}
			var callback = function () {}
			Utility.fireAjax(config, successCallback, failureCallback, callback);
		} catch (err) {
			Utility.showToast(Messages.ROLE.TOAST.DOSERVICECALL, err);
		}
	},

	/**
	 * The function onRoleChange is responsiable for checking any modified access record.
	 * @param {Object} 'combo' represents Ext.form.field.Field.
	 * @param {Number} 'newVal' it can be Object or Number. it's depend on latest selected value.
	 * @param {Object} 'oldVal' it can be Object or Number. it's depend on previous selected value
	 * @param {Object} 'eOpt' The options object passed to Ext.util.Observable.addListener.
	 */
	onRoleChange: function (combo, newVal, oldVal, eOpt) {
		try {
			var vm = this.getViewModel(),
				view = this.getView(),
				roleAccessGrid = view.down('roleaccessgrid'),
				data = [];
			if (vm.data.applyEnable) {
				vm.set('applyEnable', false);
			} else if (newVal == null) {
				vm.set('applyEnable', true);
			}
			this.getStoreReadData(roleAccessGrid, data);

			if (newVal) {
				this.prepareAjaxRequest(newVal, roleAccessGrid, data);
			}
		} catch (err) {
			Utility.showToast(Messages.ROLE.TOAST.ROLECHANGE, err);
		}
	},

	/**
	 * The function getStoreReadData is responsiable for resetting any modified access record.
	 * @param {Array} 'roleAccessGrid' is represents Class 'DDO.view.rolessecurity.RoleAccessGrid'.
	 * @param {Array} 'data' is empty array.
	 */
	getStoreReadData: function (roleAccessGrid, data) {
		var store = roleAccessGrid.getStore();
		store.each(function (rec) {
			if (rec.data.isWrite) {
				rec.data.isWrite = false;
			}
			if (rec.data.isRead) {
				rec.data.isRead = false;
			}
			data.push(rec.data);
		});
	},

	/**
	 * The function getStoreReadData is responsiable for resetting any modified access record.
	 * @param {Number} 'newVal' it's contain role id.
	 * @param {Array} 'roleAccessGrid' is represents Class 'DDO.view.rolessecurity.RoleAccessGrid'.
	 * @param {Array} 'data' contains reset data of store.
	 */
	prepareAjaxRequest: function (newVal, roleAccessGrid, data) {
		try {
			var rolesConfig = {
				url: Api.URL.role.ROLEVIEWACCESS + "/" + newVal
			}
			var roleSuccessCallback = function (data1, dataP, roleAccessGrid) {
				if (Ext.isEmpty(data1)) {
					roleAccessGrid.getStore().loadData(data, false);
				}
				if (!Ext.isEmpty(data) && !Ext.isEmpty(data1)) { 
					var rolesAccess = data1.access;
					for (var i = 0; i < data.length; i++) {
						for (var j = 0; j < rolesAccess.length; j++) {
							if (data[i].viewId == rolesAccess[j].viewId) {
								data[i].isWrite = rolesAccess[j].isWrite || false;
								data[i].isRead = rolesAccess[j].isRead || false;
								//  if(rolesAccess[j].isRead == false){
								// 	return false;
								// }
							}
							
						}
					}
					roleAccessGrid.getStore().loadData(data, false);
				}
			}
			var roleFailureCallback = function (data1) {}
			var roleCallback = function () {}
			Utility.fireAjax(rolesConfig, roleSuccessCallback, roleFailureCallback, roleCallback, roleAccessGrid);
		} catch (err) {
			Utility.showToast(Messages.ROLE.TOAST.PREPARESERVICEDATA, err);
		}
	},
	/**
	 * The function onSearchText will perform when the  'keyup' event of the textfield is fired in the  RolesView.js file.
	 * It will search the technologies based on entered text.
	 * @param {Ext.form.field.File} 'field' which is the form field.
	 * @param e - The click event
	 * @param eOpts -Object 
	 */
	onSearchText: function (field, e, eOpts) {
		try {
			var roleAccessGrid = this.getView().down('roleaccessgrid'),
				store = roleAccessGrid.getStore('rolesGridStore');
			if (!store.isLoaded()) {
				store.load();
			}
			searchString = field.getValue();
			if (searchString) {
				store.clearFilter(true);
				store.filter({
					property: 'viewName',
					value: searchString,
					anyMatch: true,
					caseSensitive: false
				});
			} else if (searchString.length == 0) {
				store.clearFilter(true);
				store.load();
			}
		} catch (err) {
			Utility.showToast(Messages.ROLE.TOAST.SEARCH, err);
		}
	}
});