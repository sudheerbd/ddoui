/**
 * This file is ViewModel for 'DDO.grid.Panel'.
 * @extends {Ext.app.ViewModel}
 * @alias viewmodel.walletgridview
 */
Ext.define('DDO.view.karmasetup.wallet.WalletGridViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.walletgridview',
  
    requires: [
        'DDO.model.karmasetup.wallet.WalletGrid'
    ],
    data:{
    	name:[
    	  'cbpid',
          'walletId',
          'employeename',
          'description', 
    	  'points',
          'sharable',
    	  'year',
    	  'yearid'
        ]
    },
    stores: {
        walletGridStore : {
            model: 'DDO.model.karmasetup.wallet.WalletGrid',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                api: {
                    read: Api.URL.wallet.READ,
                    update: Api.URL.wallet.UPDATE,
                    create: Api.URL.wallet.CREATE
                },
                reader: {
                    type: 'json',
                    rootProperty: "data"
                },
                actionMethods: {
                    read: 'GET',
                    create: 'POST',
                    update: 'PUT'
                },
                writer: {
                    writeAllFields: true
                }
            }
        }
    }
});