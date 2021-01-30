/**
 * The file RedeemWindowViewModel is the Viewmodel file for the update order history pop-up.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.redeemwindowviewmodel'.
 */
Ext.define('DDO.view.redeem.RedeemWindowViewModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.redeemwindowviewmodel',

	data:{
		created:"",
		cancelbtnDisable:true,
		completebtnDisable:true,
		completebtnVisible:true
	}
});