Ext.define('ACCTRL.store.myapps.MyAppsGridStore', {
    extend: 'Ext.data.Store',

    alias: 'store.myappsgridstore',

    storeId:'myappsgridstore',
     autoLoad: false,

    fields: [
        'appName',
        'appLogoPath',
        'appOwner',
        'requestreason',
        'rejectreason',
        'status',
        'created',
    {
        name : 'fromdate',
        type: 'date',
        convert: function(value, record) {
           
          value = (value) ? Ext.Date.format(new Date(value), 'd-m-Y') : value;
          return value;
        }
    },{
        name : 'enddate',
        type: 'date',
        convert: function(value, record) {
         
          value = (value) ? Ext.Date.format(new Date(value), 'd-m-Y') : value;
          return value;
        }
    }],
    proxy: {
        type: 'ajax',
        url: '/useraccessapp',
        method: "GET",
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    sorters : [{
      property : 'created',
      direction: 'DESC'
    }]
});