/**
 * The file PersonalDetailsTabController is the ViewController for 'DDO.view.setup.employeesetup.PersonalDetailsTab'.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.personaldetailstabcontroller'.
 */
Ext.define('DDO.view.setup.employeesetup.PersonalDetailsTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.personaldetailstabcontroller',
    /**
     * The function onPersonalDetailsFormSaveClick is responsible for create and update ajax requests when clicking on save button.
     * @param {Ext.button.Button} 'btn' which is a button.
     * @param {Event.target} 'e' where the event needs to fire.
     */
    onPersonalDetailsFormSaveClick: function (btn, e) {
        try {
            var store, form, rec, employeesetupWindow, emploueeSetupTabpanel, ddo_employee_id, employeeSetupLoading;
            form = btn.up('form');
            rec = form.getValues();
            employeesetupWindow = btn.up('window');
            ddo_employee_id = employeesetupWindow.getViewModel().get('ddo_employee_id');
            emploueeSetupTabpanel = employeesetupWindow.down('tabpanel');
            rec.ddo_employee_id = ddo_employee_id;
            store = Ext.getStore('setup.employeesetup.EmployeeStore');
            if (rec.dob) {
                var dobSplit = rec.dob.split("-");
                var dob = dobSplit[2] + '-' + dobSplit[1] + '-' + dobSplit[0];
                rec.dob = dob;
            }
            if (rec.anniversarydate) {
                var anvDateSplit = rec.anniversarydate.split("-");
                var anvDate = anvDateSplit[2] + '-' + anvDateSplit[1] + '-' + anvDateSplit[0];
                rec.anniversarydate = anvDate;
            }
            if (Ext.isEmpty(rec.aadharno) && Ext.isEmpty(rec.anniversarydate) && Ext.isEmpty(rec.bloodgroup) && Ext.isEmpty(rec.dob) && Ext.isEmpty(rec.maritalstatus) && Ext.isEmpty(rec.panno) && Ext.isEmpty(rec.phoneno)) {
                //do nothing
            } else {
                employeeSetupLoading = new Ext.LoadMask({
                    msg: '',
                    target: employeesetupWindow
                });
                employeeSetupLoading.show();
                this.personaldetailsNotEmpty(rec, store, employeeSetupLoading, form, btn);
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.PERSONALDETAILS.SAVECLICK, err);
        }
    },
    /**
     * The function personaldetailsNotEmpty is responsible for checking employeepersonaldetails and calls the ajax requests.
     * @param {object} 'rec' which takes the record values.
     * @param {setup.employeesetup.EmployeeStore} 'store' which holds the employee store.
     * @param {Ext.LoadMask} 'employeeSetupLoading' load mask on employeesetupwindow.
     * @param {Ext.form.Panel} 'form' which takes emplyeedetails form.
     */
    personaldetailsNotEmpty: function (rec, store, employeeSetupLoading, form, btn) {
        if ((!Ext.isEmpty(rec.ddo_emppersonaldetails_id))) {

            if (Ext.isEmpty(rec.anniversarydate)) {
                rec.anniversarydate = null;
            }
            if (Ext.isEmpty(rec.dob)) {
                rec.dob = null;
            }
            var record = {
                ddo_emppersonaldetails_id: rec.ddo_emppersonaldetails_id,
                obj: Ext.encode(rec)
            };
            this.updateAjaxRequest(store, record, employeeSetupLoading, btn);
        } else {
            this.createAjaxRequest(rec, form, employeeSetupLoading);
        }
    },
    /**
     * The function updateAjaxRequest is responsible for update ajax request by clicking on the save button.
     * @param {setup.employeesetup.EmployeeStore} 'store' which holds the employee store.
     * @param {string} 'record' holding the string record.
     * @param {Ext.LoadMask} 'employeeSetupLoading' load mask on employeesetupwindow.
     */
    updateAjaxRequest: function (store, record, employeeSetupLoading, btn) {
        var me = this;
        var promiseFrequency = new Promise(function (resolve, reject) {
            Ext.Ajax.request({
                scope: me,
                url: '/personaldetails',
                method: 'PUT',
                params: record,
                success: function (response, eOpts) {
                    var resolveObj = {};
                    resolveObj.res = response;
                    resolveObj.store = store;
                    resolveObj.btn = btn;
                    resolveObj.employeeSetupLoading = employeeSetupLoading;
                    resolve(resolveObj);
                },
                failure: function (resp, eOpts) {
                    var rejectObj = {};
                    rejectObj.resp = resp;
                    rejectObj.employeeSetupLoading = employeeSetupLoading;
                    reject(rejectObj);
                }
            });
        });
        promiseFrequency.then(function (resolveObj) {
            Ext.Msg.alert(Messages.EMPLOYEESETUP.SUCCESS, Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.PERSONALDETAILS.UPDATEPERSONALDETAILS);
            resolveObj.store.load();
            var empSetupWindow = resolveObj.btn.up('window'),
                emploueeSetupTabpanel = empSetupWindow.down('tabpanel');

            emploueeSetupTabpanel.setActiveItem(5);
            resolveObj.employeeSetupLoading.hide();
        }).catch(function (rejectObj) {
            Ext.Msg.alert(Messages.EMPLOYEESETUP.FAILED, Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.PERSONALDETAILS.UPDATEDETAILSFAILED);
            rejectObj.employeeSetupLoading.hide();
        });
    },
    /**
     * The function createAjaxRequest is responsible for POST ajax request by clicking on the save button.
     * @param {object} 'rec' which takes the record values.
     * @param {Ext.form.Panel} 'form' which takes emplyeedetails form.
     * @param {Ext.LoadMask} 'employeeSetupLoading' load mask on employeesetupwindow.
     */
    createAjaxRequest: function (rec, form, employeeSetupLoading) {
        var me = this;
        var promiseFrequency = new Promise(function (resolve, reject) {
            Ext.Ajax.request({
                scope: me,
                url: '/personaldetails',
                method: 'POST',
                scope: me,
                params: rec,
                success: function (batch, opt) {
                    var resolveObj = {};
                    resolveObj.batch = batch;
                    resolveObj.me = me;
                    resolveObj.form = form;
                    resolveObj.employeeSetupLoading = employeeSetupLoading;
                    resolve(resolveObj);
                },
                failure: function (resp) {
                    var rejectObj = {};
                    rejectObj.resp = resp;
                    rejectObj.employeeSetupLoading = employeeSetupLoading;
                    reject(rejectObj);
                }
            });
        });
        promiseFrequency.then(function (resolveObj) {
            if (resolveObj.batch.responseText) {
                var jsonData = resolveObj.batch.responseText,
                    ddo_emppersonaldetails_id = Ext.decode(jsonData).ddo_emppersonaldetails_id;
                resolveObj.form.down('hiddenfield').setValue(ddo_emppersonaldetails_id);
            }
            var viewController = resolveObj.me,
                viewFile = viewController.getView(),
                empSetupWindow = viewFile.up('employeesetupwindow'),
                emploueeSetupTabpanel = empSetupWindow.down('tabpanel'),
                viewModel = empSetupWindow.getViewModel(),
                store = Ext.getStore('setup.employeesetup.EmployeeStore');

            Ext.Msg.alert(Messages.EMPLOYEESETUP.SUCCESS, Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.PERSONALDETAILS.EMPPERSONAL);

            emploueeSetupTabpanel.setActiveItem(5);
            store.load();
            resolveObj.employeeSetupLoading.hide();
            // viewModel.set('tab4', false);
        }).catch(function (rejectObj) {
            Ext.Msg.alert(Messages.EMPLOYEESETUP.FAILED, Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.PERSONALDETAILS.PERSONALDETAILSFAIL);
            rejectObj.employeeSetupLoading.hide();
        });
    },

    /**
     * The function onFormCancelClick will close the window by calling employeesetupwindow controller in which functionality is written.
     * @param {Ext.button.Button} 'btn' which is a button.
     * @param {Event.target} 'e' where the event needs to fire.
     */
    onFormCancelClick: function (btn, e, eOpts) {
        try {
            var empWindow = this.getView().up('employeesetupwindow'),
                empWinController = empWindow.getController();
            empWinController.onFormCancelClick(btn, e, eOpts);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.PERSONALDETAILS.CANCELCLICK, err);
        }
    },
    /**
     * The function onMartialStaus is responsible for which value needs to be enable and which should be disable.
     * @param {combobox} 'combo' which takes the combobox given.
     */
    onMartialStaus: function (combo) {
        try {
            var view = this.getView(),
                anvDt = view.down('datefield[name=anniversarydate]');
            if (combo.getRawValue() == "Single") {
                // anvDt.setReadOnly(true);
                anvDt.setValue(null);
                anvDt.disable();
            } else {
                //anvDt.setReadOnly(false);
                anvDt.enable();
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.PERSONALDETAILS.MARITALSTATUS, err);
        }
    },
    /**
     * The function onPersonalDetailsChange is responsible to hide the save button when the function fires.
     * @param {comboBox} 'combo' which takes the combobox.
     * @param {number} 'newVal' which takes the new value in the combobox.
     * @param {number} 'oldVal' which holds old value in the combobox.
     */
    onPersonalDetailsChange: function (combo, newVal, oldVal) {
        try {
            var vm = this.getViewModel();
            if (newVal) {
                vm.set('personaldetailssavebutton', false);
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.PERSONALDETAILS.PERSONALDETAILS, err);
        }
    },
    /**
     * The function onDateRange is responsible for checking the condition of anniversary date should not be before date of birth and vice versa.
     * @param {datefield} 'field' which holds the date field.
     * @param {object} 'value'.
     */
    onDateRange: function (field, value) {
        try {
            var err = false,
                form, errMsg,
                sdobDate, anvDt;

            form = field.up('form');

            dobDate = form.down('datefield[name=dob]');
            anvDt = form.down('datefield[name=anniversarydate]');
            if (field.name == "dob") {
                if (anvDt && !Ext.isEmpty(anvDt.value) && field.value > anvDt.value) {
                    err = true;
                    errMsg = Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.PERSONALDETAILS.DOBERRMSG;
                } else {
                    //do nothing
                }
            } else if (field.name == "anniversarydate") {
                if (dobDate && !Ext.isEmpty(dobDate.value) && field.value < dobDate.value) {
                    err = true;
                    errMsg = Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.PERSONALDETAILS.ANNIVERSARYMSG;
                } else {
                    //do nothing
                }
            } else {
                //do nothing
            }
            if (err) {
                field.setValue(null);
                Utility.toastReuseFn('t', errMsg);
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.PERSONALDETAILS.DATERANGE, err);
        }
    },
    /**
     * The function onKeyDownDate is responsible for checking the entered value is valid or not.
     * @param {datefield} 'dateField' which holds the date field.
     * @param {object} 'e' type focusleave.
     * @param {object} 'eOpts' which takes object of listeners.
     */
    onKeyDownDate: function (dateField, e, eOpts) {
        try {
            var val = dateField.getRawValue();
            var validvalue = Utility.isDate(val);;
            dateField.setValue(validvalue)
            if (validvalue) {
                this.onDateRange(dateField, e, eOpts)
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.PERSONALDETAILS.DATEVALID, err);
        }
    },
    /**
     * The function onFormValid will perform when the 'fieldvaliditychange' will fired from personalDetailTab.
     * This function will unable the save butten only if the phoneNo field and Blood Group field is not empty.
     */
    onFormValid: function () {
        try {
            var
                me = this,
                viewRef = this.getReferences(),
                PhoneNo = viewRef.phoneno.getValue(),
                Blood = viewRef.bloodgroup.getValue(),
                VM = this.getViewModel();

            if (PhoneNo && !Ext.isEmpty(Blood)) {

                VM.set('personaldetailssavebutton', false);
            } else {

                VM.set('personaldetailssavebutton', true);
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.PERSONALDETAILS.VALIDATION, err);
        }
    },

});