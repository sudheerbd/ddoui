/**
 * The file NotesWindowController is the ViewController for 'DDO.view.projects.NoteWindow'.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.noteswindowcontroller'
 */
Ext.define('DDO.view.projects.NotesWindowController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.noteswindowcontroller',
  /**
	* The function onWindowOutsideTap is responsible to close the window by clicking outside the window view.
	* @param {Event} 'event' the click event. 
	* @param {target} 'target' where the user clicks. 
	*/
	onWindowOutsideTap: function(event, target) {
		try{
		var view = this;
		Utility.onWindowOutterTap(event, target, view);
		}catch(err){
			Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTES.WINDOWCLOSE, err);
		}
	},
	onEmployeeComboSearch: function (search) {
    try {
      search.query = new RegExp(search.query, 'i');
      search.forceAll = true;
    } catch (err) {
      Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTES.EMPLOYEESELECT, err);
    }
  },
  /**
	* The function onNoteCloseClick is responsible to close the window by clicking on the 'X' button.
	* @param {Ext.button.Button} 'btn' which is the 'X' button. 
	* @param {Event} 'e' the click event. 
	* @param {object} 'eOpts' which holds the events object. 
	*/
	onNoteCloseClick: function(btn, e, eOpts) {
		try{
		btn.up('notewindow').close();
		}catch(err){
			Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTES.XCLICK, err);
		}
	},
  /**
	 * The function onNoteSubmitClick is responsible when clicking on the submit button in the window and performs ajax requests.
	 * @param {Ext.button.Button} 'btn' which is the submit button. 
	 * @param {Event} 'e' the click event. 
	 * @param {object} 'eOpts' the object which holds the events. 
	 */
	onNoteSubmitClick: function(btn, e, eOpts) {
		 try{
		var noteView = this.getView().parentViewRef,
			noteDashboardView = noteView.down('notesdataview'),
			formValues = btn.up('form').getValues(),
			store = noteDashboardView.getStore(),
			projectStore = Ext.getStore('projects.ProjectDashboardStore'),
			viewModel = this.getViewModel(),
			 loginStore = Ext.getStore('login'),
       loginEmpName = loginStore.getData().items[0].data.fullname,
			record,
			obj = {};
		if (viewModel.get('deleteBtnVisible')) {
			
			this.setStoreValues(obj,viewModel,formValues,store,projectStore,loginEmpName);
		} else {
		
			this.updateAjaxRequest(viewModel,formValues,store,projectStore);
		}
		btn.up('notewindow').close();
	}catch(err){
		Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTES.SUBMITCLICK, err);
	}
	},
	/**
	 * The function setStoreValues is responsible to load the store by clicking on the submit button.
	 * @param {objetc} 'obj' the declared empty object. 
	 * @param {noteswindowviewmodel} 'viewModel' which is the view model. 
	 * @param {object} 'formValues' which holds the form values. 
	 * @param {projects.NotesStore} 'store' which is the store. 
	 * @param {projects.ProjectDashboardStore} 'projectStore' which is the store. 
	 */
	setStoreValues:function(obj,viewModel,formValues,store,projectStore,loginEmpName){
		obj.projectId = viewModel.get('activeProId');
		obj.noteTitle = formValues.note_title;
		obj.employeeId = formValues.employee_id;
		obj.noteDescription = formValues.note_description;
		obj.noteType = formValues.note_type;
		obj.noteStatus = formValues.note_status;
		obj.noteEmpName = loginEmpName;
		store.add(obj);
		store.sync({
			success: function(batch, options) {
				store.load({
					params: {
						projectId: obj.projectId
					}
				});
				projectStore.load();
			},
			failure: function(batch, options) {
				Ext.Msg.alert('ERROR', AlertMessages.noteAddFailed);
			}
		});
	},
	/**
	 * The function updateAjaxRequest is responsible for update the values by clicking on the submit button.
	 * @param {noteswindowviewmodel} 'viewModel' which is the view model. 
	 * @param {object} 'formValues' which holds the form values. 
	 * @param {projects.NotesStore} 'store' which is the store. 
	 * @param {projects.ProjectDashboardStore} 'projectStore' which is the store.
	 */
	updateAjaxRequest:function(viewModel,formValues,store,projectStore){
		Ext.getBody().mask('loading...');
		var updateKarma = new Promise(function(resolve,reject){
    	Ext.Ajax.request({
				url:Api.URL.projects.UPDATE,
				method: 'PUT',
				scope: this,
				params: {
					noteId: viewModel.get('rec').get('note_id'),
					noteTitle: formValues.note_title,
					noteDescription: formValues.note_description,
					noteType: formValues.note_type,
					noteStatus: formValues.note_status
				},
				success : function(res){
				var resolveObject = {};
					 resolveObject.store = store;
					 resolveObject.viewModel = viewModel;
					 resolveObject.projectStore = projectStore;
					 resolve(resolveObject);
					 Ext.getBody().unmask();
				},
				failure : function (resp){
					reject(resp);
					Ext.getBody().unmask();
				}
			});
		});
		updateKarma.then(function(resolveObject){
			resolveObject.store.load({
				params: {
					projectId: resolveObject.viewModel.get('activeProId')
				}
			});
			resolveObject.projectStore.load();
		}).catch(function(resp){
			Ext.Msg.alert('ERROR', AlertMessages.noteUpdateFailed);
		});
	},
		
	/**
	 * The function onNoteEditClick is responsible to enable the edit button in the window.
	 * @param {Ext.button.Button} 'btn' which is the button with icon. 
	 * @param {Event} 'e' the click event. 
	 * @param {object} 'eOpts' which is the object of the event. 
	 */
	onNoteEditClick: function(btn, e, eOpts) {
		try{
		this.getViewModel().set('editBtnVisible', true);
		this.getViewModel().set('nonEditablePermit', false);
		}catch(err){
			Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTES.EDITCLICK, err);
		}
	},
  /**
	 * The function onNoteDeleteClick is responsible to delete the record in the data view. 
	 * @param {Ext.button.Button} 'btn' which is the delete button with icon. 
	 * @param {Event} 'e' the click event. 
	 * @param {object} 'eOpts' which is the object of events. 
	 */
	onNoteDeleteClick: function(btn, e, eOpts) {
		try{
		var me = this,
			viewModel = this.getViewModel(),
			rec = viewModel.get('rec'),
			store, projectStore;
		Ext.Msg.confirm("Confirm", "Are you sure you want to delete this Note?", function(btnText) {
			if (btnText === "no") {}
			 else if (btnText === "yes") {
				var noteView = me.getView().parentViewRef,
					noteDataView = noteView.down('notesdataview'),
					store = noteView.getStore();
				projectStore = Ext.getStore('projects.ProjectDashboardStore');
				store.remove(rec);
				store.sync({
					success: function(batch, options) {
						store.load({
							params: {
								projectId: viewModel.get('activeProId')
							}
						});
						projectStore.load();
						me.getView().close();
					},
					failure: function(batch, options) {
						Ext.Msg.alert('ERROR', AlertMessages.noteRemoveFailed);
					}
				});
			}
		}, this);
	}catch(err){
		Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTES.DELETECLICK, err);
	}
	},
    /**
	  * The function onNoteWindowCloseAction is responsible to clear the filter when closing the window.
	  * @param {Ext.Panel} 'panel' 
	  * @param {object} 'eOpts' which is the object which consists of events. 
	  */
	onNoteWindowCloseAction: function(panel, eOpts) {
		try{
			var view = this.getView(),
				projectNote = view.down('[name = note_type]'),
				projectStatus = view.down('[name = note_status]'),
				projectNoteStore = projectNote.getStore(),
				projectStatusStore = projectStatus.getStore();
			projectStatusStore.clearFilter(true);
			projectNoteStore.clearFilter(true);
		}catch(err){
			Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTES.CLEARFILTER, err);
		}
	},
    /**
	  * The function onNoteTitleFieldKey is responsible to show and hide the submit button.
	  * @param {Ext.form.Field} 'field' which is the text field. 
	  * @param {Event} 'e' the click event. 
	  * @param {object} 'eOpts' the object which holds all events. 
	  */
	onNoteTitleFieldKey: function(field, e, eOpts) {
		try{
		var viewModel = this.getViewModel();
		if (Ext.isEmpty(field.value)) {
			viewModel.set('subBtnDisable', true);
		} else if (!viewModel.get('statusValue') || !viewModel.get('noteTypeValue') 
			|| !viewModel.get('noteTitleValue') || !viewModel.get('noteDescValue')) {
			viewModel.set('subBtnDisable', true);
		} else if (viewModel.get('noteDescValue').length < 139) {
			viewModel.set('subBtnDisable', true);
		} else {
			viewModel.set('subBtnDisable', false);
		}
	}catch(err){
		Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTES.SUBMITVISIBLE, err);
	}
	},
	onEmployeeSelect: function(combo, record, eOpts) {
		try{
		combo.inputEl.dom.value = '';
		combo.collapse();
		}catch(err){
				Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTES.COMBOCLOSE, err);
		}
}
});