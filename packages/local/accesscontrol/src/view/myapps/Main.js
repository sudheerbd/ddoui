Ext.define('ACCTRL.view.myapps.Main', {
    extend: 'Ext.form.Panel',
    xtype : 'myappsmain',

    requires: [
        'ACCTRL.view.AccessAppHeader',
        'ACCTRL.view.myapps.MyAppsController',
        'ACCTRL.view.myapps.MyAppsGrid'
    ],
    controller: 'myappscontroller',

    cls: 'myapps-view-cls',
    layout: 'fit',
    height: '100%',
    width: '100%',

    initComponent: function(){
        this.callParent(arguments);
        this.down('accessappheader').add({
            xtype: 'combo',
            name: 'statusCombo',
            value: 'All',
            store: 'AppSatusStore',
            valueField: 'status',
            displayField: 'controlKey',
            triggerAction: 'all',
            editable: false,
            listeners: {
                select: 'onMyAppsComboSelect'
            }
        });
    },
    dockedItems: [{
        xtype: 'accessappheader',
        dock: 'top'
    }],
    items: [{
        xtype: 'myappsgrid',
        height: 530
    }]
});
