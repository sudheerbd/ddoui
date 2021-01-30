/**
 * The file ProjectWindowViewModel is the ViewModel for ResourceRequestWindow.
 */
Ext.define('DDO.view.projects.people.ProjectWindowViewModel', {
    extend: 'Ext.app.ViewModel',
  
    alias: 'viewmodel.projectwindowviewmodel',
    data: {
       isUpdate: null,
        employeeData:{
          startdate:null,
          enddate:null,
          project_id:null,
          allocationperct:null,
          shadow_resource:null
        },
      },
    stores: {
        projectRoleStore:{
            type: 'projectrole'
          }
        }
    });