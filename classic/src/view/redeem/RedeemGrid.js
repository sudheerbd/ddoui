/**
 * The file RedeemGrid is the view file of the order history list.
 * @extends {Ext.grid.Panel}
 * @alias 'widget.redeemgrid'.
 * ViewModel : 'DDO.view.redeem.RedeemViewModel'.
 * ViewController : 'DDO.view.redeem.RedeemViewController'.
 */
Ext.define('DDO.view.redeem.RedeemGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.redeemgrid',

    cls: 'redeemgrid-cls',

    height: Constants.ViewportHeight * 0.932,
    width: '100%',
    viewConfig: {
        loadMask: false,
        emptyText: LabelsTitles.REDEEM.NORECORD,
    },
    columns: [{
        text: LabelsTitles.REDEEM.ORDERBY,
        dataIndex: 'buyer_name',
        flex: 1,
        bind: {
            hidden: '{!isadmin}'
        }
    }, {
        text: LabelsTitles.REDEEM.ORDERDATE,
        xtype: 'datecolumn',
        format: 'd-m-Y',
        dataIndex: 'created',
        flex: 1
    }, {
        text: LabelsTitles.REDEEM.POINTS,
        dataIndex: 'redeem_points',
        flex: 1
    }, {
        text: LabelsTitles.REDEEM.ORDERREF,
        dataIndex: 'ddo_product_order_id',
        flex: 1
    }, {
        text: LabelsTitles.REDEEM.STATUS,
        dataIndex: 'status',
        flex: 1
    }],
    listeners: {
        celldblclick: "onRedeemGridClick"
    }
});



