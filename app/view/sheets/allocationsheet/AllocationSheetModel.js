/**
 * The file AllocationSheetModel is the ViewModel of 'DDO.view.dashboard.allocationsheet.AllocationSheetContainer'.
 */
Ext.define('DDO.view.sheets.allocationsheet.AllocationSheetModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.allocationsheetmodel',

	requires: [
		'DDO.model.allocation.Allocation',
		'Ext.data.proxy.JsonP'
	],
	stores: {
		allocation: {
			model: 'DDO.model.allocation.Allocation',
			proxy: {
				type: 'ajax',
				url: '/dashboard/allocation',
				reader: {
					type: 'json',
					rootProperty: 'data'
				}
			}
		},
		allocationmonthstore:{
			model:'Ext.data.Model',
			fields: ['id','month'],
			autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'resources/data/sheets/MonthNameData.json',
                reader: {
                    type: 'json',
                    rootProperty: "data"
                }
            }
		}
	}
});