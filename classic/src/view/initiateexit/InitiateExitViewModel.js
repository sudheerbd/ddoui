/**
 * This is viewModel file for 'DDO.view.initiateexit.InitiateExitView'
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.initiateexitviewmodel'
 */
Ext.define('DDO.view.initiateexit.InitiateExitViewModel', {

  extend: 'Ext.app.ViewModel',
  requires: ['DDO.store.projects.people.EmployeePeopleStore'],
  alias: 'viewmodel.initiateexitviewmodel',
  data: {
    imageUrl: null
  },
  stores: {
    allResourcesStore: {
      type: 'scoredetails',
      proxy: {
        extraParams: {
          all: true
        }
      },
      autoLoad: true,
    },
  }
});