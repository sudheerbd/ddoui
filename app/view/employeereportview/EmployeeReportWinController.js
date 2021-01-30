/**
 * The file EmployeeReportWinController is the controller file for the EmployeeReportWin.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.employeereportwincontroller'.
 */
Ext.define('DDO.view.employeereportview.EmployeeReportWinController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.employeereportwincontroller',
   /**
     * This handler is responsible for applying  the filters to the grid store .
     * @param {Object} 'btn' -reference of the button .
     */
  onFiltersButtonClick: function(btn) {
       var form = btn.up('form'),
       primaryskill = form.down('[name=primaryskill]').getValue(),
       designationid = form.down('[name=designation]').getValue(),
       empid =form.down('[name=employeename]').getValue();
      var win = this.getView();
      var parentView = btn.up('employeereportwin').parentRef;
      var employeereportStore = parentView.down('employeereportgrid').getStore();
      if (designationid && primaryskill) {
        this.processSearchOperation(employeereportStore, primaryskill, designationid);
      }
      if (empid && primaryskill == null && designationid == null) {
        if (employeereportStore) {
          this.processSearchOperation(employeereportStore, empid);
        }
      }
      if (designationid && empid == null && primaryskill == null) {
        this.processSearchOperation(employeereportStore, designationid);
      }
      if (primaryskill && empid == null && designationid == null) {
        this.processSearchOperation(employeereportStore, primaryskill);
      }
      if (empid == null && designationid == null && primaryskill == null) {
        employeereportStore.clearFilter(true);
        employeereportStore.reload();
      }
      if ((empid && primaryskill) || (designationid && empid)) {
      }
      if (empid && primaryskill && designationid) {
      } 
      var empwin = btn.up('window');
      empwin.close();
  },
  processSearchOperation: function(employeereportStore, id, id1) {
    try {
      employeereportStore.clearFilter(true);
      employeereportStore.filterBy(function(record) {
        if (record.data.ddo_employee_id && id && id1 == null) {
          if (record.data.ddo_employee_id == id) {
            return true;
          }
        }
        if (record.data.ddo_designation_id && id && id1 == null) {
          if (record.data.ddo_designation_id == id) {
            return true;
          }
        }
        if (record.data.pskillid && id && id1 == null) {
          if (record.data.pskillid == id) {
            return true;
          }
        }

        if ((record.data.pskillid && id) && (record.data.ddo_designation_id && id1)) {
          if ((record.data.pskillid == id) && (record.data.ddo_designation_id == id1)) {
            return true;
          }
        }
      });
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEEREPORT.TOAST.WINFILTER, err);
    }
  },
  onAnyFieldSelected: function(combo, newVal, oldVal, eOpts) {
    try{
      var vm = this.getViewModel();
      var form = this.getView(),
      primaryskill = form.down('[name=primaryskill]').getValue(),
      designationid = form.down('[name=designation]').getValue(),
      empid =form.down('[name=employeename]').getValue();
      if (newVal) {
        vm.set('applybtn', false);
      }
      if(designationid == null && empid == null && primaryskill == null ){
        vm.set('applybtn', true);
      }
    } catch (err) {
      Utility.showToast(Messages.EMPLOYEEREPORT.TOAST.APPLYBTN, err);
    } 
  },
});