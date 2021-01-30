Ext.define('DDO.view.holidays.HolidaysGrid', {
  extend: 'Ext.grid.Panel',

  alias: 'widget.holidaysgrid',

  cls: 'karmalist-cls',

  height: Constants.ViewportHeight * 0.7,

  width: '100%',

  margin: '-30 0 0 10',

  padding: '0px 10px 0px 0px',

  makeDirty: false,

  viewConfig: {
    loadMask: true
  },
  initComponent: function() {
    //debugger;
    this.callParent(arguments);
    var projectRequestVM = this.up().getViewModel();
    var holidayStore = projectRequestVM.getStore('holidaysstore');
    if (!holidayStore.isLoaded()) {
      holidayStore.load();
    }
  },
  bind: {
    store: "{holidaysstore}"
  },
  columns: [{
    text: 'Date',
    dataIndex: 'date',
    flex: 0.5,
    height: 42,
    sortable: true,
    align: 'center'
  }, {
    text: 'Description',
    dataIndex: 'description',
    flex: 0.5,
    height: 42,
    sortable: true,
    align: 'center'

  }, {
    text: 'Optional',
    dataIndex: 'optional',
    flex: 0.5,
    height: 42,
    sortable: true,
    align: 'center',
    renderer: function(value){
      if(value === 'Y'){
        return 'Yes';
      } else{
        return 'No';
      }
    }
  }, {
    xtype: 'actioncolumn',
    text: 'Row Action',
    flex: 0.5,
    height: 42,
    sortable: true,
    cls: 'actioncolumnn-cls', bind: {
      hidden: '{!isHRManager}'
    },
    items: [
      //     {
      //   iconCls: 'x-fa fa-trash',
      //   tooltip: 'Delete Record',
      //   handler: 'onDeleteButtonClick'
      // },
      {
        iconCls: 'x-fa fa-edit',
        tooltip: 'Edit Record',
        margin: '50',
        handler: 'onEditButtonClick'
     }]
  }],
  // listeners: {
  //   rowdblclick: 'onGridRowClick'
  // }
});