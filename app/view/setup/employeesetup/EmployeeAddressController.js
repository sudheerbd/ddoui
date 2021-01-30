/**
 * The file EmployeeFormController is the controller for the DDO.view.setup.employeesetup.EmployeeAddress'.
 * @extends {Ext.app.ViewController}
 * @alias controller.empaddresscontroller.
 */

Ext.define('DDO.view.setup.employeesetup.EmployeeAddressController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.empaddresscontroller',

  /**
   * The function onChangeChechbox will perform when the  'change' event of the filefield is fired in the  EmployeeAddress.js file.
   * If we will checked the combo butten in address window then this event fire and make both the address same in EmployeeAddress view. 
   * @param { Ext.form.field.Field} 'chkbox'which is the form field.
   * @param {object} 'newValue' which takes the new value.
   * @param {object} 'oldVal' which takes the old value.
   * @param {object} 'eOpts' which is the object.
   */
  onChangeChechbox: function (chkbox, newValue, oldValue, eOpts) {
    try {
      // debugger;
      var me = this,
        ref = me.getReferences(),
        currentaddrRef = ref.currentaddrRef,
        permanentaddrRef = ref.permanentaddrRef,
        addressobj = {};
      addressobj.currentDetails = currentaddrRef.down('textfield[name = currentdetails]');
      addressobj.cityRef = currentaddrRef.down('textfield[reference = cityComboRef]');
      addressobj.stateRef = currentaddrRef.down('textfield[reference = stateComboRef]');
      addressobj.countryRef = currentaddrRef.down('textfield[reference = countryComboRef]');
      addressobj.zipcodeRef = currentaddrRef.down('numberfield[reference = zipcode]');
      addressobj.permanentDetails = permanentaddrRef.down('textfield[name = permanentdetails]');
      addressobj.cityPermanentRef = permanentaddrRef.down('textfield[reference = cityPermanentRef]');
      addressobj.statePermanentRef = permanentaddrRef.down('textfield[reference = statePermanentRef]');
      addressobj.countryPermanentRef = permanentaddrRef.down('textfield[reference = countryPermanentRef]');
      addressobj.zipcodePermanentRef = permanentaddrRef.down('numberfield[reference = permanentzipcode]');
      if (newValue == true) {
        this.addressCheckedBtn(addressobj);
      } else {
        this.addressUnCheckedBtn(addressobj);
      }
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.ADDRESS.SELECTCHECKBOX, err);
      console.log(err);
    }
  },
  /*
   * The function addressCheckedBtn will set both the address same  in EmployeeAddress view. 
   * @param {object} 'addressobj' which is the object.
   */
  addressCheckedBtn: function (addressobj) {
    // debugger;
    var me = this;
    addressobj.permanentDetails.setValue(addressobj.currentDetails.value);
    addressobj.cityPermanentRef.setValue(addressobj.cityRef.value);
    addressobj.statePermanentRef.setValue(addressobj.stateRef.value);
    addressobj.countryPermanentRef.setValue(addressobj.countryRef.value);
    addressobj.zipcodePermanentRef.setValue(addressobj.zipcodeRef.value);
    if (!(addressobj.currentDetails.readOnly)) {
      addressobj.permanentDetails.setReadOnly(true);
    } else {
      addressobj.permanentDetails.setValue(addressobj.cityRef.value);
      addressobj.permanentDetails.setReadOnly(false);
    }
    if (!(addressobj.cityRef.readOnly)) {
      addressobj.cityPermanentRef.setReadOnly(true);
    } else {
      addressobj.cityPermanentRef.setValue(addressobj.cityRef.value);
      addressobj.cityPermanentRef.setReadOnly(false);
    }
    me.restAddressField(addressobj);
  },
  /*
   * The function restAddressField will set state ,country and zip code if the address is same  in EmployeeAddress view. 
   * @param {object} 'addressobj' which is the object.
   */
  restAddressField: function (addressobj) {
    if (!(addressobj.stateRef.readOnly)) {
      addressobj.statePermanentRef.setReadOnly(true);
    } else {
      addressobj.statePermanentRef.setValue(addressobj.stateRef.value);
      addressobj.statePermanentRef.setReadOnly(false);
    }
    if (!(addressobj.countryRef.readOnly)) {
      addressobj.countryPermanentRef.setReadOnly(true);
    } else {
      addressobj.countryPermanentRef.setValue(addressobj.countryRef.value);
      addressobj.countryPermanentRef.setReadOnly(false);
    }
    if (!(addressobj.zipcodeRef.readOnly)) {
      addressobj.zipcodePermanentRef.setReadOnly(true);
    } else {
      addressobj.zipcodePermanentRef.setValue(addressobj.countryRef.value);
      addressobj.zipcodePermanentRef.setReadOnly(false);
    }
  },
  /*
   * The function addressUnCheckedBtn is set both the address different  in EmployeeAddress view. 
   * @param {object} 'addressobj' which is the object.
   */
  addressUnCheckedBtn: function (addressobj) {
    addressobj.permanentDetails.setValue('');
    addressobj.permanentDetails.setReadOnly(false);
    addressobj.cityPermanentRef.setValue('');
    addressobj.cityPermanentRef.setReadOnly(false);
    addressobj.statePermanentRef.setValue('');
    addressobj.statePermanentRef.setReadOnly(false);
    addressobj.countryPermanentRef.setValue('');
    addressobj.countryPermanentRef.setReadOnly(false);
    addressobj.zipcodePermanentRef.setValue('');
    addressobj.zipcodePermanentRef.setReadOnly(false);
  },
  /**
   *This is the listeners for save button click.
   * The function onFormSaveClick is responsible for inserting and updating the employee Address in EmployeeAddress view.
   * @param btn - The cancel button reference.   
   */
  onFormSaveClick: function (btn) {
    var employeesetupWindow = btn.up('window'),
      ddo_employee_id = employeesetupWindow.getViewModel().get('ddo_employee_id'),
      form = btn.up('form'),
      formValues = form.getValues(),
      me = this,
      currentDetails, permanentDetails, isChecked, employeeSetupLoading;
    if (formValues.ischecked == "on") {
      isChecked = "same"
    } else {
      isChecked = "temp"
    }
    currentDetails = {
        details: formValues.currentdetails,
        city: formValues.currentcityid,
        state: formValues.currentregionid,
        country: formValues.currentcountryid,
        zipcode: formValues.zipcode,
        type: (isChecked == "same") ? "same" : "temp",
        ddo_employee_id: ddo_employee_id
      },
      permanentDetails = {
        details: formValues.permanentdetails,
        city: formValues.permanentcityid,
        state: formValues.permanentregionid,
        country: formValues.permanentcountryid,
        zipcode: formValues.permanentzipcode,
        type: (isChecked == "same") ? "same" : "perm",
        ddo_employee_id: ddo_employee_id
      };
    params = {
      employeesetupWindow: btn.up('window'),
      ddo_employee_id: ddo_employee_id,
      form: btn.up('form'),
      formValues: form.getValues(),
      currentDetails: currentDetails,
      permanentDetails: permanentDetails,
    };
    me.onFormSaveCreateObj(params, btn, isChecked, me);
  },

  /**
   * The function onFormSaveCreateObj is creating one object for Current Address and one for Permanent Address if the address filed is not empty .
   * @param params - The cancel button reference. 
   * @param btn - The save button reference.
   * @param { Ext.form.field.Field} 'isChecked' which is the form field.
   * @param me- Pointing to the EmployeeAddressController.  
   */
  onFormSaveCreateObj: function (params, btn, isChecked, me) {
    employeeSetupLoading = new Ext.LoadMask({
      msg: '',
      target: params.employeesetupWindow
    });
    employeeSetupLoading.show();
    if ((!Ext.isEmpty(params.formValues.ddo_employee_cur_address_id))) {
      var newRec = {};
      me.createAddressObj(params, isChecked, newRec);
      if (params.formValues.ischecked == "on") {
        newRec.isChecked = "same"
      } else {
        newRec.isChecked = "temp"
      }
      record = {
        ddo_employee_id: params.ddo_employee_id,
        obj: Ext.encode(newRec),
        ischecked: isChecked
      };
      this.submitBtnAjaxCallForUpdate(btn, record);
    } else {
      params1 = {
        employeesetupWindow: params.employeesetupWindow,
        ddo_employee_id: params.ddo_employee_id,
        form: params.form,
        currentDetails: params.currentDetails,
        permanentDetails: params.permanentDetails
      };
      me.submitBtnAjaxCallForCreate(params1, isChecked, me);
    }
  },
  /**
   * this function is creating objects of currentDetails and permanentDetails.
   * @param {object} - params is an object. 
   * @param { Ext.form.field.Field} 'isChecked' which is the form field.
   * @param {object} - newRec is an object.
   */
  createAddressObj: function (params, isChecked, newRec) {
    newRec.currentDetails = {
      details: params.formValues.currentdetails,
      city: params.formValues.currentcityid,
      state: params.formValues.currentregionid,
      country: params.formValues.currentcountryid,
      zipcode: params.formValues.zipcode,
      type: (isChecked == "same") ? "same" : "temp",
      ddo_empaddress_id: params.formValues.ddo_employee_cur_address_id,
      ddo_employee_id: params.ddo_employee_id
    }
    newRec.permanentDetails = {
      details: params.formValues.permanentdetails,
      city: params.formValues.permanentcityid,
      state: params.formValues.permanentregionid,
      country: params.formValues.permanentcountryid,
      zipcode: params.formValues.permanentzipcode,
      type: (isChecked == "same") ? "same" : "perm",
      ddo_empaddress_id: params.formValues.ddo_employee_per_address_id,
      ddo_employee_id: params.ddo_employee_id
    }
  },
  /*
   * The function submitBtnAjaxCallForUpdate is making an ajax call to updated the employee address in EmployeeAddress view.
   * @param btn - The save button reference.
   * @param record - record is an object .    
   */
  submitBtnAjaxCallForUpdate: function (btn, record) {
    var promiseFormUpdate = new Promise(function (resolve, reject) {
      Ext.Ajax.request({
        scope: this,
        url: '/employeeaddress',
        method: 'PUT',
        params: record,
        success: function (res) {
          var resolveObj = {};
          resolveObj.res = res;
          resolve(resolveObj);
        },
        failure: function (res) {
          reject(res);
        }
      });
    });
    promiseFormUpdate.then(function (resolveObj) {
      var records;
      records = JSON.parse(resolveObj.res.responseText);
      var store = Ext.getStore('setup.employeesetup.EmployeeStore');
      var empSetupWindow = btn.up('window'),
        emploueeSetupTabpanel = empSetupWindow.down('tabpanel');
      emploueeSetupTabpanel.setActiveItem(6);
      store.load();
      employeeSetupLoading.hide();
      Ext.Msg.alert('success', records.message);
    }).catch(function (res) {
      Ext.Msg.alert('Failed', Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.ADDRESS.FAILMSGUPDATE);
      employeeSetupLoading.hide();
    });
  },
  /*
   * The function submitBtnAjaxCallForCreate is making an ajax call to insert the employee address in EmployeeAddress view.
   * @param params1 - params1 is an object .
   * @param { Ext.form.field.Field} 'isChecked'which is the form field. 
   * @param - Pointing to the EmployeeAddressController.    
   */
  submitBtnAjaxCallForCreate: function (params1, isChecked, me) {
    var promiseFormCreate = new Promise(function (resolve, reject) {
      Ext.Ajax.request({
        scope: me,
        url: '/employeeaddress',
        method: 'POST',
        params: {
          currentdetails: Ext.encode(params1.currentDetails),
          permanentdetails: Ext.encode(params1.permanentDetails),
          isChecked: isChecked,
          ddo_employee_id: params1.ddo_employee_id
        },
        success: function (batch, opt) {
          var resolveObj = {};
          resolveObj.res = batch;
          resolveObj.form = params1.form;
          resolveObj.me = me;
          resolve(resolveObj);
        },
        failure: function (res) {
          reject(res);
        }
      });
    });
    promiseFormCreate.then(function (resolveObj) {
      var records;
      records = JSON.parse(resolveObj.res.responseText);
      if (resolveObj.res.responseText) {
        var jsonData = resolveObj.res.responseText,
          addressValues = Ext.decode(jsonData).data,
          cur_address_field = resolveObj.form.down('hiddenfield[name = ddo_employee_cur_address_id]'),
          per_address_field = resolveObj.form.down('hiddenfield[name = ddo_employee_per_address_id]');
        // me.addressCheckedClick(addressValues, cur_address_field, per_address_field);
      }
      me.storeLoadFunction(resolveObj);
      Ext.Msg.alert('Success', records.message);
    }).catch(function (res) {
      Ext.Msg.alert('Failed', Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.ADDRESS.FAILTOADD);
      employeeSetupLoading.hide();
    });
  },
  /** 
   * This function will fired when the ajax call is successfull and resolve Object pass to '.then' . 
   * This function will checked that address is same or different.
   */
  addressCheckedClick: function (addressValues, cur_address_field, per_address_field) {
    if (addressValues.length > 0) {
      if (addressValues[0].type == "same") {
        cur_address_field.setValue(addressValues[0].ddo_empaddress_id);
      } else {
        for (var i = 0; i < addressValues.length; i++) {
          if (addressValues[i].type == "temp") {
            cur_address_field.setValue(addressValues[i].ddo_empaddress_id);
          }
          if (addressValues[i].type == "perm") {
            per_address_field.setValue(addressValues[i].ddo_empaddress_id);
          }
        }
      }
    }
  },
  /**
   * this function will loading the store after  the address row is created successfully.
   * @param {Object} "resolveObj"- it is an object.
   */
  storeLoadFunction: function (resolveObj) {
    var empSetupWindow = resolveObj.me.getView().up('employeesetupwindow'),
      emploueeSetupTabpanel = empSetupWindow.down('tabpanel'),
      viewModel = empSetupWindow.getViewModel(),
      store = Ext.getStore('setup.employeesetup.EmployeeStore');
    emploueeSetupTabpanel.setActiveItem(6);
    store.load();
    employeeSetupLoading.hide();
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
   * The function onAddressChange will perform when the  'change' event of the filefield is fired in the  EmployeeAddress.js file.
   * If we will edit any value in form field then this function unable the save butten in EmployeeAddress view. 
   * @param { Ext.form.field.Field} 'combo'which is the form field.
   * @param {object} 'newValue' which takes the new value.
   * @param {object} 'oldVal' which takes the old value.
   * @param {object} 'eOpts' which is the object.
   */
  onAddressChange: function (combo, newVal, oldVal, eOpts) {
    try {
      var vm = this.getViewModel(),
        form = combo.up('form'),
        rec = form.getValues();
      if (newVal) {
        if ((!Ext.isEmpty(rec.currentcityid)) || (!Ext.isEmpty(rec.currentcountryid)) || (!Ext.isEmpty(rec.currentdetails)) || (!Ext.isEmpty(rec.currentregionid)) || (!Ext.isEmpty(rec.permanentcityid)) || (!Ext.isEmpty(rec.permanentcountryid)) || (!Ext.isEmpty(rec.permanentdetails)) || (!Ext.isEmpty(rec.permanentregionid)) || (!Ext.isEmpty(rec.permanentzipcode)) || (!Ext.isEmpty(rec.zipcode))) {

          vm.set('addresssavebutton', false);
        } else {
          vm.set('addresssavebutton', true);
        }
      }
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.ADDRESS.SAVEBTNUNABLE, err);
    }
  }
});