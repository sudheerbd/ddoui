/**
 * The file ProjectsViewModel is the viewmodel for 'DDO.view.projects.ProjectsView.
 * @extends {Ext.app.ViewModel}.
 * @alias  'viewmodel.projectsviewmodel'.
 */
Ext.define('DDO.view.projects.ProjectsViewModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.projectsviewmodel',

	data: {
		activeProData: null,
		projectname: null,
		projectId: null
	},
	stores : {
		projectStatus : {
			proxy: {
				type: 'ajax',
				url: 'resources/data/projects/projectstatus.json',
				reader: {
					type: 'json',
					rootProperty: "data"
				}
			},
			autoLoad: true
		}
	},
	
});