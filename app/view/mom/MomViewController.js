/**
 * The file MomViewController is the ViewController for 'DDO.view.mom.Mom'.
 * @extends {Ext.app.ViewController}
 * @alias controller.momviewcontroller.
 */
Ext.define('DDO.view.mom.MomViewController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.momviewcontroller',
  /**
   * The function onMomItemClick is responsible for creating momcomponentwindow at the particular event.
   * @param {momcomponent} 'view' which is the mom component view.
   * @param {Ext.data.Model} 'record' which takes the record data.
   * @param {div.mom-view-cls.x-view-item-focused} 'item'.
   * @param {number} 'idx' which is a number.
   * @param {Ext.event.Event} 'evt' which is the event. 
   * @param {Object} 'opts' The options object passed to Ext.util.Observable.addListener.
   */
	onMomItemClick: function(view, record, item, idx, evt, opts) {
		try{
		var me = this,
			targetDom = evt.getTarget(),
			targetEl = Ext.get(targetDom),
			menu;
		if (targetEl.hasCls('mom-morePartcipant-cls')) {
			menu = Ext.create('DDO.view.projects.MOMParticipantImage', {
				record: record.data.participants
			});
			menu.down('mommenuparticipantview').setData(record.data.participants);
			menu.showAt(evt.getXY());
		} else if (targetEl.hasCls('draft-cls')  || targetEl.hasCls('mom-details')) {
			// MOM Draft Edit View
			if(record.data.is_publish){
			this.onMomWindowView(view, record, item, idx, evt, opts, false);          
			}else{
			this.onMomWindowView(view, record, item, idx, evt, opts, true);
			}
		} 
	}catch(err){
		Utility.showToast(Messages.MOM.ITEMCLICK, err);
	}
	},
	/**
	 * The function onMomWindowView is responsible for creating the window and clearing the store while updating mom.
     * @param {momcomponent} 'view' which is the mom component view.
     * @param {Ext.data.Model} 'record' which takes the record data.
     * @param {div.mom-view-cls.x-view-item-focused} 'item'.
     * @param {number} 'idx' which is a number.
     * @param {Ext.event.Event} 'evt' which is the event. 
     * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener.
	 * @param {boolean} 'isEdit' which contains the boolean value.
	 */
	onMomWindowView: function(view, record, item, idx, evt, opts, isEdit) {	
		try{
			var win = Ext.ComponentQuery.query('momcreatewindow')[0] ||
			Ext.create('DDO.view.projects.MOMCreateWindow'),
			winViewModel = win.getViewModel(),
			winGrid = win.down('grid'),
			gridStore = winGrid.getStore(),
			gridData = winGrid.getStore().data.items,
			participantsList = win.down('tagfield'),
			startDate = record.data.from_date,
			recData = record.data,
			taggedPartcipants = [],
			 action_items_count = 0;
		Ext.getStore('feeds.Groups').load({
			params: {
				is_group: false
			}
		});
   this.setViewModel(winViewModel,startDate,gridData,gridStore,recData);
   this.setObjectStatus(recData,action_items_count,gridStore);
    this.showWindow(recData,gridStore,winGrid,participantsList,taggedPartcipants,record,win,winViewModel,action_items_count);
	}catch(err){
		Utility.showToast(Messages.MOM.WINDOWVIEW, err);
	}
},
/**
 * The function setViewModel is responsible for setting values in the ViewModel.
 * @param {momcomponentcreatewindowviewmodel} 'winViewModel' which contains the window viewModel.
 * @param {string} 'startDate' which contains the record start date.
 * @param {array} 'gridData' which contains the items in the grid data.
 * @param {store} 'gridStore' which contains the grid store.
 * @param {object} 'recData' which contains the record data.
 */
	setViewModel : function(winViewModel,startDate,gridData,gridStore,recData){
		winViewModel.set('agenda', recData.agenda);
		winViewModel.set('mom_desc', recData.description);
		winViewModel.set('start_time', recData.start_time);
		winViewModel.set('end_time', recData.end_time);
		winViewModel.set('duration', recData.duration);
		winViewModel.set('start_date', Ext.Date.format(new Date(startDate), "Y-m-d"));
		winViewModel.set('BtnText','Update');
		winViewModel.set('title','View/Update MOM');
		//Update MOM
		gridData.forEach(function(rec) {
			rec.data.action_item = "";
			rec.data.due_date = "";
			rec.data.sr_no = "";
			rec.data.status = "";
			rec.data.assigned_to = "";
		});
		gridStore.removeAll();
	} ,
	/**
	 * The function setObjectStatus is responsible for checking the status and adding the object to the store.
	 * @param {object} 'recData' which contains the record data.
	 * @param {number} 'action_items_count' which contains the count number.
	 * @param {store} 'gridStore' which contains the grid store.
	 */
	setObjectStatus : function(recData,action_items_count,gridStore){
		for (var i = 0; i < recData.action_items.length; i++) {
			var obj = {
				sr_no: i + 1,
				action_item: recData.action_items[i].todo_task,
				assigned_to: recData.action_items[i].todo_author_name,
				user_id: recData.action_items[i].todo_author,
				due_date: new Date(recData.action_items[i].todo_enddate),
				todo_id: recData.action_items[i].todo_id
			};
			action_items_count =action_items_count +1;
			var todoCompleted = recData.action_items[i].todo_completed;
			if (todoCompleted == true || todoCompleted == 'Y') {
				obj.status = "Completed";
			} else {
				obj.status = "InProgress";
			}
			gridStore.add(obj);
		}
	},
	/**
	 * The function showWindow is responsible for showing the window based on button visibility.
	 * @param {object} 'recData' which contains the record data.
	 * @param {store} 'gridStore' which contains the grid store.
	 * @param {grid} 'winGrid' which is the grid in the window.
	 * @param {tagfield} 'participantsList' contains the list of participants in the tag field. 
	 * @param {array} 'taggedPartcipants' 
	 * @param {Ext.data.Model} 'record' which takes the record data.
	 * @param {momcomponentcreatewindow} 'win' which contsins mom component window. 
	 * @param {momcomponentcreatewindowviewmodel} 'winViewModel' which is the window viewmodel. 
	 * @param {number} 'action_items_count' which contains the count number.
	 */
	showWindow : function(recData,gridStore,winGrid,participantsList,taggedPartcipants,record,win,winViewModel,action_items_count){
		if(recData.action_items.length == 0){
            gridStore.load();
        }
        gridStore.sync();
		winGrid.getView().refresh();	
		participantsList.setValue([]);
		recData.participants.forEach(function(rec) {
			var tagListData = rec.ddo_employee_id;
			taggedPartcipants.push(tagListData);
		    participantsList.setValue(taggedPartcipants);
		});
		participantsList.tagMomOwnerId = record.data.createdby;	
		win.edit = true;
		win.mom_id = recData.mom_id;        
		if(recData.is_publish){
			winViewModel.set('BtnVisible', true);
			winViewModel.set('BtnText', 'Update');
		}else{
			winViewModel.set('BtnVisible', false);
			winViewModel.set('BtnText', 'Publish');
		}
		win.action_items_count =action_items_count;
		win.show();		
	},
	/**
	 * The function onMOMNodeCreateBtnClick is responsible for creating window by clicking on the create button.
	 * @param {Ext.button.Button} 'btn' which is the button. 
	 * @param {Ext.event.Event} 'e' which is the event. 
	 * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener.
	 */
	onMOMNodeCreateBtnClick: function(btn, e, eOpts) {
		// debugger;
		try{
		// var momCreateWindow = Ext.ComponentQuery.query('momcomponentcreatewindow')[0] ||
		// 	Ext.create('DDO.view.mom.MomComponentCreateWindow'),
		var momCreateWindow = Ext.ComponentQuery.query('momcreatewindow')[0] ||
		Ext.create('DDO.view.projects.MOMCreateWindow'),
		momViewModel = momCreateWindow.getViewModel(),
			gridStore = momCreateWindow.down('grid').getStore(),
			ref = momCreateWindow.getReferences(),
		    tagView = momCreateWindow.down('tagfield[reference=comboTagview]'),
		    particpantTagStore = tagView.getStore(),
		    loginStore = Ext.getStore('login'),
		    empId = loginStore.getData().items[0].data.ddo_employee_id;
		    var loginParticipantData,
			 loginEmpId;
			this.setViewModelValues(momViewModel,loginEmpId,momCreateWindow);
		ref.comboTagview.reset();
		particpantTagStore.load({
            callback: function() {
	            loginParticipantData = particpantTagStore.findRecord("tagId", empId);
				if (loginParticipantData && loginParticipantData.data) {
	                    loginEmpId = loginParticipantData.data.tagId;
	                    momViewModel.set('loginEmpId', loginEmpId);
						tagView.setValue(loginParticipantData.data.tagId);
	                   tagView.tagMomOwnerId = loginParticipantData.data.tagId;
	                }
	            }
        });
        momCreateWindow.action_items_count =0;
		gridStore.load();
		momCreateWindow.show().center();
	}catch(err){
		Utility.showToast(Messages.MOM.CREATEWINDOW, err);
	}
	},
	/**
	 * The function setViewModelValues is responsible for setting the values in the ViewModel by clicking on the create button.
	 * @param {momcomponentcreatewindowviewmodel} 'momViewModel' which is the window viewmodel.
	 * @param {undefined} 'loginEmpId' 
	 * @param {momcomponentcreatewindow} 'momCreateWindow' which contains the window. 
	 */
	setViewModelValues : function (momViewModel,loginEmpId,momCreateWindow){
		momViewModel.set('BtnVisible', false);
		momViewModel.set('agenda', null);
		momViewModel.set('mom_desc', null);
		momViewModel.set('start_time', null);
		momViewModel.set('end_time', null);
		momViewModel.set('start_date', null);
		momViewModel.set('end_date', null);
		momViewModel.set('BtnText', 'Publish');
		momViewModel.set('title','Create MOM');
		momViewModel.set('duration',null);
		momViewModel.set('loginEmpId',loginEmpId);
		momCreateWindow.mom_id = null;
        momCreateWindow.edit = false;
		Ext.getStore('feeds.Groups').load({
			params: {
				is_group: false
			}
		});   
	},
	/**
	 * The function onMomSearchText is responsible for searching in the textfield.
	 * @param {Ext.form.field.Text} 'field' the text field. 
	 * @param {Ext.event.Event} 'e' the event. 
	 * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener. 
	 */
	onMomSearchText: function(field, e, eOpts) {
		try{
			// debugger;
		var momStore = Ext.getStore('mom.MomComponent'),
			searchString = Ext.String.trim(field.getRawValue()),
			agendaRec, partcipntRec, add;
		if (searchString) {
			momStore.clearFilter(true);
			momStore.filter(function(record) {
				agendaRec = record.get('agenda');
				partcipntRec = record.get('participants');
				if (Ext.isArray(partcipntRec)) {
					add = false;
					for (var i = 0; i < partcipntRec.length; i++) {
						if (partcipntRec[i].user_full_name.toLowerCase().search(new RegExp(searchString.toLowerCase(), 'gi')) == 0) {
							add = true;
							break;
						}
					}
					if (add || (agendaRec.toLowerCase().search(new RegExp(searchString.toLowerCase(), 'gi')) == 0)) {
						return true;
					} else {
						return false;
					}
				}
			}, this);
		} else if (searchString.length == 0) {
			momStore.clearFilter(true);
			momStore.reload();
		}
	}catch(err){
		Utility.showToast(Messages.MOM.SEARCHFIELD, err);
	}
	}
});