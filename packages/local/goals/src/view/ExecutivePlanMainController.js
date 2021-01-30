/**
 * This is controller for view 'Goals.view.ExecutivePlanMain'.
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.executiveplanmaincontroller'
 */
Ext.define('Goals.view.ExecutivePlanMainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.executiveplanmaincontroller',
    onAddTaskClick: function (btn) {
        var grid = btn.up('grid'),
                store = grid.getStore(),
                record = {
                    description: '',
                    targetdate: '',
                    timerequired: '',
                    deletable: true
                },
        length = store.getCount(),
                deleteRec;

        store.each(function (rec) {
            deleteRec = rec;
            deleteRec.set('deletable', true);
        });
        store.add(record);
    },

    onTargetDateChange: function(field) {
        var dateValue, value, executivePlanView;
        dateValue = field.rawValue;
        executivePlanView = Ext.ComponentQuery.query('executiveplanview')[0];
        if (executivePlanView && dateValue) {
            executivePlanView.getViewModel().set('targetDate', field.getValue());
        }
    },

    onTodoDeleteClick: function(grid, rowIndex, colIndex) {
        var store = Ext.getStore('Goals.store.ExecutiveStore'),
            execview = Ext.ComponentQuery.query('executiveplanview')[0],
            execPlanViewModel = execview.getViewModel(),
            record = store.getAt(rowIndex),
            params;
        params = {
            taskIds: record.data.taskid
        };
        if (record && record.data.taskid) {
            Ext.Ajax.request({
                url: Api.URL.goaltask.DELETE,
                method: 'DELETE',
                params: params,
                success: function(resp, b) {
                    store.removeAt(rowIndex);
                    store.load({
                        params: {
                            goalId: execPlanViewModel.get('ddo_employeegoal_id')
                        }
                    });
                    var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
                        execPlanView = execPlan.lookupReference('executiveplanviewref'),
                        approvalBtnRef = execPlanView.down('[reference = execapprovalref]'),
                        // approvalBtnRef = execPlanView.lookupReference('execapprovalref'),
                        execPlanForm = execPlanView.down('[reference = executiveplanformRef]'),
                        // execPlanForm = execPlanView.lookupReference('executiveplanformRef'),
                        grid = execPlanForm.down('grid'),
                        str = grid.getStore();

                    if (str.getCount() <= 0) {
                        approvalBtnRef.setDisabled(true);
                    }

                    Ext.getBody().unmask();
                },
                failure: function(resp, b) {
                    Ext.getBody().unmask();
                }
            });

        } else {
            store.remove(record);
        }
    },

    onBackButtonClick: function () {
        Ext.getStore('Goals.store.goals.GoalsViewStore').load();
        this.getView().up().getLayout().setActiveItem(1);
    },
    
    onMeasurementSave: function (btn, e, eOpts) {
        var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
                execPlanHeader = execPlan.lookupReference('executiveplanheaderref'),
                execPlanView = execPlan.lookupReference('executiveplanviewref'),
                execPlanViewModel = execPlanView.getViewModel(),
                execPlanViewTabPanel = execPlanView.down('tabpanel'),
                goalidRef = execPlanView.down('hiddenfield'),
                goalnameRef = execPlanHeader.down('textfield[name=goalname]'),
                measuremntCriteriaRef = execPlanView.down('container[name=measurementCriteria]'),
                measurementCriteriaCmntRef = execPlanView.down('textarea[reference=commentsref]'),
                targetDtRef = execPlanHeader.down('datefield[name=targetDate]'),
                parentComboRef = execPlanHeader.down('combo[reference=parentgoalref]'),
                combovalue = parentComboRef.getValue(),
                targetDt = targetDtRef.getValue(),
                targetDtVal = Ext.Date.format(targetDt, 'Y-m-d'),
                // goaldetailstore = Ext.getStore('Goals.store.GoalsNotesStore'),
                goaldetailstore = execPlan.down('[reference = notegrid]').getStore(),
                goalStore = Ext.getStore('Goals.store.goals.GoalsViewStore'),
                measuremntCriteria = measuremntCriteriaRef.getValue(),
                goalname = goalnameRef.getValue(),
                goalid = execPlanViewModel.get('ddo_employeegoal_id'),
                data = [],
                cmmntValue = measurementCriteriaCmntRef.getValue();
        goalStore.each(function (rec) {
            data = rec.data.isManager;
        });
        
        if (btn.text == "Move To Drafts") {
            statusId = 6 //ReOpen Status.
            this.onMovetoDraftTxt(btn, goaldetailstore, statusId, goalid, cmmntValue);
        } else {
            if (Ext.isEmpty(targetDt)) {
                Ext.Msg.alert('Warning', 'Please fill target date');
                return false;
            }
            if (Ext.isEmpty(measuremntCriteria)) {
                Ext.Msg.alert('Warning', 'Please fill measurement criteria');
                return false;
            }
            if (Ext.isEmpty(goalname)) {
                Ext.Msg.alert('Warning', 'Please fill goal name');
                return false;
            }

            params = {
                parentGoalId: combovalue,
                goalname: goalname,
                targetDate: targetDtVal,
                measurementCriteria: measuremntCriteria
            };

            if (execPlanViewModel.get('ddo_employeegoal_id')) {
                params.empGoalId = execPlanViewModel.get('ddo_employeegoal_id');
                Ext.Ajax.request({
                    url: Api.URL.goal.UPDATE,
                    method: 'PUT',
                    params: params,
                    scope: this,
                    success: function (resp, b) {
                        execPlanViewModel.set('tab2', false);
                        execPlanViewModel.set('apprvedisabled',true);
                        Ext.defer(function () {
                            execPlanViewTabPanel.setActiveTab(1);
                        }, 500);
                        goalStore.load();

                    },
                    failure: function (resp, b) {
                    }
                });
            } else {
                Ext.Ajax.request({
                    url: Api.URL.goal.CREATE,
                    method: 'POST',
                    params: params,
                    scope: this,
                    success: function (resp, b) {
                        var response = Ext.decode(resp.responseText);
                        execPlanViewModel.set('ddo_employeegoal_id', response.ddo_employeegoal_id);
                        execPlanViewModel.set('ddo_employeegoal_userid', response.ddo_employee_id);
                        execPlanViewModel.set('tab2', false);
                        Ext.defer(function () {
                            execPlanViewTabPanel.setActiveTab(1);
                        }, 500);
                        goalStore.load();

                    },
                    failure: function (resp, b) {
                    }
                });
            }
        }
    },
    
    onMovetoDraftTxt: function (btn, goaldetailstore, statusId, goalid, cmmntValue) {
        if (Ext.isEmpty(cmmntValue)) {
            Ext.Msg.alert('Warning', 'Please fill comments');
            return false;
        }
        var execPlan = Ext.ComponentQuery.query('executiveplanview')[0],
                execPlanMain = Ext.ComponentQuery.query('executiveplanmainview')[0],
                execvm = execPlan.getViewModel(),
                execmainvm = execPlanMain.getViewModel(),
                params = {
                    goalId: goalid,
                    statusId: statusId,
                    noteDetails: cmmntValue
                };

        Ext.Ajax.request({
            url: '/goalstatus',
            method: 'PUT',
            params: params,
            scope: this,
            success: function (resp, b) {
                execmainvm.set('goalStatus', "Re-Open");
                execmainvm.set('goalStatusIconCls', "draft-icon-cls");
                execvm.set('visibilityMode', true);
                execvm.set('BtnvisibilityMode', true);
                execvm.set('isUpdateNeed', true);
                execvm.set('dneBtn', true);
                Ext.Msg.alert('Success', 'Goal is re-opened');
                goaldetailstore.load({
                    params: {
                        goalid: goalid
                    }
                });
            },
            failure: function (resp, b) {
            }
        });
    },
    
    onExecutivePlanSave: function (btn, e, eOpts) {
        var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
                execPlanHeader = execPlan.lookupReference('executiveplanheaderref'),
                execPlanView = execPlan.lookupReference('executiveplanviewref'),
                // approvalBtnRef = execPlanView.lookupReference('execapprovalref'),
                approvalBtnRef = execPlanView.down('[reference = execapprovalref]'),
                parentComboRef = execPlanHeader.down('combo[reference=parentgoalref]'),
                execPlanViewModel = execPlanView.getViewModel(),
                combovalue = parentComboRef.getValue(),
                execPlanForm = execPlanView.down('[reference = executiveplanformRef]'),
                // execPlanForm = execPlanView.lookupReference('executiveplanformRef'),
                grid = execPlanForm.down('grid'),
                stre = grid.getStore(),
                // goaldetailstore = Ext.getStore('Goals.store.GoalsNotesStore'),
                goaldetailstore = execPlan.down('[reference = notegrid]').getStore(),
                goalStore = Ext.getStore('Goals.store.goals.GoalsViewStore'),
                //execplanheaderRefs
                targetDtRef = execPlanHeader.down('datefield[name=targetDate]'),
                targetDt = targetDtRef.getValue(),
                targetDtVal = Ext.Date.format(targetDt, 'Y-m-d'),
                goalnameRef = execPlanHeader.down('textfield[name=goalname]'),
                goalname = goalnameRef.getValue(),
                goalid = execPlanViewModel.get('ddo_employeegoal_id'),
                goalnameRef = execPlanHeader.down('textfield[name=goalname]'),
                goalname = goalnameRef.getValue(),
                measuremntCriteriaRef = execPlanView.down('container[name=measurementCriteria]'),
                measurementCriteriaCmntRef = execPlanView.down('textarea[reference=commentsref]'),
                measuremntCriteria = measuremntCriteriaRef.getValue(),
                goalDetailStre = Ext.getStore('Goals.store.ExecutiveStore'),
                cmmntValue = measurementCriteriaCmntRef.getValue(),
                targetDtRef = execPlanHeader.down('datefield[name=targetDate]'),
                targetDt = targetDtRef.getValue(),
                targetDtVal = Ext.Date.format(targetDt, 'Y-m-d'),
                gridData, taskDataArray = [];  
        if (btn.text == "Move To Drafts") {
            statusId = 6 //ReOpen Status.
            this.onMovetoDraftTxt(btn, goaldetailstore, statusId, goalid, cmmntValue);
        } else {
            if (Ext.isEmpty(goalname)) {
                Ext.Msg.alert('Warning', 'Please fill goal name');
                return false;
            }else if (stre.getCount() > 0) {
                gridData = stre.data.items;
                gridData.forEach(function (rec) {
                    if (!Ext.isEmpty(rec.get('timerequired')) && !Ext.isEmpty(rec.get('description')) && !Ext.isEmpty(rec.get('targetdate'))) {
                        taskItems = {
                            name: rec.get('description'),
                            targetDate: Ext.Date.format((rec.get('date')),'Y-m-d')|| Ext.Date.format((rec.get('targetdate')),'Y-m-d'),
                            duration: rec.get('timerequired'),
                            goalId: goalid,
                            taskId: rec.get('taskid')
                        };
                        taskDataArray.push(taskItems);
                    }
                });

                       
                if (taskDataArray.length > 0) {
                    Ext.Ajax.request({
                        url: Api.URL.goaltask.CREATE,
                        method: 'POST',
                        params: {
                            goalTask: Ext.encode(taskDataArray),
                            empGoalId: goalid,
                            goalname: goalname,
                            parentGoalId: combovalue,
                            targetDate: targetDtVal
                        },
                        success: function (resp, b) {
                            Ext.Msg.alert('Status', 'Your execution plans saved successfully');
                            approvalBtnRef.setDisabled(false);
                            goalDetailStre.load({
                                params: {
                                    goalId: execPlanViewModel.get('ddo_employeegoal_id')
                                }
                            });

                            goalStore.reload();
                        },
                        failure: function (resp, b) {
                            
                        }
                    });
                } else {
                    Ext.Msg.alert('Alert', 'Please enter all mandatory fields');
                }
            } else {
                Ext.Msg.alert('Alert', 'Please add task');
            }
        }
    },
    
    onShareUpdate: function (btn, e, eOpts) {
        var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
                execPlanHeader = execPlan.lookupReference('executiveplanheaderref'),
                execPlanView = execPlan.lookupReference('executiveplanviewref'),
                execPlanViewModel = execPlanView.getViewModel(),
                goalid = execPlanViewModel.get('ddo_employeegoal_id'),
                //execplanheaderRefs
                targetDtRef = execPlanHeader.down('datefield[name=targetDate]'),
                targetDt = targetDtRef.getValue(),
                targetDtVal = Ext.Date.format(targetDt, 'Y-m-d'),
                goalnameRef = execPlanHeader.down('textfield[name=goalname]'),
                goalname = goalnameRef.getValue(),
                parentComboRef = execPlanHeader.down('combo[reference=parentgoalref]'),
                combovalue = parentComboRef.getValue(),
                sharegoalview = Ext.ComponentQuery.query('sharegoalsform')[0],
                tagsView = sharegoalview.down('tagfield[reference=tagscomboview]'),
                tagsStore = tagsView.getStore(),
                tagData = tagsView.getValueRecords(),
                tagsDataArray = [];

        if ( !Ext.isEmpty(Utility.goalsharetaggedList) || tagData.length > 0) {
            
            if (tagData.length > 0) {
                tagData.forEach(function(rec) {
                    tagIds = {
                        employeeId: rec.data.empid,
                        goalId: goalid
                    };
                    tagsDataArray.push(tagIds);
                });
            }
            
            Ext.Ajax.request({
                url: '/sharegoal',
                method: 'POST',
                params: {
                    empGoalId: goalid,
                    goalname: goalname,
                    parentGoalId: combovalue,
                    targetDate: targetDtVal,
                    shareData: Ext.encode(tagsDataArray) || Ext.encode(Utility.goalsharetaggedList)
                },
                success: function (resp, b) {
                     if (tagData.length > 0) {
                        Ext.Msg.alert('Success', 'Goal shared to selected members');
                        Ext.getStore('Goals.store.goals.GoalsParentComboStore').load();
                        Utility.goalsharetaggedList.push(tagData);
                     }else{
                        Ext.Msg.alert('Success', 'Successfully Goal share updated');
                        Ext.getStore('Goals.store.goals.GoalsParentComboStore').load();
                        Utility.goalsharetaggedList = [];
                    }
                },
                failure: function (resp, b) {

                }
            });
        }else{
             Ext.Msg.alert('Warning', 'Please select employee to share.');
        }
    },
    
    onAddNewClick: function (btn, e, eOpts) {
        var noteWindow = Ext.ComponentQuery.query('goalsnotewindow')[0] || Ext.create('Goals.view.goals.GoalsNoteWindow'),
                form = noteWindow.down('form');

        form.reset();

        noteWindow.show();
    },
    
    calculateKarma: function (val) {
        var valueSuberb = this.getView().down('numberfield[reference=valuesuperb]');
        var valueGood = this.getView().down('numberfield[reference=valuegood]');
        var mainViewModel = Ext.ComponentQuery.query('executiveplanview')[0].getViewModel();
        var valueAmazing = val.value;
        mainViewModel.set('selectedKarmapoints', valueAmazing);
        var approveButton = this.getView().down('button[text=Approve]');
        valueSuberb.setValue(valueAmazing * 2 / 3);
        valueGood.setValue(valueAmazing * 1 / 3);

        approveButton.enable();
        if (val.value == null || 0) {
            approveButton.disable();
        }
    },
    
    onApproveBtnClick: function (btn, e) {
        var statusId, goalId,
                viewModel, view,
                viewRef,
                ratingText, karmaPoints;

        var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
                execPlanView = Ext.ComponentQuery.query('executiveplanview')[0],
                execPlanViewTabPanel = execPlanView.down('tabpanel'),
                ratingRef = execPlanViewTabPanel.down('container[reference=ratingref]'),
                DneBtnRef = ratingRef.down('button[reference=dnebtnref]');

        statusId = btn.statusId;

        view = this.getView();

        viewRef = view.getReferences();

        viewModel = this.getViewModel();

        goalId = viewModel.get('ddo_employeegoal_id');

       ratingText = viewModel.get('seletcedRatingText');
        karmaPoints = viewModel.get('selectedKarmapoints');
        if (ratingText == null || ratingText == "") {
            ratingText = viewRef.activeRatingText.config.html;
             }

        if (karmaPoints) {
            Ext.Ajax.request({
                url: '/goalstatus',
                method: 'PUT',
                params: {
                    goalId: goalId,
                    statusId: statusId,
                    ratingText: ratingText,
                    karmaPoints: karmaPoints
                },
                success: function (response, eOpts) {
                    Ext.Msg.alert('Success', ' Successfully Goal approved');
                    execPlan.getViewModel().set('goalStatus', "In Progress");
                    execPlan.getViewModel().set('goalStatusIconCls', "in-progress-icon-cls");
                    execPlan.getViewModel().set('isUpdateNeed', true);
                    execPlan.getViewModel().set('dneBtn', false);
                    execPlanView.getViewModel().set('BtnvisibilityMode', true);
                    execPlanView.getViewModel().set('visibilityMode', true);

                },
                failure: function (response, eOpts) {
                    var msg = Ext.decode(response.responseText).message;
                    Ext.Msg.alert('Error!', msg);
                }
            });
        } else {
            Ext.Msg.alert('Error!', 'Please fill the karma points');
        }
    },
    
    onDraftsBtnClick: function (btn, e) {
        var statusId, goalId,
                viewModel = this.getViewModel(),
                goalStore = Ext.getStore('Goals.store.goals.GoalsViewStore'),
                // goaldetailstore = Ext.getStore('Goals.store.GoalsNotesStore'),
                execPlan = Ext.ComponentQuery.query('executiveplanview')[0],
                execmainPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
                goaldetailstore = execmainPlan.down('[reference = notegrid]').getStore(),
                execmainvm = execmainPlan.getViewModel(),
                execvm = execPlan.getViewModel(),
                measurementCriteriaCmntRef = execPlan.down('textarea[reference=commentsref]'),
                cmmntValue = measurementCriteriaCmntRef.getValue();
        statusId = btn.statusId;

        goalId = viewModel.get('ddo_employeegoal_id');

        if (Ext.isEmpty(cmmntValue)) {
            Ext.Msg.alert('Warning', 'Please fill comments');
            return false;
        }

        Ext.Ajax.request({
            url: '/goalstatus',
            method: 'PUT',
            params: {
                goalId: goalId,
                statusId: statusId,
                noteDetails: cmmntValue
            },
            success: function (response, eOpts) {
                execmainvm.set('goalStatus', "Re-Open");
                execmainvm.set('goalStatusIconCls', "draft-icon-cls");
                execvm.set('visibilityMode', true);
                execvm.set('BtnvisibilityMode', true);
                execvm.set('isUpdateNeed', true);
                execvm.set('dneBtn', true);
                Ext.Msg.alert('Success', 'Goal is re-Opened');
                goaldetailstore.load({
                    params: {
                        goalid: goalId
                    }
                });
            },
            failure: function (response, eOpts) {
                Ext.Msg.alert('Error!', 'Failed to update the goal status!');
            }
        });
    },
    
    onCompleteBtnClick: function (btn, e) {
        var statusId, goalId,
                viewModel, selfComment, ratingText, karmapoints;
        statusId = btn.statusId;

        viewModel = this.getViewModel();

        goalId = viewModel.get('ddo_employeegoal_id'),
                goalOwner = viewModel.get('ddo_employeegoal_userid'),
                //karmapoints = viewModel.get('empkarmaPoints'),
                ratingText = viewModel.get('seletcedRatingText'),
                isManager = viewModel.get('isManager'),
                loginStoreData = Ext.getStore('login').getData(),
                loginData = loginStoreData.items[0].data;
        if (loginData.ddo_employee_id != goalOwner) {
            isManager = false;
        }

        var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
                execPlanView = execPlan.lookupReference('executiveplanviewref'),
                cmmntRef = execPlanView.down('textarea[reference = commentsratingref]'),
                goalStore = Ext.getStore('Goals.store.goals.GoalsViewStore'),
                radiogrpRef = execPlanView.down('radiogroup'),
                radiogrp = radiogrpRef.getValue(),
                radiogrpVal = radiogrp.rb,
                cmmntValue = cmmntRef.getValue();
        if (btn.text == "Done") {
            statusId = 5 //Achieved Status.
            karmapoints = viewModel.get('selectedKarmapoints');
            if (loginData.ddo_employee_id != goalOwner) {
                if (karmapoints != null && ratingText != null) {

                } else {
                    Ext.Msg.alert('Warning', 'Please Select Karma');
                    return false;
                }
            }
            this.onAchievedStatus(btn, goalOwner, karmapoints, goalStore, statusId, goalId, cmmntValue, radiogrp, isManager, ratingText);

        } else {
            if (Ext.isEmpty(cmmntValue)) {
                Ext.Msg.alert('Warning', 'Please fill comments');
                return false;
            }

            Ext.Ajax.request({
                url: '/goalstatus',
                method: 'PUT',
                params: {
                    goalId: goalId,
                    statusId: statusId,
                    selfComment: cmmntValue
                },
                success: function (response, eOpts) {
                    execPlan.getViewModel().set('goalStatus', "Completed");
                    execPlan.getViewModel().set('goalStatusIconCls', "completed-icon-cls");
                    execPlanView.getViewModel().set('isdoneBtnEnable', true);
                    execPlanView.getViewModel().set('EmpVisibilityMode', true);
                    execPlanView.getViewModel().set('dneBtn', true);
                    execPlan.getViewModel().set('goalFieldReadyOnly', true);
                    execPlanView.getViewModel().set('editorOrGridDisable', true);
                    execPlanView.getViewModel().set('GridDisable', true);
                    Ext.Msg.alert('Success', 'Successfully Goal completed');
                },
                failure: function (response, eOpts) {
                    Ext.Msg.alert('Error', 'Failed to update the goal status!');
                }
            });
        }
    },
    
    onAchievedStatus: function (btn, goalOwner, karmapoints, goalStore, statusId, goalid, cmmntValue, radiogrp, isManager, ratingText) {
        if (Ext.isEmpty(cmmntValue)) {
            Ext.Msg.alert('Warning', 'Please fill comments');
            return false;
        }
        var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
                execvm = execPlan.getViewModel(),
                execPlanViewModel = Ext.ComponentQuery.query('executiveplanview')[0].getViewModel(),
                params,
                goaldetailstore = execPlan.down('[reference = notegrid]').getStore(),
                // goaldetailstore = Ext.getStore('Goals.store.GoalsNotesStore'),
                loginData = Ext.getStore('login').getAt(0),
                managerComment, cancelReason;
        if (radiogrp) {
            if (radiogrp.rb == 2) {
                var managerComment = cmmntValue;
                statusId = 5;
            } else if (radiogrp.rb == 1) {
                var cancelReason = cmmntValue;
                statusId = 7;
            }
        }
        
        params = {
            goalId: goalid,
            statusId: statusId,
            managerComment: managerComment,
            cancelReason: cancelReason,
            ratingText: ratingText,
            karmaPoints: karmapoints,
            noteDetails: cmmntValue,
            goalOwner: goalOwner,
            ismanager: isManager
        };
        
        Ext.Ajax.request({
            url: '/goalstatus',
            method: 'PUT',
            params: params,
            scope: this,
            success: function (resp, b) {
                if (!Ext.isEmpty(cancelReason)) {
                    execvm.set('goalStatus', "Cancel");
                    execvm.set('goalStatusIconCls', "achieved-icon-cls");
                    Ext.Msg.alert('Status', 'Goal cancelled');
                } else if (!Ext.isEmpty(managerComment)) {
                    execvm.set('goalStatus', "Achieved");
                    execvm.set('goalStatusIconCls', "achieved-icon-cls");
                    Ext.Msg.alert('Success', 'Successfully Goal achieved');
                }

                goalStore.load();
                goaldetailstore.load({
                    params: {
                        goalid: goalid
                    }
                });
                execPlan.getViewModel().set('goalFieldReadyOnly', true);
                execPlanViewModel.set('editorOrGridDisable', true);
                execPlanViewModel.set('GridDisable', true);
                execPlanViewModel.set('isUpdateNeed', true);
                execPlanViewModel.set('dneBtn', true);
                execPlanViewModel.set('MngrVisibilityMode', true);
                execPlanViewModel.set('EmpVisibilityMode', true);
                execPlanViewModel.set('BtnvisibilityMode', true);
            },
            failure: function (resp, b) {
                var responseTextData = Ext.decode(resp.responseText),
                        errorMsg = responseTextData.message;
                Ext.Msg.alert('Failed', errorMsg);
            }
        });
    },
    
    onExecutivePlanApproval: function (btn, e) {
        var statusId, goalId,
                viewModel, selfComment, Pending,
                execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
                execPlanHeader = execPlan.lookupReference('executiveplanheaderref'),
                execPlanView = Ext.ComponentQuery.query('executiveplanview')[0],
                executiveplanform = Ext.ComponentQuery.query('executiveplanform')[0],
                execgrid = executiveplanform.down('grid'),
                addnewtaskref = executiveplanform.down('button[text=Add New Task]'),
                execstore;

        statusId = 2;
        Pending = Pending;

        //execheaderrefs
        goalnameRef = execPlanHeader.down('textfield[name=goalname]'),
                targetDtRef = execPlanHeader.down('datefield[name=targetDate]'),
                parentComboRef = execPlanHeader.down('combo[reference=parentgoalref]'),
                viewModel = this.getViewModel();
        execvm = execPlan.getViewModel();
        execstore = Ext.getStore('Goals.store.ExecutiveStore');

        goalId = viewModel.get('ddo_employeegoal_id');
        if (viewModel.get('isManager')) {
            statusId = 3;
        }

        Ext.Ajax.request({
            url: '/goalstatus',
            method: 'PUT',
            scope: this,
            params: {
                goalId: goalId,
                statusId: statusId,
                selfComment: 'Who am I?',
                ismanager: viewModel.get('isManager')

            },
            success: function (response, eOpts) {

                var reportingTo = Ext.decode(response.responseText).reportingto;
                if (viewModel.get('isManager')) {
                    var empComboStore = Ext.getStore('karmasetup.wallet.EmployeeComboStore');
                        empComboStore.load();
                    Ext.Msg.alert('Success', 'Successfully Goal approved');
                    execPlan.getViewModel().set('goalStatus', "In Progress");
                    execPlan.getViewModel().set('goalStatusIconCls', "in-progress-icon-cls");
                    execPlanView.getViewModel().set('tab3', false);
                    execPlanView.getViewModel().set('tab4', false);
                    execPlanView.getViewModel().set('GridDisable', false);
                    execPlanView.getViewModel().set('isUpdateNeed', true);
                    execPlanView.getViewModel().set('dneBtn', false);
                    execPlanView.getViewModel().set('isdoneBtnEnable', true);
                    execPlanView.getViewModel().set('EmpVisibilityMode', false);
                    execPlanView.getViewModel().set('MngrVisibilityMode', false);
                    execPlanView.getViewModel().set('istodoDelete', true);
                    execPlanView.getViewModel().set('doneText', "Done");
                    Ext.getStore('widget.todo.TodoStore').load();

                } else {
                    if(reportingTo){
                        Ext.Msg.alert('Success', 'Goal sent for manager approval'); 
                    } else {
                        Ext.Msg.alert('Success', 'Your role and reporting-to is not set, please contact Admin');
                    }                    
                    execvm.set('goalStatus', "Pending");
                    execvm.set('goalStatusIconCls', "pending-icon-cls");
                    execPlanView.getViewModel().set('GridDisable', true);
                }
                    btn.setDisabled(true);
                    execPlanView.getViewModel().set('apprvedisabled',true);
                    execPlanView.getViewModel().set('BtnvisibilityMode', true);
                    execvm.set('goalFieldReadyOnly', true);
                    execPlanView.getViewModel().set('editorOrGridDisable', true);
                    execPlanView.getViewModel().set('addTaskDisable', true);

                    execstore.each(function (rec) {
                        rec.set('deletable', false);
                    });

            },
            failure: function (response, eOpts) {
                Ext.Msg.alert('Error!', 'Failed to update the goal status!');
            }
        });
    },
    
    oncheckchange: function (me, rowIndex, checked, record, e, eOpts) {
        var store = me.up('grid').getStore(),
                storeRecord = store.getAt(rowIndex),
                viewModel = this.getViewModel(),
                goalId = viewModel.get('ddo_employeegoal_id'),
                params;

        params = {
            taskId: storeRecord.data.taskid,
            iscompleted: (storeRecord.data.taskcompleted == true) ? 'Y' : 'N',
            empGoalId: goalId
        };

        Ext.Ajax.request({
            url: '/goaltask/completetask',
            method: 'PUT',
            scope: this,
            params: params,
            success: function (resp, b) {

                var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
                        execPlanView = Ext.ComponentQuery.query('executiveplanview')[0],
                        execPlanHeader = execPlan.lookupReference('executiveplanheaderref'),
                        taskcompletedcount = 0,
                        totoltaskhourscount = 0;

                store.each(function (rec) {
                    if (rec.data.taskcompleted) {
                        taskcompletedcount = taskcompletedcount + rec.data.timerequired;
                    }
                    totoltaskhourscount = totoltaskhourscount + rec.data.timerequired;
                })
                var taskcompletedpercent = (taskcompletedcount / totoltaskhourscount);

                var progressBar = execPlanHeader.down('progressbar');
                var progressPercentage = execPlanHeader.down('label');
                progressBar.setValue(taskcompletedpercent);
                progressPercentage.setHtml(Math.round((taskcompletedpercent * 100), 2) + '%');
                Ext.getBody().unmask();
                if (taskcompletedpercent == 1) {
                    execPlanView.getViewModel().set('isdoneBtnEnable', false);
                } else {
                    execPlanView.getViewModel().set('isdoneBtnEnable', true);
                }
            },
            failure: function (resp, b) {
                Ext.getBody().unmask();

            }
        });
    },
    
    setProgressBarValue: function () {
        var executiveHeaderContainer = this.getView().down('executiveplanheader');
        var progressBarValue = executiveHeaderContainer.down('progressbar').value;
        var progressPercentage = executiveHeaderContainer.down('label');

        if (!progressBarValue) {
            progressBarValue = 0;
        }

        progressPercentage.setHtml(Math.round((progressBarValue * 100), 2) + '%');
    },
    
    onGoalsIconRender: function (c) {
        var me = this;
        c.getEl().on({
            click: Ext.bind(me.onGoalsIconClick, me, [c])
        });
    },
    
    onGoalsIconClick: function (cmp) {
        var mainViewModel = Ext.ComponentQuery.query('executiveplanview')[0].getViewModel(),
                selectedKarmaPoints = cmp.up('container').down('numberfield').getValue();

        if (mainViewModel.get('ratingIconsEnable')) {
            mainViewModel.set('selectedKarmapoints', selectedKarmaPoints);
            mainViewModel.set('seletcedRatingText', cmp.value);
            if (cmp.value == "Amazing") {
                mainViewModel.set('amziconDisabled', false);
                mainViewModel.set('supiconDisabled', true);
                mainViewModel.set('goodiconDisabled', true);
            }
            if (cmp.value == "Superb") {
                mainViewModel.set('amziconDisabled', true);
                mainViewModel.set('supiconDisabled', false);
                mainViewModel.set('goodiconDisabled', true);
            }
            if (cmp.value == "Good") {
                mainViewModel.set('amziconDisabled', true);
                mainViewModel.set('supiconDisabled', true);
                mainViewModel.set('goodiconDisabled', false);
            }
        }
    },

    onradiochange:function(radiogrp, newVal, oldVal, eOpts){

       var execPlanView = Ext.ComponentQuery.query('executiveplanview')[0],
           execPlanViewModel = execPlanView.getViewModel();
        var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
            execPlanHeader = execPlan.lookupReference('executiveplanheaderref');

        if(newVal.rb == 1){
            execPlanViewModel.set('isdoneBtnEnable', false);
        }else if(newVal.rb == 2){
               var execGrid = Ext.getStore( 'Goals.store.ExecutiveStore'),
                   executivePlanGridData = execGrid.getData();

                var taskcompletedcount = 0,
                    totoltaskhourscount = 0;

              for (var i = 0; i < executivePlanGridData.length; i++) {
                  
                    if (executivePlanGridData.items[i].data.taskcompleted) {
                        taskcompletedcount = taskcompletedcount + executivePlanGridData.items[i].data.timerequired;
                    }
                    totoltaskhourscount = totoltaskhourscount + executivePlanGridData.items[i].data.timerequired;
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
        }

    }
});