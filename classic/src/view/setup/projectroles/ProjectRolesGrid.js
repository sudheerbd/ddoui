Ext.define('DDO.view.setup.projectroles.ProjectRolesGrid',{

    extend : 'Ext.grid.Panel',

    alias:'widget.projectrolesgrid',

    cls:'karmalist-cls',

    height: Constants.ViewportHeight*0.775,

    width: '100%',

    margin: '0 0 0 10',

    padding:'0px 10px 0px 0px',

    makeDirty:false,
    
    viewConfig:{
        loadMask:true
    },
  store:'projects.people.ProjectRole',
  autoLoad:true,
    columns:[{
        text:'Name',
        dataIndex:'name',
        flex:0.3,
        height:42,
        sortable:true
    },{
        text:'Description',
        dataIndex:'description',
        flex:0.4,
        height:42,
        sortable:true
    // },{
    //     xtype: 'actioncolumn',
    //     flex: 0.05,
    //     align: 'center',
    //     items: [{
    //         iconCls: 'delete-plus',
    //         tooltip: 'Delete',
    //         handler: 'deleteGridRow'
    //     }]
    }],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});