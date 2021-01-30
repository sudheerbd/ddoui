/**
*   This file is responsible for Roles & Security grid view.
*	Parent View : 'DDO.view.rolessecurity.RolesView'.
*   ViewModel :  'DDO.view.rolessecurity.RolesViewModel'
*   ViewController : 'DDO.view.rolessecurity.RolesViewController'.
*/
Ext.define("DDO.view.rolessecurity.RoleAccessGrid",{
    extend: 'Ext.grid.Panel',
    xtype: 'roleaccessgrid',
    bind: {
        store: '{rolesGridStore}'
    },
    cls:'ddo-dashboard-grid roles-checked-column',
    columns: [
        { 
		  text: LabelsTitles.ROLE.VIEWNAME,
		  dataIndex: 'viewName' ,
		  flex: 1.6 
		},
        { 
		  xtype : 'checkcolumn', 
		  menuDisabled:true, 
		  sortable:false,
		  text: LabelsTitles.ROLE.ALLOW, 
		  dataIndex: 'isRead',
		  flex: 0.2 
		}
    ]
});
