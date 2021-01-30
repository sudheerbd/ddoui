/**
 * This view is responsible for displaying karma history of logged user..
 * @class 'DDO.view.widget.wallethistory.KarmascoreHistory'
 * @extends 'Ext.grid.Panel'
 * @alias 'widget.karmascorehistory'
 * @Controller 'DDO.view.widget.wallethistory.WalletAndKarmaHistoryController'
 */
Ext.define('DDO.view.widget.wallethistory.KarmascoreHistory', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.karmascorehistory',

    requires: [
        'DDO.store.widget.wallethistory.KarmaHistoryStore'
    ],

    cls: 'wallethistorygrid-cls',


    store: 'widget.wallethistory.KarmaHistoryStore',
    listeners:{
        celldblclick:'onDescClick'
    },

    columnLines: true,
    rowLines: false,
    emptyText: LabelsTitles.PROFILE.NODATA,

    columns: [{
        text: LabelsTitles.PROFILE.MONTH,
        type: 'string',
        dataIndex: 'karmaGivenDate',
        menuDisabled: true,
        flex:1,
        //renderer: Ext.util.Format.dateRenderer('d-m-Y')
    }, {
        text: LabelsTitles.PROFILE.POINTS,
        dataIndex: 'points',
        menuDisabled: true,
        flex:1,
    }, {
        text: LabelsTitles.PROFILE.DESCRIPTION,
        dataIndex: 'plain_description',
        flex:3,
        menuDisabled: true,
        renderer: function(value, store, rec) {
            //return '<span style="text-align:left !important;padding-left:15px !important;">'+value+'</span>';
            var val = Ext.util.Format.ellipsis(value, 110);
            return val;
        }
    }, {
        text: LabelsTitles.PROFILE.BY,
        dataIndex: 'byto',
        menuDisabled: true,
        flex:2
    }]
});