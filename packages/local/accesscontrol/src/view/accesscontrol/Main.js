Ext.define('ACCTRL.view.accesscontrol.Main', {
    extend: 'Ext.form.Panel',
    xtype : 'accesscontrolmain',
    requires: [
    	'ACCTRL.view.AccessAppHeader',
        'ACCTRL.view.accesscontrol.AccessControlController',
        'ACCTRL.view.accesscontrol.AccessControlGrid'
    ],
    controller: 'accesscontrolcontroller',

    cls: 'access-control-view-cls',
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
            displayField: 'appKey',
            triggerAction: 'all',
            editable: false,
            listeners: {
                select: 'onAccessControlComboSelect'
            }
        });
    },
    dockedItems: [{
        xtype: 'accessappheader',
        dock: 'top'
    }],
    items: [{
        xtype: 'accesscontrolgrid',
        height: 530
    }]
});
