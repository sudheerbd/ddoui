/**
 * The file RedeemWindow is the view file of the update order pop-up.
 * @extends {Ext.window.Window}
 * @alias 'widget.redeemwindow'.
 * ViewModel : 'DDO.view.redeem.RedeemWindowViewModel'.
 * ViewController : 'DDO.view.redeem.RedeemWindowViewController'.
 */
Ext.define('DDO.view.redeem.RedeemWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'DDO.view.redeem.RedeemWindowViewController',
        'DDO.view.redeem.RedeemWindowViewModel'
    ],
    alias: 'widget.redeemwindow',
    controller: 'redeemwindowviewcontroller',
    viewModel: {
        type: 'redeemwindowviewmodel'
    },
    cls: 'redeemwindow-cls',
    resizable: false,
    title: LabelsTitles.REDEEM.ORDERDETAILS,
    modal: true,
    header: true,
    closable: false,
    autoShow: true,
    width: Constants.ViewportWidth * 0.366,
    scrollable: 'y',
    maxHeight: Constants.ViewportHeight,

    initComponent: function() {
        this.callParent(arguments);
        var controller = this.getController();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
   
    items: [{
        xtype: 'form',
        cls: 'rule-winform-cls',
        defaults: {
            labelWidth: 150,
            labelSeparator: ''
        },
        items: [{
            xtype: 'hiddenfield',
            name: 'ddo_redeemhistory_id'
        }, {
            xtype: 'textfield',
            readOnly: true,
            cls: 'redeem-text-cls',
            emptyText: LabelsTitles.REDEEM.ORDERDATE,
            fieldLabel: LabelsTitles.REDEEM.ORDERDATE,
            bind:{
                value:'{created}'
            }
        }, {
            xtype: 'textfield',
            readOnly: true,
            cls: 'redeem-text-cls',
            name: 'ddo_product_order_id',
            emptyText: LabelsTitles.REDEEM.ORDERNUMBER,
            fieldLabel: LabelsTitles.REDEEM.ORDERNUMBER
        }, {
            xtype: 'textfield',
            readOnly: true,
            name: 'status',
            cls: 'redeem-text-cls',
            emptyText: LabelsTitles.REDEEM.STATUS,
            fieldLabel: LabelsTitles.REDEEM.STATUS
        }, {
            xtype: 'grid',
            title: LabelsTitles.REDEEM.PRODUCTS,
            maxHeight: Constants.ViewportHeight * 0.31,
            margin: '0px 0px 5px 0px',
            columnLines: true,
            rowLines: false,
            store: 'redeem.RedeemHistoryItemsGridStore',
            cls: 'redeemhistoryitems-grid-view',
            features: [{
                ftype: 'summary'
            }],
            columns: [{
                text: LabelsTitles.REDEEM.NAME,
                dataIndex: 'product_name',
                flex: 1,
                summaryType: 'sum',
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return 'Total ';
                }
            }, {
                text: LabelsTitles.REDEEM.QTY,
                dataIndex: 'quantity',
                flex: 0.5,
                summaryType: 'sum'
            }, {
                text: LabelsTitles.REDEEM.POINTS,
                dataIndex: 'price',
                flex: 0.5,
                summaryType: 'sum'
            }]
        }]
    }, {
        xtype: 'container',
         margin: '0px 0px 15px 0px',
        layout: {
            type: 'hbox',
            align: 'center',
            pack: 'center'
        },
        items: [{
            xtype: 'button',
            width:'30%',
            bind:{
                disabled:'{completebtnDisable}',
                hidden:'{completebtnVisible}'
            },
            text: LabelsTitles.REDEEM.COMPLETEORDER,
            cls: 'redeemwindow-complete-btn',
            listeners: {
                click: 'onFormCompleteOrderClick'
            }
        },{
            xtype: 'button',
            width:'30%',
            bind:{
                disabled:'{cancelbtnDisable}'
            },
            text: LabelsTitles.REDEEM.CANCELORDER,
            cls: 'redeemwindow-cancel-btn',
            listeners: {
                click: 'onFormCancelOrderClick'
            }
        }]
    }]
});