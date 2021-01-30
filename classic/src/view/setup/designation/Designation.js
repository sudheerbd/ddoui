/**
 * The file 'DDO.view.setup.designation.Designation' is responsible for the view page of designation.
 * @extends {Ext.container.Container}, 
 * @alias widget.designation,
 * ViewModel : 'DDO.view.setup.designation.DesignationViewModel',
 * ViewController : 'DDO.view.setup.designation.DesignationViewController'.
 */
Ext.define('DDO.view.setup.designation.Designation', {
    extend: 'Ext.container.Container',
    alias: 'widget.designation',
    cls: 'karmarule-cls designation-cls',
    requires: [
        'DDO.view.setup.department.DepartmentToolbar',
        'DDO.view.setup.designation.DesignationViewController',
        'DDO.view.setup.designation.DesignationGrid',
        'DDO.view.setup.designation.DesignationWindow'
    ],
    controller: 'designationviewcontroller',
    initComponent: function() {
        this.callParent(arguments);
            var  designationGrid= this.down('designationgrid');
            var gridStore = designationGrid.getStore();
        if (!gridStore.isLoaded()) {
            Utility.onStoreLoading(gridStore);
        }
    },
    items: [
        {
        xtype: 'departmenttoolbar',
        cls: 'wallet-toolbar-cls',
        width: '100%',
        height: Constants.ViewportHeight * 0.11,
        html:LabelsTitles.EMPSETUP.DESIGNATION.DNAME

    },{
        xtype: 'textfield',
        emptyText: 'Search By Name/Acronym',
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
        change: "onSearchDesignation"
        }
    },{
         xtype: 'designationgrid',
         store:  'setup.designation.DesignationStore'
    }]
});