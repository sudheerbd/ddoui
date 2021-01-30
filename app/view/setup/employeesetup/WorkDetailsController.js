/**
 * The file WorkDetailsController is the controller file of the work details form view.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.workdetailscontroller'.
 */
Ext.define('DDO.view.setup.employeesetup.WorkDetailsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workdetailscontroller',

    /**
     * This handler is responsible for saving work details form data.
     * @param {btn} Object, contain reference of click button.
     */
    onFormSaveClick: function (btn) {
        try {
            var form = btn.up('form'),
                formValues = form.getValues();
                if(form.isValid()){
            if (Ext.isEmpty(formValues.departmentname) && Ext.isEmpty(formValues.designationname) && Ext.isEmpty(formValues.empstatus) && Ext.isEmpty(formValues.pskill) && Ext.isEmpty(formValues.reportingto)) {
                //do nothing
            } else {
                this.processFormData(btn, form, formValues);
            }
        } else {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.INVALID);
        }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.SAVECLICK, err);
        }
    },
    /**
     * This handler is responsible for process save operation for work details form data.
     * @param {btn} Object, contain reference of click button.
     * @param {form} Object, contain reference of work details form.
     * @param {formValues} Object, contain values of work details form.
     */
    processFormData: function(btn, form, formValues){
    
        var empSetupWindow = btn.up('employeesetupwindow'),
            empEmail =  empSetupWindow.down('employeeform').down('[name = email]').getValue(),
            employeeSetupView = empSetupWindow.parentViewRef,
            emploueeSetupTabpanel = empSetupWindow.down('tabpanel'),
            viewModel = empSetupWindow.getViewModel(),
            employeeId = viewModel.get('ddo_employee_id'),
            store = employeeSetupView.down('employeesetupgrid').getStore(),
            emptab = employeeSetupView.up('employeetab'),
            emptabViewModel = emptab.getViewModel(),
            employeeGroupStore = emptabViewModel.get('empGroupStore'),
            greyHrErrMsg = 'GreytHR id should not be duplicate';
        var vc = this, vm = vc.getViewModel();
        var record = {};
        record = vc.prepareRecord(record, employeeId, formValues,empEmail);
        var objArgs = {};
        objArgs.btn = btn;
        objArgs.vc = vc;
        objArgs.vm = vm;
        objArgs.record = record;
        objArgs.form = form;
        objArgs.empSetupWindow = empSetupWindow;
        objArgs.emploueeSetupTabpanel = emploueeSetupTabpanel;
        objArgs.store = store;
        objArgs.employeeGroupStore = employeeGroupStore;
        objArgs.greyHrErrMsg = greyHrErrMsg;
        objArgs.record.isManagerChanged = false;
        if (Utility.currentReportingManager && Utility.currentReportingManager != formValues.reportingto && formValues.reportingto != '' && formValues.reportingto != null) {
            vm.set('valueResetted', true);
        } else {
            vc.reportingChange(objArgs);
        }
        valueResetted = vm.get('valueResetted');
        if (valueResetted) {
            objArgs.record.isManagerChanged =  true;
            vc.reportingChangeWindow(objArgs);
        }
    },
    /**
     * This handler is responsible for rendering reporting manager change window.
     * @param {objArgs} Object, Contains the references of viewModel, Records, forms and views.
     */
    reportingChangeWindow: function(objArgs){
        var win = Ext.ComponentQuery.query('reportmanagerchangewindow')[0] || Ext.create('DDO.view.setup.employeesetup.ReportManagerChangeWindow',{
            objArgs: objArgs
        });
        win.show();
    },
    /**
     * This handler is responsible for preparing record object from form data for further operations.
     * @param {record} Object, Empty Object
     * @param {employeeId} Object, contains employeeId.
     * @param {formValues} Object, contains values of work details form.
     * @return {record} , contains data of work details form.
     */
    prepareRecord: function(record, employeeId, formValues, empEmail){
        record = {
            employeeId: employeeId,
            reportingto: formValues.reportingto,
            designation: formValues.designationname,
            department: formValues.departmentname,
            empstatus: formValues.empstatus,
            joiningdate: formValues.joiningdate,
            confirmdate: formValues.confirmdate,
            // separateddate: formValues.separateddate,
            pskill: formValues.pskill,
            notice: formValues.notice,
            grey_hr_id: formValues.grey_hr_id || null,
            empEmail: empEmail
            // employeeEmail: 
        };
        return record;
    },

    /**
     * This handler is responsible for cancelling work details form progress.
     * @param {btn} Object, contain reference of click button.
     * @param {e} Object, event object
     * @param {eOpts} Object, event related details like target, sourceElements.
     */
    onFormCancelClick: function (btn, e, eOpts) {
        try {
            var empWindow = this.getView().up('employeesetupwindow'),
                empWinController = empWindow.getController();
            empWinController.onFormCancelClick(btn, e, eOpts);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.CANCELCLICK, err);
        }
    },

    /**
     * This handler is responsible for operation after selection of work status combo.
     * @param {combo} object, contains reference of combobox which is being used.
     * @param {record} Object, work details form values in form of objects.
     * @param {eOpts} Object, event related details.
     */
    onStatusSelect: function (combo, record, eOpts) {
        try {
            var selection = combo.getValue(),
                workdetailsView = combo.up('workdetails'),
                joniningDtView = workdetailsView.down('datefield[name = joiningdate]'),
                confirmedDtView = workdetailsView.down('datefield[name = confirmdate]'),
                // separatedDtView = workdetailsView.down('datefield[name = separateddate]'),
                noticeDtView = workdetailsView.down('datefield[name = notice]'),
                vm = this.getViewModel(),
                me = this;
            if (selection && selection == "Probation") {
                me.onProbationSelection(vm, noticeDtView,confirmedDtView);
            } else if (selection && selection == "Confirmed") {
                me.onConfirmSelection(vm, noticeDtView, confirmedDtView);
            } 
            // else if (selection && selection == "Separated") {
            //     me.onSeparatedSelection(vm, separatedDtView, noticeDtView);
            // } 
            else if (selection && selection == "Notice") {
                me.onNoticeSelection(vm,noticeDtView);
            } else {
                vm.set('workdetailssavebutton', false);
                vm.set('isDateSelected', false);
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.STATUSCHANGE, err);
        }
    },

    /**
     * This handler is related to Probation related data changes after selection of work status
     * @param {vm} Object, reference of viewModel.
     * @param {separatedDtView} Object, reference of separated date field.
     * @param {noticeDtView} Object, reference of notice date field
     * @param {confirmedDtView} Object, reference of confirm date field
     */
    onProbationSelection: function(vm,noticeDtView, confirmedDtView){
        vm.set('isDateSelected', true);
        vm.set('confirm', true);
        // vm.set('separated', true);
        vm.set('notice', true);
        // separatedDtView.setValue(null);
        noticeDtView.setValue(null);
        confirmedDtView.setValue(null);
        // if (joniningDtView.isDisabled()) {}
    },

    /**
     * This handler is related to Confirmed related data changes after selection of work status
     * @param {vm} Object, reference of viewModel.
     * @param {separatedDtView} Object, reference of separated date field.
     * @param {noticeDtView} Object, reference of notice date field
     * @param {confirmedDtView} Object, reference of confirm date field
     */
    onConfirmSelection: function(vm,noticeDtView, confirmedDtView){
        vm.set('workdetailssavebutton', true);
        vm.set('isDateSelected', true);
        // vm.set('separated', true);
        vm.set('notice', true)
        vm.set('confirm', false);
        // separatedDtView.setValue(null);
        noticeDtView.setValue(null);
        confirmedDtView.setValue(null);
    },

    /**
     * This handler is related to Separated related data changes after selection of work status
     * @param {vm} Object, reference of viewModel.
     * @param {separatedDtView} Object, reference of separated date field.
     * @param {noticeDtView} Object, reference of notice date field.
     */
    // onSeparatedSelection: function(vm, separatedDtView, noticeDtView){
    //     vm.set('workdetailssavebutton', true);
    //     vm.set('isDateSelected', true);
    //     if (separatedDtView.isHidden()) {
    //         vm.set('separated', false);
    //         vm.set('notice', true);
    //         separatedDtView.setFieldLabel('Separated Date');
    //         noticeDtView.setValue(null);
    //         separatedDtView.setDisabled(false);
    //     }
    // },

    /**
     * This handler is related to Notice related data changes after selection of work status
     * @param {vm} Object, reference of viewModel.
     * @param {separatedDtView} Object, reference of separated date field.
     * @param {noticeDtView} Object, reference of notice date field.
     */
    onNoticeSelection: function(vm,noticeDtView){
        vm.set('workdetailssavebutton', true);
        vm.set('isDateSelected', true);
        if (noticeDtView.isHidden()) {
            vm.set('notice', false);
            noticeDtView.setFieldLabel('Notice Period');
            // vm.set('separated', true);
            // separatedDtView.setValue(null);
        }
    },

    /**
     * This handler is responsible for operation after changing of work details combo.
     * @param {combo} object, contains reference of combobox which is being used.
     * @param {newVal} String, Field modified value.
     * @param {oldVal} String, Field before modified value.
     * @param {eOpts} Object, event related details.
     */
    onWorkDetailsChange: function (combo, newVal, oldVal, eOpts) {
        try {
            var vm = this.getViewModel();
            if (combo.xtype == "datefield") {
                combo.setValue(newVal);
                vm.set('isDateSelected', false);
            }
            if (newVal && (!vm.get('isDateSelected'))) {
                combo.setValue(newVal);
                vm.set('workdetailssavebutton', false);
            }
            if (!Ext.isEmpty(newVal)) {
                combo.setValue(newVal);
                vm.set('workdetailssavebutton', false);
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.DETAILSCHANGES, err);
        }
    },

    /**
     * This handler is responsible for operation after selection of reporting manager combo.
     * @param {combo} object, contains reference of combobox which is being used.
     * @param {record} Object, work details form values in form of objects.
     * @param {eOpts} Object, event related details.
     */
    onReportingToSelect: function (combo, record, eOpts) {
        try {
            var empSetupWindow = combo.up('employeesetupwindow'),
                vm = this.getViewModel(),
                viewModel = empSetupWindow.getViewModel(),
                employeeId = viewModel.get('ddo_employee_id');
            if (record.data.empid == employeeId) {
                Utility.topAlertMessage(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.WARNING, Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.SAMEEMP);
                combo.setValue(null);
                vm.set('workdetailssavebutton', true);
            }
            vm.set('workdetailssavebutton', false);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.REPORTINGSELECT, err);
        }
    },

    /**
     * this handler is responsible for key operation for date field.
     * @param {dateField} Object, contains reference of date field.
     * @param {e} Object, event Object
     * @param {eOpts} Object, event related details
     */    
    onKeyDownDate: function (dateField, e, eOpts) {
        try {
            var val = dateField.getRawValue();
            var validvalue = Utility.isDate(val);
            dateField.setValue(validvalue);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.KEYDATEOPERATION, err);
        }
    },

    /**
     * This handler is responsible for operation after changing of work details combo.
     * @param {cmp} object, contains reference of combobox which is being used.
     * @param {newVal} String, Field modified value.
     * @param {oldVal} String, Field before modified value.
     */
    onChangeWorkDetails: function (cmp, newVal, oldVal) {
        try {
            if (newVal) {
                cmp.up().getViewModel().set('workdetailssavebutton', false)
            }
            if (cmp.xtype == 'datefield') {
                var val = cmp.getRawValue();
                var validvalue = Utility.isDate(val);;
                cmp.setValue(validvalue);
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.CHANGEWORKDETAILS, err);
        }
    },

    /**
     * this handler is responsible for status field render
     * @param {me} Object, scope of work details form panel.
     */
    onStatusRender: function (me) {
        try {
            var empStatus = me.getValue();
            if (empStatus != 'Separated') {
                var separatedDate = me.up('workdetails').down('datefield[name=separateddate]');
                separatedDate.setDisabled(true);
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.STATUSRENDER, err);
        }
    },

    /**
     * This handler is responsible for post operation of reporting manager changes.
     * @param {objArgs} Object, Contains the references of viewModel, Records, forms and views.
     */
    reportingChange: function (objArgs) {
        try {
            var formValues = objArgs.form.getValues(),
                vm = this.getViewModel();
            var employeeSetupLoading = new Ext.LoadMask({
                msg: '',
                target: objArgs.empSetupWindow
            });
            employeeSetupLoading.show();
            if (!Ext.isEmpty(formValues.ddo_empworkdetails_id)) {
                this.updateWorksDetails(objArgs, formValues, vm, employeeSetupLoading);
                return true;
            } else {
                this.addWorkDetailData(formValues, employeeSetupLoading, objArgs);
                return true;
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.REPORTINGCHANGE, err);
        }
    },

    /**
     * this is responsible for updating work details data.
     * @param {objArgs} Object, Contains the references of viewModel, Records, forms and views.
     * @param {formValues} Object, Contains the value of the work details form.
     * @param {vm} Object, COntains this viewModel references
     * @param {employeeSetupLoading} Object, reference of custom created loader.
     */
    updateWorksDetails: function(objArgs, formValues, vm, employeeSetupLoading){
        var formItems = objArgs.form.items.items,
            changedData = [], rec = {}, obj = {};
        this.checkFieldsValidity(formItems, changedData);
        for (var j = 0; j < changedData.length; j++) {
            obj[changedData[j].fieldName] = changedData[j].newValue;
        }
        this.setJobTypeStatus(formValues, obj, vm, employeeSetupLoading);
        rec = {
            ddo_employee_id: objArgs.record.employeeId,
            isManagerChanged: objArgs.record.isManagerChanged,
            obj: Ext.encode(obj),
            ddo_empworkdetails_id: formValues.ddo_empworkdetails_id
        };
        this.callWorkUpdateService(rec, employeeSetupLoading);
        if (!Ext.isEmpty(Utility.reportingManagerChanged)) {
            rec.createdby = Ext.getStore('login').getRange()[0].getData().ddo_employee_id;
            rec.comment = Utility.reportingManagerChanged;
            this.updateReportingDetails(rec, employeeSetupLoading);
            Utility.reportingManagerChanged = null;
        }
    },

    /**
     * this handler is responsible for validating work details form.
     * @param {formItems} Object, contains reference of form fields
     * @param {changedData} Array, Contains empty array as of now 
     */
    checkFieldsValidity: function(formItems, changedData){
        for (var i = 0; i < formItems.length; i++) {
            if (formItems[i].isDirty()) {
                var data = {
                    fieldName: formItems[i].getName(),
                    originalValue: formItems[i].originalValue,
                    newValue: formItems[i].getValue()
                };
                if (data.fieldName == 'designationname') {
                    data.fieldName = 'designation'
                }
                if (data.fieldName == 'departmentname') {
                    data.fieldName = 'department'
                }
                if (data.fieldName == 'pskill') {
                    data.fieldName = 'pskillid'
                }
                changedData.push(data);
            }
        }
    },
    /**
     * this is responsible for setting job type in work details form.
     * @param {formValues} Object, Contains the value of the work details form.
     * @param {obj} Object, Contains data regarding modified fields and there values.
     * @param {vm} Object, Contains this viewModel references
     * @param {employeeSetupLoading} Object, reference of custom created loader.
     */
    setJobTypeStatus: function(formValues, obj, vm, employeeSetupLoading){
        if (formValues && !formValues.jobtype) {
            obj.jobtype = 'Support';
            obj.isbillable = 'N';
        } else {
            if (formValues && formValues.jobtype == 'Billable') {
                obj.isbillable = 'Y';
            } else {
                obj.isbillable = 'N';
            }
            obj.jobtype = formValues.jobtype;
        }
        // if (formValues && formValues.empstatus == 'Separated' && !formValues.separateddate) {
        //     Ext.Msg.alert(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.FAIL, Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.SEPERATEDDATE);
        //     if (vm.get('separated') == true) {
        //         vm.set('separated', false);
        //     }
        //     employeeSetupLoading.hide();
        //     // return
        // }
        employeeSetupLoading.hide();
    },

    /**
     * this handler is responsible for calling update services for work details.
     * @param {rec} Object, contains form data which need to be updated.
     * @param {employeeSetupLoading} Object, contains custom loader for work details view.
     */
    callWorkUpdateService: function(rec, employeeSetupLoading){
        var me = this;
        var workUpdatePromise = new Promise(function(resolve, reject){
            Ext.Ajax.request({
                scope: me,
                url: Api.URL.work.UPDATE,
                method: 'PUT',
                params: rec,
                success: function (res) {
                    var resolveObj = {};
                    resolveObj.scope = me;
                    resolveObj.res = res;
                    resolveObj.employeeSetupLoading = employeeSetupLoading;
                    resolve(resolveObj);
                },
                failure: function (rec) {
                    var responseText = JSON.parse(rec.responseText);
                    Ext.Msg.alert('Failed', responseText.message);
                    employeeSetupLoading.hide();
                }
            });
        });
        workUpdatePromise.then(function (resolveObj) {
            var view = resolveObj.scope.getView();
            var empSetupWindow = view.up('employeesetupwindow');
            if (empSetupWindow) {
                var emploueeSetupTabpanel = empSetupWindow && empSetupWindow.down('tabpanel');
                emploueeSetupTabpanel.setActiveItem(2);
            }
            store = Ext.getStore('setup.employeesetup.EmployeeStore');
            if (store) {
                store.reload();
            }
            employeeGroupStore = Ext.getStore('setup.employeesetup.EmployeeGroupStore');
            if (employeeGroupStore) {
                employeeGroupStore.load();
            }
            resolveObj.employeeSetupLoading.hide();
            Ext.Msg.alert(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.SUCCESS, Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.UPDATESUCCESS);
        }).catch(function (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.UPDATESERVICES, err);
        });
    },
    /**
     * this handler is responsible for calling update services for reporting details.
     * @param {rec} Object, contains form data which need to be updated.
     * @param {employeeSetupLoading} Object, contains custom loader for work details view.
     */
    updateReportingDetails: function(rec, employeeSetupLoading){
        var me = this;
        var updateReportingPromise = new Promise(function(resolve, reject){
            Ext.Ajax.request({
                scope: me,
                url: Api.URL.employeehistory.ALLEMPLOYEES_HISTORY,
                method: 'POST',
                params: rec,
                success: function(res) {
                    var resolveObj = {};
                    resolveObj.scope = me;
                    resolveObj.employeeSetupLoading = employeeSetupLoading;
                    resolve(resolveObj);
                },
                failure: function (err, data) {
                    // debugger;
                }
            });    
        });
        updateReportingPromise.then(function (resolveObj) {
            var view = resolveObj.scope.getView();
            var empSetupWindow = view.up('employeesetupwindow');
            if (empSetupWindow) {
                var emploueeSetupTabpanel = empSetupWindow && empSetupWindow.down('tabpanel');
                emploueeSetupTabpanel.setActiveItem(2);
            }
            store = Ext.getStore('setup.employeesetup.EmployeeStore');
            if (store) {
                store.reload();
            }
            var emptab = empSetupWindow.parentViewRef.up('employeetab');
            var emptabViewModel = emptab.getViewModel();
            var employeeGroupStore = emptabViewModel.get('empGroupStore');
            if (employeeGroupStore) {
                employeeGroupStore.load();
            }
            resolveObj.employeeSetupLoading.hide();
            Ext.Msg.alert(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.SUCCESS, Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.UPDATESUCCESS);
        }).catch(function (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.UPDATEREPORTING, err);
        });
    },
    addWorkDetailData: function(formValues, employeeSetupLoading, objArgs) {
        this.processJobTypeData(formValues, employeeSetupLoading, objArgs);
        this.callAddWorkDataService(objArgs, employeeSetupLoading);
    },

    /**
     * this handler is responsible for operation after job type data is set.
     * @param {formValues} Object, values of work details form.
     * @param {employeeSetupLoading} Object, contains custom loader for work details view.
     */
    processJobTypeData : function(formValues, employeeSetupLoading, objArgs) {
        if (formValues && !formValues.jobtype) {
            Ext.Msg.alert('Failed', 'please select jobtype');
            employeeSetupLoading.hide();
            return
        } else {
            if (formValues && formValues.jobtype == 'Billable') {
                objArgs.record.isbillable = 'Y';
            } else {
                objArgs.record.isbillable = 'N';
            }
            objArgs.record.jobtype = formValues.jobtype;
        }
    },

    /**
     * this handler is responsible for calling create services for work details.
     * @param {objArgs} Object, Contains the references of viewModel, Records, forms and views.
     * @param {employeeSetupLoading} Object, contains custom loader for work details view.
     */
    callAddWorkDataService: function(objArgs, employeeSetupLoading){
        var me = this;
        var addWorkPromises = new Promise(function(resolve, reject){
            Ext.Ajax.request({
                scope: me,
                url: Api.URL.work.CREATE,
                method: 'POST',
                params: objArgs.record,
                success: function (batch, opt) {
                    var resolveObj = {};
                    resolveObj.scope = me;
                    resolveObj.objArgs = objArgs;
                    resolveObj.batch = batch;
                    resolveObj.employeeSetupLoading = employeeSetupLoading;
                    resolve(resolveObj);
                },
                failure: function (rec) {
                    if (rec) {
                        var responseText = JSON.parse(rec.responseText);
                        Ext.Msg.alert('Failed', responseText.message);
                    }
                    employeeSetupLoading.hide();
                }
            });
        });
        addWorkPromises.then(function(resolveObj){
            if (resolveObj.batch.responseText) {
                var jsonData = resolveObj.batch.responseText,
                    ddo_empworkdetails_id = Ext.decode(jsonData).ddo_empworkdetails_id;
                resolveObj.objArgs.form.down('hiddenfield').setValue(ddo_empworkdetails_id);
            }
            var view = resolveObj.scope.getView();
            var empSetupWindow = view.up('employeesetupwindow'),
                emploueeSetupTabpanel = empSetupWindow.down('tabpanel'),
                viewModel = empSetupWindow.getViewModel(),
                store = Ext.getStore('setup.employeesetup.EmployeeStore'),
                supervisorStore = Ext.getStore('karmascore.SupervisorComboStore');

            emploueeSetupTabpanel.setActiveItem(2);
            viewModel.set('ddo_employee_id', objArgs.record.employeeId);
            store.load();
            supervisorStore.load();
            employeeSetupLoading.hide();
            var emptab = empSetupWindow.parentViewRef.up('employeetab');
            var emptabViewModel = emptab.getViewModel();
            var employeeGroupStore = emptabViewModel.get('empGroupStore');
            employeeGroupStore.load();
        }).catch(function(err){
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.ADDWORKERR, err);
        });
    }
});