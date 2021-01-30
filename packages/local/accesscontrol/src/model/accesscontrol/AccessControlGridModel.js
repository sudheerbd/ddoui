Ext.define('ACCTRL.model.accesscontrol.AccessControlGridModel', {
  extend: 'Ext.data.Model',

  fields: [
    { name : 'ddo_accessapp_id' },
    { name : 'ownerId' },
    { name : 'userId', mapping: 'appUser.empid'},
    { name : 'appLogoPath' },
    { name : 'appName' },
    { name : 'appUser' },
    { name : 'requestreason' },
    { name : 'rejectreason' },
    { name : 'ddo_accessapp_status_id' },
    { name : 'status' },
    {
      name: 'fromdate', 
      type: 'date',
      convert: function(value, record) {
      value = (value) ? Ext.Date.format(new Date(value), 'd-m-Y') : value;
      return value;
      }
    }, {
      name: 'enddate', 
      type: 'date',
      convert: function(value, record) {
      value = (value) ? Ext.Date.format(new Date(value), 'd-m-Y') : value;
      return value;
      }
  }]
});