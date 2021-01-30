/**
 * The file EmployeeView is the responsible for the view of the Employee button group in the 'DDO.view.setup.employeesetup.EmployeeTab'.
 * @extends {'Ext.container.Container'}.
 * @alias 'widget.employeeview'
 * ViewController : 'DDO.view.setup.employeesetup.EmployeeTabController'
 */
Ext.define('DDO.view.setup.employeesetup.EmployeeView',{
	extend:'Ext.container.Container',
    xtype:'employeeview',
	 requires: [
        'Ext.container.ButtonGroup',
        'DDO.view.setup.employeesetup.EmployeeSetUpView',
        'DDO.view.setup.employeesetup.UtilisationView',
        'DDO.view.setup.employeesetup.ReportsView'
    ],

	layout:{
        type:'card'
    },
    activeItem:0,

    items:[{
         xtype:'employeesetupview'
     }, {xtype:'employeesetupview',

     reference:'activeemployee',
     listeners:{
         activate: 'onActivateEmployeeTabView'
     }
    },{
        xtype:'utilisationview'
    },{
        xtype:'reportsview'
    }],
    beforeLayout: function() {
        
        // We setup some minHeights dynamically to ensure we stretch to fill the height
        // of the viewport minus the top toolbar

        var me = this,
            height = Ext.Element.getViewportHeight()-245; // offset by topmost toolbar height
        me.height = height;

        me.callParent(arguments);
    }
});