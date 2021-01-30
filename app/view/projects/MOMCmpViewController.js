/**
 * The file is the viewcontroller for 'DDO.view.projects.MOMView'.
 * @extends {Ext.app.ViewController}
 * @extends 'controller.momcmpviewcontroller'
 */
Ext.define('DDO.view.projects.MOMCmpViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.momcmpviewcontroller',
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
        Utility.showToast(Messages.EXECUTIVEDASHBOARD.MOM.ITEMCLICK, err);
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
	 * @param {boolean} 'isDraft' which contains the boolean value.
	 */
    onMomWindowView: function(view, record, item, idx, evt, opts, isDraft) {
        try{
        var win = Ext.ComponentQuery.query('momcreatewindow')[0] ||
            Ext.create('DDO.view.projects.MOMCreateWindow'),
            winViewModel = win.getViewModel(),
            winGrid = win.down('grid'),
            gridStore = winGrid.getStore(),
            gridData = winGrid.getStore().data.items,
            participantsList = win.down('tagfield'),
            absentList = win.getReferences().comboTagviewAbse,
            startDate = record.data.from_date,
            endDate = record.data.to_date,
            recData = record.data,
            taggedPartcipants = [],
            taggedAbsenties =[],
            action_items_count = 0;
        Ext.getStore('feeds.Groups').load({
            params: {
                is_group: false
            }
        });
        this.setViewModelWindow(winViewModel,recData,startDate,endDate,gridData,gridStore);
        this.checkObjectStatus(recData,action_items_count,gridStore,winGrid);
        this.onButtonClick(recData,gridStore,participantsList,absentList,taggedPartcipants,taggedAbsenties,record,isDraft,winViewModel,win,action_items_count);
        }catch(err){
            Utility.showToast(Messages.EXECUTIVEDASHBOARD.MOM.WINDOWVIEW, err);
        }
    },
    /**
    * The function setViewModelWindow is responsible for setting values in the ViewModel.
    * @param {momwindowviewmodel} 'winViewModel' which contains the window viewModel.
    * @param {object} 'recData' which contains the record data.
    * @param {string} 'startDate' which contains the record start date.
    * @param {string} 'endDate' which contains the record end date.
    * @param {array} 'gridData' which contains the items in the grid data.
    * @param {store} 'gridStore' which contains the grid store.
    */
    setViewModelWindow:function(winViewModel,recData,startDate,endDate,gridData,gridStore){
        winViewModel.set('agenda', recData.agenda);
        winViewModel.set('mom_desc', recData.description);
        winViewModel.set('start_time', recData.start_time);
        winViewModel.set('end_time', recData.end_time);
        winViewModel.set('duration', recData.duration);
        winViewModel.set('start_date', Ext.Date.format(new Date(startDate), "Y-m-d"));
        winViewModel.set('end_date', Ext.Date.format(new Date(endDate), "Y-m-d"));
        winViewModel.set('title', 'View/Update MOM');
        gridData.forEach(function(rec) {
            rec.data.action_item = "";
            rec.data.due_date = "";
            rec.data.sr_no = "";
            rec.data.status = "";
            rec.data.assigned_to = "";
        });
        gridStore.removeAll();
    },
    /** 
     * The function checkObjectStatus is responsible for checking the status and adding the object to the store.
	 * @param {object} 'recData' which contains the record data.
	 * @param {number} 'action_items_count' which contains the count number.
	 * @param {store} 'gridStore' which contains the grid store.
     * @param {grid} 'winGrid' which is the grid in the window.
	 */
    checkObjectStatus:function(recData,action_items_count,gridStore,winGrid){
        for (var i = 0; i < recData.action_items.length; i++) {
            var obj = {
                sr_no: i + 1,
                action_item: recData.action_items[i].todo_task,
                assigned_to: recData.action_items[i].todo_author_name,
                user_id: recData.action_items[i].todo_author,
                due_date: new Date(recData.action_items[i].todo_enddate),
                todo_id: recData.action_items[i].todo_id
            };
            var todoCompleted = recData.action_items[i].todo_completed;
                 action_items_count =action_items_count +1;
            if (todoCompleted == true || todoCompleted == 'Y') {
                obj.status = "Completed";
            } else {
                obj.status = "InProgress";
            }
            gridStore.add(obj);
        }
         gridStore.sync();
        winGrid.getView().refresh();
    },
     /**
	 * The function onButtonClick is responsible for showing the window based on button visibility.
	 * @param {object} 'recData' which contains the record data.
	 * @param {store} 'gridStore' which contains the grid store.
	 * @param {tagfield} 'participantsList' contains the list of participants in the tag field. 
	 * @param {array} 'taggedPartcipants' 
	 * @param {Ext.data.Model} 'record' which takes the record data.
     * @param {boolean} 'isDraft' which holds the boolean value of true or false.
     * @param {momwindowviewmodel} 'winViewModel' which is the window viewmodel. 
	 * @param {momcreatewindow} 'win' which contsins mom component window. 
	 * @param {number} 'action_items_count' which contains the count number.
	 */
    onButtonClick:function(recData,gridStore,participantsList,absentList,taggedPartcipants,taggedAbsenties,record,isDraft,winViewModel,win,action_items_count){
        if(recData.action_items.length == 0){
            gridStore.load();
        }
        participantsList.setValue([]);
        absentList.setValue([]);
        recData.participants.forEach(function(rec) {
            var tagListData = rec.ddo_employee_id;
            taggedPartcipants.push(tagListData);
            participantsList.setValue(taggedPartcipants);
        });
        if(recData.absenties){
            var names = [];
        recData.absenties.forEach(function(rec) {
            var tagListData = rec.ddo_employee_id;
            var name = rec.user_full_name;
            taggedAbsenties.push(tagListData);
             absentList.setValue(taggedAbsenties);
            // absentList.setDisplayTpl(names)
        });
    }
            participantsList.tagMomOwnerId = record.data.createdby;
        if (isDraft) {
            winViewModel.set('BtnText', 'Publish');
        }else{
            winViewModel.set('BtnText', 'Update');
        }
            win.edit = true;
            win.mom_id = recData.mom_id;
        if (recData.is_publish) {
            winViewModel.set('BtnVisible', true);
        } else {
            winViewModel.set('BtnVisible', false);
        }
        win.action_items_count =action_items_count;
        win.show();
    },
	/**
	 * The function onMOMCreateBtnClick is responsible for creating window by clicking on the create button.
	 * @param {Ext.button.Button} 'btn' which is the button. 
	 * @param {Ext.event.Event} 'e' which is the event. 
	 * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener.
	 */
    onMOMCreateBtnClick: function(btn, e, eOpts) {
        try{
        var momCreateWindow = Ext.ComponentQuery.query('momcreatewindow')[0] ||
            Ext.create('DDO.view.projects.MOMCreateWindow'),
            momViewModel = momCreateWindow.getViewModel(),
            gridStore = momCreateWindow.down('grid').getStore(),
            ref = momCreateWindow.getReferences(),
            tagView = momCreateWindow.down('tagfield[reference=comboTagview]'),
            particpantTagStore = tagView.getStore(),
            loginStore = Ext.getStore('login'),
            empId = loginStore.getData().items[0].data.ddo_employee_id;
           var loginParticipantData, loginEmpId;
    this.createButtonSetViewModel(momViewModel,momCreateWindow,ref,particpantTagStore,empId,loginParticipantData,tagView,loginEmpId);
        gridStore.load();
        momCreateWindow.action_items_count =0;
        momCreateWindow.show().center();
        }catch(err){
            Utility.showToast(Messages.EXECUTIVEDASHBOARD.MOM.CREATEWINDOW, err);
        }
    },
    /**
	 * The function createButtonSetViewModel is responsible for setting the values in the ViewModel by clicking on the create button.
	 * @param {momwindowviewmodel} 'momViewModel' which is the window viewmodel.
     * @param {momcreatewindow} 'momCreateWindow' which contains the window. 
     * @param {momcreatewindowreferencs} 'ref' which contains references.
     * @param {combotagviewstore} 'particpantTagStore' which is a store.
     * @param {employeeid} 'empId' which contains login user employee id.
     * @param {undefined} 'loginParticipantData'.
     * @param {tagviewreference} 'tagView' which contains the tagview reference.
	 * @param {undefined} 'loginEmpId' 
	 * 
	 */
    createButtonSetViewModel:function(momViewModel,momCreateWindow,ref,particpantTagStore,empId,loginParticipantData,tagView,loginEmpId){
        momViewModel.set('BtnVisible', false);
        momViewModel.set('agenda', null);
        momViewModel.set('mom_desc', null);
        momViewModel.set('start_time', null);
        momViewModel.set('end_time', null);
        momViewModel.set('start_date', null);
        momViewModel.set('end_date', null);
        momViewModel.set('BtnText', 'Publish');
        momViewModel.set('title', 'Create MOM');
        momViewModel.set('duration', null);
        Ext.getStore('feeds.Groups').load({
            params: {
                is_group: false
            }
        });
        momCreateWindow.mom_id = null;
        momCreateWindow.edit = false;
        ref.comboTagview.reset();
        ref.comboTagviewAbse.reset();
        particpantTagStore.load({
            callback: function() {
            loginParticipantData = particpantTagStore.findRecord("tagId", empId);
            tagView.tagMomOwnerId = empId;
                if (loginParticipantData && loginParticipantData.data) {
                    loginEmpId = loginParticipantData.data.tagId;
                    momViewModel.set('loginEmpId', loginEmpId);
                     
                    tagView.tagMomOwnerId = loginParticipantData.data.tagId;
                    tagView.setValue(loginParticipantData.data.tagId);
                }
            }
        });
    },
   	/**
	 * The function onSearchText is responsible for searching in the textfield.
	 * @param {Ext.form.field.Text} 'field' the text field. 
	 * @param {Ext.event.Event} 'e' the event. 
	 * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener. 
	 */
    onSearchText: function(field, e, eOpts) {
        try{
            // debugger;
        var momStore = Ext.getStore('projects.MOMViewStore'),
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
        Utility.showToast(Messages.EXECUTIVEDASHBOARD.MOM.SEARCHFIELD, err);
    }
    },
    onMOMActionItems: function (){
        // console.log("onMOMActionItems");
        // debugger;
        // try{
            var momCreateWindow = Ext.ComponentQuery.query('momActionItems')[0] ||
                Ext.create('DDO.view.projects.MOMActionItems');                // momViewModel = momCreateWindow.getViewModel(),
            //   var  gridStore = momCreateWindow.getViewModel().getStore('momActionItemsStore');
        //         ref = momCreateWindow.getReferences(),
        //         tagView = momCreateWindow.down('tagfield[reference=comboTagview]'),
        //         particpantTagStore = tagView.getStore(),
        //         loginStore = Ext.getStore('login'),
        //         empId = loginStore.getData().items[0].data.ddo_employee_id,
        //         loginParticipantData, loginEmpId;
        // this.createButtonSetViewModel(momViewModel,momCreateWindow,ref,particpantTagStore,empId,loginParticipantData,tagView,loginEmpId);
            // gridStore.load();
            // momCreateWindow.action_items_count =0;
            momCreateWindow.show().center();
            // }catch(err){
            //     Utility.showToast(Messages.EXECUTIVEDASHBOARD.MOM.CREATEWINDOW, err);
            // }
    }
});
