/**
 * This is ViewModel for view 'Goals.view.goals.GoalsMainView'.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.goalmainviewmodel'
 */
Ext.define('Goals.view.goals.GoalMainViewModel', {
	extend: 'Ext.app.ViewModel',

	requires: [
	],
	alias: 'viewmodel.goalmainviewmodel',
	data: {
		defaultValue : 'test'
	},
	stores: {
		goalTypeStore: {
			autoLoad: true,
			proxy: {
				type: 'ajax',
				url: '/resources/data/goals/goalsstore.json',
				reader: {
					type: 'json',
					rootProperty: "data"
				}
			},
			listeners: {
				load: function(me, records, successful, operation, eOpts ){
					var goalTypeCombo = Ext.ComponentQuery.query('[name = goaltypecombo]')[0];
					goalTypeCombo.setSelection(records[0]);
				}
			}
		}
	}
});
