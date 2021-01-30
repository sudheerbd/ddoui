/**
 * The file AvailableResourcesModel is ViewModel for 'DDO.view.sheets.AvailableResources'.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.availableresourcesmodel'
 */
Ext.define('DDO.view.sheets.availableresources.AvailableResourcesModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.availableresourcesmodel',

	requires: [
		'DDO.model.resources.Resources',
		'DDO.model.resources.AvailResources'
	],

	data: {
		gridStoreData: null,
		gridFiltered: false
	},

	stores: {
		benchResourcesStore: {
			model:'DDO.model.resources.Resources',
			autoLoad:true, 
			storeId: 'resourcestoreid',
			pageSize: Constants.PAGESIZE,    
			groupField: false, 
			proxy: {
				type: 'ajax',
				url: Api.URL.resources.READ,
				reader: {
					type: 'json',
					rootProperty:'data'
				}
			},
			sorters: [{
				property: 'daysonbench',
				direction: 'DESC'
			}],
			///to load the store based on the BenchFactor
			listeners : {
				load: function(store, records, successful, operation, eOpts){
					store.filterBy(function(val){
						if(val.data.allocation_per == 0){
							return false;
						}
						return true;
					});
				}
			}
		},
		availResourcesStore: {
			model:'DDO.model.resources.AvailResources',
			autoLoad:true, 
			storeId: 'availresources',
			pageSize: Constants.PAGESIZE,    
			groupField: false, 
			proxy: {
				type: 'ajax',
				url: Api.URL.resources.READ,
				reader: {
					type: 'json',
					rootProperty:'data'
				}
			},
			sorters: [{
				property: 'daysonbench',
				direction: 'DESC'
			}],
		}
	}
});