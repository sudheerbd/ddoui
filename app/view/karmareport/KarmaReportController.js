Ext.define('DDO.view.karmareport.KarmaReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.karmareportcontroller',

  
    onclickbtnkarmareport: function(){
     
        var view = this.getView();
        var win = Ext.create('DDO.view.karmareport.KarmaReportWin',{
            parentRef : view
        });
              win.show();    


    },
    onSearchEmployee : function(searchField, searchValue) {
       
        var karmareportstore = this.getView().down('karmareportgrid').getStore();
        if (searchValue != '') {
          searchField.getTrigger('clear').setHidden(false);
    
          if (karmareportstore) {
            this.processSearchOperation(karmareportstore, searchValue);
          }
        } else {
          if (karmareportstore) {
            karmareportstore.clearFilter();
          }
          searchField.getTrigger('clear').setHidden(true);
        }
      },

      processSearchOperation: function(karmareportstore, searchValue) {
      
        karmareportstore.clearFilter(true);
        karmareportstore.filterBy(function(data) {
          if (data.data.employeename) {
            var employeeName = data.data.employeename.toLowerCase();
          }
          searchValue = searchValue.toLowerCase();
          if (employeeName) {
            if (employeeName.indexOf(searchValue) > -1) {
              return data;
            }
          } else {
            return;
          }
        });
      },
      onClearIcon: function (clearIcon) {
        try {
            clearIcon.setValue('');
            clearIcon.getTrigger('clear').setHidden(true);
            var employeeReportGrid = this.getView().down('employeereportgrid');
            if (employeeReportGrid) {
                employeeReportGrid.getStore().clearFilter();
            }
        } catch (err) {
            Utility.showToast(Messages.KARMAREPORT.TOAST.CLEARTRIGGER, err);
        }
    },
    onDownloadExcelBtnClick: function (btn, evt) {
      try {
      
          evt.stopEvent();
          var grid = btn.up('karmareportview').down('karmareportgrid');
          var xml = grid.getPlugin('exporter').getDocumentData({
            title: "Karma Report"
        })
       
          var blob = new Blob([xml], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          });
          saveAs(blob, 'KarmaReport.xls');
          
          return false;
      } catch (err) {
          Utility.showToast(Messages.KARMAREPORT.TOAST.DOWNLOAD, err);
      }
  },



  onClearFilterBtnClick:function(){
    var store = this.getView().down('karmareportgrid').getStore();
    store.clearFilter();
    store.load();
  }

})