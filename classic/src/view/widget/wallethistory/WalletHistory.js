/**
 * This view is responsible for displaying wallet history of logged user..
 * @class 'DDO.view.widget.wallethistory.WalletHistory'
 * @extends 'Ext.grid.Panel'
 * @alias 'widget.wallethistory'
 * @Controller 'DDO.view.widget.wallethistory.WalletAndKarmaHistoryController'
 */
Ext.define('DDO.view.widget.wallethistory.WalletHistory', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.wallethistory',

    requires: [
        'DDO.store.widget.wallethistory.WalletHistoryStore'
    ],

    cls: 'wallethistorygrid-cls',

    store: 'widget.wallethistory.WalletHistoryStore',

    emptyText: LabelsTitles.PROFILE.NODATA,
    columnLines: true,
    rowLines: false,
    listeners:{
        celldblclick:'onDescClick'
    },

    columns: [{
        text: LabelsTitles.PROFILE.MONTH,
        dataIndex: 'karmaGivenDate',
        type: 'string',
        flex:1,
        menuDisabled: true,
        //renderer: Ext.util.Format.dateRenderer('d-m-Y')
    }, {
        text: LabelsTitles.PROFILE.POINTS,
        dataIndex: 'points',
        flex:1,
        menuDisabled: true,
        renderer: function(value, store, rec) {

            if (rec.get('trxtype') == 'CR') {

                return '<span style="color:green;">' + value + '</span>';
            } else if (rec.get('trxtype') == 'DR') {

                return '<span style="color:red;">' + value + '</span>';
            } else {
                return value;
            }

        }
    }, {
        text: LabelsTitles.PROFILE.DESCRIPTION,
        dataIndex: 'plain_description',
        flex:3,
        menuDisabled: true,
        renderer: function(value, store, rec) {
            var val = Ext.util.Format.ellipsis(value, 110);
            return val;
        }

    }, {
        text: LabelsTitles.PROFILE.BYTO,
        dataIndex: 'byto',
        menuDisabled: true,
        flex:2
    }, {
        text: LabelsTitles.PROFILE.TRXTYPE,
        dataIndex: 'trxtype',
        menuDisabled: true,
        hidden: true
    }]
});