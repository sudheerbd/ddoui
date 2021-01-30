// /**
//  * The file MomComponentCreateWindowController is the ViewController for 'DDO.view.mom.MomComponentCreateWindow'.
//  * @extends {Ext.app.ViewController}
//  * @alias 'controller.momcomponentcreatewindowcontroller'
//  */
// Ext.define('DDO.view.mom.MomComponentCreateWindowController', {
//     extend: 'Ext.app.ViewController',

//     alias: 'controller.momcomponentcreatewindowcontroller',
// /**
//  * The function onWindowOutsideTap is the click event when clicked outside the window.
//  * @param {Ext.event.Event} 'event'
//  * @param {HTML element} 'target' the target of the event.
//  */
//     onWindowOutsideTap: function(event, target) {
//         try{
//         var view = this;
//         if (Utility.nominatAlert) {
//             Utility.onWindowOutterTap(event, target, view);
//         }
//     }catch(err){
//         Utility.showToast(Messages.MOM.WINDOWOUTSIDETAP, err);
//     }
//     },
// /**
//  * The function onWindowOutsideTap is the click event when clicked outside the window.
//  * @param {Ext.event.Event} 'event'
//  * @param {HTML element} 'target' the target of the event.
//  * @param {window} 'windowView' which contains the window to close.
//  */
//     onWindowOutterTap: function (event, target, windowView){
//         var target = target || event.target,
//                 cls = target.getAttribute('class'),
//                 window;
//             if (cls && (cls.indexOf('x-mask') !== -1)) {
//                 window = windowView.getView();
//                 window.close();
//             }
//     },
//     /**
//      * The function onMomSubmitClick is responsible by clcking on the Publish buttton in the window.
//      * @param {Ext.button.Button} 'btn' which holds the publish button. 
//      * @param {Ext.event.Event} 'e' which is the event. 
// 	 * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener.
//      */
//     onMomSubmitClick: function(btn, e, eOpts) {
//         try{
//         this.onMomClick(btn, e, eOpts, true);
//         }catch(err){
//             Utility.showToast(Messages.MOM.MOMPUBLISH, err);
//         }
//     },
//    /**
//      * The function onDraftSubmitClick is responsible by clcking on the Drafts buttton in the window.
//      * @param {Ext.button.Button} 'btn' which holds the drafts button. 
//      * @param {Ext.event.Event} 'e' which is the event. 
// 	 * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener.
//      */
//     onDraftSubmitClick: function(btn, e, eOpts) {
//         try{
//         this.onMomClick(btn, e, eOpts, false);
//         }catch(err){
//             Utility.showToast(Messages.MOM.DRAFTSBUTTON, err);
//         }
//     },
//    /**
//      * The function onMomClick is responsible by clcking on the submit buttton in the window.
//      * @param {Ext.button.Button} 'btn' which holds the random submit button. 
//      * @param {Ext.event.Event} 'e' which is the event. 
// 	 * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener.
//      * @param {boolean} 'isPublish' which contains the boolean value which differs with both the buttons.
//      */
//     onMomClick: function(btn, isPublish) {
//         Ext.getBody().mask('');
//         var win = btn.up('window'),
//             store = Ext.getStore('mom.MomComponent'),
//             gridData = win.down('grid').getStore().getModifiedRecords(),
//             dateValues = win.lookupReference('agenda-ref').getValues(),
//             mom_desc = win.down('htmleditor').getValue(),
//             participantsList = win.down('tagfield').getValue(),
//             windowFormRef = win.lookupReference('agenda-ref'),
//             winStartTime = win.lookupReference('startTime').getRawValue(),
//             winEndTime = win.lookupReference('endTime').getRawValue(),
//             winDuration = win.lookupReference('duration').getValue(), 
//             winTagPartcipants = win.lookupReference('comboTagview').getValue(),
//             windowFormValues = windowFormRef.getValues(),
//             startDate = win.down('datefield[name = start_date]'),
//             startDateValue = startDate.getValue(),
//             windowEditorRef = win.down('htmleditor'),
//             windowEditorValue = windowEditorRef.getValue(),
//             participantsArray = participantsList,
//             todoArray = [],
//              actionItems, isActionItemsEmpty =false;
//             if(btn.text =="Publish"){
//                 gridData = win.down('grid').getStore().data.items;
//             }
//             this.gridDataCheck(gridData,actionItems,win,todoArray,isActionItemsEmpty);
//             this.requestSuccessCallback(store,win,isPublish,btn);
//              successCallback = function(data){
//                 btn.up('momcomponentcreatewindow').close();
//              },
//             this.requestFailureCallback(store); 
//             failureCallback = function(data) {},
//             config = {
//                 url: "/momcomponent",
//                 scope: this,
//                 method: 'POST',
//                 params: {
//                     agenda: dateValues.mom_agenda,
//                     description: mom_desc,
//                     fromDate: startDateValue,
//                     phantom: true,
//                     startTime: winStartTime,
//                     endTime: winEndTime,
//                     duration: winDuration,
//                     created_date: dateValues.created_date,
//                     participants: participantsArray,
//                     actionItems: Ext.encode(todoArray)
//                 }
//             };
//         if (win.edit) {
//             config.method = 'PUT';
//             config.params.mom_id = win.mom_id;
//         }
//         if (isPublish) {
//             config.params.isPublish = isPublish;
//         }
//     this.alertMessages(windowFormValues,startDateValue,winStartTime,win,winEndTime,winDuration,windowEditorValue,winTagPartcipants,isActionItemsEmpty,isPublish,btn);
//     },
//     /**
//      * The function gridDataCheck is responsible for checking the grid data in the window.
//      * @param {arry} 'gridData' which contains the grid data by clicking on publish 
//      * @param {undefined} 'actionItems' which is undefined. 
//      * @param {momcomponentcreatewindow} 'win' which holds the window. 
//      * @param {array} 'todoArray' 
//      * @param {boolean} 'isActionItemsEmpty' which holds the value true or false. 
//      */
//     gridDataCheck : function (gridData,actionItems,win,todoArray,isActionItemsEmpty){
//            gridData.forEach(function(rec) {
//                 var recData = rec.data;
//             if (!Ext.isEmpty(recData.assigned_to)) {
//                 actionItems = {
//                     todo_task: recData.action_item,
//                     todo_completed: false,
//                     todo_author: recData.user_id,
//                     todo_author_name: recData.assigned_to,
//                     todo_enddate: recData.due_date || new Date(),
//                     type: 4,
//                     todo_id:(recData.todo_id)?(recData.todo_id):null
//                 };
//                 win.action_items_count = win.action_items_count +1;
//                 todoArray.push(actionItems);
//             }
//             if (Ext.isEmpty(recData.action_item) && Ext.isEmpty(recData.assigned_to)) {

//             } else if (Ext.isEmpty(recData.action_item) || Ext.isEmpty(recData.assigned_to)) {
//                 isActionItemsEmpty = true;
//             }
//         });
//     },
//     /**
//      * The function requestSuccessCallback is responsible for callback function for success.
//      * @param {momcomponentstore} 'store' which is a store. 
//      * @param {momcomponentcreatewindow} 'win' which holds the window. 
//      * @param {boolean} 'isPublish' which holds is publish value true or false. 
//      * @param {Ext.button.Button} 'btn' which is the publish button. 
//      */
//     requestSuccessCallback:function(store,win,isPublish,btn){
//          successCallback = function(data) {
//             store.load({
//                 callback: function() {
//                     var momview = Ext.ComponentQuery.query('momcomponent')[0];
//                     momview.refresh();
//                 }
//             });
//             win.mom_id = null;
//             win.edit = false;
//             win.action_items_count =0;

//             if(isPublish) {
//                 Ext.getStore('widget.todo.TodoStore').load();
//             } 
//        }
//     },
//     /**
//      * The function requestFailureCallback is responsible for the callback function for the failure case.
//      * @param {momcomponentstore} 'store' which is a store.
//      */
//     requestFailureCallback : function(store){
//         callback = function() {
//             store.load();
//             var momview = Ext.ComponentQuery.query('momcomponent')[0];
//                      momview.refresh();
//          }
//     },
//     /**
//      * The function alertMessages is responsible for showing the alert messages in failing cases.
//      * @param {object} 'windowFormValues' which contains the value of the title field. 
//      * @param {date} 'startDateValue' which contains the start date. 
//      * @param {string} 'winStartTime' which contains the start time. 
//      * @param {momcomponentcreatewindow} 'win' which holds the window. 
//      * @param {string} 'winEndTime'which contains the end time. 
//      * @param {number} 'winDuration' which holds the duration time of the meeting. 
//      * @param {string} 'windowEditorValue' which holds the editor value in the window. 
//      * @param {array} 'winTagPartcipants' contains participants id. 
//      * @param {boolean} 'isActionItemsEmpty' which contains the boolean value of true or false. 
//      * @param {boolean} 'isPublish' which is boolean value. 
//      * @param {Ext.button.Button} 'btn' which is the button. 
//      */
//     alertMessages : function(windowFormValues,startDateValue,winStartTime,win,winEndTime,winDuration,windowEditorValue,winTagPartcipants,isActionItemsEmpty,isPublish,btn){
//         if (Ext.isEmpty(windowFormValues.mom_agenda)) {
//             Utility.topAlertMessage('WARNING', "Please Fill Title Field");
//             Ext.getBody().unmask();
//         } else if (Ext.isEmpty(startDateValue)) {
//             Utility.topAlertMessage('WARNING', "Please Fill  Date Field");
//             Ext.getBody().unmask();
//         } else if (Ext.isEmpty(winStartTime)|| Ext.isEmpty(winEndTime) || Ext.isEmpty(winDuration)) {
//             Utility.topAlertMessage('WARNING', "Please Fill Hours");
//             Ext.getBody().unmask();
//         } else if (Ext.isEmpty(windowEditorValue)) {
//             Utility.topAlertMessage('WARNING', "Please Fill  Description Field");
//             Ext.getBody().unmask();
//         } else if (Ext.isEmpty(winTagPartcipants)) {
//             Utility.topAlertMessage('WARNING', "Please select Participants");
//             Ext.getBody().unmask();
//         }else if(isActionItemsEmpty == true){
//           Utility.topAlertMessage('WARNING', "Please Fill Action items");
//           Ext.getBody().unmask();
//         } else if ((win.action_items_count ==0) && isPublish && (btn.text =="Publish")) {
//             Ext.Msg.show({
//                 title: 'Confirm MOM',
//                 message: 'You do not have any action items, still you want to publish this MOM?',
//                 buttons: Ext.Msg.YESNO,
//                 icon: Ext.Msg.QUESTION,
//                 fn: function(button) {
//                     if (button === 'yes') {
//                         Utility.fireAjax(config, successCallback, failureCallback, callback);
//                         Ext.getBody().unmask();
//                     } else {
//                     }
//                 }
//             });
//         }  else {
//             Utility.fireAjax(config, successCallback, failureCallback, callback);
//             Ext.getBody().unmask();
//         }
//     },
//     /**
//      * The function onStartTimeSelect is responsible for selecting the start time and connection to the functionality of duration.
//      * @param {Ext.form.field.ComboBox} 'combo' which is the combobox of time. 
//      * @param { Ext.data.Model} 'record' which contains the selected value. 
//      * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener. 
//      */
//     onStartTimeSelect: function(combo, record, eOpts) {
//         try{
//         var startTime = record.data.disp,
//             startTimeValues = startTime.split("-"),
//             startTimeHours = parseInt(startTimeValues[0]),
//             startTimeMinutes = parseInt(startTimeValues[1]),
//             win = this.getView(), 
//             durationVal = win.down('numberfield[name=duration]'),           
//             endTime, endTimeValues, endTimeHours, endTimeMinutes;
//             durationVal.setValue('');
//             var endTimeRef = win.viewModel.get('end_time');
//         if (endTimeRef) {
//             if(Ext.isDate(endTimeRef)) {
//                 endTime = endTimeRef.getHours() + "-" + endTimeRef.getMinutes();
//             }
//             else {
//                 endTime = endTimeRef;
//             }
//             endTimeValues = endTime.split("-"),
//                 endTimeHours = parseInt(endTimeValues[0]),
//                 endTimeMinutes = parseInt(endTimeValues[1]);
//             if (startTimeHours < endTimeHours) {} else if (startTimeHours == endTimeHours) {
//                 if (startTimeMinutes < endTimeMinutes) {
//                 } else if (startTimeMinutes == endTimeMinutes) {
//                     combo.setValue(null);
//                     Utility.topAlertMessage('WARNING', "Start Time should be less than End Time");

//                 } else {
//                     combo.setValue(null);
//                     Utility.topAlertMessage('WARNING', "End Time should be greater than start Time");
//                 }
//             } else {
//                 combo.setValue(null);
//                 Utility.topAlertMessage('WARNING', "End Time should be greater than  start Time");
//             }
//              this.ondurationfocus(this, null, eOpts);
//         } else {
//             //do nothing.
//         }
//     }catch(err){
//         Utility.showToast(Messages.MOM.STARTTIME, err);
//     }
//     },
//      /**
//      * The function onEndTimeSelect is responsible for selecting the end time and connection to the functionality of duration.
//      * @param {Ext.form.field.ComboBox} 'combo' which is the combobox of time. 
//      * @param { Ext.data.Model} 'record' which contains the selected value. 
//      * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener. 
//      */
//     onEndTimeSelect: function(combo, record, eOpts) {
//         try{
//         var endTime = record.data.disp,
//             endTimeValues = endTime.split("-"),
//             endTimeHours = parseInt(endTimeValues[0]),
//             endTimeMinutes = parseInt(endTimeValues[1]),
//             win = this.getView(),
//             durationVal = win.down('numberfield[name=duration]'),   
//             startTimeRef = win.viewModel.get('start_time'),
//             startTime, startTimeValues, startTimeHours, startTimeMinutes;
//         if (startTimeRef) {
//             if(Ext.isDate(startTimeRef)) {
//                 startTime = startTimeRef.getHours() + "-" + startTimeRef.getMinutes();
//             } else {
//                 startTime=startTimeRef;
//             }           
//             startTimeValues = startTime.split("-"),
//                 startTimeHours = parseInt(startTimeValues[0]),
//                 startTimeMinutes = parseInt(startTimeValues[1]);
//             if (startTimeHours < endTimeHours) {
//             } else if (startTimeHours == endTimeHours) {
//                 if (startTimeMinutes < endTimeMinutes) {

//                 } else if (startTimeMinutes == endTimeMinutes) {
//                     combo.setValue(null);
//                     Utility.topAlertMessage('WARNING', "Start Time should be less than  End Time");
//                 } else {
//                     combo.setValue(null);
//                     Utility.topAlertMessage('WARNING', "Start Time should be less than  End Time");
//                 }
//             } else {
//                 combo.setValue(null);
//                 Utility.topAlertMessage('WARNING', "Start Time should be greater than  End Time");
//             }
//              this.ondurationfocus(this, null, eOpts);
//         } else {
//             //do nothing.
//         }
//     }catch(err){
//         Utility.showToast(Messages.MOM.ENDTIME, err);
//     }
//     },
//     /**
//      * The function addTaskGrid is responsible for adding the additional task in the grid.
//      * @param {view} 'me' which contains the current view. 
//      * @param {Ext.event.Event} 'e' which is the event.  
//      * @param {object} 'eOpts' which holds the object of which event is fired.
//      */
//     addTaskGrid : function(btn, e, eOpts){
//         var me = this,
//         win = me.getView(),
//         grid = win.down('grid');
//         this.addTask(grid);
//     },
//     /**
//      * The function addTask is responsible for adding the task in the grid of momwindow.
//      * @param {grid} 'me' which contains the grid od window.  
//      */
//     addTask: function(me) {
//         try{
//         var grid = me,
//             gridStore = grid.getStore(),
//             record = {
//                 assigned_to: "",
//                 action_item: "",
//                 due_date: "",
//                 status: ""
//             },
//             gridLastRec = gridStore.last(),
//             gridFirstRec = gridStore.first();
            
//         if (!(Ext.isEmpty(gridLastRec.get('assigned_to'))|| Ext.isEmpty(gridLastRec.get('action_item')) ) &&
//             !(Ext.isEmpty(gridFirstRec.get('assigned_to')) || Ext.isEmpty(gridFirstRec.get('action_item')) )) {
//             gridStore.add(record);
//             //gridStore.sync();
//         } else {
//             Utility.toastReuseFn('t', 'Please enter all the action items');
//         }
//     }catch(err){
//         Utility.showToast(Messages.MOM.ADDTASK, err);
//     }
//     },
//    /**
//     * The function ondurationfocus is responsible for calculating the duration time from the start hours and the end hours.
//     * @param {view} 'me' which contains the current view. 
//     * @param {Ext.event.Event} 'e' which is the event.  
//     * @param {object} 'eOpts' which holds the object of which event is fired. 
//     */
//     ondurationfocus:function(me, e, eOpts){
//         var win = this.getView(),
//             starttime = win.down('timefield[name=start_time]'),
//             endtime = win.down('timefield[name=end_time]'),
//             durationVal = win.down('numberfield[name=duration]'),  
//             startHour = starttime.getValue(),
//             endHour = endtime.getValue(),
//             durationHour;

//             if(startHour && endHour){
//               //calculating hour diff between two ist dates containing hours, 36e5 is scientific notation for 60*60*1000 converts millseconds to hours.
//               durationHour = Math.abs(endHour - startHour) / 36e5; 
//               durationVal.setValue(durationHour);
//             }else{
//               durationVal.setValue(null);
//             }
//     },
//     onKeyDownDate: function (dateField, e, eOpts) {
//         Utility.onDateField (dateField, e, eOpts);
//     }
// });