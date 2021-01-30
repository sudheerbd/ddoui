Ext.define('DDO.view.employeereportview.EmployeeReportWinViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.employeereportwinviewmodel',
  requires: ['DDO.model.employeereportview.EmployeeReportWinModel'],
  data: {
    applybtn: true
  },
  stores: {
    employestore: {
      model: 'DDO.model.employeereportview.EmployeeReportWinModel',
      proxy: {
        type: 'ajax',
        api: {
          read: Api.URL.profile.EMPDESIGNATION,
        },
        reader: {
          type: 'json',
          rootProperty: "data"
        }
      },
      autoLoad: true
    },
    designationstore: {
      proxy: {
        type: 'ajax',
        api: {
          read: Api.URL.designation.READ,
        },
        reader: {
          type: 'json',
          rootProperty: "data"
        }

      },
      autoLoad: true,
    },
    // projectsstore: {
    //   proxy: {
    //     type: 'ajax',
    //     url: Api.URL.projectdashboardstore.READ,

    //     reader: {
    //       type: 'json',
    //       rootProperty: 'data'
    //     }
    //   },
    //   autoLoad: true,
    // },
    primaryskillstore: {
      proxy: {
        type: 'ajax',
        url: Api.URL.primaryskillscombostore.READ,
        reader: {
          type: 'json',
          rootProperty: "data"
        }
      },
      autoLoad: true,
    }
  }
});