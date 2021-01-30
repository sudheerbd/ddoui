Ext.define('DDO.view.settings.DDOSettings', {
	extend: 'Ext.tab.Panel',

	alias: 'widget.ddosettings',

	requires: [
		'DDO.view.settings.GoalSettings',
		'DDO.view.settings.FinancialYearSettings',

		'DDO.view.settings.DDOSettingsViewModel',
		'DDO.view.settings.DDOSettingsController'
	],

	cls: 'wallethistorytab-cls',
	margin: 5,

	controller: 'ddosettings',
	viewModel: {
		type: 'ddosettings'
	},

	items: [{
		xtype: 'goalsettings'
	}/*, {
		xtype: 'financialyearsettings'
	}*/]
});