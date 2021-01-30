/**
 * This is viewModel file for 'DDO.view.dashboardview.KarmaScoreDashboardViewModel'
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.karmascoredashboardviewmodel'
 */
Ext.define('DDO.view.dashboardview.KarmaScoreDashboardViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.karmascoredashboardviewmodel',
  requires: ['DDO.model.dashboardview.KarmaScoreDashboardmodel'],
  stores: {
    karmaDashboardaccepted: {
      model: 'DDO.model.dashboardview.KarmaScoreDashboardmodel',
      autoLoad: false,
      proxy: {
        type: 'ajax',
        url: Api.URL.karmascoredashboard.READ,
        reader: {
          type: 'json',
          rootProperty: "data",
        },
        extraParams: {
          approved: 'Y'   
        }
      },
      groupField: 'karmacategory_name',
    },
    karmaDashboardpending: {
      model: 'DDO.model.dashboardview.KarmaScoreDashboardmodel',
      autoLoad: false,
      proxy: {
        type: 'ajax',
        url: Api.URL.karmascoredashboard.READ,
        reader: {
          type: 'json',
          rootProperty: "data",
        },
        extraParams: {
          pending: 'Y'   
       }
      },
      groupField: 'karmacategory_name',
    },
    karmaDashboardreject: {
      model: 'DDO.model.dashboardview.KarmaScoreDashboardmodel',
      autoLoad: false,
      proxy: {
        type: 'ajax',
        url: Api.URL.karmascoredashboard.READ,
        reader: {
          type: 'json',
          rootProperty: "data",
        },
        extraParams: {
          rejected: 'Y'   
        }
      },
      groupField: 'karmacategory_name',
    },
  },
  data: {
    name: 'Dashboard',
    totaActualKarma: '',
    totalPotentialKarma: '',
    isYearSelected: false,
    startDate: null,
    endDate: null

  }
});
