Ext.define('ACCTRL.view.allapps.DetailView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.accessappsdetailview',
    requires: [
        'ACCTRL.view.allapps.AppDetails',
        'ACCTRL.view.allapps.DetailViewController'
    ],
    controller: 'accessappsdetailviewcontroller',
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

        }, '->', {
            xtype: 'button',
            text: 'Revoke',
            name: 'revoke',
            disabled: true,
            cls: 'allappsdetail-revoke-btn',
            handler: 'onRevokeBtnClick'
            
        }, {
            xtype: 'button',
            text: 'History',
            cls: 'allappsdetail-history-btn',
            handler: 'onHistoryBtnClick'
        }]
    },
    items: [{
        xtype: 'appdetails'
    }]
});