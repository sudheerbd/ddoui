Ext.define('DDO.model.employeereportview.EmployeeReportModel', {
  extend: 'Ext.data.Model',
  alias:'model.employeereportmodel',
	requires: [
		'Ext.data.field.Field'
  ],
  
  fields:[
    {
      name :'empexperience',
      convert:function(value){
        if (value) {
          var yearsQuo = 0,
              yearsRem = 0,
              months = 0,
              monthString = "",
              yearStrig = "";
          yearsQuo = Math.floor((value / 365));
          yearsRem = Math.floor((value % 365));
          months = Math.floor(yearsRem / 30);
          yearStrig = yearsQuo > 1 ? yearsQuo + " Years" : (yearsQuo == 0) ? yearStrig : yearsQuo + " Year";
          monthString = months > 1 ? months + " Months" : (months == 0) ? monthString : months + " Month";
          value = yearStrig + " " + monthString;
      } else {
          value = '';
      }
      return value;
      }
    },{
      name: 'isbillable',
      convert: function(value){
        if(value === 'Y'){
          return 'Billable'
        } else {
          return 'Non Billable'
        }
      }
    },{
      name: 'joiningdate',
      convert: function(value){
        return Ext.util.Format.date(value, 'Y-m-d');
      }
    }
  ]
});