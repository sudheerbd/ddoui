/**
 * The file EmployeeReportController is the controller file for the EmployeeReportMainView.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.employeereportcontroller'.
 */

Ext.define('DDO.view.employeereportview.EmployeeReportController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.employeereportcontroller',
  /**
     * This handler is responsible for adding the window view 
     */
  onclickbtnemployeereport: function() {
    var view = this.getView();
    var win = Ext.create('DDO.view.employeereportview.EmployeeReportWin', {
      parentRef: view,
    });
    win.show();
  },

    /**
     * This handler is responsible for searching the data from the grid
     * @param {Object}searchField , scope reference of searchField view.
     * @param {Object} searchValue, String value from the search field
     */
  onSearchEmployee: function(searchField, searchValue) {
    try{
      var EmployeeStore = this.getView().down('employeereportgrid').getStore();
      if (searchValue != '') {
        searchField.getTrigger('clear').setHidden(false);
  
        if (EmployeeStore) {
          this.processSearchOperation(EmployeeStore, searchValue);
        }
      } else {
        if (EmployeeStore) {
          EmployeeStore.clearFilter();
        }
        searchField.getTrigger('clear').setHidden(true);
      }
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEEREPORT.TOAST.SEARCH, err);
    }
  },
  processSearchOperation: function(EmployeeStore, searchValue) {
    try{
      EmployeeStore.clearFilter(true);
      EmployeeStore.filterBy(function(record) {
        if (record.data.primaryskill) {
          var primaryskills = record.data.primaryskill.toLowerCase();
  
        }
        if (record.data.designationname) {
          var designation = record.data.designationname.toLowerCase();
        }
        if (record.data.fullname) {
          var employename = record.data.fullname.toLowerCase();
        }
        searchValue = searchValue.toLowerCase();
        if (employename) {
          if (employename.indexOf(searchValue) > -1) {
            return record;
          }
        } else {
          return;
        }
        if (designation) {
          if (designation.indexOf(searchValue) > -1) {
            return record;
          }
        }
        if (primaryskills) {
          if (primaryskills.indexOf(searchValue) > -1) {
            return record;
          }
        }
      });
    }
    catch(err){
      Utility.showToast(Messages.EMPLOYEEREPORT.TOAST.SEARCH, err);
    } 
  },
      /**
     * This handler is responsible to clear the string entered in the searchfield
     * @param {Object}clearIcon , it is the clear icon reference.
     */
  onClearIcon: function(clearIcon) {
    try {
      clearIcon.setValue('');
      clearIcon.getTrigger('clear').setHidden(true);
      var employeeReportGrid = this.getView().down('employeereportgrid');
      if (employeeReportGrid) {
        employeeReportGrid.getStore().clearFilter();
      }
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.CLEARTRIGGER, err);
    }
  },
  /**
     * This handler is responsible for downloading the excelsheet containing the data of the grid .
     * @param {Object}btn , reference of the Button .
     * @param {Object} evt, Event Objects.
     */
  onDownloadExcelBtnClick: function(btn, evt) {
    try {
      evt.stopEvent();
      var grid = btn.up('employeereportmainview').down('employeereportgrid');
      var xml = grid.getPlugin('exporter').getDocumentData({
        title: "Employee Report"
      })
      var blob = new Blob([xml], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      saveAs(blob, 'EmployeeReport.xls');
      return false;
    } catch (err) {
      Utility.showToast(Messages.ALLOCATION.TOAST.DOWNLOAD, err);
    }
  },
    /**
     * This handler is responsible for clearing the filters applied to the store .
     * @param {Object}btn , reference of the Button .
     * @param {Object} evt, Event Objects.
     */
  onClearFilterBtnClick: function(btn, evt) {
    try{
      var gridStore = this.getView().down('employeereportgrid').getStore();
      gridStore.clearFilter();
      gridStore.reload();
    }catch(err){
      Utility.showToast(Messages.EMPLOYEEREPORT.TOAST.FILTER, err);
    }
  },

  onFilterResult:function(){
     var view = this.getView();
            var financialyearWindow = Ext.create('DDO.view.employeereportview.EmployeeReportFormFilter',{
                parentViewRef : view
            })  
            financialyearWindow.show();
  },

  onCheckBox:function(){
    var view = this.getView();
    var a = Ext.create('DDO.view.employeereportview.EmployeeCheckBox',{
      parentViewRef : view
    })
    a.show();
  },

     onColumnApply:function(btn,event,eOtps){
 var checkboxGroup=btn.up('menu').down('checkboxgroup');
 var menu = btn.up('menu');
 var employeegrid = this.getView().down('employeereportgrid')
 menu.hide();
       checkboxGroup.items.items.map(function (item) {
  if (item.value === false) {
    employeegrid.getColumns()[item.inputValue].setHidden(true);
  } else {
    employeegrid.getColumns()[item.inputValue].setHidden(false);
  }
});
}

  

});