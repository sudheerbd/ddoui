/**
 * The file KarmaAccessViewController is the view controller for 'DDO.view.karmasetup.karmaaccess.KarmaAccessView'.
 * @extends {Ext.app.ViewController}
 * @alias controller.karmaaccess.
 */
Ext.define('DDO.view.karmasetup.karmaaccess.KarmaAccessViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.karmaaccess',

    /**
     * This is the handler for the Button event of the karmaaccesswindowView.
     * update the names if user modifies name of icons.
     * @param {Ext.button.Button} 'btn' the add button.
     * @param {evt} 'e'  Ext.event.Event the click event.
     * @param {eOpts} 'eOpts' events object passed.
     */
    onAddNewClick: function(btn, e, eOpts) {
      try{
        var win, formRef;
        var view = this.getView();
        win = Ext.ComponentQuery.query('karmaaccesswindowview')[0] ||
            Ext.create('DDO.view.karmasetup.karmaaccess.KarmaAccessWindowView',{
              parentRefView:view
            });
        formRef = win.down('form');
        win.edit = false;
        formRef.reset();
        win.getViewModel().set('saveBtnAccess',true);
        win.show();
          }catch(err){
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.ADDCLICK, err);
          }
    },
    /**
     * This is the handler for the Button event of the karmaaccesswindowView.
     * the window opens by cliking on the grid item.
     * @param {grid view} 'view' The gridview reference.
     * @param {record} 'record' (Ext.data.Model) belongs to the item.
     */
    itemClick: function(view, record) {
      try{
      var view = this.getView();
    var formWindow = Ext.ComponentQuery.query('karmaaccesswindowview')[0] ||
      Ext.create('DDO.view.karmasetup.karmaaccess.KarmaAccessWindowView',{
        parentRefView:view
      }),
      formRef = formWindow.down('form'),
      formWinViewModel = formWindow.getViewModel();
    var roleObj = record.data.role,
      roleArr = [];
    formRef.down('hiddenfield').setValue(record.data.ddo_karmaaccess_id);
    var combo = formRef.down('combobox[name=ddo_karma_id]');
    combo.setValue(record.data.ddo_karma_id);
    roleObj.forEach(function (rec) {
      roleArr.push(rec.ddo_role_id);
    });
    var empObj = record.data.employee,
      empArr = [];
    empObj.forEach(function (rec) {
      empArr.push(rec.ddo_employee_id);
    });
    var roleTag = formRef.down('tagfield[name=role]');
    roleTag.setValue(roleArr);
    var empTag = formRef.down('tagfield[name=employee]');
    empTag.setValue(empArr);
    formWindow.edit = true;
    formWindow.show();
  }catch(err){
    Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.GRIDROWCLICK, err);
  }
  },
  /**
   * The function deleteGridrow is responsible to dete the grid row by cliking on the delete icon.
   * @param {grid} 'grid' the grid view. 
   * @param {number} 'rowIndex' the row index of selected record. 
   * @param {number} 'colIndex' the column index of selected record. 
   */
  deleteGridrow: function(grid, rowIndex, colIndex) {
    try{
    var gridStore = grid.getStore(),
        rec = gridStore.getAt(rowIndex),
        params;
    params = {
        ddo_karmaaccess_id: rec.data.ddo_karmaaccess_id
    };
    Ext.Ajax.request({
        url: '/karmaaccess',
        method: 'DELETE',
        params: params,
        success: function(resp, b) {
            gridStore.removeAt(rowIndex)
            gridStore.reload();
            Ext.getBody().unmask();
        },
        failure: function(resp, b) {
            Ext.Msg.alert('Failed', "failed to delete  karmaaccess");
            Ext.getBody().unmask();
        }
    });
  }catch(err){
    Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.DELRECORD, err);
  }
},
  /**
     * This is the handler for search functionality of the karmaaccessView.
     * It will filter the record values based on search
     * @param {Ext.form.field.Field} 'searchField' The searchfield of the karma access view
     * @param {Object} 'searchValue' is the search value to filter the data on the store.
     */
  onKarmaSearch: function (searchField, searchValue) {
    try{
    var karmaAcessGrid = searchField.up('karmaaccessview').down('grid');
    if (searchValue != '') {
      searchField.getTrigger('clear').setHidden(false);
      var karmaStore = karmaAcessGrid.getStore();
      if (karmaStore) {
        this.filterKarmaStore(karmaStore,searchValue); 
      }
    } else {
      searchField.getTrigger('clear').setHidden(true);
      karmaAcessGrid.getStore().clearFilter();
    }
  }catch(err){
    Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.KARMASEARCH, err);
  }
  },
  /**
   * The function filterKarmaStore is responsible to filter the records of the store comparing with the entered values.
   * @param {store} 'karmaStore' the grid store. 
   * @param {value} 'searchValue' the searched value by the user. 
   */
  filterKarmaStore:function(karmaStore,searchValue){
    karmaStore.clearFilter(true);
    karmaStore.filterBy(function (record) {
      var name = record.get('karmaname').toLowerCase();
      var karmacategoryname = record.get('rolename').toLowerCase();
      searchValue = searchValue.toLowerCase();
      var employees = record.data.employee;
      var available;
      if (employees) {
        employees.filter(function (rec) {
          var recName = (rec.name).toLowerCase();
          if (recName.indexOf(searchValue) > -1) {
            available = true;
          }
        });
      }
      if (name.indexOf(searchValue) > -1 || karmacategoryname.indexOf(searchValue) > -1 || available) {
        return record;
      }
    })
  },
  /**
   * This is the handler for clearing the filtered store of the karma access view.
   * @param { Ext.form.field.Field } 'clearIcon' is the searchfield
   */
  onClearIcon: function (clearIcon) {
    try{
    clearIcon.setValue('');
    clearIcon.getTrigger('clear').setHidden(true);
    var karmaView = clearIcon.up('karmaaccessview');
    var karmaGrid = karmaView.down('grid');
    if (karmaGrid) {
      karmaGrid.getStore().clearFilter();
    }
  }catch(err){
    Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.CLOSEICON, err);
  }
  }
});

