/**
 * This is ViewModel for view 'DDO.view.widget.wallethistory.WalletAndKarmascoreHistory'.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.walletkarmahistory'
 */
Ext.define('DDO.view.widget.wallethistory.WalletAndKarmaHistoryViewModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.walletkarmahistory',

	data: {
		walletAmount: 0,
		rewardsPoint: 0
	}
});