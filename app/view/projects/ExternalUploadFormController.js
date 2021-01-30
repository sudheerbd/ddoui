/**
 * The file ExternalUploadFormController is the View controller for DDO.view.projects.ExternalUploadForm.
 * @extends {Ext.app.ViewController}.
 * @alias controller.externaluploadformcontroller.
 */
Ext.define('DDO.view.projects.ExternalUploadFormController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.externaluploadformcontroller',

	onProjectImgChange: function(filefield, value, eOpts) {
		var me = this,
			uploadFormWindow,
			dashboardView = Ext.ComponentQuery.query('projectdashboardview')[0],
			tabsView = Ext.ComponentQuery.query('projectstabsview')[0],
			project_id =this.getViewModel().get('project_id'),
			store =Ext.getStore('projects.ProjectDashboardStore');

		filefield.up('form').submit({
			url: "/project",
			scope:this,
			params: {
				projectId: project_id
			},
			success: function() {
				var text = Ext.JSON.decode(arguments[1].response.responseText),
					pathImg = text.data;
				uploadFormWindow = me.lookupReference('externalUploadForm') || me.getView();
				uploadFormWindow.close();
				store.load({
					scope:this,
					callback:function(){
						var data = store.findRecord('project_id', project_id);
						tabsView.down('dataview').setData(data);
					}
				});
				dashboardView.refresh();
				Ext.toast('Project image changed successfully.');
			},
			failure: function() {
				uploadFormWindow = me.lookupReference('externalUploadForm') || me.getView();
				uploadFormWindow.close();

				Ext.toast('Failed to change project pic');
			}
		});
	},

	onWindowOutsideTap: function(event, target) {
		var view = this;
		Utility.onWindowOutterTap(event, target, view);
	}
});