 /**
 * This is controller for view 'DDO.view.profile.editPersonelDetails.EditPersonelDetailsWindow'.
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.editpersoneldetailwindowcontroller'
 */
Ext.define('DDO.view.profile.EditPersonelDetailWindowController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.editpersoneldetailwindowcontroller',

  /**
   * Actions requires for personal details change event.
   * @param {Object} combo, View Reference of Combobox
   * @param {String} newVal, Newly Modified code
   * @param {String} oldVal, Old Value of the field
   * @param {Object} eOpts, Event Object 
   */
  onPersonalDetailsChange: function(combo, newVal, oldVal, eOpts) {
    try {
      var vm = this.getViewModel();
      if (newVal) {
        vm.set('editpersoneldetailswindowsave', false);
      }
    } catch (err) {
        Utility.showToast(Messages.PROFILE.PERSONALDETAILSCHANGE, err);
    }
  },

  /**
   * Handler is responsible for canceling employee details updation
   */
  onFormCancelClick: function() {
    try {  
      var winn = this.getView();
      winn.close();
    } catch (err) {
        Utility.showToast(Messages.PROFILE.FORMCANCEL, err);
    }
  },


/**
 * This handler is responsible for employee details updation
 * @param {Object} btn, view reference of button which clicked
 * @param {Object} eOpts, Event  Object
 */
  onPersonalDetailsFormSaveClick: function(btn, e, eOpts) {
    try {
        var store,
        form,
        rec,
        employeesetupWindow,
        emploueeSetupTabpanel,
        ddo_employee_id,
        employeeSetupLoading,
        currentDetails,
        permanentDetails,
        isChecked,
        personal_rec = {},
        address_rec = {};
      form = btn.up('form');
      rec = form.getValues();

      if (rec.ischecked == "on") {
        isChecked = "same"
      } else {
        isChecked = "temp"
      }
      currentDetails = {
        details: rec['addresses[0].details'],
        city: rec['addresses[0].city'],
        state: rec['addresses[0].state'],
        country: rec['addresses[0].country'],
        zipcode: rec['addresses[0].zipcode'],
        type: (isChecked == "same") ? "same" : "temp",
        ddo_employee_id: ddo_employee_id
      },

      permanentDetails = {
        details: rec['addresses[1].details'],
        city: rec['addresses[1].city'],
        state: rec['addresses[1].state'],
        country: rec['addresses[1].country'],
        zipcode: rec['addresses[1].zipcode'],
        type: (isChecked == "same") ? "same" : "perm",
        ddo_employee_id: ddo_employee_id
      };

      editpersoneldetailWindow = btn.up('window');
      var DDO_employee_id = (Ext.getStore('login').getAt(0).get('ddo_employee_id'));
      if (rec.ddo_employee_id = DDO_employee_id) {
        store = Ext.getStore('setup.employeesetup.EmployeeStore');
        if (rec['personaldetails.dob']) {
          var dobSplit = rec['personaldetails.dob'].split("-");
          var dob = dobSplit[2] + '-' + dobSplit[1] + '-' + dobSplit[0];
          rec['personaldetails.dob'] = dob;

        }
        if (rec['personaldetails.anniversarydate']) {
          var anvDateSplit = rec['personaldetails.anniversarydate'].split("-");
          var anvDate = anvDateSplit[2] + '-' + anvDateSplit[1] + '-' + anvDateSplit[0];
          rec['personaldetails.anniversarydate'] = anvDate;

        }

        if (Ext.isEmpty(rec.aadharno) && Ext.isEmpty(rec.anniversarydate) && Ext.isEmpty(rec["personaldetails.bloodgroup"]) && Ext.isEmpty(rec.dob) && Ext.isEmpty(rec.maritalstatus) && Ext.isEmpty(rec["personaldetails.panno"]) && Ext.isEmpty(rec.phoneno)) {
          console.log('no personal data');
        } else {
          employeePersonelDetailLoading = new Ext.LoadMask({
            msg: '',
            target: editpersoneldetailWindow
          });

          employeePersonelDetailLoading.show();

          if ( (!Ext.isEmpty(rec['personaldetails.ddo_emppersonaldetails_id'])) ) {

            if (Ext.isEmpty(rec['personaldetails.anniversarydate'])) {
              rec['personaldetails.anniversarydate'] = null;
            }
            if (Ext.isEmpty(rec['personaldetails.dob'])) {
              rec['personaldetails.dob'] = null;
            }
            //for employee personel details
            if (rec) {


              personal_rec.ddo_employee_id = rec['DDO_employee_id'];
              personal_rec.aadharno = rec['personaldetails.aadharno'];
              personal_rec.anniversarydate = rec['personaldetails.anniversarydate'];
              personal_rec.bloodgroup = rec['personaldetails.bloodgroup'];
              personal_rec.dob = rec['personaldetails.dob'];
              personal_rec.gender = rec['personaldetails.gender'];
              personal_rec.maritalstatus = rec['personaldetails.maritalstatus'];
              personal_rec.panno = rec['personaldetails.panno'];
              personal_rec.phoneno = rec['personaldetails.phoneno'];
              personal_rec.emergencyphoneno = rec['personaldetails.emergencyphoneno'];
            }
            if ( (!Ext.isEmpty(rec)) ) {

              var newRec = {};

              newRec.currentDetails = {
                details: rec['addresses[0].details'],
                city: rec['addresses[0].city'],
                state: rec['addresses[0].state'],
                country: rec['addresses[0].country'],
                zipcode: rec['addresses[0].zipcode'],
                type: (isChecked == "same") ? "same" : "temp",
                ddo_empaddress_id: rec.ddo_employee_cur_address_id,
                ddo_employee_id: DDO_employee_id
              }
              newRec.permanentDetails = {
                details: rec['addresses[1].details'],
                city: rec['addresses[1].city'],
                state: rec['addresses[1].state'],
                country: rec['addresses[1].country'],
                zipcode: rec['addresses[1].zipcode'],
                type: (isChecked == "same") ? "same" : "perm",
                ddo_empaddress_id: rec.ddo_employee_per_address_id,
                ddo_employee_id: DDO_employee_id
              }

              if (rec.ischecked == "on") {
                newRec.isChecked = "same"
              } else {
                newRec.isChecked = "temp"
              }
              var personaldetails = {
                ddo_emppersonaldetails_id: rec['personaldetails.ddo_emppersonaldetails_id'],
                obj: Ext.encode(personal_rec)

              };



              Ext.Ajax.request({
                scope: this,
                url: '/personaldetails',
                method: 'PUT',
                params: personaldetails,
                success: function() {
                  Ext.Msg.alert('Success', 'Successfully Updated Employee Personal Details');
                  store.load();
                  var editpersoneldetailWindow = btn.up('window');
                  employeePersonelDetailLoading.hide();

                  Ext.Ajax.request({
                    url: '/employeeaddress',
                    method: 'post',
                    params: {
                      currentdetails: Ext.encode(currentDetails),
                      permanentdetails: Ext.encode(permanentDetails),
                      isChecked: isChecked,
                      ddo_employee_id: DDO_employee_id
                    },
                    success: function(batch, opt) {

                      if (batch.responseText) {
                        var jsonData = batch.responseText;
                        Ext.Msg.alert('Success', 'Successfully Updated  Employee address ');
                      }
                    },

                    failure: function(res) {
                  
                      // Ext.Msg.alert('Failed', 'Failed to Update Employee address Details');
                      employeePersonelDetailLoading.hide();

                    }

                  });

                },
                failure: function() {
                  Ext.Msg.alert('Failed', 'Failed to Update Employee Personal Details');
                  employeePersonelDetailLoading.hide();

                }

              });

            }

          } 
          else {
            Ext.Ajax.request({
              url: '/personaldetails',
              method: 'POST',
              params: rec,
              success: function(batch, opt) {
                if (batch.responseText) {
                  var jsonData = batch.responseText,
                    ddo_emppersonaldetails_id = Ext.decode(jsonData).ddo_emppersonaldetails_id;
                  form.down('hiddenfield').setValue(ddo_emppersonaldetails_id);
                }

                var editpersoneldetailWindow = Ext.ComponentQuery.query('editpersoneldetailwindow')[0],
                  store = Ext.getStore('setup.employeesetup.EmployeeStore');

                Ext.Msg.alert('Success', 'Successfully Added Employee Personal Details');
                store.load();
                employeePersonelDetailLoading.hide();


              },
              failure: function() {
                Ext.Msg.alert('Failed', 'Failed to Add Employee Personal Details');
                employeePersonelDetailLoading.hide();

              }

            });
          }
        }
      }
      ;

      editpersoneldetailWindow.close();
    } catch (err) {
        Utility.showToast(Messages.PROFILE.UPDATEPERSONALDETAILS, err);
    }
  },

  /**
   * This handler is responsible for change in marital status data and related actions.
   * @param {Object} combo, view reference of combobox
   * @param {Object} eOpts, Event Object 
   */
  onMartialStaus: function(combo, e, eOpts) {
    try {
      var view = this.getView(),
        anvDt = view.down('datefield[name=personaldetails.anniversarydate]');
      if (combo.getRawValue() == "Single") {
        anvDt.setReadOnly(true);
        anvDt.setValue(null);
        anvDt.disable();
      } else {
        anvDt.setReadOnly(false);
        anvDt.enable();
      }
    } catch (err) {
        Utility.showToast(Messages.PROFILE.MARTIALSTATUS, err);
    }
  },

/**
 * Handler responsible for date related changes.
 * @param {Object} field, View reference of date field. 
 * @param {Object} value, Date object
 * @param {Object} eOpts, Event Object
 */
  onDateRange: function(field, value, eOpts) {
    try {
      var err = false,
        form,
        errMsg,
        sdobDate,
        anvDt;

      form = field.up('form');

      dobDate = form.down('datefield[name=personaldetails.dob]');
      anvDt = form.down('datefield[name=personaldetails.anniversarydate]');
      if (field.name == "personaldetails.dob") {
        if (anvDt && !Ext.isEmpty(anvDt.value) && field.value > anvDt.value) {
          err = true;
          errMsg = "Date of Birth should not be after Anniversary Day!";
        } else {
          //do nothing
        }
      } else if (field.name == "personaldetails.anniversarydate") {
        if (dobDate && !Ext.isEmpty(dobDate.value) && field.value < dobDate.value) {
          err = true;
          errMsg = "Anniversary Date should not be before Date of Birth!";
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
        Utility.showToast(Messages.PROFILE.DATERANGECHANGE, err);
    }
  },

  /**
   * Handler responsible for date field changes.
   * @param {Object} me, view reference  of combobox
   * @param {String} newValue, newly modified value
   * @param {String} oldValue, Previous value before change
   * @param {Object} eOpts, Event Object 
   */
  onDateRangeChange: function(me, newValue, oldValue, eOpts) {
    try {  
      // me.triggers.cancel.show();
      var dateValues = newValue.split(" - "),
        startDateValue = dateValues[0].split("-");
      if (dateValues[1]) {
        toDateValue = dateValues[1].split("-")
      }
      var startDateFormat = startDateValue[2] + "-" + startDateValue[1] + "-" + startDateValue[0],
        endDateFormat = toDateValue[2] + "-" + toDateValue[1] + "-" + toDateValue[0];
    } catch (err) {
        Utility.showToast(Messages.PROFILE.DATERANGECHANGE, err);
    }
  },

  /**
   * Key operations on date field
   * @param {Object} dateField, Datefield view reference 
   * @param {Object} eOpts, Event Object
   */
  onKeyDownDate: function(dateField, e, eOpts) {
    try {
      var val = dateField.getRawValue();
      var validvalue = Utility.isDate(val);
      ;
      dateField.setValue(validvalue)
      if (validvalue) {
        this.onDateRange(dateField, e, eOpts)
      }
    } catch (err) {
        Utility.showToast(Messages.PROFILE.KEYDATEOPERATION, err);
    }
  }
});