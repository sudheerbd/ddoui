Ext.define('DDO.model.noticeperiod.EmployeesNoticePeriodListModel', {
  extend: 'Ext.data.Model',
  alias: 'model.employeesnoticeperiodlistmodel',
  fields: [
    {
      name: 'reqbyname',
      convert: function(data) {}
    },
    {
      name: 'reqtoname'
    },
    {
      name: 'joiningdate',
      
      convert: function(value, record) {
       
        value = Ext.Date.format(new Date(value), 'd-m-Y') ;
        return value;
      }
    },
    {
      name: 'empstatus'
    },
    {
      name: 'status'
    }, {
      name: 'remarks'
    },
    {
      name: 'proposeddate',
      convert: function(value, record) {
      
        value = Ext.Date.format(new Date(value), 'd-m-Y') ;
        return value;
      }
    },
    {
      name: 'ddo_emp_exit_id'
    },
    {
      name: 'final_remarks'
    },
    {
      name: 'actual_date'
    },
    {
      name: 'imageurl',
      convert: function(value, record){
       
        value = Api.URL.imageUrl + value ;
        return value;
      }
    }

  ]
});
