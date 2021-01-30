/**
 * The file HelpMenuViewModel is the Viewmodel file for the help view.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.helpmenuviewmodel'.
 */
Ext.define('DDO.view.help.HelpMenuViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.helpmenuviewmodel',

	requires: [
        'DDO.model.help.HelpMenuModel'
    ],

	data: {
		htmlText: ''
	},
	stores: {
		helpContentStore: {
			model: 'DDO.model.help.HelpMenuModel',
			autoLoad: true,
			proxy: {
				type: 'ajax',
				url: '/resources/data/help.json',
				reader: {
					type: 'json',
					rootProperty: 'data'
				}
			}
		}
	}
});