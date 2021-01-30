/**
 * The file EmployeesInNoticePeriodController is the viewcontroller for 'DDO.view.noticeperiod.EmployeesInNoticePeriodView'.
 * @extends {Ext.app.ViewController}.
 * @alias 'controller.employeesinnoticeperiodcontroller'
 */
Ext.define('DDO.view.noticeperiod.EmployeesInNoticePeriodController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.employeesinnoticeperiodcontroller',
   /**
   * The function OnBackButtonclick is responsible to go to the previous view and refreshing the current page.
   * @param {Ext.button.Button} 'btn' which is the back button. 
   */
  OnBackButtonclick: function(btn) {
    try {
      var vm = this.getViewModel(),
      noticePeriodView =btn.up('employeesinnoticeperioddataview'),
      progressBarView =  noticePeriodView.down('employeenoticeperiodprogressbar')
        cardsview =noticePeriodView.down('employeesinnoticeperiodcards'),
        itemId = cardsview.getLayout().prev(true, true).getItemId(),
        progressbar =progressBarView.getViewModel().set('activeItemIndex', itemId);
        progressBarView.refresh();
      this.setViewModelBack(itemId,vm);
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.BACK, err);
    }
  },
  /**
   * The function setViewModelBack is responsible for the visibility of buttons by clicking on the back button.
   * @param {number} 'itemId' it will get the itemid number. 
   * @param {EmployeesInNoticePeriodViewModel} 'vm' which holds the current file view model. 
   */
  setViewModelBack : function(itemId,vm){
    if (itemId == 'with_project') {
      vm.set('nextbuttonUniqueEnable', false);
      vm.set('requestbuttonUniqueEnable', false);
      vm.set('submitButtonUniqueEnable', true);
      vm.set('backButtonUniqueEnable', false);
      vm.set('nextbuttonUniqueEnablee', true);
    }
    if (itemId == 'with_asset') {
      vm.set('nextbuttonUniqueEnable', false);
      vm.set('requestbuttonUniqueEnable', true);
      vm.set('submitButtonUniqueEnable', true);
      vm.set('backButtonUniqueEnable', false);
    }
    if (itemId == 'with_hr') {
      vm.set('nextbuttonUniqueEnable', false);
      vm.set('requestbuttonUniqueEnable', true);
      vm.set('submitButtonUniqueEnable', true);
      vm.set('backButtonUniqueEnable', true);
      vm.set('nextbuttonUniqueEnablee', false);
    }
  },
  /**
   * The function OnNextButtonclick is responsible to get the next layout based on the active card.
   * @param {Ext.button.Button} 'btn' which is the next button. 
   */
  OnNextButtonclick: function(btn) {
    try {
      var params,view,proposedDate,remarks,
        empid = this.getViewModel().get('empid');
        var noticePeriodView = btn.up('employeesinnoticeperioddataview'),
           progressvarView = noticePeriodView.down('employeenoticeperiodprogressbar');
      var cardsview = noticePeriodView.down('employeesinnoticeperiodcards'),
        nextItem = cardsview.getLayout().next(true, true);
        if(nextItem.xtype == 'employeesinnoticeperiodproject'){
          nextItem.getStore().reload();
        }
       
        var itemId = nextItem.getItemId();
      var progressbar =progressvarView.getViewModel().set('activeItemIndex', itemId);
      progressvarView.refresh();
      this.nextwithproject(empid, params, view, proposedDate, remarks, itemId, btn)
      this.nextwithasset(params, empid, itemId, btn)
      this.nextwithfinalhr(itemId, empid, params, btn)
      progressvarView.refresh();
      if(nextItem.xtype == 'employeesinnoticeperiodhradv'){
        // debugger;
        var dataView =this.getView().down('employeesinnoticeperioddataview'),
             hrAdv = dataView.down('employeesinnoticeperiodcards').down('employeesinnoticeperiodhradv');
             var remarksCombo = hrAdv.down('[refernce = finalremarks]'),
                  value = remarksCombo.value;
             if(!Ext.isEmpty(value)){
              //  debugger;
               vm = this.getViewModel();
              vm.set('submitButtonUniqueEnablee',false);
             }
      }
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.NEXT, err);
    }
  },
  /**
   * The function nextwithproject is responsible to handle the buttons with respect to project card.
   * @param {number} 'empid' which holds the employee id value.
   * @param {undefined} 'params' the params which needs to be passed. 
   * @param {employeeinnoticeperiod} 'view' the variable which holds the view file of this controller. 
   * @param {undefined} 'proposedDate' which holds the start date.
   * @param {undefined} 'remarks' which holds the remarks of the form. 
   * @param {number} 'itemId' the item id which is selected. 
   * @param {Ext.button.Button} 'btn' which is the button. 
   */
  nextwithproject: function(empid, params, view, proposedDate, remarks, itemId, btn) {
    try {
      vm = this.getViewModel();
      if (itemId == 'with_project') {
        var employeeListStore,
        view = this.getView();
        proposedDate = view.down('[reference=startdate]').getValue(),
        // vm.set('proposedDate',proposedDate);
        noticePeriodView = btn.up('employeesinnoticeperiodview'),
        noticePeriodProject = noticePeriodView.down('employeesinnoticeperiodproject'),
        remarks = view.down('form').getValues().remarks,
        status = itemId.replace('_', ' '),
        grid_coloumns = noticePeriodProject.getStore().data.length;
        params = {
          proposeddate: proposedDate,
          remarks: remarks,
          status: status,
          empid: empid
        }
        if (grid_coloumns == 0) {
          vm.set('nextbuttonUniqueEnablee', false);
        } else {
          this.updateExitEmpAjax(params);
          vm.set('requestbuttonUniqueEnable', false);
          vm.set('backButtonUniqueEnable', false);
          vm.set('nextbuttonUniqueEnable', false);
          vm.set('submitButtonUniqueEnable', true);
          vm.set('nextbuttonUniqueEnablee', true);
        }
      }
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.NEXTPROJECT, err);
    }
  },
  /**
   * The function nextwithasset is responsible to handle the buttons with respect to the asset card.
   * @param {undefines} 'params' the variable which holds parameter. 
   * @param {number} 'empid' which holds the employee id. 
   * @param {string} 'itemId' the id of the clicked item. 
   * @param {Ext.button.Button} 'btn' the net button. 
   */
  nextwithasset: function(params, empid, itemId, btn) {
    try {
      var vm = this.getViewModel();
      if (itemId == 'with_asset') {
        var noticePeriodView = btn.up('employeesinnoticeperiodview'),
            assetsView = noticePeriodView.down('employeesinnoticeperiodassets');
        var grid_coloumns = assetsView.getStore().data.length;
       var myappsgridstore = this.getViewModel().getStore('myappsgridstore'); 
           myappsgridstore.getProxy().setExtraParams(empid);
           myappsgridstore.load();
        status = itemId.replace('_', ' ');
        if (grid_coloumns == 0) {
          vm.set('nextbuttonUniqueEnablee', false);
        } else {
          vm.set('nextbuttonUniqueEnable', false);
          vm.set('submitButtonUniqueEnable', true);
          vm.set('backButtonUniqueEnable', false);
          vm.set('nextbuttonUniqueEnablee', true);
        }
        params = {
          status: status,
          empid: empid
        }
        this.updateExitEmpAjax(params);
      }
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.NEXTASSET, err);
    }

  },
  /**
   * The function nextwithfinalhr is responsible to handle the buttons based on the finalhr card.
   * @param {string} 'itemId' the id of the clicked item.
   * @param {number} 'empid' which holds the employee id. 
   * @param {undefines} 'params' the variable which holds parameter.
   * @param {Ext.button.Button} 'btn' the net button. 
   */
  nextwithfinalhr: function(itemId, empid, params, btn) {
    try {
      var vm = this.getViewModel();
      if (itemId == 'final_hr') {
        status = itemId.replace('_', ' ');
        vm.set('nextbuttonUniqueEnable', true);
        vm.set('requestbuttonUniqueEnable', true);
        vm.set('submitButtonUniqueEnable', false);
        vm.set('backButtonUniqueEnable', false);
        vm.set('submitButtonUniqueEnablee', true);
        params = {
          status: status,
          empid: empid
        }
        this.updateExitEmpAjax(params);
      }
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.NEXTFINALHR, err);
    }
  },
  /**
   * The function onKeyDownDate is responsible to set the actual date in finalhr card with proposed date in hr card.
   */
  onKeyDownDate: function() {
    try {
      var noticePeriodHr = this.getView().down('employeesinnoticeperiodhr'),
          noticePeriodHrAdv = this.getView().down('employeesinnoticeperiodhradv');
      var proposedDate = noticePeriodHr.down('[xtype=datefield]').getValue()
      if (proposedDate !== null) {
        var ActualDate = noticePeriodHrAdv.down('[xtype=datefield]').setValue(new Date(proposedDate));
        noticePeriodHrAdv.down('[xtype=datefield]').setMinValue(proposedDate);
      }
     }
      catch (err) {
      Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.KEYDOWNDATE, err);
    }
  },


  onComponentActivate:function(compnt){
    var noticePeriodListView = this.getView().down('employeesnoticeperiodlist');
    compnt.mask('Loading...');
     var store = noticePeriodListView.getStore();
     store.reload();
     compnt.unmask();
    //  Ext.getBody().unmask();

  }, 
  /**
   * The function OnButtonActionClick is responsible to handle the buttons on action button click.
   * @param {Ext.button.Button} 'btn' the action button. 
   * @param {number} 'view' which item in the grid has been selected. 
   * @param {number} 'data' which contains the data number.
   */
  OnButtonActionClick: function(btn, view, data) {
    try {
       var vm = this.getViewModel();
    var store = btn.getStore(),
      employee_record = store.getAt(view);
    var noticePeriodView = btn.up('employeesinnoticeperiodview'),
        noticePeriodAssets = noticePeriodView.down('employeesinnoticeperiodassets'),
        noticeProgressBar =  noticePeriodView.down('employeenoticeperiodprogressbar'),
        noticePeriodCards = noticePeriodView.down('employeesinnoticeperiodcards');
    var grid_coloumns = noticePeriodAssets.getStore().data.length;
    var raw_status = btn.getStore().getAt(view).data.status,
      status = raw_status.replace(' ', '_');
    var progressbar = noticeProgressBar;
    var progressbarcards =noticePeriodCards;
    vm.set('progress_status', status);
    var progress_status = vm.getData().progress_status;
    var employeeid = btn.getStore().getAt(view).data.ddo_employee_id;
    vm.set('empid', employeeid);
    noticePeriodCards.down('employeesinnoticeperiodhr').loadRecord(employee_record);
        if (status == progress_status) {
      this.updateViewModelStatus(status,vm,grid_coloumns);
      noticePeriodView.getLayout().setActiveItem('noticeview');
      if (status != 'initial') {
        progressbar.getViewModel().set('activeItemIndex', progress_status);
      } else {
       progressbar.getViewModel().set('activeItemIndex', 'with_hr');
       progress_status = progressbar.getViewModel().get('activeItemIndex');
       vm.set('nextbuttonUniqueEnable', false);
       vm.set('requestbuttonUniqueEnable', true);
       vm.set('submitButtonUniqueEnable', true);
       vm.set('backButtonUniqueEnable', true);
       var noticeview = noticePeriodView,
            hrvalue = noticeview.down('employeesinnoticeperiodhr').getForm();
       hrvalue.reset();
      }
      progressbar.refresh();
      progressbarcards.getLayout().setActiveItem(progress_status);
      var empid = vm.getData().empid
          store = this.getView().down('employeesinnoticeperiodproject').getStore();
      params = {
        empid: empid
      }
      store.getProxy().setExtraParams(params);
      store.load();
    }
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.BUTTONACTIONCLICK, err);
    }
  },
    /**
   * The function updateViewModelStatus is responsible for updating the buttons based on the status.
   * @param {string} 'status' which holds the status of the project. 
   * @param {employeesinnoticeperiodviewmodel} 'vm' which contains viewmodel. 
   * @param {number} 'grid_coloumns' the length of the data. 
   */
updateViewModelStatus:function(status,vm,grid_coloumns){
  if (status == 'final_hr') {
    vm.set('nextbuttonUniqueEnable', true);
    vm.set('requestbuttonUniqueEnable', true);
    vm.set('submitButtonUniqueEnable', false);
    vm.set('backButtonUniqueEnable', false);
    vm.set('submitButtonUniqueEnablee', true);
  } else if (status == 'with_project') {
    vm.set('nextbuttonUniqueEnable', false);
    vm.set('requestbuttonUniqueEnable', false);
    vm.set('submitButtonUniqueEnable', true);
    vm.set('backButtonUniqueEnable', false);
    vm.set('nextbuttonUniqueEnablee', true);
  } else if (status == 'with_asset') {
    vm.set('nextbuttonUniqueEnable', false);
    vm.set('requestbuttonUniqueEnable', true);
    vm.set('submitButtonUniqueEnable', true);
    vm.set('backButtonUniqueEnable', false);
    if (grid_coloumns == 0) {
      vm.set('nextbuttonUniqueEnablee', false);
    } else {
      vm.set('nextbuttonUniqueEnablee', true);
    }
  } else if (status == 'with_hr') {
    vm.set('nextbuttonUniqueEnable', false);
    vm.set('requestbuttonUniqueEnable', true);
    vm.set('submitButtonUniqueEnable', true);
    vm.set('backButtonUniqueEnable', true);
  }
},
  /**
   * The function onSubmitButtonupdateClick is responsible for update ajax request by clicking on submit button.
   * @param {Ext.button.Button} 'btn' which contains submit button. 
   * @param {Event} 'view'  the click event.
   * @param {object} 'data' the options object passed. 
   */
  onSubmitButtonupdateClick: function(btn, view, data) {
    try {
      var hradvvalue = btn.up('employeesinnoticeperiodview').down('employeesinnoticeperiodhradv')
      actualdate = hradvvalue.down('[name=actual_date]').getValue(),
      // empStatus = hradvvalue.down('[name=empstatus]').getValue(),
      finalremarks = hradvvalue.down('[name=final_remarks]').getValue();
      var empid = this.getViewModel().getData().empid;
      params = {
        empid: empid,
        actualdate: actualdate,
        finalremarks: finalremarks
      }
      this.updateExitEmpAjax(params);
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.SUBMITBUTTONUPDATE, err);
    }
  },

   /**
   * The function updateExitEmpAjax is responsible for the ajax call of update method by clicking on submit button.
   * @param {params} 'params' which holds params. 
   */
  updateExitEmpAjax: function(params) {
    var me = this,
      promiseStatus = new Promise(function(resolve, reject) {
        Ext.Ajax.request({
          url: Api.URL.exitemployee.UPDATE,
          method: 'PUT',
          scope: this,
          params: params,
          success: function(response, data) {
            var resolveObj = {};
            resolveObj.response = response;
            resolveObj.data = data;
            resolve(resolveObj);
            Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.SUCCESS);
          },
          failure: function(response, data) {
            reject(response);
          }
        });
      });
    promiseStatus.then(function(resolveObj) {
      var data = Ext.decode(resolveObj.response.responseText);
      if (data.data == 'separated') {
        me.getView().getLayout().setActiveItem('noticegrid');
      }
      var noticePeriodView = me.getView(),
      employeeList = noticePeriodView.down('employeesnoticeperiodlist'),
      employeeListStore = employeeList.getStore('employeesnoticeperiodliststore');
      employeeListStore.reload();
    }).catch(function(err) {
      console.log('Failed to update the data !!!', err);
      Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.UPDATEEXITEMPAJAX, err);
    });
  },
  /**
   * The function onUpdateNoticeButtonClick is responsible to validate records of dates and making the button visible.
   * @param {Ext.button.Button} 'btn' which holds the update button. 
   */
   onUpdateNoticeButtonClick: function(btn) {
    try {
      var noticePeriodWindowAdd = this.getView().down('employeesinnoticeperiodwindowadd'),
       noticeform = noticePeriodWindowAdd.down('form'),
       noticePeriodProject = this.getView().down('employeesinnoticeperiodproject');
      var values = noticeform.getValues();
      var record = noticeform.getRecord();
      record.set('enddate', values.enddate);
      record.set('startdate', values.startdate);
      noticePeriodWindowAdd.close();
      var updatedrecords = noticePeriodProject.getStore().getUpdatedRecords().length;
      var records = noticePeriodProject.getStore().getData().length;
      if (updatedrecords == records) {
        this.getViewModel().set('requestbuttonUniqueEnablee', false);
      } else {
        this.getViewModel().set('requestbuttonUniqueEnablee', true);
      }
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.UPDATEBUTTONCLICK, err);
    }
  },

  updateEnddateInProjectalloc:function(allocateParams){
    var me = this;
    var view = me.getView();
    var promiseEnddateUpdate = new Promise(function(resolve, reject) {
      Ext.getBody().mask('..Loading');
      Ext.Ajax.request({
        url: Api.URL.exitemployee.ALLOCUPDATE,
        scope: me,
        timeout: 90000,
        method: "PUT",
        params: allocateParams,
        success: function(response, opts) {
          var resolveObj = {};
          resolveObj.response = response;
          resolveObj.opts = opts;
          resolveObj.view = view;
          resolve(resolveObj);
        },
        failure: function(response, opts) {

          Ext.getBody().unmask();
          reject(response);
        }
      });
    });
    promiseEnddateUpdate.then(function(resolveObj) {
      Ext.getBody().unmask();
      if (resolveObj.response.responseText) {
        var obj = Ext.decode(resolveObj.response.responseText);
        // Ext.Msg.alert('Success', 'Re Sent Successfully!');
        Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.SUCCESS);
      }
      resolveObj.view.lookupReference('buttonnext').setDisabled(false);
    }).catch(function(err) {
      console.log(' Failed to update project allocation table!!!', err);
      Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.PROJECTENDDATE, err);
    });
  },

 /**
 * The function projectAjax is responsible for ajax request to get data and show in the project grid.
 * @param {number} 'count' which contains the count number 
 * @param {array} 'empArr' the array which contains object. 
 */
  projectAjax: function(count, empArr) {
    var params;
    var me = this;
    var view = me.getView();
    var promiseProjectApproval = new Promise(function(resolve, reject) {
      Ext.getBody().mask('..Loading');
      Ext.Ajax.request({
        url: Api.URL.projectapproval.READER,
        scope: this,
        timeout: 90000,
        method: "POST",
        jsonData: Ext.JSON.encode(empArr),
        params: {
          count: count
        },
        success: function(response, opts) {
          var resolveObj = {};
          resolveObj.response = response;
          resolveObj.opts = opts;
          resolveObj.view = view;
          resolve(resolveObj);
        },
        failure: function(response, opts) {

          Ext.getBody().unmask();
          reject(response);
        }
      });
    });
    promiseProjectApproval.then(function(resolveObj) {
      Ext.getBody().unmask();
      if (resolveObj.response.responseText) {
        var obj = Ext.decode(resolveObj.response.responseText);
        Ext.Msg.alert('Success', 'Request Sent Successfully!');
        Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.SUCCESS);
      }
      resolveObj.view.lookupReference('buttonnext').setDisabled(false);
    }).catch(function(err) {
      console.log('Request to project approval failed!!!', err);
      Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.PROJECTAJAX, err);
    });
  },

   /**
   * The function onRequestupdateClick is responsible to send the request to manager.
   * @param {Ext.button.Button} 'btn' which contains request button. 
   */
  onRequestupdateClick: function(btn) {
    try {
      var projectStore,
        empArr = [],
        params,
        count = 0,
        periodProjectView =this.getView().down('employeesinnoticeperiodproject'),
        projectStore = periodProjectView.getStore().getUpdatedRecords();
      // for (var index in projectStore) {
      //   let data = projectStore[index];
      //   let allocateParams = {};
      //   allocateParams.projectId = data.data.ddo_project_id;
      //   allocateParams.employeeID = data.data.ddo_employee_id;
      //   allocateParams.enddate = data.data.enddate;
      //   allocateParams.startdate = data.data.startdate;
      //   allocateParams.roleName = data.data.ddo_projectroles_id;
      //   allocateParams.percentAlloc = data.data.allocpercent;
      //   allocateParams.shadowResouce = data.data.shadow_resource || 'N';
      //   allocateParams.projectAllocationId = data.data.ddo_project_allocation_id;
      //   empArr.push(allocateParams);
      // }
      var allocateParams = {};
      for (var index in projectStore) {
        let data = projectStore[index];
            allocateParams.projectId = data.data.ddo_project_id;
            allocateParams.projectAllocationId = data.data.ddo_project_allocation_id;
            allocateParams.enddate = data.data.enddate;
      }
      // Ext.getBody().mask('..Loading');
      // this.projectAjax(count, empArr);
      this.updateEnddateInProjectalloc(allocateParams);
      this.getViewModel().set('requestbuttonUniqueEnablee', true);
      this.getViewModel().set('nextbuttonUniqueEnablee', false);
      periodProjectView.getStore().reload();
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.REQUESTUPDATE, err);
    }
  },
  onBackButtonClickView: function(btn) {
    this.getView().setActiveItem(0);
  },

   /**
   * The function onNoticePeriodStatusSelect hits by changing the status in the combobox as exit process and separated.
   * @param { Ext.form.field.Field} 'combo' which is a combobox. 
   * @param {Object} 'record' the new value. 
   * @param {Object} 'oldRec' the old value. 
   */
  onNoticePeriodStatusSelect: function(combo, record, eOpts) {
    try {
      var noticePeriodVm = this.getViewModel();
      var noticePeriodListStore = noticePeriodVm.getStore('employeesnoticeperiodliststore');
      noticePeriodListStore.clearFilter();
      var status_id = combo.getValue();
      if (status_id == 0) {
        noticePeriodListStore.filterBy(function(rec) {
          if (!rec.get('status').includes('separated')) {
            return true;
          } else {
            return false;
          }
        });
        this.getViewModel().set('actionBtnUnable', false);
      } else if (status_id == 1) {
        noticePeriodListStore.filterBy(function(rec) {
          if (rec.get('status').includes('separated')) {
            return true;
          } else {
            return false;
          }
        });
        this.getViewModel().set('actionBtnUnable', true);
      }
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.STATUSSELECT, err);
    }
  },
  /**
   * The function onNoticePeriodSetStatus is responsible to show the status by default at '0' value.
   * @param { Ext.form.field.Field} 'combo' which is a combobox. 
   */
  onNoticePeriodSetStatus: function(combo) {
    combo.setValue("0");
  },
   /**
   * The function OnClickCheckBtn is responsible to check in all the checkboxes to enable the button.
   * @param {Ext.grid.column.Check} 'column' the check column. 
   * @param {number} 'recordIndex' the rowindex number. 
   * @param {boolean} 'checked' will be true if checked. 
   */
  OnClickCheckBtn: function(column, recordIndex, checked) {
    try {
      var store = this.getView().down('employeesinnoticeperiodassets').getStore();
      var data = store.findRecord('active', false);
      if (!data) {
        this.getViewModel().set('nextbuttonUniqueEnablee', false);
      } else {
        this.getViewModel().set('nextbuttonUniqueEnablee', true);
      }
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.ONCLICKCHECK, err);
    }
  },
   /**
   * The function onClickClosebtn is responsiblr to unmask the viewport and to close the window.
   */
  onClickClosebtn: function() {
    this.getView().up('mainviewport').unmask();
  },
  /**
   * The function onFormValid is responsible for to validate and the visibility of buttons.
   * @param { Ext.form.Basic} 'a' 
   * @param {boolean} 'isValid' true if the form is valid. 
   * @param { Object} 'eopts' the options object passed.
   */
  onFormValid: function(a, isValid, c) {
    if (isValid) {
      this.getViewModel().set('submitButtonUniqueEnablee', false);
      this.getViewModel().set('nextbuttonUniqueEnablee', false);
    }
    else {
      this.getViewModel().set('submitButtonUniqueEnablee', true);
      this.getViewModel().set('nextbuttonUniqueEnablee', true);
    }
  },
     /**
    * The function OnEyeButtonActionClick is responsible to create the window by clicking on the eye icon.
    * @param {grid.Panel} 'grid' which holds the grid 
    * @param {number} 'rowIndex' which holds the row index. 
    * @param {number} 'colIndex' which holds the column index. 
    * @param {icon} 'icon' which holds the eye icon. 
    * @param {Event} 'e' which is the click event. 
    * @param {record} 'rec' which holds the clicked record. 
    */
  OnEyeButtonActionClick: function(grid, rowIndex, colIndex, icon, e, rec){
    var imageurl = rec.getData().imageurl;
    this.getViewModel().set('imageurl',imageurl);
    var win = Ext.create('DDO.view.noticeperiod.EmployeesInNoticePeriodImageWin',{
      picturePath : imageurl
    });
        win.show();            
},
/**
 * The function onActionWindowView is responsible to show the window by clicking on the action icon.
 * @param {grid.Panel} 'grid' the grid view. 
 * @param {number} 'rowIndex' the rowindex which is selected. 
 * @param {number} 'colIndex' the column index which is selected. 
 */
onActionWindowView : function (grid, rowIndex, colIndex){
  try{
  var rec = grid.getStore().getAt(rowIndex);
          var projectWindow = this.getView().down('employeesinnoticeperiodproject').add({
            xtype: 'employeesinnoticeperiodwindowadd'
          });
          if (projectWindow) {
            var noticePeriodHr = this.getView().up().up().down('employeesinnoticeperiodhr');
            var proposedDate = noticePeriodHr.down('[xtype=datefield]').getValue()
            projectWindow.down('[reference=enddate]').setValue(new Date(proposedDate));
            projectWindow.down('[reference=enddate]').setMaxValue(proposedDate);
            this.getView().up('mainviewport').mask();
            projectWindow.show();
            projectWindow.down('form').loadRecord(rec);
          }
        }catch(err){
          Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.ACTIONWINDOW, err);
        }
}
});
