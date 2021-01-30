/**
 * The file EmployeesInNoticePeriodViewModel is the viewmodel for DDO.view.noticeperiod.EmployeesInNoticePeriodView.
 * @extends {Ext.app.ViewModel}.
 * @alias 'viewmodel.employeesinnoticeperiodviewmodel'.
 */
Ext.define('DDO.view.noticeperiod.EmployeesInNoticePeriodViewModel', {
  extend: 'Ext.app.ViewModel',
  requires: ['ACCTRL.store.myapps.MyAppsGridStore',
    'DDO.model.noticeperiod.EmployeesNoticePeriodListModel',
    'DDO.model.noticeperiod.EmployeesInNoticePeriodProjectModel',
    'DDO.store.projects.people.PeopleViewStore',
    'DDO.model.noticeperiod.ResignationComboModel'
  ],
  alias: 'viewmodel.employeesinnoticeperiodviewmodel',

  data: {
    
    imageurl: null,
    activeItem: 'with_hr',
    progress_status: '',
    empid: '',
    remarkFieldValue: null,
    finalRemarkFieldValue: null,
    actionBtnUnable: false,
    nextbuttonUniqueEnable: null,
    backButtonUniqueEnable: null,
    requestbuttonUniqueEnable: null,
    submitButtonUniqueEnable: null,
    submitButtonUniqueEnablee: true,
    requestbuttonUniqueEnablee: true,
    nextbuttonUniqueEnablee: true,
  },


  stores: {
    myappsgridstore: {
      type: 'myappsgridstore',
      autoLoad: true
    },

    employeesnoticeperiodliststore: {
      model: 'DDO.model.noticeperiod.EmployeesNoticePeriodListModel',
      proxy: {
        type: 'ajax',
        url: Api.URL.exitemployee.READ,
        reader: {
          type: 'json',
          rootProperty: "data"
        }
      },
      autoLoad: true
    },

    resignationcombostore: {
      model: 'DDO.model.noticeperiod.ResignationComboModel',
      proxy: {
        type: 'ajax',
        url: 'resources/data/noticeperiod/status.json',
        reader: {
          type: 'json',
          rootProperty: "data",
        }
      },
    
      autoLoad: true
    },
    employeesinnoticeperiodprojectstore: {
      model: 'DDO.model.noticeperiod.EmployeesInNoticePeriodProjectModel',

      proxy: {
        type: 'ajax',
        url: Api.URL.projectapproval.READPROJ,
        autoLoad: false,
        reader: {
          type: 'json',
          rootProperty: "data"
        }
      }

    },
  },

});