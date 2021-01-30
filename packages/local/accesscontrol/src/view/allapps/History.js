Ext.define('ACCTRL.view.allapps.History', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.accessappshistory',
    requires: [
        'ACCTRL.view.allapps.HistoryGrid',
        'ACCTRL.view.allapps.HistoryController'
    ],
    controller: 'accessapphistorycontroller',
    cls: 'allapps-detail-mainview-cls',
    width: "100%",
    height: "100%",
    layout: {
        type: 'fit'
    },
    tbar: {
        cls: 'allapps-detail-toolbar',
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'button',
            scale: 'large',
            iconCls:'apps-detail-backbtn-cls',
            cls: 'allapps-back-btn-cls',
            handler: 'onBackButtonClick'
        }, {
            xtype: 'label',
            html: '<b>History</b>',
            margin: '0 0 0 400'
           // cls: 'apps-history-title' //cls not working, have to see why
        },'->', {
            xtype: 'combo',
            name: 'historyStatusCombo',
            queryMode : 'local',
            value: 'All',
            store: Ext.create('Ext.data.Store',{
                data: [{
                    historyKey : "All", 
                    status : 'All'
                }, {
                    historyKey : "Requested", 
                    status : 'Pending'
                }, {
                    historyKey : "Approved", 
                    status : 'Active'
                }, {
                    historyKey : "Rejected", 
                    status : 'Rejected'
                }, {
                    historyKey : "Revoked", 
                    status : 'Revoked'
                }]
            }),
            valueField: 'status',
            displayField: 'historyKey',
            triggerAction: 'all',
            editable: false,
            listeners: {
                select: 'onAppsHistoryComboSelect'
            }
        }]   
    },
    items: [{
        xtype: 'accessapphistorygrid',
        height: 530
    }]
});