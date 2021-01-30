Ext.define('DDO.store.projects.people.EmployeePeopleStore', {
  extend: 'Ext.data.Store',
  alias: 'store.emppeoplestore',
  storeId: 'emppeoplestore',

  fields: [
    'c_bpartner_id',
    'employee_code',
    'employee',
    'hr_designation',
    'hr_designation_id',
    'image'
  ],

  //This proxy is used when we are loading data from remote APIs
  proxy: {
    type: 'ajax',
    url: Api.URL.karma.READ,
    extraParams: {
      all: true
    },
    reader: {
      type: 'json',
      rootProperty: 'data'
    }
  }
});