Ext.define('DDO.model.noticeperiod.EmployeesInNoticePeriodProjectModel', {
  extend: 'Ext.data.Model',
  alias: 'model.employeesinnoticeperiodprojectmodel',
  fields: [
    {
      name: 'empfullname',

    },
    {
      name: 'projectname'
    },
    {
      name: 'startdate',
      convert: function(value, record) {

        value = Ext.Date.format(new Date(value), 'Y-m-d') ;
        return value;
      }
      // convert:function(value){

    //     return value.split('T')[0];
    // }
    },
    {
      name: 'enddate',
      convert: function(value) {

        if (value.includes('T')) {
          value = Ext.Date.format(new Date(value), 'Y-m-d')
        }
        return value;
      }
    },
    {
      name: 'proposeddate',
      convert: function(value) {
      if (value != null) {
        value = Ext.Date.format(new Date(value), 'Y-m-d')
      }
      return value;
    }
    },
  ]
});