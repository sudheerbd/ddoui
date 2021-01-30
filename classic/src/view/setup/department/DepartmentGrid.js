/**
 * The file 'DDO.view.setup.department.DepartmentGrid' is responsible for the grid view in the 'DDO.view.setup.department.Department'.
 * @extends {Ext.grid.Panel}.
 * @alias widget.departmentgrid.
 * ViewModel : 'DDO.view.setup.department.DepartmentViewModel'.
 * ViewController : 'DDO.view.setup.department.DepartmentViewController'.
 */
Ext.define('DDO.view.setup.department.DepartmentGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.departmentgrid',
    cls: 'karmalist-cls',
    plugins: 'gridfilters',  
    viewConfig: {
        loadMask: false
    },
    height:Constants.ViewportHeight * 0.78,
    width: '100%',
    margin: '0 0 0 10',
    padding:'0px 10px 0px 0px',
    columns: [{
        text: LabelsTitles.EMPSETUP.DEPARTMENT.NAME,
        dataIndex: 'name',
        flex: 0.3,
        height: Constants.ViewportHeight * 0.07,
        filter: {
            type: 'string',
            itemDefaults: {
                emptyText: 'Search...'
            }
        }
    }, {
        text: LabelsTitles.EMPSETUP.DEPARTMENT.DESCRIPTION,
        dataIndex: 'description',
        flex: 0.4
    },{
        xtype: 'actioncolumn',
        flex: 0.05,
        align: 'center',
        items: [{
            iconCls: 'delete-plus',
            tooltip: 'Delete',
            handler: 'deleteGridRow'
        }]
    }],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});