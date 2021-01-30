/**
 * The file KarmaAccessWindowViewModel is the viewmodel for 'DDO.view.karmasetup.karmaaccess.KarmaAccessWindowView'.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.karmaaccesswindowview'.
 */
Ext.define('DDO.view.karmasetup.karmaaccess.KarmaAccessWindowViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.karmaaccesswindowview',
	data:{
		saveBtnAccess:true
	},
	stores:{
		karmaAccessStore:{
			type:'karmastore',
			autoLoad : true
		}
	}
});