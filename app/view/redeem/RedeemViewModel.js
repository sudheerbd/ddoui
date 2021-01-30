/**
 * The file RedeemViewModel is the Viewmodel file for the order history view.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.redeemviewmodel'.
 */
Ext.define('DDO.view.redeem.RedeemViewModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.redeemviewmodel',

	data: {
		rewardPoints: 0,
		isadmin:false
	}
});