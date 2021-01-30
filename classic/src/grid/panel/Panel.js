/**
 * This view is responsible for display list of already exist wallets.
 * @class DDO.grid.Panel,
 * @alternateClassName : 'DDO.grid.DDOGridPanel'
 * @extends Ext.grid.Panel
 * @alias widget.ddowalletgrid
 * @viewModel : 'DDO.view.karmasetup.wallet.WalletGridViewModel'
 * @controller : 'DDO.view.karmasetup.WalletGridViewController'
 */
Ext.define('DDO.grid.Panel', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.ddowalletgrid',
    alternateClassName: ['DDO.grid.DDOGridPanel'],
    requires: [
        'DDO.view.karmasetup.WalletGridViewController',
        'DDO.view.karmasetup.wallet.WalletGridViewModel'
    ],

    controller: 'walletgridview',
    viewModel: {
        type: 'walletgridview'
    },

    plugins: 'gridfilters',
    height: Constants.ViewportHeight * 0.775,
    width: '100%',
    viewConfig: {
        loadMask: false
    },
    bind: {
        store : '{walletGridStore}'
    },
    cls: 'ddo-grid',
    trackMouseOver: false,
    columnLines: true,
    headerDisabled: true,

    columns: [{
        text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.WALLETOWNER,
        align: 'left',
        style: 'text-align:center',
        dataIndex: 'employeename',
        flex: 1,
        height: 42,
        menuDisabled: false,
        filter: {
            type: 'string',
            itemDefaults: {
                emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.SEARCHFOR
            }
        }
    }, {
        text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.POINTS,
        align: 'center',
        style: 'text-align:center',
        dataIndex: 'points',
        flex: 0.3,
        filter: {
            type: 'number'
        }
    }, {
        text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.Year,
        align: 'center',
        style: 'text-align:center',
        dataIndex: 'year',
        flex: 0.3,
        filter: {
            type: 'number'
        }
    }, {
        text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.DESCRIPTION,
        align: 'left',
        style: 'text-align:center',
        dataIndex: 'description',
        flex: 1.5
    }, {
        text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.SHARABLE,
        align: 'center',
        style: 'text-align:center',
        dataIndex: 'sharable',
        flex: 0.5
    }],

    listeners: {
        itemdblclick: 'itemClick'
    }
});
