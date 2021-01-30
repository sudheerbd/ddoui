Ext.define('ACCTRL.view.allapps.Main', {
    extend: 'Ext.container.Container',
    alias: 'widget.allappsmain',
    cls: 'all-apps-main',
    requires: [
        'ACCTRL.view.allapps.AllApps',
        'ACCTRL.view.allapps.DetailView',
        'ACCTRL.view.allapps.HistoryGrid',
        'ACCTRL.view.allapps.History'
    ],
    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            layout: 'card',
            activeItem: 0,
            items: [{
                xtype: "allapps"
            }, {
                xtype: "accessappsdetailview"
            }, {
                xtype: "accessappshistory"
            }]
        });

        me.callParent(arguments);
    }
});
