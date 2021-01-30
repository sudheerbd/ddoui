Ext.define('DDO.view.main.MainContainerWrap', {
    extend: 'Ext.container.Container',
    xtype: 'maincontainerwrap',

    requires: [
        'Ext.layout.container.HBox',
        // 'DDO.view.dashboard.availibilitysheet.BorderContainer',
        'DDO.view.sheets.availibilitysheet.AvailibilityView',
        'DDO.view.sheets.allocationsheet.AllocationView',
        // 'DDO.view.dashboard.bench.BenchView',
        'DDO.view.sheets.benchsheet.BenchView',
        'DDO.view.projectrequest.ProjectRequest',
        'DDO.view.projectapproval.ProjectApproval'
    ],

    scrollable: 'y',

    layout: {
        type: 'hbox',
        align: 'stretchmax'

        // Tell the layout to animate the x/width of the child items.
        // animate: true,
        // animatePolicy: {
        //     x: true,
        //     width: true
        // }
    },

    beforeLayout: function() {
        // We setup some minHeights dynamically to ensure we stretch to fill the height
        // of the viewport minus the top toolbar

        var me = this,
            height = Ext.Element.getViewportHeight() - 64, // offset by topmost toolbar height
            // We use itemId/getComponent instead of "reference" because the initial
            // layout occurs too early for the reference to be resolved
            //navTree = me.getComponent('navigationTreeList'),
            navTree = me.down('container[name="menucontainer"]').getComponent('navigationTreeList'),
            href, profile;

        me.minHeight = height;
        
        navTree.setStyle({
            //'min-height': height + 'px',
             'height':height+ 'px',
             'max-height': height + 'px'
        });

        href = window.location.href.toString();
        profile = href.indexOf("profile");
        Ext.suspendLayouts();
        if (profile > 0) {
            me.down('container[name="menucontainer"]').setWidth(0);
            navTree.setWidth(0);
        } else {
            me.down('container[name="menucontainer"]').setWidth(240);
            navTree.setWidth(240);
            //navTree.setWidth(195);
        }
        Ext.resumeLayouts(true);

        me.callParent(arguments);
    }
});
