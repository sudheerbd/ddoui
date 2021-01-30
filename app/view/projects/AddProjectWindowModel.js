/**
 * The file AddProjectWindowModel is the viewmodel for AddProjectWindow.
 * @extends {Ext.app.ViewModel},
 * @alias viewmodel.addprojectwindowmodel
 */
Ext.define('DDO.view.projects.AddProjectWindowModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.addprojectwindowmodel',

	data: {
		projectLogoUrl: ""
	},
	stores: {
		projectClientStore: {
			autoLoad: true,
			proxy: {
				type: 'ajax',
				url: Api.URL.projectsclientstore.READ,
				reader: {
					type: 'json',
					rootProperty: "data"
				}
			}
		},
		projectListStore: {
			model: 'Ext.data.Model',
			autoLoad:true,
			proxy: {
			  type: 'ajax',
			  url: Api.URL.projectdashboardstore.AllProjects,
			  reader: {
				type: 'json',
				rootProperty: 'data'
			  }
			},
		  }
	}
});