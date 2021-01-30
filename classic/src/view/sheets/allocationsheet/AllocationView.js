/**
 * This file is responsible for the view of the allocation sheet border. 
 */
Ext.define('DDO.view.sheets.allocationsheet.AllocationView', {
    extend: 'Ext.container.Container',
    requires: [
        'DDO.view.sheets.allocationsheet.AllocationSheetContainer'
    ],
    xtype: 'allocationview',
    width: '100%',
    cls:'ddo-accordion ddo-accordion-allocation',
    layout: {
        type: 'accordion',
        animate: true
    },
    defaults:{
        margin:'5px 0px 5px 5px',
        style:{
            'box-shadow': '0 0 10px rgba(0, 0, 0, 0.3)',
            'border-radius':'5px'
        }
    },
    items: [{
        xtype: 'allocationsheetcontainer',
        layout:'fit',
        title: LabelsTitles.SHEETS.ALLOCATIONSHEET,
        iconCls:'x-fa fa-users',
        collapsed: false
    }],
    beforeLayout: function() {
        // We setup some minHeights dynamically to ensure we stretch to fill the height
        // of the viewport minus the top toolbar

        var me = this,
            height = Ext.Element.getViewportHeight()-64; // offset by topmost toolbar height
        me.maxHeight = height;
  
        me.callParent(arguments);
    }
   

});


