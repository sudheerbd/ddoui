Ext.define('DDO.view.setup.clientdashboard.ClientDashboardGrid',{
    extend : 'Ext.grid.Panel',

    alias:'widget.clientdashboardgrid',

    cls:'karmalist-cls',

    height: Constants.ViewportHeight*0.5,

    width: '100%',

    margin: '0 0 0 10',

    padding:'0px 10px 0px 0px',

    makeDirty:false,
    
    viewConfig:{
        loadMask:true
    },
    initComponent: function () {
        this.callParent(arguments);
        var projectRequestVM = this.up().getViewModel();
        var projectclientStore = projectRequestVM.getStore('projectclientstore');
        if (!projectclientStore.isLoaded()) {
            projectclientStore.load();
        }
    },

    bind:{
        store:"{projectclientstore}"
    },
     columns:[{
          text:'Name',
          dataIndex:'name',
          flex:0.5,
          height:42,
          sortable:true
     },{
        
            text:'Description',
            dataIndex:'description',
            flex:0.5,
            height:42,
            sortable:true
       
     }, {
        xtype: 'actioncolumn',
        text: 'Row Action',
        flex:0.5,
        height:42,
        sortable:true,
        cls:'actioncolumnn-cls',
        items: [{
          iconCls: 'x-fa fa-edit',
          tooltip: 'Edit Record',
          margin: '50',
          handler: 'onEditButtonClick'
  
        }, {
          iconCls: 'x-fa fa-trash',
          tooltip: 'Delete Record',
          handler: 'onDeleteButtonClick'
        }]
      }],
     listeners: {
        rowdblclick: 'onGridRowClick'
    }
});