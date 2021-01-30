/**
 * This is ViewModel for view 'Goals.view.ExecutivePlanMain'.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.executiveplanmainview'
 */
Ext.define('Goals.view.ExecutivePlanMainViewModel', {
	extend: 'Ext.app.ViewModel',

	requires: [
		'Goals.model.NotesModel',
		'Goals.model.Rating'
	],
	alias: 'viewmodel.executiveplanmainview',
	data: {
		goalStatus: null,
		goalStatusIconCls: null,
		goalFieldReadyOnly: false
	},
	stores: {
		goalNoteStore: {
			model: 'Goals.model.NotesModel',
			autoLoad: false,
			proxy: {
				type: 'ajax',
				url: '/goalnote',
				reader: {
					type: 'json',
					rootProperty: 'data'
				}
			}
		},
		ratingIconStore: {
			autoLoad: true,
			model: 'Goals.model.Rating',
			proxy: {
				type: 'ajax',
				url: '/resources/data/goalrating.json',
				reader: {
					type: 'json',
					rootProperty: 'data'
				}
			}
		}
	}
});
