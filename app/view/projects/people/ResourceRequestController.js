/**
 * The file ResourceRequestController is the controller for 'DDO.view.projectrequest.ProjectRequest'.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.resourcerequestcontroller'.
 */
Ext.define('DDO.view.projects.people.ResourceRequestController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.resourcerequestcontroller',


  /** 
  * The function onAddToProjectClick is responsible to store data in an array and to send updated records for approval.
  * @param {Ext.button.Button} 'btn' which is a resource button.
  */
  onAddToProjectClick: function (btn) {
    try {
      var peopleStore,
        empArr = [],
        count = 0,
        isUpdate = this.getView().getViewModel().getData().isUpdate;
      if (isUpdate == 'update') {
        peopleStore = this.getView().down('[reference=peoplesearchviewadv]').getStore().getUpdatedRecords();
      } else {
        peopleStore = this.getView().down('resourcerequestlist').getStore();
      }
      if (isUpdate == 'update') {
        for (var index in peopleStore) {
          let data = peopleStore[index];
          let allocateParams = {};
          allocateParams.projectId = data.data.project_id;
          allocateParams.employeeID = data.data.cbpid;
          allocateParams.enddate = data.data.enddateval;
          allocateParams.startdate = data.data.startdateval;
          allocateParams.roleName = data.data.projectroleid;
          allocateParams.percentAlloc = data.data.allocationperct
          allocateParams.shadowResouce = data.data.shadow_resource || 'N';
          allocateParams.projectAllocationId = data.data.ddo_project_allocation_id;
          empArr.push(allocateParams);
        }
      } else {
        this.elseUpdateCase(peopleStore, empArr);
      }
      this.projectApprovalUpdateAjax(empArr, count, isUpdate, peopleStore);
    } catch (err) {
      Utility.showToast(Messages.RESOURCEREQUEST.TOAST.ADDPROJECTCLICK, err);
    }
  },
  /**
   * The function elseUpdateCase is responsible for populating the array in else case and it is fired from  onAddToProjectClick.
   * @param {store} 'peopleStore' which holds the store.
   * @param {array} 'empArr' which is an array of form data.
   */
  elseUpdateCase: function (peopleStore, empArr) {
    peopleStore.each(function (record) {
      let allocateParams = {};
      allocateParams.projectId = record.get("choose_project");
      allocateParams.employeeID = record.get("employee_id");
      allocateParams.enddate = record.get("enddateval");
      allocateParams.startdate = record.get("startdateval");
      allocateParams.roleName = record.get("projectroleId");
      allocateParams.percentAlloc = record.get("allocationperct");
      allocateParams.shadowResouce = record.get("shadow_resource");
      empArr.push(allocateParams);
    });
  },

  /** 
  Callback function of "onAddToProjectCLick" to perform ajax request to update records which are updated in the grid 
  on click of request button.
  * @param {array} 'empArr' which is an array of form data.
  * @param {number} 'count' which is being send as param.
  * @param {null} 'isUpdate' checks for the isUpdate value.
  * @param {store} 'peopleStore' which takes the peopleViewStore. 
  */
  projectApprovalUpdateAjax: function (empArr, count, isUpdate, peopleStore) {
    var params;
    var me = this;
    Ext.getBody().mask('..Loading');
    var promiseUpdateAjax = new Promise(function (resolve, reject) {
      Ext.Ajax.request({
        url: Api.URL.projectapproval.READER,
        scope: this,
        timeout: 90000,
        method: "POST",
        jsonData: Ext.JSON.encode(empArr),
        params: {
          count: count
        },
        success: function (response, opts) {
          var resolveObj = {};
          resolveObj.response = response;
          resolve(resolveObj);
        },
        failure: function (response, opts) {
          reject(response);
        }
      });
    });
    promiseUpdateAjax.then(function (resolveObj) {
      if (resolveObj.response.responseText) {
        var obj = Ext.decode(resolveObj.response.responseText);
        Ext.Msg.alert('', obj.message);
      }
      if (isUpdate == 'update') {
        var peopleViewStore = me.getView().down('[reference=peoplesearchviewadv]').getStore();
        if (peopleViewStore) {
          peopleViewStore.removeAll();
          me.getView().down('[reference=newAllocationRadio]').setValue(true);
        }
        me.getView().down('[reference=add_to_project]').setDisabled(true);
        // peopleViewStore.reload();
      } else {
        peopleStore.removeAll();
        me.getView().down('[text=Request]').setDisabled(true);
        me.getView().down('[reference=add_to_project]').setDisabled(true);
        me.getView().down('[reference=projectselect]').setValue('');
      }
      Ext.getBody().unmask();
      me.getView().down('[text=Request]').setDisabled(true);
    }).catch(function (err) {
      Utility.showToast(Messages.RESOURCEREQUEST.TOAST.UPDATEAJAX, err);
      Ext.getBody().unmask();
    });
  },

  /**
   * The function onDateRange is resopnsible for the ajax request to get data.
   * @param {datefield} 'field' which takes a date field.
   * @param {value} 'value' the date value which is selected.
   */
  onDateRange: function (field, value) {
    try {
      var err = false, form, errMsg, startDate, endDate, confirmedDate;
      form = field.up('form');
      chooseProject = this.getView().down('form').getValues().choose_project;
      employeeCode = form.getValues().employee_id;
      // newStartDate = form.getValues().startDate;
      startDate = form.down('datefield[name=startdate]');
      params = {
        chooseProject: chooseProject,
        employeeCode: employeeCode,
        newStartDate: startDate.value
      }
      endDate = form.down('datefield[name=enddate]');
      if (field.name == "startdate") {
        this.getAjaxRequest(params);
        if (endDate && !Ext.isEmpty(endDate.value) && field.value > endDate.value) {
          err = true;
          errMsg = AlertMessages.startDateGreaterMsg;
        } else {
          //do nothing
        }
      } else if (field.name == "enddate") {
        if (startDate && !Ext.isEmpty(startDate.value) && field.value < startDate.value) {
          err = true;
          errMsg = AlertMessages.endDateLesserMsg;
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
      Utility.showToast(Messages.RESOURCEREQUEST.TOAST.DATERANGE, err);
    }
  },
  /**
   * The function getAjaxRequest is responsible for the ajax request to read the data.
   * @param {param} 'params' the params which are passed.
   */
  getAjaxRequest: function (params) {
    var me = this;
    var promiseUpdateAjax = new Promise(function (resolve, reject) {
      Ext.Ajax.request({
        url: Api.URL.projectapproval.READALLOC,
        params: params,
        scope: me,
        method: 'GET',
        success: function (response, data) {
          var resolveObj = {};
          resolveObj.response = response;
          resolve(resolveObj);
        },
        failure: function (response, data) {
          var rejectObj = {};
          rejectObj.response = response;
          reject(rejectObj);
        }
      });
    });
    promiseUpdateAjax.then(function (resolveObj) {
      var obj = Ext.decode(resolveObj.response.responseText);
      var resourcerequestwindowadd = me.getView().down('resourcerequestwindowadd');
      var alertMsg = resourcerequestwindowadd.down('[reference=message]');
      if (alertMsg) {
        alertMsg.setHtml(obj.message);
        if (!obj.message == '') {
          resourcerequestwindowadd.down('[reference=startDate]').setValue('')
        }
      }
    }).catch(function (rejectObj) {
      var obj = Ext.decode(rejectObj.response.responseText);
      var resourcerequestwindowadd = me.getView().down('resourcerequestwindowadd');
      if (resourcerequestwindowadd) {
        var alertMsg = resourcerequestwindowadd.down('[reference=message]');
      }
      if (alertMsg) {
        alertMsg.setHtml(obj.message);
      }
    })
  },
  /** 
  *Function to check for valid date and call onDateRange function
  * @param {Ext.dateField} 'dateField' which holds the date field.
  * @param {Ext.event.Event} 'e' The focusleave event.
  * @param {object} 'eOpts' the options object which is passed.
  */

  onKeyDownDate: function (dateField, e, eOpts) {
    try {
      var val = dateField.getRawValue();
      var validvalue = Utility.isDate(val);
      dateField.setValue(validvalue)
      if (validvalue) {
        this.onDateRange(dateField, e, eOpts);
      }
    } catch (err) {
      Utility.showToast(Messages.RESOURCEREQUEST.TOAST.KEYDOWNDATE, err);
    }
  },
  /** 
  * The function onSelectProject is responsible to filter the past resources.
  * @param { Ext.form.field.ComboBox} 'combo' which takes a combobox.
  * @param {Ext.data.Model} 'record' the selected record.
  * @param {object} 'eOpts' the options object which is passed.
  */

  onSelectProject: function (combo, record, eOpts) {
    try {
      var projectId = record.data.ddo_project_id;
      combo.up('resourcerequestform').down('[reference=add_to_project]').setDisabled(false);
      view = Ext.ComponentQuery.query('mainviewport')[0];
      view.getViewModel().set('projectId', projectId);
      this.getView().getViewModel().getStore('peopleViewStore').load();
      var store = this.getView().getViewModel().getStore('peopleViewStore');
      store.filterBy(function (record) {
        if (record.data.status != "Past resources") {
          return true;
        }
      });
    } catch (err) {
      Utility.showToast(Messages.RESOURCEREQUEST.TOAST.SELECTPROJECT, err);
    }
  },
  /** 
  * The function onSaveButtonClick is to save the details entered in "ResourceRequestWindowAdd" to the store.
  * @param {Ext.button.Button} 'btn' which holds the save button. 
  */
  onSaveButtonClick: function (btn) {
    try {
      var peopleWindow, employeeName, startDate, roleName,
        allocationProjectStore, projectList, allocForm;
      var getForm = this.getView().down('resourcerequestwindowadd').down('form');
      peopleWindow = Ext.ComponentQuery.query('resourcerequestwindowadd')[0];
      employeeName = peopleWindow.down('[name=employee_id]').rawValue;
      startDate = peopleWindow.down('[name=startdate]').value;
      endDate = peopleWindow.down('[name=enddate]').value;
      roleName = peopleWindow.down('[name=projectrole]').rawValue;
      allocationProjectStore = this.getView().getViewModel().getStore('allocationProjectStore');
      projectList = this.getView().down('form').getValues().choose_project;
      allocForm = getForm.getValues();
      allocForm.choose_project = projectList;
      allocForm.empfullname = employeeName;
      allocForm.projectroleId = allocForm.projectrole;
      allocForm.projectrole = roleName;
      allocForm.startdateval = startDate;
      allocForm.enddateval = endDate;
      allocationProjectStore.add(allocForm);
      this.getView().down('[text=Request]').setDisabled(false);
      peopleWindow.close();
    } catch (err) {
      Utility.showToast(Messages.RESOURCEREQUEST.TOAST.SAVEBUTTON, err);
    }
  },
  /**
  * The function onUpdateButtonClick is to update the record on which the update window opened by filling the update window.
  * @param {Ext.button.Button} 'btn' which holds the update button.
  */
  onUpdateButtonClick: function (btn) {
    try {
      var startDate,
        acllocForm = this.getView().down('resourcerequestwindowupdate').down('form'),
        startDate = this.getView().down('resourcerequestwindowupdate').down('[reference=startDate]').getValue(),
        endDate = this.getView().down('resourcerequestwindowupdate').down('[reference=endDate]').getValue(),
        projectrolename = this.getView().down('resourcerequestwindowupdate').down('[name=projectrole]').getSelection().data.name;
      var values = acllocForm.getValues();
      var record = acllocForm.getRecord();
      values.startdateval = startDate;
      values.enddateval = endDate;
      record.set('allocationperct', values.allocationperct);
      record.set('projectroleid', values.projectrole);
      record.set('projectrole', projectrolename);
      record.set('startdate', values.startdate);
      record.set('enddate', values.enddate);
      record.set('shadow_resource', values.shadow_resource || 'N');
      record.set('startdateval', startDate);
      record.set('enddateval', endDate);
      this.getView().down('resourcerequestwindowupdate').close();
      this.getView().down('[text=Request]').setDisabled(false);

    } catch (err) {
      Utility.showToast(Messages.RESOURCEREQUEST.TOAST.UPDATEBUTTON, err);
    }
  },

  /**
  * The function onResetButtonClick is to reset the "ResourceRequestWindowAdd" form window.
  * @param {Ext.button.Button} 'value' which is the reset button.
  */

  onResetButtonClick: function (value) {
    try {
      var getForm = this.getView().down('resourcerequestwindowadd').down('form');
      if (getForm) {
        getForm.reset();
      }
    } catch (err) {
      Utility.showToast(Messages.RESOURCEREQUEST.TOAST.RESETBUTTON, err);
    }
  },

  /**
  *The function onClickButtonResource is to resource button,to add new resource to the new allocation grid.
  * @param {Ext.button.Button} 'btn' which is the button.
  */
  onClickButtonResource: function (btn) {
    try {
      var win = this.getView().add({
        xtype: 'resourcerequestwindowadd',
      })
      this.getView().up('mainviewport').mask();
      win.show();
    } catch (err) {
      Utility.showToast(Messages.RESOURCEREQUEST.TOAST.BUTTONRESOURCE, err);
    }
  },
  /** 
  *The function onCloseBtnClickWindwAdd to close the "ResourceRequestWindowAdd" window with close button.
  */
  onCloseClickWindwAdd: function () {
    try {
      this.getView().up('mainviewport').unmask();
    } catch (err) {
      Utility.showToast(Messages.RESOURCEREQUEST.TOAST.CLOSEBUTTON, err);
    }
  },

  /**
  * The function onEmployeeComboSearch is to search the combobox.
  * @param {Object} 'search' An object containing details about the query to be executed.
  */

  onEmployeeComboSearch: function (search) {
    try {
      search.query = new RegExp(search.query, 'i');
      search.forceAll = true;
    } catch (err) {
      Utility.showToast(Messages.RESOURCEREQUEST.TOAST.EMPLOYEECOMBO, err);
    }
  },
/**
 * The function onEmployeeSelect is responsible for setting the current projects to the user
  */
  onEmployeeSelect: function (combo, record, eOpts, employeeid) {
    var me = this;
    var empId = employeeid ? employeeid : combo.getValue();
    var pname = null;
    Ext.getStore('profile.ProjectSummaryStore').load({
      params: {
        employeeid: empId
      }
    });
  },

  /*
  * The function onSelectNewAllocation is responsible to allocate new resource and its details thus,adding the resource details to the new allocation grid
  */

  onSelectNewAllocation: function () {
    try {
      var peopleViewGrid = this.getView().lookupReference('peoplesearchview');
      var projectPeopleViewGrid = this.getView().lookupReference('peoplesearchviewadv');
      var length = peopleViewGrid.getStore().getData().length;
      var proSummaryStore = Ext.getStore('profile.ProjectSummaryStore')
      proSummaryStore.removeAll();
      if (length > 0) {
        if (!Utility.countRadioNewAllocation > 0) {
          Ext.MessageBox.confirm(
            'Confirm', '<p>Are you sure you want to leave this page?</p> <p> Your Changes will be removed.</p>', callbackFunction);
          function callbackFunction(btn) {
            if (btn == 'yes') {
              projectPeopleViewGrid.show();
              peopleViewGrid.hide();
              peopleViewGrid.getStore().removeAll();
            } else {
              Utility.countRadioNewAllocation++;
              Ext.ComponentQuery.query('projectrequest')[0].down('[reference=newAllocationRadio]').setValue(true);
            }
          };
        } else {
          Utility.countRadioNewAllocation = 0;
        }
      } else {
        projectPeopleViewGrid.show();
        peopleViewGrid.hide();
      }
      this.getView().down('[reference = add_to_project]').setVisible(false);
      this.getView().getViewModel().set('isUpdate', 'update');
      this.getViewModel().set('editMode', true);
    } catch (err) {
      Utility.showToast(Messages.RESOURCEREQUEST.TOAST.NEWALLOCATION, err);
    }
  },

  /** 
  *The function onClickUpdateAllocation is to show grid to update the project details.
  */

  onClickUpdateAllocation: function () {
    try {
      var peopleViewGrid = this.getView().lookupReference('peoplesearchview');
      var projectPeopleViewGrid = this.getView().lookupReference('peoplesearchviewadv');
      var length = projectPeopleViewGrid.getStore().getUpdatedRecords().length;
      var proSummaryStore = Ext.getStore('profile.ProjectSummaryStore')
      proSummaryStore.removeAll();
      if (length > 0) {
        if (!Utility.countRadioNewAllocation > 0) {
          Ext.MessageBox.confirm(
            'Confirm', '<p>Are you sure you want to leave this page?</p> <p> Your Changes will be removed.</p>', callbackFunction);
          function callbackFunction(btn) {
            if (btn == 'yes') {
              projectPeopleViewGrid.hide();
              peopleViewGrid.show();
              projectPeopleViewGrid.getStore().reload();
            } else {
              Utility.countRadioNewAllocation++;
              Ext.ComponentQuery.query('projectrequest')[0].down('[reference=updateAllocationRadio]').setValue(true);
            }
          };
        } else {
          Utility.countRadioNewAllocation = 0;
        }
      } else {
        projectPeopleViewGrid.hide();
        peopleViewGrid.show();
      }
      this.getView().getViewModel().set('isUpdate', 'save');
      this.getView().down('[reference = add_to_project]').setVisible(true);
      projectPeopleViewGrid.hide();
      peopleViewGrid.show();

      this.getViewModel().set('editMode', false);
    } catch (err) {
      Utility.showToast(Messages.RESOURCEREQUEST.TOAST.UPDATEALLOCATION, err);
    }
  },

  /** 
  * The function onClickCloseBtn is to close the update window with close button.
  */
  onClickCloseBtn: function () {
    try {
      this.getView().up('mainviewport').unmask();
    } catch (err) {
      Utility.showToast(Messages.RESOURCEREQUEST.TOAST.CLICKCLOSEBUTTON, err);
    }
  }
});

