/**
 * The file ProjectApprovalController is the controller for the 'DDO.view.projectapproval.ProjectApproval'.
 * @extends {Ext.app.ViewController}
 * @alias controller.projectapprovalcontroller
 */
Ext.define('DDO.view.projectapproval.ProjectApprovalController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.projectapprovalcontroller',
	/**
	 * The function onAcceptBtnClick will perform when the 'handler' event of the 'button' is fired in the projectapproval.
	 * It is accept the approval by clicking on accept button and after that it will call clearPendingNominations function .
	 * @param {Ext.button.Button} 'btn' when button is being clicked.
	 * @param {Number} 'idx' The idx within the store of the selected record.
	 * @param {Ext.data.Model} 'rec' The selected record.
	 */
	onAcceptBtnClick: function (btn, rowIdx, rec) {
		try {
			var view = this;
			// me.clearPendingNominations(btn, true);
			var win = Ext.create('DDO.view.projectapproval.ProjectApprovalAcceptReasonWindow', {
				parentViewRef: view,
				acceptBtn: btn,
				rowIdx:rowIdx
			});
			win.show();
		} catch (err) {
			Utility.showToast(Messages.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.TOAST.ACCEPT, err);
		}
	},
	/**
	 * The function onRejectBtnClick will perform when the 'handler' event of the 'button' is fired in the projectapproval.
	 * It will show one window and ask to write the reason.
	 * @param {Ext.button.Button} 'btn' when button is being clicked.
	 * @param {Number} 'idx' The idx within the store of the selected record.
	 * @param {Ext.data.Model} 'rec' The selected record.
	 */
	onRejectBtnClick: function (btn, idx, rec) {
		try {
			//var me = this;
			var view = this;
			var win = Ext.create('DDO.view.projectapproval.ProjectApprovalRejectReasonWindow', {
				parentViewRef: view,
				rejectBtn: btn,
				rowIdx : idx
			});
			win.show();
		} catch (err) {
			Utility.showToast(Messages.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.TOAST.REJECT, err);
		}
	},
	/**
	 * The function clearPendingNominations will perform after the Accept or Reject butten is clicked in the projectapproval.
	 * It is used for the ajax request to update the Project Approval and clear the pending nominations in the ProjctApproval file.
	 * @param {Ext.button.Button} 'btn' when button is being clicked.
	 * @param {boolean} 'flag' contain boolean value. 
	 * @param {String} 'message' it is containing message.
	 */
	clearPendingNominations: function (btn, flag, message,rowIndexRecord) {
		try {
			Ext.getBody().mask('');
			var view = this.getView();
			var me = this,
				store = me.getView().getStore(),
				rec,
				// projectAllocationId = btn.getWidgetRecord().get('ddo_project_allocation_requestid');
				 projectAllocationId = store.getAt(rowIndexRecord).data.ddo_project_allocation_requestid;
			viewModel = this.getViewModel(),
				recIdx = store.findExact('ddo_project_allocation_requestid', projectAllocationId);
			if (recIdx != -1) {
				rec = store.getAt(recIdx);
			}
			this.clearPendingNominationsAjax(projectAllocationId, flag, message, store, recIdx, view);
		} catch (err) {
			Utility.showToast(Messages.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.TOAST.PENDINGNOMINATIONFAIL, err);
		}
	},
	/**
	 * The function clearPendingNominationsAjax is used for the ajax request to update in the projectapproval.
	 * It is used for the ajax request to update the Project Approval in the ProjctApproval field.
	 * @param {Number} 'projectAllocationId' which take the projectAllocationId number.
	 * @param {boolean} 'flag' contain boolean value. 
	 * @param {String} 'message' it is containing message.
	 * @param {Ext.data.Store} 'store' which get the store form ProjectApprovalStore.
	 * @param {Number} 'recIdx' which takes the recIdx value.
	 */
	clearPendingNominationsAjax: function (projectAllocationId, flag, message, store, recIdx, view) {
		var promiseClrPendingReq = new Promise(function (resolve, reject) {
			Ext.Ajax.request({
				url: flag ? Api.URL.projectapproval.ACCEPT : Api.URL.projectapproval.REJECT,
				scope: this,
				method: "PUT",
				params: flag ? {
					projectAllocationId: projectAllocationId,
					acceptmsg: message
				} : {
					projectAllocationId: projectAllocationId,
					rejectmsg: message
				},
				success: function (response, opts) {
					var resolveObj = {};
					resolveObj.response = response;
					resolveObj.view = view;
					resolveObj.message = message;
					resolveObj.store = store;
					resolve(resolveObj);
				},
				failure: function (response, opts) {
					reject(response);
				}
			});
		});
		promiseClrPendingReq.then(function (resolveObj) {
			var obj = Ext.decode(resolveObj.response.responseText);
			resolveObj.store.removeAt(recIdx);
			resolveObj.view.updateLayout();
			Ext.getBody().unmask();
			Ext.Msg.alert('Success', obj.message);
		}).catch(function (response) {
			Ext.getBody().unmask();
			if (!Ext.isEmpty(response.responseText)) {
				var obj = Ext.decode(response.responseText);
				if (obj) {
					Ext.Msg.alert('Failure', obj.message);
				}
			}
		});
	}
});