/**
 * The file BenchView id responsible for the view of the bench sheet.
 * @extends {Ext.container.Container}
 * @alias 'widget.benchview'.
 */
Ext.define('DDO.view.sheets.benchsheet.BenchView', {
    extend: 'Ext.container.Container',
    requires: ['DDO.view.sheets.AvailableResourcesContainer',
                'DDO.view.sheets.AvailableResources',
                'Ext.layout.container.Accordion'],
    xtype: 'benchview',
    // controller:'benchsheetcontroller',
    width: '100%',
    cls: 'ddo-accordion',
    scrollable: false,
    layout: {
        type: 'accordion'
    },
    defaults: {
        margin: '5px 0px 5px 5px',
        style: {
            'box-shadow': '0 0 10px rgba(0, 0, 0, 0.3)',
            'border-radius': '5px'
        }
    },
    items: [{
            xtype: 'availableresourcescontainer',
            layout:'fit',
            title: LabelsTitles.SHEETS.EMPLOYEEBENCH,
            // html: '<img src =  "/resources/images/feeds/dwld.png" width="20" height="22">',
            iconCls:'x-fa fa-users',
            collapsed: false,
            items: [{
                xtype: 'availableresources',
                bind: {
                    store: '{benchResourcesStore}'
                }
            }]
        }],

    beforeLayout: function () {
        // We setup some minHeights dynamically to ensure we stretch to fill the height
        // of the viewport minus the top toolbar

        var me = this,
            height = Ext.Element.getViewportHeight() - 64; // offset by topmost toolbar height
        me.maxHeight = height;

        me.callParent(arguments);
    },


});


