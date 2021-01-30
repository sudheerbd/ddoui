/**
 * The file EmployeeFormController is the controller for  the DDO.view.setup.employeesetup.EmployeeForm.
 * @extends {Ext.app.ViewController}
 * @alias controller.employeeformcontroller.
 */
Ext.define('DDO.view.setup.employeesetup.EmployeeFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employeeformcontroller',
    /**
     * This is the listeners for save button click.
     * The function onEmployeeFormSaveClick is responsible for inserting and updating the employee Details in EmployeeForm view.
     * @param btn - The cancel button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
  
onEmployeeFormSaveClick: function (btn, e, eOpts) {
    try {
        // debugger;
    var employeeSetupLoading,
    form = btn.up('form'),
    value = form.getValues().employee_code;
   formEmpCode = value.trim().replace(" ", "");;
    windw = btn.up('window');
    var referanceobj = {};
    referanceobj.form = form;
    referanceobj.rec = form.getValues();
    referanceobj.rec.employee_code = formEmpCode;
    referanceobj.employeesetupWindow = windw;
    referanceobj.viewModel = windw.getViewModel();
    referanceobj.employeeSetupTabpanel = windw.down('tabpanel');
    referanceobj.wrkDetailsRef = windw.lookupReference('wrkdetailsref'),
    referanceobj.accessDetailsRef = windw.lookupReference('accessdetails');
    referanceobj.store = Ext.getStore('setup.employeesetup.EmployeeStore');
    referanceobj.workExpRef = windw.lookupReference('employeeexpref');
    referanceobj.employeeSetupLoading = employeeSetupLoading;
    referanceobj.employeeSetupLoading = new Ext.LoadMask({
    msg: '',
    target: referanceobj.employeesetupWindow
    });
    this.epmFormAjaxCall(referanceobj, form);
    } catch (err) {
    Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.EMPLOYEEFORM.FORMSAVE, err);
    }
    },
    /**
     * The function epmFormAjaxCall is responsible for updating the employee Details in EmployeeForm view.
     *  @param {object} referanceobj - object.
     *  @param {Ext.form.Panel} 'form' - which takes 'employeeForm' .
     */
    epmFormAjaxCall: function (referanceobj, form) {
        referanceobj.employeeSetupLoading.show();
        if ((!Ext.isEmpty(referanceobj.rec.ddo_employee_id))) {
            var me = this;
            var promiseToUpdate = new Promise(function (resolve, reject) {
                Ext.Ajax.request({
                    scope: me,
                    url: Api.URL.empsetup.UPDATE,
                    method: 'PUT',
                    params: referanceobj.rec,
                    success: function (resp) {
                        var resolveObj = {};
                        resolveObj.form = form;
                        resolveObj.res = resp;
                        resolveObj.employeeSetupTabpanel = referanceobj.employeeSetupTabpanel;
                        resolveObj.wrkDetailsRef = referanceobj.wrkDetailsRef;
                        resolveObj.rec = referanceobj.rec;
                        resolve(resolveObj);
                    },
                    failure: function (batch) {
                        reject(batch);
                    }
                });
            });
            promiseToUpdate.then(function (resolveObj) {
                me.successUpdateFun(resolveObj, form);
                referanceobj.employeeSetupLoading.hide();
            }).catch(function (batch) {
                if (batch !== null) {
                    me.formSaveFailed(batch);
                    referanceobj.employeeSetupLoading.hide();
                } else {
                    Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.EMPLOYEEFORM.ERRORMSG, err);
                    referanceobj.employeeSetupLoading.hide();
                }
            });
        } else {
            this.empFormCheckDirtyField(referanceobj,form);
        }
    },
    /**
     * This function will called after the data is  successfully updated in updatedemployeeForm.
     *  @param {object} referanceobj - object.
     *  @param {Ext.form.Panel} 'form' - which takes 'employeeForm' .
     */
    successUpdateFun: function (resolveObj, form) {
        var records, rec;
        records = JSON.parse(resolveObj.res.responseText);
        resolveObj.employeeSetupTabpanel.setActiveItem(1);
        Ext.Msg.alert('Success', records.message);
        resolveObj.wrkDetailsRef.form.setValues({
            grey_hr_id: resolveObj.rec.employee_code
        });
        var store = Ext.getStore('setup.employeesetup.EmployeeStore');
        store.load();
    },
    /**
     * This function will called when some error occur duing updation of employeeDetails.
     *  @param {object} batch - object.
     */
    formSaveFailed: function (batch) {
        var responseTextData = Ext.decode(batch.responseText),
            errDetail = responseTextData.data,
            errDetailFormat, errorMsg;
        if (errDetail) {
            if (errDetail.detail) {
                errDetailFormat = errDetail.detail.split('=');
                errorMsg = errDetailFormat[1].replace(/\(/g, "").replace(/\)/g, "");
            } else {
                errorMsg = responseTextData.message;
            }
            Ext.Msg.alert('Failed', errorMsg);
        }
    },
    /**
     * The function empFormCheckDirtyField is responsible for inserting the employee Details in EmployeeForm view.
     *  @param {object} referanceobj - object. 
     *  @param {Ext.form.Panel} 'form' - which takes 'employeeForm' .
     *  @param {viewModel} 'viewModel' which takes 'employeeFormViewModel'
     */
    empFormCheckDirtyField: function (referanceobj,form) {
        if (form.isDirty()) {
            referanceobj.store.add(form.getValues());
            referanceobj.store.sync({
                scope: this,
                success: function (batch) {
                    if (batch.operations[0].getResponse()) {
                        var jsonData = batch.operations[0].getResponse().responseText,
                            respObj = Ext.decode(jsonData),
                            ddo_employee_id = respObj.ddo_employee_id,
                            role_id = Ext.decode(jsonData).ddo_role_id;
                        form.down('hiddenfield[name = ddo_employee_id]').setValue(ddo_employee_id);
                        referanceobj.viewModel.set('ddo_employee_id', ddo_employee_id);
                        var tagfieldStore = referanceobj.accessDetailsRef.down('tagfield').getStore()
                        tagfieldStore.clearFilter(true);
                        referanceobj.wrkDetailsRef.setDisabled(false);
                        referanceobj.wrkDetailsRef.form.setValues({
                            grey_hr_id: referanceobj.rec.employee_code
                        });
                        tagfieldStore.load({
                            scope: this,
                            callback: function () {
                                referanceobj.accessDetailsRef.down('tagfield').setValue(role_id);
                            }
                        });
                    }
                    this.successFunction(referanceobj);
                },
                failure: function (batch) {
                    var error = batch.operations[0].getError(),
                        response = batch.operations[0].error.response,
                        errorMsg;
                    if (Ext.isObject(error)) {
                        if (error.status && error.statusText) {
                            var responseTextData = Ext.decode(response.responseText),
                                errDetail = responseTextData.data,
                                errDetailFormat, errorMsg;
                            if (errDetail) {
                                if (errDetail.detail) {
                                    errDetailFormat = errDetail.detail.split('=');
                                    errorMsg = errDetailFormat[1].replace(/\(/g, "").replace(/\)/g, "");
                                } else {
                                    errorMsg = responseTextData.message;
                                }
                                Ext.Msg.alert('Failed', errorMsg);
                            }
                        }
                    }
                    referanceobj.store.remove(referanceobj.store.getAt(referanceobj.store.getCount() - 1));
                    referanceobj.store.reload();
                    form.reset();
                    referanceobj.employeeSetupLoading.hide();
                }
            });
        } else {
            referanceobj.employeeSetupLoading.hide();
        }
    },
    /**
     * The function successFunction is responsible for setting window default properties via viewmodel.
     * @param {object} referanceobj - object. 
     */
    successFunction: function (referanceobj) {
        referanceobj.store.load();
        referanceobj.viewModel.set('tab3', false);
        referanceobj.viewModel.set('tab4', false);
        referanceobj.viewModel.set('tab5', false);
        referanceobj.viewModel.set('tab6', false);
        referanceobj.viewModel.set('tab7', false);
        referanceobj.employeeSetupTabpanel.setActiveItem(1);
        referanceobj.employeeSetupLoading.hide();
        var emptab = this.getView().up('employeesetupwindow').parentViewRef.up().up();
        var emptabViewModel = emptab.getViewModel();
        var updateEmployee = emptabViewModel.get('empGroupStore');
        updateEmployee.load();
    },
    /**
     * This is the listeners for cancel button click.
     * It will call the function which is present in EmployeeSetupWindowViewController.js file.
     * And that function will close the window when click on this button and reset the form.
     * @param btn - The cancel button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormCancelClick: function (btn, e, eOpts) {
        var empWindow = this.getView().up('employeesetupwindow'),
            empWinController = empWindow.getController();
        empWinController.onFormCancelClick(btn, e, eOpts);
    },
    /**
     * The function onEmployeeDetailsChange will perform when the  'change' event of the filefield is fired in the  EmployeeForm.js file.
     * If we will edit any value in form field then this function unable the save butten in EmployeeForm view. 
     * @param { Ext.form.field.Field} 'combo'which is the form field.
     * @param {object} 'newValue' which takes the new value.
     * @param {object} 'oldVal' which takes the old value.
     * @param {object} 'eOpts' which is the object.
     */
    onEmployeeDetailsChange: function (combo, newVal, oldVal, eOpts) {
        try {
            var vm = this.getViewModel(),
                form = combo.up('form');
            if (newVal || newVal == "") {
                var rec = form.getValues(),
                    email = false;
                if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(rec.email)) {
                    email = true;
                } else {
                    email = false;
                }
                if ((!Ext.isEmpty(rec.firstname)) && (!Ext.isEmpty(rec.lastname)) && email && (!Ext.isEmpty(rec.employee_code))) {
                    vm.set('employeedetailssavebutton', false);
                } else {
                    vm.set('employeedetailssavebutton', true);
                }
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.EMPLOYEEFORM.SAVEBTNUNABLE, err);
        }
    }
});