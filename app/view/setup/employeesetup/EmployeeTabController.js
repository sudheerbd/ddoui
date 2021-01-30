/**
 * The file EmployeeTabController is the controller for the employee tab view class.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.employeetabcontroller'.
 */
Ext.define('DDO.view.setup.employeesetup.EmployeeTabController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.employeetabcontroller',


  /**
   * The function onUtilisationClick will perform when we click on utilization butten in employee view. 
   * This function will make Utilisation button active in employeeTab view. 
   * @param {Ext.button.Button} 'btn' when button is being clicked.
   */
  onUtilisationClick: function (btn) {
    try {
      var view = this.getView(),
        employeeBtn = view.lookupReference('employeebtn'),
        reportBtn = view.lookupReference('reportsbtn');
      allEmployeeBtn = view.lookupReference('allemployeebtn');

      allEmployeeBtn.removeCls('employee-selected-btn-cls');
      employeeBtn.removeCls('employee-selected-btn-cls');
      reportBtn.removeCls('employee-selected-btn-cls');

      btn.addCls('employee-selected-btn-cls');
      var store = Ext.getStore('setup.employeesetup.EmployeeStore');
      store.clearFilter();
      btn.up('employeetab').down('employeeview').setActiveItem(2);
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.UTILIZATIONCLICK, err);
    }
  },

  /**
   * The function onReportsClick is responsible to render report related view and load stores.
   * @param {Ext.button.Button} 'btn' which holds the report button.
   */
  onReportsClick: function (btn) {
    try {
      var store = Ext.getStore('setup.employeesetup.EmployeeStore');
        store.clearFilter();
        var view = this.getView(),
          employeeBtn = view.lookupReference('employeebtn'),
          utilBtn = view.lookupReference('utilbtn');

        allEmployeeBtn = view.lookupReference('allemployeebtn');
        allEmployeeBtn.removeCls('employee-selected-btn-cls');
        employeeBtn.removeCls('employee-selected-btn-cls');
        utilBtn.removeCls('employee-selected-btn-cls');

        btn.addCls('employee-selected-btn-cls');

        btn.up('employeetab').down('employeeview').setActiveItem(3);
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.REPORTCLICK, err);
    }
  },

  /**
   * The function onEmpViewRender is used to perform some employee view render time operation.
   * @param {view} object, contains reference of view for employee tab.
   */
  onEmpViewRender: function (view) {
    try {
      var view = this.getView();
      var employeeView = view.down('employeeview');
      var empBtn = view.lookupReference('employeebtn');
      empBtn.addCls('employee-selected-btn-cls');
      var store = Ext.getStore('setup.employeesetup.EmployeeStore');
      store.clearFilter();
        var allempBtn = view.lookupReference('allemployeebtn');
        store.filterBy(function (record) {
          // var empstatus = record.getData().workdetails.empstatus;
          var empstatus = record.getData().workdetails ? record.getData().workdetails.empstatus : '';
          if (empstatus && empstatus != 'Separated') {
          // if (empstatus != 'Separated') {
            return record;
          }
        })
        
      // }

      employeeView.down('[reference = addNewEmp]').setHidden(false);
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPVIEWRENDER, err);
    }

  },

  /**
   * The function onFilterItemSelect will perform when the 'select' event of the comboBox is fired in the Utilisation View.
   * This function is filtering the store and showing the data related to selected item in combo.
   * The event will fire when the value of the field is selecte.
   * @param { Ext.form.field.Field} 'combo' which is the form field.
   */

  onFilterItemSelect: function (combo) {
    try {
      var comboValue = combo.getValue(),
        utilGrid = combo.up('utilisationview').down('grid'),
        utilGridStore = utilGrid.getStore();
      var store = Ext.getStore('setup.employeesetup.EmployeeStore');
      store.clearFilter();
      utilGridStore.clearFilter();
      if (comboValue == 0) {
        utilGrid.items.items[0].features[0].enable();
        utilGridStore.getProxy().api.read = Api.URL.utilgrid.READ;
        utilGridStore.load();
      }
      this.filterItemSelect(comboValue, utilGrid, utilGridStore);
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.UTILIZATION.COMBOSELECTITEM, err);
    }
  },

  /**
   * The function 'FilterItemSelect' is fired from the function 'onFilterItemSelect' in the EmployeeTabController
   * @param {number} 'comboValue' which takes a number .
   * @param {grid} - 'utilGrid' The grid list reference.
   * @param {store} 'utilGridStore' which takes a storedata.
   */

  filterItemSelect: function (comboValue, utilGrid, utilGridStore) {

    if (comboValue == 1) {
      utilGrid.items.items[0].features[0].disable();
      utilGridStore.getProxy().api.read = Api.URL.nonbillableemp.READ;
      utilGridStore.load();
    } else if (comboValue == 2) {
      utilGrid.items.items[0].features[0].enable();
      utilGridStore.getProxy().api.read = Api.URL.utilgrid.READ;
      utilGridStore.load();
      utilGridStore.filter('isshadow', 'Y');
      utilGridStore.each(function (rec) {
        rec.isShadow = true
      });
    } else if (comboValue == 3) {
      utilGrid.items.items[0].features[0].disable();
      utilGridStore.getProxy().api.read = Api.URL.availablemp.READ;
      utilGridStore.load();
    }
  },


  /**
    Excel exporter for Utilizationsheet
    Utilizationsheet grid information can be download in .xls format.
    Used grid exporter plugin to convert format
    @param:{string}{btn} The scope of the button (defaults to current component)
    @param:{eve} Stop the event (`{@link #preventDefault}` and `{@link #stopPropagation}`)
    */

  onDownloadExcelBtnClick: function (btn, evt) {
    try {
      evt.stopEvent();
      var utilisationview = btn.up('utilisationview'),
        grid = utilisationview.down('grid'),
        utilCombo = utilisationview.down('combobox');
      var xlTitle = (utilCombo && utilCombo.selection) ? utilCombo.selection.data.group_name : "utilgrid";
  
      var xml = grid.getPlugin('exporter').getDocumentData({
        title: xlTitle,
      });
      var blob = new Blob([xml], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      // using thrid-party FileSaver.js to save it as xlsx
      saveAs(blob, 'UtilizationSheet.xls');
  
      return false;
    } catch (err){
      Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.DOWNLOADEXCEL, err);
    }
  },
  /**
   * The function onClearBtnClick is responsible clearing the grid store by clicking on the cancel button.
   * @param {Ext.button.Button} 'btn' which holds the clear button.
   */
  onClearBtnClick: function (btn) {
    try {
      var form = btn.up();
      var empstatus = form.down('combobox[name=empstatus]').getValue();
      var daterange = form.down('daterangefield[name=daterange]');
      var daterangeValue = daterange.getValue();
      var grey_hr_id = form.down('textfield[name=grey_hr_id]').getValue();
      if (empstatus == 'All' && Ext.isEmpty(daterangeValue) && Ext.isEmpty(grey_hr_id)) {

      } else {
        var formValues = form.getValues();
        if (formValues) {
          form.reset();
        }
        var reportsview = btn.up('reportsview'),
          grid = reportsview.down('grid');
        gridStore = grid.getStore();
        gridStore.removeAll();
        daterange.triggers.cancel.hide();
        this.onApplyBtnClick(btn);
      }
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.REPORTS.CLEARBTN, err);
    }
  },

  /**
   * The function onApplyBtnClick is responsible to store the form values by clicking on the apply button.
   * @param {Ext.button.Button} 'btn' which is the apply button. 
   */
  onApplyBtnClick: function (btn) {
    try {
      var store = Ext.getStore('setup.employeesetup.EmployeeStore');
      store.clearFilter();
      var form = btn.up("form"),
        formValues = form.getValues(),
        reportView = this.getView().down(),
        reportStore = this.getView().up().down('reportsgrid').getStore(),
        viewModel = this.getViewModel(),
        startDateFormat = viewModel.get('startDateFormat'),
        endDateFormat = viewModel.get('endDateFormat');
      reportStore.getProxy().setExtraParams(formValues);
      reportStore.load({
        scope: this,
        callback: function (records, operation, success) {
          if (records == null) {
            reportStore.removeAll();
            Ext.Msg.alert('Error', "Records Not Found !!!");
          }
        }
      });
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.REPORTS.APPLYBTN, err);
    }
  },
  /**
     reports sheet grid information can be download in .xls format.
     Used grid exporter plugin to convert format
     @param:{string}{btn} The scope of the button (defaults to current component)
     @param:{eve} Stop the event (`{@link #preventDefault}` and `{@link #stopPropagation}`)
     */
  onDownloadBtnClick: function (btn, evt) {
    try {
      evt.stopEvent();
      var reportsview = btn.up('reportsview'),
        grid = reportsview.down('grid'),
        utilCombo = reportsview.down('combobox');
      var xlTitle = (utilCombo && utilCombo.selection) ? utilCombo.selection.data.field1 + " (Reports)" : "Reports";

      var xml = grid.getPlugin('exporter').getDocumentData({
        title: xlTitle
      });
      var blob = new Blob([xml], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      saveAs(blob, 'ReportSheet.xls');
      return false;
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.REPORTS.DOWNLOAD, err);
    }
  },
  /**
   * The function onDateRangeChange is responsible to format the dates in the required manner.
   * @param {daterangefield} 'me' which renders the daterangefield.
   * @param {string} 'newValue' the new value which is clicked by the user.
   * @param {oldvalue} - which is an empty string.
   */
  onDateRangeChange: function (me, newValue, oldValue, eOpts) {
    try {
      me.triggers.cancel.show();
      var dateValues = newValue.split(" - "),
        startDateValue = dateValues[0].split("-");
      if (dateValues[1]) {
        toDateValue = dateValues[1].split("-")
      }
      var startDateFormat = startDateValue[2] + "-" + startDateValue[1] + "-" + startDateValue[0],
        endDateFormat = toDateValue[2] + "-" + toDateValue[1] + "-" + toDateValue[0];
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.REPORTS.DATERANGECHANGE, err);
    }
  },
  /**
   * The function onTriggerItemClick is used to clear the date field by clicking on the icon and to hide the trigger icon.
   * @param {cmp} 'cmp' which renders the daterangefield.
   * @param {trigger} 'trigger' the one which we have declared.
   * @param {target} 'event details'.
   */
  onTriggerItemClick: function (cmp, trigger, target) {
    try {
      cmp.setValue('');
      trigger.hide();
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.REPORTS.TRIGGER, err);
    }
  },

  /**
   * The function onTriggerItemClick is used to clear the date field by clicking on
   * the icon and to hide the trigger icon.
   * @param {view} object, contains reference of view for employee tab.
   */
  onActivateEmployeeTabView: function (view) {
    var grid = view.down('employeesetupgrid');
    var separated = grid.down('[text=Separated Date]');
    separated.setVisible(false);
    //view.down('[reference = addNewEmp]').setHidden(true);
  },
  
  /**
   * The function onEmployeeClick will perform when we click on employee butten in employee view. 
   * This function will make employee view active in employeeTab view. 
   * @param {Ext.button.Button} 'btn' when button is being clicked.
   */
  onEmployeeClick: function (btn) {
    try {
      var view = this.getView(),
        utilBtn = view.lookupReference('utilbtn'),
        reportBtn = view.lookupReference('reportsbtn');
      var store = Ext.getStore('setup.employeesetup.EmployeeStore'),
        employeeView = btn.up('employeetab').down('employeeview');
      var store = Ext.getStore('setup.employeesetup.EmployeeStore');
      store.clearFilter();
      if (btn.reference === 'employeebtn') {
        var empBtn = view.lookupReference('allemployeebtn');
        store.filterBy(function (record) {
          var empstatus = record.getData().workdetails.empstatus;
          if (empstatus != 'Separated') {
            return record;
         }
      })
        employeeView.setActiveItem(1);
        employeeView.down('[reference = addNewEmp]').setHidden(false);
      } else {
        store.clearFilter();
        var empBtn = view.lookupReference('employeebtn');
        var activeemployee = employeeView.down('employeesetupgrid');
        var separated = activeemployee.getColumns()[9] || activeemployee.down('[text=Separated Date]');
        separated.setVisible(true);
        employeeView.down('[reference = addNewEmp]').setHidden(true);
        btn.up('employeetab').down('employeeview').setActiveItem(0);
      }
      empBtn.removeCls('employee-selected-btn-cls');
      utilBtn.removeCls('employee-selected-btn-cls');
      reportBtn.removeCls('employee-selected-btn-cls');
      btn.addCls('employee-selected-btn-cls');
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEECLICK, err);
    }
  }
});