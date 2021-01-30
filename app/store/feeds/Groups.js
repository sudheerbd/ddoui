Ext.define('DDO.store.feeds.Groups', {
    extend: 'Ext.data.Store',
    alias: 'store.groups',
    
    requires: [
        'DDO.model.feeds.Group'
    ],
    
   // storeId: 'Groups',
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
     url:Api.URL.groupsAndEmployee.READ,
        method: 'GET',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});








