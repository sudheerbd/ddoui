/**
 * The file AvailibilityView is responsible for the view of AvailabilitySheet.
 * @extends {Ext.container.Container}
 * @alias 'widget.availibilityview'
 */
Ext.define('DDO.view.sheets.availibilitysheet.AvailibilityView', {
    extend: 'Ext.container.Container',
    requires: [
        'DDO.view.sheets.AvailableResourcesContainer',
        'DDO.view.sheets.AvailableResources',
        // 'DDO.view.dashboard.skillchart.SkillsChart',
        'Ext.layout.container.Accordion'
    ],
    xtype: 'availibilityview',
    // title: 'Availability Charts',
    width: '100%',
    cls:'ddo-accordion',
    scrollable:false,
    layout: {
        type: 'accordion'
    },
    defaults:{
        margin:'5px 0px 5px 5px',
        style:{
            'box-shadow': '0 0 10px rgba(0, 0, 0, 0.3)',
            'border-radius':'5px'
        }
    },
    items: [{
        xtype: 'availableresourcescontainer',
        layout:'fit',
        title: LabelsTitles.SHEETS.AVAILABILITYSHEET,
        iconCls:'x-fa fa-users',
        collapsed: false,
        items: [{
            xtype: 'availableresources',
            bind: {
                store: '{availResourcesStore}'
            }
        }]
    }, 
    // {
    //     xtype: 'skillschart',
    //     height:550,
    //     hidden: true,
    //     title: DDO.util.LabelsTitles.SKILLSCOLUMNCHART,
    //     iconCls:'x-fa fa-wrench',
    //     collapsed: true
    //     /*bind: {
    //         store: '{skillsChartStore}'
    //     }*/
    // },
     {
        title: DDO.util.LabelsTitles.CALCULATEDCOLUMNCHART,
        hidden: true,
        iconCls:'x-fa fa-bar-chart',
        html: '<img src="resources/images/comingsoon.jpg">',
        collapsed: true
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


