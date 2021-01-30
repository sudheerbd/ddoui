/**
 * The file 'DDO.view.setup.department.Department' is responsible for the view of department page.
 * @extends {Ext.container.Container} 
 * @alias widget.department
 * ViewController : 'DDO.view.setup.department.DepartmentViewController'.
 */
Ext.define('DDO.view.setup.department.Department', {
    extend: 'Ext.container.Container',
    alias: 'widget.department',
    requires: [
        'DDO.view.setup.department.DepartmentGrid',
        'DDO.view.setup.department.DepartmentToolbar',
        'DDO.view.setup.department.DepartmentViewController',
        'DDO.view.setup.department.DepartmentWindow'
    ],
    cls: 'karmarule-cls department-cls',
    scrollable:false,
    controller: 'departmentviewcontroller',
    initComponent: function() {

        this.callParent(arguments);
                 var departmentGrid = this.down('departmentgrid'),
                 store =  departmentGrid.getStore();
        if (!store.isLoaded()) {
            Utility.onStoreLoading(store);
        }
    },
    items: [{
        xtype: 'departmenttoolbar',
        cls: 'wallet-toolbar-cls',
        width: '100%',
        height: Constants.ViewportHeight * 0.11,
        html: LabelsTitles.EMPSETUP.DEPARTMENT.DEPNAME
    },
    {
        xtype: 'textfield',
        emptyText: 'Search By name',
        width: '25%',
        margin: '0px 0px 10px 15px',
        height:'50%',
        enableKeyEvents: true,
        triggers: {
        clear: {
          cls: Ext.baseCSSPrefix + 'fa fa-close',
          hidden: true,
          handler: "onClearIcon"
        },
        search: {
          cls: Ext.baseCSSPrefix + 'fa fa-search'
        }
      },
        listeners: {
        change: "onSearchDepartment",
        }
    }, {
        xtype: 'departmentgrid',
        store: 'setup.department.DepartmentStore'
    }]
});