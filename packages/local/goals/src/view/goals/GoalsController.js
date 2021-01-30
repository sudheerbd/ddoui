Ext.define('Goals.view.goals.GoalsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.goalscontroller',

    onGoalClick: function(view, record, item, idx, evt, opts) {
        var me = this,
            targetDom = evt.getTarget(),
            targetEl = Ext.get(targetDom),
            menu;
        if (targetEl.hasCls("create-goal-cls") 
                   || targetEl.getParent().hasCls("create-goal-plus-icon")
                   || targetEl.hasCls("create-goal-text")) {
            this.onGoalWindowView(view, record, item, idx, evt, opts);

        } else if (targetEl.hasCls("goal-status-cls") 
                    || targetEl.getParent().hasCls("goals-dashboard-cls") || targetEl.hasCls("goals-dashboard-cls")
                    || targetEl.getParent().hasCls("goals-header-cls")
                    || targetEl.getParent().hasCls("goals-title-cls")
                    || targetEl.getParent().hasCls("goals-karmascore-cls")
                    || targetEl.getParent().hasCls("goals-user-name")
                    || targetEl.getParent().hasCls("goals-target-date-cls")
                    || targetEl.hasCls("goals-status-icon") || targetEl.hasCls("goal-status-text")) {
            this.onGoalViewLoad(view, record, item, idx, evt, opts);
        }

    },

    onGoalWindowView: function(view, record, item, idx, evt, opts) {
        var goalsmainview = Ext.ComponentQuery.query('goalsmainview')[0],
            goalcard = goalsmainview.up().getLayout(),
            execPlanView = Ext.ComponentQuery.query('executiveplanview')[0],
            execPlanViewTabPanel = execPlanView.down('tabpanel');
        this.onClearingGoalsWindow();
        execPlanViewTabPanel.setActiveTab(0);
        goalcard.setActiveItem(0);
    },

    onGoalViewLoad: function(view, record, item, idx, evt, opts) {
        this.onClearingGoalsWindow();
        var goalsmainview = Ext.ComponentQuery.query('goalsmainview')[0],
            goalcard = goalsmainview.up().getLayout();

        var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
            shareGoalView = Ext.ComponentQuery.query('sharegoalsform')[0],
            execPlanHeader = execPlan.lookupReference('executiveplanheaderref'),
            execPlanView = execPlan.lookupReference('executiveplanviewref'),
            cmmntRef = execPlanView.down('textarea[reference = commentsratingref]'),
            execPlanViewTabPanel = execPlanView.down('tabpanel'),
            execPlanViewModel = execPlanView.getViewModel(),

            //loginEmployee id
            loginData = Ext.getStore('login').getData(),
            login_emp_id = loginData.items[0].data.ddo_employee_id,

            goalnameRef = execPlanHeader.down('textfield[name=goalname]'),
            parentComboRef = execPlanHeader.down('combo[reference=parentgoalref]'),
            measuremntCriteriaRef = execPlanView.down('container[name=measurementCriteria]'),
            measurementCriteriaCmntRef = execPlanView.down('textarea[reference=commentsref]'),
            targetDtRef = execPlanHeader.down('datefield[name=targetDate]'),
            managerView = record.data.isManager;

        execPlanViewModel.set('tab2', false);
        execPlanViewModel.set('ddo_employeegoal_id', record.data.goalid);
        execPlanViewModel.set('ddo_employeegoal_userid', record.data.goalUser.employeeId);
        execPlanViewModel.set('empkarmaPoints', record.data.karmapoints);
        execPlanViewModel.set('selectedKarmapoints', record.data.karmapoints);

        if (managerView) {
            if (record.data.goalUser.employeeId == login_emp_id) {
                execPlanViewModel.set('BtnText', 'Save');
                execPlanViewModel.set('approveText', 'Request Approval');
            } else {
                execPlanViewModel.set('BtnText', 'Move To Drafts');
                execPlanViewModel.set('approveText', 'Approve');
            }
        }

        //making comments null in rating
        cmmntRef.setValue(null);

        Ext.Ajax.request({
            url: '/goal/detail',
            method: 'GET',
            params: {
                goalId: record.data.goalid
            },
            success: function(resp, b) {
                console.log('resp', resp);

                var response = Ext.decode(resp.responseText),
                    notes = Ext.ComponentQuery.query('notes')[0],
                    notesGrid = notes.down('grid'),
                    notesData = response.data.notes,
                    notesGridStre = notesGrid.getStore(),
                    executiveplanformRef = execPlanView.down('[reference = executiveplanformRef]'),
                    // executiveplanformRef = execPlanView.lookupReference('executiveplanformRef'),
                    addnewtaskref = executiveplanformRef.down('button[text=Add New Task]'),
                    execGrid = executiveplanformRef.down('grid'),
                    executivegridstre = execGrid.getStore(),
                    executivePlanGridData = response.data.executionPlanData,
                    targetDt;

                var managerratingform = execPlanViewTabPanel.down('managerratingform'),
                    goalKarmaPointsfield = managerratingform.down('numberfield[reference=goalKarmaPoints]'),
                    valueSuberb = managerratingform.down('numberfield[reference=valuesuperb]'),
                    valueGood = managerratingform.down('numberfield[reference=valuegood]');
                goalKarmaPointsfield.setValue(null);
                valueSuberb.setValue(null);
                valueGood.setValue(null);

                var ratingRef = execPlanViewTabPanel.down('container[reference=ratingref]'),
                    DneBtnRef = ratingRef.down('button[reference=dnebtnref]'),
                    ratingcard = ratingRef.down().getLayout();

                ratingcard.setActiveItem(0);

                var clsName = response.data.goalstatusname.replace(/ /, '-').toLowerCase().trim().concat('-icon-cls');

                execPlan.getViewModel().set('goalStatus', response.data.goalstatusname);
                execPlan.getViewModel().set('goalStatusIconCls', clsName);

                goalnameRef.setValue(response.data.goaltitle);
                targetDt = response.data.targetdate;

                var parentComboStore = parentComboRef.getStore(),
                    parentComboRecord = parentComboStore.findRecord('goalid',response.data.parentgoalid);
                
                if(record.data.goalUser.employeeId == login_emp_id) {
                    if(parentComboRecord){
                      parentComboRef.setValue(response.data.parentgoalid);
                    }
                } else {
                    parentComboRef.setValue(response.data.parentgoalname);    
                }
                
                targetDtRef.setValue(Ext.Date.format(new Date(targetDt), 'Y-m-d'));
                measuremntCriteriaRef.setValue(response.data.measurementcriteria);
                var taskcompletedcount = 0,
                    totoltaskhourscount = 0,
                    taskcompletedpercent = 0;

                for (var i = 0; i < executivePlanGridData.length; i++) {
                    var obj = {
                        taskid: executivePlanGridData[i].taskid,
                        description: executivePlanGridData[i].description,
                        targetdate: executivePlanGridData[i].targetdate,
                        timerequired: executivePlanGridData[i].timerequired,
                        taskcompleted: executivePlanGridData[i].taskcompleted
                    };

                    executivegridstre.add(obj);
                    if (executivePlanGridData[i].taskcompleted) {
                        taskcompletedcount = taskcompletedcount + executivePlanGridData[i].timerequired;
                    }
                    totoltaskhourscount = totoltaskhourscount + executivePlanGridData[i].timerequired;
                }
                //progressbar start
                var len = executivePlanGridData.length;
                if (len > 0) {
                    var taskcompletedpercent = (taskcompletedcount / totoltaskhourscount);
                }

                var progressBar = execPlanHeader.down('progressbar');
                var progressPercentage = execPlanHeader.down('label');
                progressBar.setValue(taskcompletedpercent);
                progressPercentage.setHtml(Math.round((taskcompletedpercent * 100),2) + '%');

                if (taskcompletedpercent == 1) {
                    execPlanViewModel.set('isdoneBtnEnable', false);
                } else {
                    execPlanViewModel.set('isdoneBtnEnable', true);
                }

                for (var i = 0; i < notesData.length; i++) {
                    var notesobj = {
                        details: notesData[i].details,
                        ddo_goalnote_id: notesData[i].noteid,
                        notetype: notesData[i].type,
                        targetdate: new Date(notesData[i].notetargetdate)
                    };
                    notesGridStre.add(notesobj);
                }


                var taggedList = [],
                    tags = shareGoalView.down('tagfield');
                response.data.shareData.forEach(function(rec) {
                    var tagListData = rec.employeeid;

                    taggedList.push(tagListData);
                    Utility.goalsharetaggedList.push(tagListData);
                });

                var tagfieldStore = tags.getStore();
                tagfieldStore.clearFilter(true);
                tagfieldStore.load({
                    scope: this,
                    callback: function() {
                        tags.setValue(taggedList);
                        tagfieldStore.filterBy(function(rec) {
                            if (taggedList.indexOf(rec.data.employeeid) == -1) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                    }
                });

                if (response.data.goalstatusname == "Pending") {
                    execPlanViewModel.set('isUpdateNeed', true);
                    execPlan.getViewModel().set('goalFieldReadyOnly', true);
                    execPlanViewModel.set('BtnvisibilityMode', true);
                    execPlanViewModel.set('editorOrGridDisable', true);
                    execPlanViewModel.set('addTaskDisable', true); 
                    execPlanViewModel.set('GridDisable', true);
                    execPlanViewModel.set('isUpdateNeed', false);
                    execPlanViewModel.set('dneBtn', true);
                    notesGrid.setDisabled(true);
                    executivegridstre.each(function(rec) {
                        rec.set('deletable', false);
                    });
                    if (record.data.goalUser.employeeId != login_emp_id) {
                        execPlanViewModel.set('tab4', false);
                        execPlanViewModel.set('MngrVisibilityMode', true);
                        execPlanViewModel.set('EmpVisibilityMode', true);
                        execPlanViewModel.set('visibilityMode', false);
                        execPlanViewModel.set('BtnvisibilityMode', false);
                        execPlanViewModel.set('ratingIconsEnable', true);
                        execPlanViewModel.set('readOnlyKarmafield',false);
                        execPlanViewModel.set('amziconDisabled',false);
                        execPlanViewModel.set('supiconDisabled', true);
                        execPlanViewModel.set('goodiconDisabled', true);
                        measurementCriteriaCmntRef.setValue('');
                        cmmntRef.setValue('');
                    }

                } else if(response.data.goalstatusname == "Re-Open"){
                    execPlanViewModel.set('apprvedisabled', false);
                } else if (response.data.goalstatusname == "In Progress") {
                    execPlanViewModel.set('tab3', false);
                    execPlanViewModel.set('tab4', false);
                    execPlanViewModel.set('editorOrGridDisable', true);
                    execPlan.getViewModel().set('goalFieldReadyOnly', true);
                    execPlanViewModel.set('GridDisable', false);
                    execPlanViewModel.set('BtnvisibilityMode', true);
                    execPlanViewModel.set('addTaskDisable', true);
                    execPlanViewModel.set('doneText', "Complete");

                    //rating
                    execPlanViewModel.set('isUpdateNeed', true);
                    execPlanViewModel.set('dneBtn', false);
                    execPlanViewModel.set('istodoDelete', true);
                    cmmntRef.setEmptyText("Self Comments");
                    execPlanViewModel.set('EmpVisibilityMode', false);
                    execPlanViewModel.set('MngrVisibilityMode', true);



                    goalKarmaPointsfield.setValue(response.data.goalkarmapoints);
                    if (!Ext.isEmpty(response.data.goalkarmapoints)) {
                        var valueAmazing = response.data.goalkarmapoints;

                        valueSuberb.setValue(valueAmazing * 2 / 3);
                        valueGood.setValue(valueAmazing * 1 / 3);

                    }

                    if ((record.data.goalUser.employeeId != login_emp_id)) {
                        execPlanViewModel.set('dneBtn', true);
                        execPlanViewModel.set('GridDisable', true);
                        execPlanViewModel.set('tab4', false);
                        execPlanViewModel.set('tab3', true);
                        execPlanViewModel.set('EmpVisibilityMode', true);
                        execPlanViewModel.set('visibilityMode', true);
                        execPlanViewModel.set('BtnvisibilityMode', true);
                        notesGrid.setDisabled(true);
                    }else if(execPlanViewModel.get('isManager')){
                         //rating
                     execPlanViewModel.set('isUpdateNeed', true);
                     execPlanViewModel.set('dneBtn', false);
                     execPlanViewModel.set('EmpVisibilityMode', false);
                     execPlanViewModel.set('MngrVisibilityMode', false);
                     execPlanViewModel.set('doneText', "Done");

                    }

                    executivegridstre.each(function(rec) {
                        rec.set('deletable', false);
                    });


                } else if (response.data.goalstatusname == "Completed") {
                    execPlanViewModel.set('tab3', false);
                    execPlanViewModel.set('tab4', false);
                    var managerratingform = execPlanViewTabPanel.down('managerratingform'),
                        goalKarmaPointsfield = managerratingform.down('numberfield[reference=goalKarmaPoints]');
                    goalKarmaPointsfield.setValue(response.data.goalkarmapoints);

                    if (!Ext.isEmpty(response.data.goalkarmapoints)) {
                        var valueSuberb = managerratingform.down('numberfield[reference=valuesuperb]');
                        var valueGood = managerratingform.down('numberfield[reference=valuegood]');
                        var valueAmazing = response.data.goalkarmapoints;

                        valueSuberb.setValue(valueAmazing * 2 / 3);
                        valueGood.setValue(valueAmazing * 1 / 3);

                    }
                    if (valueAmazing) {
                            execPlanViewModel.set('amziconDisabled', true);
                            execPlanViewModel.set('supiconDisabled', true);
                            execPlanViewModel.set('goodiconDisabled', true);
                        }
                    executivegridstre.each(function(rec) {
                        rec.set('deletable', false);
                    });
                    execPlan.getViewModel().set('goalFieldReadyOnly', true);
                    execPlanViewModel.set('editorOrGridDisable', true);
                    execPlanViewModel.set('addTaskDisable', true); 
                    execPlanViewModel.set('GridDisable', true);
                    execPlanViewModel.set('isUpdateNeed', true);
                    execPlanViewModel.set('dneBtn', true);
                    execPlanViewModel.set('BtnvisibilityMode',true);
                    execPlanViewModel.set('EmpVisibilityMode', true);

                    //manager completed view.
                    if (record.data.goalUser.employeeId != login_emp_id) {
                        execPlanViewModel.set('tab3', true);
                        execPlan.getViewModel().set('goalFieldReadyOnly', true);
                        execPlanViewModel.set('editorOrGridDisable', true);
                        execPlanViewModel.set('GridDisable', true);
                        execPlanViewModel.set('isUpdateNeed', true);
                        execPlanViewModel.set('dneBtn', true);
                        execPlanViewModel.set('MngrVisibilityMode', false);
                        execPlanViewModel.set('EmpVisibilityMode', false);
                        execPlanViewModel.set('BtnvisibilityMode',true);
                        execPlanViewModel.set('isUpdateNeed', true);
                        execPlanViewModel.set('dneBtn', false);
                        execPlanViewModel.set('ratingIconsEnable', true);
                        execPlanViewModel.set('doneText', "Done");
                        cmmntRef.setValue('');
                    }
                } else if (response.data.goalstatusname == "Achieved") {
                    var ratingArr = response.data.rating;
                    execPlanViewModel.set('tab1', false);
                    execPlanViewModel.set('tab2', false);
                    execPlanViewModel.set('tab3', false);
                    execPlanViewModel.set('tab4', false);
                    execPlan.getViewModel().set('goalFieldReadyOnly', true);
                    execPlanViewModel.set('editorOrGridDisable', true);
                    execPlanViewModel.set('addTaskDisable', true);  
                    execPlanViewModel.set('GridDisable', true);
                    execPlanViewModel.set('isUpdateNeed', true);
                    execPlanViewModel.set('dneBtn', true);
                    execPlanViewModel.set('MngrVisibilityMode', true);
                    execPlanViewModel.set('EmpVisibilityMode', true);
                    execPlanViewModel.set('BtnvisibilityMode', true);
                    if(ratingArr.length>0){
                    execPlanViewModel.set('achievedKarmaPoints', ratingArr[0].earnedpoints);
                    execPlanViewModel.set('achievedratingText', ratingArr[0].ratingtext);
                    ratingRef.down('dataview[reference =selfcommentsref]').setData(ratingArr);
                        
                    }
                    var ratingdataview = ratingRef.down('ratingdetails').down('dataview');
                    ratingcard.setActiveItem(1);

                    if (execPlanViewModel.get('isManager')) {
                         execPlanViewModel.set('tab4', true);
                    }
                     executivegridstre.each(function(rec) {
                        rec.set('deletable', false);
                    });
                     if (record.data.goalUser.employeeId != login_emp_id) {
                        execPlanViewModel.set('tab3', true);
                    }
                    
                }else if (response.data.goalstatusname == "Cancel") {
                    var ratingArr = response.data.rating;
                    execPlanViewModel.set('tab1', false);
                    execPlanViewModel.set('tab2', false);
                    execPlanViewModel.set('tab3', true);
                    execPlanViewModel.set('tab4', false);
                    execPlanViewModel.set('shareReadOnly', true);
                    

                    execPlan.getViewModel().set('goalFieldReadyOnly', true);
                    execPlanViewModel.set('editorOrGridDisable', true);
                    execPlanViewModel.set('addTaskDisable', true); 
                    execPlanViewModel.set('GridDisable', true);
                    execPlanViewModel.set('isUpdateNeed', true);
                    execPlanViewModel.set('dneBtn', true);
                    execPlanViewModel.set('MngrVisibilityMode', true);
                    execPlanViewModel.set('EmpVisibilityMode', true);
                    execPlanViewModel.set('BtnvisibilityMode', true);
                    if(ratingArr.length>0){
                    execPlanViewModel.set('achievedKarmaPoints', ratingArr[0].earnedpoints);
                    execPlanViewModel.set('achievedratingText', ratingArr[0].ratingtext);
                    ratingRef.down('dataview[reference =selfcommentsref]').setData(ratingArr);
                        
                    }
                   /* var ratingdataview = ratingRef.down('ratingdetails').down('dataview');
                    ratingcard.setActiveItem(0);
                    */
                } else if (response.data.goalstatusname == "Draft") {
                    execPlan.getViewModel().set('goalFieldReadyOnly', true);
                    execPlanViewModel.set('editorOrGridDisable', false);
                    execPlanViewModel.set('GridDisable', false);
                    notesGrid.setDisabled(false);
                    executivegridstre.each(function(rec) {
                        rec.set('deletable', true);
                    });
                    execPlanViewModel.set('isUpdateNeed', false);
                    execPlanViewModel.set('istodoDelete', false);
                    execPlanViewModel.set('addTaskDisable', false);
                    execPlanViewModel.set('BtnText', 'Save');
                        
                    if (execPlanViewModel.get('isManager')) {
                        execPlanViewModel.set('approveText', 'Start');
                        execPlanViewModel.set('addTaskDisable', false);
                    }
                   
                }else {
                    execPlan.getViewModel().set('goalFieldReadyOnly', true);
                    execPlanViewModel.set('editorOrGridDisable', false);
                    execPlanViewModel.set('addTaskDisable', false);
                    execPlanViewModel.set('GridDisable', false);
                    notesGrid.setDisabled(false);
                    executivegridstre.each(function(rec) {
                        rec.set('deletable', true);
                    });
                    execPlanViewModel.set('isUpdateNeed', false);
                    execPlanViewModel.set('istodoDelete', false);
                    execPlanViewModel.set('BtnText', 'Save');
                }
                execPlanViewTabPanel.setActiveTab(0);
                goalcard.setActiveItem(0);
            },
            failure: function(resp, b) {

            }
        });
    },
    onClearingGoalsWindow: function() {
        var goalsmainview = Ext.ComponentQuery.query('goalsmainview')[0],
            goalcard = goalsmainview.up().getLayout(),
            loginStoreData = Ext.getStore('login').getData(),
            loginData = loginStoreData.items[0].data,
            execapprveBtn;

       // var goalsettingstore = Ext.getStore('settings.GoalSettings'),
            isManager = false;
             loginData.reportingto = (loginData.reportingto == 0) ? null : loginData.reportingto;
            if(Ext.isEmpty(loginData.reportingto)){
               isManager = true; 
            }else{
                isManager = false;
            }
       /*
        if (goalsettingstore && goalsettingstore.getCount()>0) {
            var goalsettingsroles = goalsettingstore.getData().items[0].data.roleids;
            if (!Ext.isEmpty(goalsettingsroles)) {

                loginData.roles.forEach(function(rec) {
                    if ((goalsettingsroles.split(",").indexOf(rec.roleid.toString()) != -1)) {
                        isManager = true;
                    }

                });
            }

        }*/
        Utility.goalsharetaggedList = [];

        var header = Ext.ComponentQuery.query('executiveplanheader')[0];
        var execPlanView = Ext.ComponentQuery.query('executiveplanview')[0],
            execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
            execPlanViewModel = execPlanView.getViewModel(),
            execvm = execPlan.getViewModel(),
            execPlanViewTabPanel = execPlanView.down('tabpanel');

        header.getForm().reset();
        var progressBar = header.down('progressbar');
        var progressPercentage = header.down('label');
        progressBar.setValue(.0);
        progressPercentage.setHtml('0%');

        execPlanViewTabPanel.down('htmleditor[name=measurementCriteria]').reset();
        execPlanViewTabPanel.down('executiveplanform').down('grid').getStore().removeAll();
        execPlanViewTabPanel.down('executiveplanform').down('grid');
        execPlanViewTabPanel.down('sharegoalsform').down('tagfield').reset();
        execPlanViewTabPanel.down('notes').down('grid').getStore().removeAll();

        execPlanViewModel.set('tab2', true);
        execPlanViewModel.set('tab3', true);
        execPlanViewModel.set('tab4', true);
        execPlanViewModel.set('tab5', false);

        execPlanViewModel.set('editorOrGridDisable', false);
        execPlanViewModel.set('addTaskDisable', false);
        execPlanViewModel.set('GridDisable', false);
        execPlanViewModel.set('visibilityMode', true);
        execPlanViewModel.set('BtnvisibilityMode', false);
        execPlanViewModel.set('istodoDelete', false);
        execPlanViewModel.set('apprvedisabled', true);
        execPlanViewModel.set('ratingIconsEnable', false);   
        execPlanViewModel.set('BtnText', 'Save');
        execPlanViewModel.set('ddo_employeegoal_id',null);
        execPlanViewModel.set('selectedKarmapoints',null);
        execPlanViewModel.set('readOnlyKarmafield',true);
        execPlanViewModel.set('amziconDisabled',true);
        execPlanViewModel.set('empkarmaPoints',null);
        execPlanViewModel.set('seletcedRatingText', null);
        execPlanViewModel.set('achievedKarmaPoints', null);
        execPlanViewModel.set('achievedratingText', "");
        execPlanViewModel.set('approveText', 'Request Approval');
        execPlanViewModel.set('isManager', false);
        execvm.set('goalFieldReadyOnly', false);
        execPlanViewModel.set('achievedkarma',null);

        if (isManager == true) {
            execPlanViewModel.set('approveText', 'Start');
            execPlanViewModel.set('isManager', true);
        }
        
        approvalBtn = execPlanView.down('button[reference = approveBtnRef]');
        execapprveBtn = execPlanView.down('button[reference = execapprovalref]');

        //observed for manager create goal request approval is not getting disabled after approval(IN INPROGRESS) of emp goal.
        if(!approvalBtn.isDisabled() || !execapprveBtn.isDisabled()){
            approvalBtn.setDisabled(true);
            execapprveBtn.setDisabled(true);
        }

        execvm.set('goalStatusIconCls', "draft-icon-cls");
        execvm.set('goalStatus', "Draft");


    }
});