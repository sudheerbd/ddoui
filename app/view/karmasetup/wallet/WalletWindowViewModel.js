/**
 * This is viewModel file for 'DDO.view.karmasetup.wallet.WalletWindowView'
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.walletwindowview'
 */
Ext.define('DDO.view.karmasetup.wallet.WalletWindowViewModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.walletwindowview',
	requires: [
		'DDO.model.karmasetup.wallet.YearCombo',
		'DDO.model.karmasetup.wallet.WalletType'
    ],

	data: {
		empid: null,
		employeeid:null,
		points: null,
		hideEmpId: false,
		yearid: null,
		description: null,
		walletWindowHeight: Constants.ViewportHeight * 0.51,
		sharable: null,
		nonEditablePermit: false,
		walletTypeValue: null
	},
	formulas: {
		hideEmpId: {
			bind: {
				walletTypeValue: '{walletTypeValue}'
			},
			get: function(data){
				var view = this.getView(),
					descriptionField = view.down('[name = description]');
				if(data.walletTypeValue == 'Organization' || Ext.isEmpty(data.walletTypeValue)){
					this.set('walletWindowHeight', Constants.ViewportHeight * 0.51);
					descriptionField.setEmptyText('Organization Wallet Name');
					return true;
				} else {
					this.set('walletWindowHeight', Constants.ViewportHeight * 0.59);
					descriptionField.setEmptyText('Description');
					return false;
				}
			}
		}
	},
	stores: {
        yearComboStore : {    
            model: 'DDO.model.karmasetup.wallet.YearCombo',
            autoLoad: true,
            method: 'GET',
            proxy: {
                type: 'ajax',
                url: Api.URL.yearcombostore.READ,
                reader: {
                    type: 'json',
                    rootProperty: "data"
                }
            }
		},
		walletTypeStore: {
			 model: 'DDO.model.karmasetup.wallet.WalletType',
			 autoLoad: true,
			 method: 'GET',
			 proxy: {
				type: 'ajax',
				url: Api.URL.wallettype.READ,
			   	reader: {
					 type: 'json',
					 rootProperty: "data"
				 }
			 }
		}
    }
});