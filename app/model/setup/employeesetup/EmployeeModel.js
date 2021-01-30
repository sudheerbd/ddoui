Ext.define('DDO.model.setup.employeesetup.EmployeeModel', {
  extend: 'Ext.data.Model',
  alias: 'model.employeemodel',
  fields: [{
    name: 'basic.firstname',
    //type:'string',
    mapping: 'basic.firstname'
  },
  {
    name: 'empId',
    //type:'string',
    mapping: 'basic.ddo_employee_id'
  },
  {
    name: 'basic.lastname',
    //type:'string',
    mapping: 'basic.lastname'
  }, {
    name: 'basic.email',
    // type:'string',
    mapping: 'basic.email'
  }, {
    name: 'workdetails.departmentname',
    // type:'string',
    mapping: 'workdetails.departmentname'
  }, {
    name: 'workdetails.designationname',
    //type:'string',
    mapping: 'workdetails.designationname'
  }, {
    name: 'workdetails.reportingto',
    //type:'string',
    mapping: 'workdetails.reportingto'
  }, {
    name: 'workdetails.reportingname',
    //type:'string',
    mapping: 'workdetails.reportingname'

  }, {
    name: 'workdetails.pskill',
    mapping: 'workdetails.pskill'
  }, {
    name: 'workdetails.joiningdate',
    // type:'string',
    mapping: 'workdetails.joiningdate'
  }, {
    name: 'workdetails.separateddate',
    // type:'string',
    mapping: 'workdetails.separateddate'
  }, {
    name: 'workdetails.confirmdate',
    // type:'string',
    mapping: 'workdetails.confirmdate'
  }, {
    name: 'workdetails.empstatus',
    //type:'string',
    mapping: 'workdetails.empstatus'
  }, {
    name: 'addresses[0].details',
    mapping: 'addresses[0].details'
  }, {
    name: 'addresses[0].city',
    mapping: 'addresses[0].city'
  }, {
    name: 'addresses[0].state',
    mapping: 'addresses[0].state'
  }, {
    name: 'addresses[0].country',
    mapping: 'addresses[0].country'
  }, {
    name: 'addresses[0].zipcode',
    mapping: 'addresses[0].zipcode'
  }, {
    name: 'addresses[0].ddo_empaddress_id',
    mapping: 'addresses[0].ddo_empaddress_id'
  },
  {
    name: 'addresses[1].ddo_empaddress_id',
    mapping: 'addresses[1].ddo_empaddress_id'
  },
  {
    name: 'personaldetails.panno',
    mapping: 'personaldetails.panno'
  }, {
    name: 'personaldetails.aadharno',
    mapping: 'personaldetails.aadharno'
  }, {
    name: 'personaldetails.bloodgroup',
    mapping: 'personaldetails.bloodgroup',
  }, {
    name: 'personaldetails.phoneno',
    mapping: 'personaldetails.phoneno',
  }, {
    name: 'personaldetails.emergencyphoneno',
    mapping: 'personaldetails.emergencyphoneno',
  }, {
    name: 'personaldetails.anniversarydate',
    mapping: 'personaldetails.anniversarydate',
    convert: function (date) {
      var date = Ext.Date.format(new Date(date), 'd-m-Y');
      return date;
    }
  }, {
    name: 'personaldetails.gender',
    mapping: 'personaldetails.gender'
  }, {
    name: 'personaldetails.dob',
    mapping: 'personaldetails.dob',
    convert: function (date) {
      var date = Ext.Date.format(new Date(date), 'd-m-Y');
      return date;
    }
  }, {
    name: 'personaldetails.ddo_emppersonaldetails_id',
    mapping: 'personaldetails.ddo_emppersonaldetails_id'
  },

  {
    name: 'personaldetails.maritalstatus',
    mapping: 'personaldetails.maritalstatus',
  }, {
    name: 'basic.employee_code',
    mapping: 'basic.employee_code'
  }, {
    name: 'addresses[1].details',
    mapping: 'addresses[1].details'
  }, {
    name: 'addresses[1].city',
    mapping: 'addresses[1].city'
  }, {
    name: 'addresses[1].state',
    mapping: 'addresses[1].state'
  }, {
    name: 'addresses[1].country',
    mapping: 'addresses[1].country'
  }, {
    name: 'addresses[1].zipcode',
    mapping: 'addresses[1].zipcode'
  }
    , {
    name: 'workdetails.primarySkill_id',
    mapping: 'workdetails.primarySkill_id'
  }, {
    name: 'workdetails.grey_hr_id',
    mapping: 'workdetails.grey_hr_id'
  }, {
    name: 'permAddress',
    convert: function (addresses, r) {
      var add = r.data.addresses;
      if (add && add.length === 1) {
        if( add[0].type === "same"){
        return "Same as Communication Address"
        } else if(add[0].type === "perm"){
          var permAdd = '';
          if(add[0].details){
            permAdd = permAdd + add[0].details
          }
          if(add[0].city){
            permAdd = permAdd + ', ' + add[0].city
          }
          if(add[0].state){
            permAdd = permAdd + ', ' + add[0].state
          }
          if(add[0].country){
            permAdd = permAdd + ', ' + add[0].country
          }
          return permAdd;
        }
      } else if (add && add.length > 1) {
        var permAdd = '';
        if(add[1].details){
          permAdd = permAdd + add[1].details
        }
        if(add[1].city){
          permAdd = permAdd + ', ' + add[1].city
        }
        if(add[1].state){
          permAdd = permAdd + ', ' + add[1].state
        }
        if(add[1].country){
          permAdd = permAdd + ', ' + add[1].country
        }
        return permAdd;
      } else {
        return ''
      }
    }
  }, {
    name: 'commAddress',
    convert: function (data, record) {
      var add = record.data.addresses;
      if (add && add.length > 0) {
        if (add[0].type === "temp" || add[0].type === "same") {
          var commAdd = '';
          if(add[0].details){
            commAdd = commAdd + add[0].details
          }
          if(add[0].city){
            commAdd = commAdd + ', ' + add[0].city
          }
          if(add[0].state){
            commAdd = commAdd + ', ' + add[0].state
          }
          if(add[0].country){
            commAdd = commAdd + ', ' + add[0].country
          }
          return commAdd;
          
        }
      } else {
        return ''
      }
    }
  }
  ]
});