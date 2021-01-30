Ext.define('DDO.view.setup.role.RoleWindowGrid',{
    extend : 'Ext.grid.Panel',
    xtype :'rolewindowgrid',
    width: '70%',
    cls :'karmalist-cls',
    margin:'0 40 0 40',
    makeDirty:false,
    bind : {
    store : '{rolesGridStore}'
    },
    layout:'fit',
    columns : [{
        text : 'ViewName',
        dataIndex: 'viewName',
        height : 42,
        sortable : true,
        flex : 0.7
    },
{
    xtype : 'checkcolumn', 
    text : 'Allow',
    dataIndex: 'description',
    dataIndex: 'isRead',
    height : 42,
    menuDisabled:true,
    sortable:false,
    flex : 0.3
}]
});