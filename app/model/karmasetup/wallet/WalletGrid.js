Ext.define('DDO.model.karmasetup.wallet.WalletGrid', {
    extend: 'Ext.data.Model',

    alias: 'model.walletgrid',

    idProperty: 'ddo_wallet_id',

    fields: [{
        'name': 'ddo_wallet_id'
    }, {
        'name': 'points',
         sortDir: 'ASC',
         sortType: 'asInt'
    }, {
        'name': 'yearid'
    }, {
        'name': 'description'
    }, {
        'name': 'sharable'
    }, {
        'name': 'year'
    }, {
        'name': 'employeename'
    },{
        'name': 'walletType'
    }]
});