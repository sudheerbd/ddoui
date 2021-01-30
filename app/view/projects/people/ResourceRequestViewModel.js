/**
 * The file ResourceRequestViewModel is the ViewModel for 'DDO.view.projectrequest.ProjectRequest'.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.resourcerequestviewmodel'.
 */
Ext.define('DDO.view.projects.people.ResourceRequestViewModel', {
  extend: 'Ext.app.ViewModel',

  alias: 'viewmodel.resourcerequestviewmodel',

  data: {  
    isUpdate : null,
    minValue:new Date(),
    editMode:null,
    employeeData:{
      startdate:null,
      enddate:null,
      project_id:null,
      allocationperct:null,
      shadow_resource:null
    },
  },
  stores: {
    allResourcesStore: {
        type: 'scoredetails',
        proxy: {
            extraParams: {
                // loading all the records
                all: true
            }
        },
        autoLoad: true,
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
    },
    allocationProjectStore:{
      model: 'DDO.model.projects.people.AddPeopleSearchModel',
      proxy:{
        type:'memory',
        reader:{
            type:'json'
        }
      }
    },
    peopleViewStore:{
      type: 'peopleviewstore'
    },
    projectRoleStore:{
      type: 'projectrole',
      autoLoad:true,
    }
  }
});