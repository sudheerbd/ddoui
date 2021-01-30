Ext.define('ACCTRL.view.allapps.AllApps', {
    extend: 'Ext.form.Panel',
    xtype: 'allapps',
    layout: 'fit',
    height: '100%',
    width: '100%',
    scrollable: false,
    requires: [
        'ACCTRL.view.AccessAppHeader',
        'ACCTRL.view.allapps.AllAppsController',
        'ACCTRL.view.allapps.AllAppsGrid'
    ],
    controller: 'allappscontroller',

    cls: 'all-apps-view-cls',
    initComponent: function(){
        this.callParent(arguments);
        this.down('accessappheader').add({
            xtype: 'button',
            cls: 'allapps-add-btn',
            text: 'Add New',
            handler: 'onAddNewAppClick'
        });
    },
    dockedItems: [{
        xtype: 'accessappheader',
        dock: 'top'
    }],
    items: [{
        xtype: 'allappsgrid',
        height: 530
    }]
});