Ext.define('DDO.store.profile.AppAccessSummaryStore', {
    extend: 'Ext.data.Store',

    alias: 'store.AppAccessSummaryStore',

    fields: [
        'appName',
        'appOwner',
        'status',
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

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: Api.URL.appaccesssummarystore.READ,

        method: "GET",
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});