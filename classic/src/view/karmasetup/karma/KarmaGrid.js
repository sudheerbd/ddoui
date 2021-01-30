Ext.define('DDO.view.karmasetup.karma.KarmaGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.karmagrid',

    cls: 'karmalist-cls',

    plugins: 'gridfilters',

    viewConfig: {
        loadMask: false
    },

    height: 500,
    width: '100%',

    columns: [{
        text: 'Name',
        dataIndex: 'name',
        flex: 0.7,
        height: 42,
        filter: {
            type: 'string',
            itemDefaults: {
                emptyText: 'Search...'
            }
        }
    }, {
        text: 'Description',
        dataIndex: 'description',
        flex: 0.7
    }, {
        text: 'Karma Category',
        dataIndex: 'karmacategoryname',
        flex: 0.7,
        filter: {
            type: 'string',
            itemDefaults: {
                emptyText: 'Search...'
            }
        }

    }, {
        text: 'Wallet',
        dataIndex: 'walletemployeename',
        flex: 0.7,
        filter: {
            type: 'string',
            itemDefaults: {
                emptyText: 'Search...'
            }
        }

    }, {
        text: 'Show on Timeline',
        dataIndex: 'showontimeline',
        align: 'center',
        flex: 0.7

    }, {
        text: 'Rule Based',
        dataIndex: 'isrulebased',
        align: 'center',
        flex: 0.7

    }, {
        text: 'Rating Based',
        dataIndex: 'isratingbased',
        align: 'center',
        flex: 0.7

    }],
    listeners: {
        rowdblclick: 'onKarmaGridRowClick'
    }
});
