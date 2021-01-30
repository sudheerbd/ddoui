/**
 * The file MOMWindowController is the ViewController for 'DDO.view.projects.MOMCreateWindow'.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.momwindowcontroller'
 */
Ext.define('DDO.view.projects.MOMWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.momwindowcontroller',
/**
 * The function onWindowOutsideTap is the click event when clicked outside the window.
 * @param {Ext.event.Event} 'event'
 * @param {HTML element} 'target' the target of the event.
 */
    onWindowOutsideTap: function(event, target) {
        try{
            // debugger;
        var view = this;
       
    }catch(err){
        Utility.showToast(Messages.EXECUTIVEDASHBOARD.MOM.WINDOWOUTSIDETAP, err);
    }
    },
     /**
     * The function onMomSubmitClick is responsible by clcking on the Publish buttton in the window.
     * @param {Ext.button.Button} 'btn' which holds the publish button. 
     * @param {Ext.event.Event} 'e' which is the event. 
	 * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener.
     */
    onMomSubmitClick: function(btn, e, eOpts) {
        //  try{
        this.onMomClick(btn, e, eOpts, true);
        // }catch(err){
        //     Utility.showToast(Messages.EXECUTIVEDASHBOARD.MOM.MOMPUBLISH, err);
        // }
    },
     /**
     * The function onDraftSubmitClick is responsible by clcking on the Drafts buttton in the window.
     * @param {Ext.button.Button} 'btn' which holds the drafts button. 
     * @param {Ext.event.Event} 'e' which is the event. 
	 * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener.
     */
    onDraftSubmitClick: function(btn, e, eOpts) {
        try{
        this.onMomClick(btn, e, eOpts, false);
        }catch(err){
            Utility.showToast(Messages.EXECUTIVEDASHBOARD.MOM.DRAFTSBUTTON, err);
        }
    },
    /**
     * The function onMomClick is responsible by clcking on the submit buttton in the window.
     * @param {Ext.button.Button} 'btn' which holds the random submit button. 
     * @param {Ext.event.Event} 'e' which is the event. 
	 * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener.
     * @param {boolean} 'isPublish' which contains the boolean value which differs with both the buttons.
     */
    onMomClick: function(btn, e, eOpts, isPublish) {
        var win = btn.up('window'),
            store = Ext.getStore('mom.MomComponent'),
            gridData = win.down('grid').getStore().getModifiedRecords(),
            dateValues = win.lookupReference('agenda-ref').getValues(),
            mom_desc = win.down('htmleditor').getValue(),
            participantsList = win.down('tagfield').getValue(),
            absentiesList = win.getReferences().comboTagviewAbse.getValue(),
            windowFormRef = win.lookupReference('agenda-ref'),
            winStartTime = win.lookupReference('startTime').getRawValue(),
            winEndTime = win.lookupReference('endTime').getRawValue(),
            winDuration = win.lookupReference('duration').getValue(),
            winTagPartcipants = win.lookupReference('comboTagview').getValue(),
            winTagAbsentees = win.lookupReference('comboTagviewAbse').getValue(),
            windowFormValues = windowFormRef.getValues(),
            startDate = win.down('datefield[name = start_date]'),
            startDateValue = startDate.getValue(),
            windowEditorRef = win.down('htmleditor'),
            windowEditorValue = windowEditorRef.getValue(),
            participantsArray = participantsList,
            absentiesArray = absentiesList,
            todoArray = [],
             actionItems,action_items_count, isActionItemsEmpty = false;
             var a= Ext.ComponentQuery.query('[reference = projectsView]')[0];
             var projectId = a.selectedProjectId;

            //  var hashValues = window.location.hash.split('/');
            //  var projectId = hashValues[1],
            //  isMom = hashValues[0];
             var url = '/projectMom';
            //  if(isMom === '#mom'){
            //     url = "/momcomponent"
            //  } else {
            //      url = "/projectMom"
            //  }
            //  debugger;
            this.gridDataCheckWindow(btn,gridData,win,actionItems,action_items_count,todoArray,isActionItemsEmpty, url);
         successCallback = function(data) {
            if(projectId){
                store.load({
                    params: {
                        projectId: projectId
                    },
                    callback: function() {
                        Ext.getStore('projects.MOMViewStore').load({
                            params: {
                                projectId: projectId
                            }
                        });
                        var momview = Ext.ComponentQuery.query('momcmpview')[0];
                        momview.refresh();
                    }
                });
                win.mom_id = null;
                win.edit = false;
                win.action_items_count =0;
                if (isPublish) {
                    Ext.getStore('widget.todo.TodoStore').load();
                }
            } else {
                store.load();
            }
                btn.up('momcreatewindow').close();
            // }
            },
            failureCallback = function(data) {  
            },
            callback = function() {},
        
            config = {
                url: url,
                scope: this,
                method: 'POST',
                
                params: {
                    projectId: projectId ? projectId : null,
                    agenda: dateValues.mom_agenda,
                    description: ' ',
                    fromDate: startDateValue,
                    phantom: true,
                    startTime: winStartTime,
                    endTime: winEndTime,
                    duration: winDuration ,
                    created_date: dateValues.created_date,
                    // participants: participantsArray,
                    actionItems: Ext.encode(todoArray)
                }
            };
            // debugger;
            var data = this.getViewModel().getData();
            var sepParticipants = this.getGroupParticipants(data, participantsArray);
            var sepAbsenties = this.getGroupParticipants(data, absentiesArray);
            config.params.participants = sepParticipants.participantsArray;
            config.params.groupIds = sepParticipants.groupIds;
            config.params.isGroupSelected = data.isGroupSelected;
            config.params.absenties = sepAbsenties.participantsArray;
        if (win.edit) {
            config.method = 'PUT';
            config.params.mom_id = win.mom_id;
        }
        if (isPublish) {
            config.params.isPublish = isPublish;
        }
        this.alertMessages(windowFormValues,startDateValue,winStartTime,win,winEndTime,winDuration,windowEditorValue,winTagPartcipants,isActionItemsEmpty,isPublish,btn); 
    },
    /**
     * The function gridDataCheckWindow is responsible for checking the grid data in the window.
     * @param {Ext.button.Button} 'btn' which holds the publish or drafts button.
     * @param {array} 'gridData' which contains the grid data by clicking on publish 
     * @param {momcreatewindow} 'win' which holds the window. 
     * @param {undefined} 'action_items_count' which is undefined. 
     * @param {array} 'todoArray' 
     * @param {boolean} 'isActionItemsEmpty' which holds the value true or false. 
     */
    gridDataCheckWindow:function(btn,gridData,win,actionItems,action_items_count,todoArray,isActionItemsEmpty, url){
        if (btn.text == "Publish") {
            gridData = win.down('grid').getStore().data.items;
        }
        var me = this;
        gridData.forEach(function(rec) {
             var recData = rec.data;
            if (!Ext.isEmpty(rec.data.assigned_to)) {
                actionItems = {
                    todo_task: recData.action_item,
                    todo_completed: false,
                    todo_author: recData.user_id,
                    todo_author_name: rec.data.assigned_to,
                    todo_enddate: recData.due_date || new Date(),
                    type: 2,
                    todo_id: (recData.todo_id) ? (recData.todo_id) : null
                };
                if(url === '/momcomponent'){
                    actionItems.type = 4
                }
                win.action_items_count = win.action_items_count +1;
                todoArray.push(actionItems);
            }
             if (Ext.isEmpty(recData.action_item) && Ext.isEmpty(recData.assigned_to)) {
            } else if (Ext.isEmpty(recData.action_item) || Ext.isEmpty(recData.assigned_to)) {
                isActionItemsEmpty = true;
            }
        }, me);
    },
     /**
     * The function alertMessages is responsible for showing the alert messages in failing cases.
     * @param {object} 'windowFormValues' which contains the value of the title field. 
     * @param {date} 'startDateValue' which contains the start date. 
     * @param {string} 'winStartTime' which contains the start time. 
     * @param {momcreatewindow} 'win' which holds the window. 
     * @param {string} 'winEndTime'which contains the end time. 
     * @param {number} 'winDuration' which holds the duration time of the meeting. 
     * @param {string} 'windowEditorValue' which holds the editor value in the window. 
     * @param {array} 'winTagPartcipants' contains participants id. 
     * @param {boolean} 'isActionItemsEmpty' which contains the boolean value of true or false. 
     * @param {boolean} 'isPublish' which is boolean value. 
     * @param {Ext.button.Button} 'btn' which is the button. 
     */
    alertMessages:function(windowFormValues,startDateValue,winStartTime,win,winEndTime,winDuration,windowEditorValue,winTagPartcipants,isActionItemsEmpty,isPublish,btn){
        // debugger;
        if (Ext.isEmpty(windowFormValues.mom_agenda)) {
            Utility.topAlertMessage('WARNING', "Please Fill Title Field");
        } else if (Ext.isEmpty(startDateValue)) {
            Utility.topAlertMessage('WARNING', "Please Fill  Date Field");
        } else if (Ext.isEmpty(winStartTime)) {
                Utility.topAlertMessage('WARNING', "Please Fill Hours");
        // } else if (Ext.isEmpty(winStartTime) || Ext.isEmpty(winEndTime) || Ext.isEmpty(winDuration)) {
        //     Utility.topAlertMessage('WARNING', "Please Fill Hours");
        // } else if (Ext.isEmpty(windowEditorValue)) {
        //     Utility.topAlertMessage('WARNING', "Please Fill  Description Field");
        } else if (Ext.isEmpty(winTagPartcipants)) {
            Utility.topAlertMessage('WARNING', "Please select Participants");
        } else if(isActionItemsEmpty == true){
          Utility.topAlertMessage('WARNING', "Please Fill Action items");
        } else if ((win.action_items_count ==0) && isPublish && (btn.text =="Publish")) {
            Ext.Msg.show({
                title: 'Confirm MOM',
                message: 'You do not have any action items, still you want to publish this MOM?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(button) {
                    if (button === 'yes') {
                        Utility.fireAjax(config, successCallback, failureCallback, callback);
                    } else {
                    }
                }
            });
        } else {
            Utility.fireAjax(config, successCallback, failureCallback, callback);
        }
    },
  
    /**
     * The function onStartTimeSelect is responsible for selecting the start time and connection to the functionality of duration.
     * @param {Ext.form.field.ComboBox} 'combo' which is the combobox of time. 
     * @param { Ext.data.Model} 'record' which contains the selected value. 
     * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener. 
     */
    onStartTimeSelect: function(combo, record, eOpts) {
        try{
        var startTime = record.data.disp,
            startTimeValues = startTime.split("-"),
            startTimeHours = parseInt(startTimeValues[0]),
            startTimeMinutes = parseInt(startTimeValues[1]),
            win = Ext.ComponentQuery.query('momcreatewindow')[0],
            endTime, endTimeValues, endTimeHours, endTimeMinutes;
        var endTimeRef = win.viewModel.get('end_time');
        if (endTimeRef) {
            if (Ext.isDate(endTimeRef)) {
                endTime = endTimeRef.getHours() + "-" + endTimeRef.getMinutes();
            } else {
                endTime = endTimeRef;
            }
            endTimeValues = endTime.split("-"),
                endTimeHours = parseInt(endTimeValues[0]),
                endTimeMinutes = parseInt(endTimeValues[1]);
            if (startTimeHours < endTimeHours) {} else if (startTimeHours == endTimeHours) {
                if (startTimeMinutes < endTimeMinutes) {
                } else if (startTimeMinutes == endTimeMinutes) {
                    combo.setValue(null);
                    Utility.topAlertMessage('WARNING', "Start Time should be less than  End Time");
                } else {
                    combo.setValue(null);
                    Utility.topAlertMessage('WARNING', "End Time should be greater than  start Time");
                }
            } else {
                combo.setValue(null);
                Utility.topAlertMessage('WARNING', "End Time should be greater than  start Time");
            }
            this.ondurationfocus(this, null, eOpts);
        } else {}
    }catch(err){
        Utility.showToast(Messages.EXECUTIVEDASHBOARD.MOM.STARTTIME, err);
    }
    },
     /**
     * The function onEndTimeSelect is responsible for selecting the end time and connection to the functionality of duration.
     * @param {Ext.form.field.ComboBox} 'combo' which is the combobox of time. 
     * @param { Ext.data.Model} 'record' which contains the selected value. 
     * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener. 
     */
    onEndTimeSelect: function(combo, record, eOpts) {
        try{
        var endTime = record.data.disp,
            endTimeValues = endTime.split("-"),
            endTimeHours = parseInt(endTimeValues[0]),
            endTimeMinutes = parseInt(endTimeValues[1]),
            win = Ext.ComponentQuery.query('momcreatewindow')[0],
            startTimeRef = win.viewModel.get('start_time'),
            startTime, startTimeValues, startTimeHours, startTimeMinutes;
        if (startTimeRef) {
            if (Ext.isDate(startTimeRef)) {
                startTime = startTimeRef.getHours() + "-" + startTimeRef.getMinutes();
            } else {
                startTime = startTimeRef;
            }
            startTimeValues = startTime.split("-"),
                startTimeHours = parseInt(startTimeValues[0]),
                startTimeMinutes = parseInt(startTimeValues[1]);
            if (startTimeHours < endTimeHours) {
            } else if (startTimeHours == endTimeHours) {
                if (startTimeMinutes < endTimeMinutes) {
                } else if (startTimeMinutes == endTimeMinutes) {
                    combo.setValue(null);
                    Utility.topAlertMessage('WARNING', "Start Time should be less than  End Time");
                } else {
                    combo.setValue(null);
                    Utility.topAlertMessage('WARNING', "Start Time should be less than  End Time");
                }
            } else {
                combo.setValue(null);
                Utility.topAlertMessage('WARNING', "Start Time should be greater than  End Time");
            }
            this.ondurationfocus(this, null, eOpts);
        } else {}
    }catch(err){
        Utility.showToast(Messages.EXECUTIVEDASHBOARD.MOM.ENDTIME, err);
    }
    },
    /**
     * The function addTask is responsible for adding the task in the grid of momwindow.
     * @param {grid} 'me' which contains the grid od window.  
     */
    addTask: function(me) {
        try{
        var grid = me,
            gridStore = grid.getStore(),
            record = {
                assigned_to: "",
                action_item: "",
                due_date: "",
                status: ""
            },
            gridLastRec = gridStore.last();
        gridFirstRec = gridStore.first();
        if(gridLastRec === null && gridFirstRec === null){
            gridStore.add(record);
        }
        else{
      if (!(Ext.isEmpty(gridLastRec.get('assigned_to'))|| Ext.isEmpty(gridLastRec.get('action_item')) ) &&
            !(Ext.isEmpty(gridFirstRec.get('assigned_to')) || Ext.isEmpty(gridFirstRec.get('action_item')) )) {
            gridStore.add(record);
        } else {
            Utility.toastReuseFn('t', 'Please enter all the action items');
        }
    }
    }catch(err){
        Utility.showToast(Messages.EXECUTIVEDASHBOARD.MOM.ADDTASK, err);
    }
    },
   /**
    * The function ondurationfocus is responsible for calculating the duration time from the start hours and the end hours.
    * @param {view} 'me' which contains the current view. 
    * @param {Ext.event.Event} 'e' which is the event.  
    * @param {object} 'eOpts' which holds the object of which event is fired. 
    */
    ondurationfocus: function(me, e, eOpts) {
        var win = Ext.ComponentQuery.query('momcreatewindow')[0],
            starttime = win.down('timefield[name=start_time]'),
            endtime = win.down('timefield[name=end_time]'),
            durationVal = win.down('numberfield[name=duration]'),
            startHour = starttime.getValue(),
            endHour = endtime.getValue(),
            durationHour;
        if (startHour && endHour) {
            durationHour = Math.abs(endHour - startHour) / 36e5;
            durationVal.setValue(durationHour);
        } else {
            durationVal.setValue(null);
        }
    },
    onKeyDownDate: function (dateField, e, eOpts) {
        Utility.onDateField (dateField, e, eOpts);
    },
    getGroupParticipants: function(data, participantsArray){
        // debugger;
        var sepParticipants = {};
        if(data.isGroupSelected){
            var groupIds = data.groupIds;
            participantsArray = participantsArray.filter(function(val) {
                return groupIds.indexOf(val) == -1;
               });
        }
        sepParticipants.groupIds = groupIds;
        sepParticipants.participantsArray = participantsArray;
        return sepParticipants;
    },

    deleteMomGridrow: function(grid, rowIndex, colIndex) {
       
        var gridStore = grid.getStore(),
            rec = gridStore.getAt(rowIndex),
            params;
        params = {
            todo_id: rec.data.todo_id
        };
      
        Ext.Ajax.request({
            url:  Api.URL.createMomGrid.DELETE,
            method: 'DELETE',
            params: params,
            success: function(resp, b) {
              
                gridStore.removeAt(rowIndex);
                grid.refresh();
                // gridStore.load();
                Ext.Msg.alert('Success', "Successfully  deleted ");
                Ext.getBody().unmask();
            },
            failure: function(resp, b) {
                Ext.Msg.alert('Failed', "failed to delete ");
                Ext.getBody().unmask();
            }
        });
    },

});