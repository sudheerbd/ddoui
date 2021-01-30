Ext.define('ACCTRL.store.allapps.DetailStore', {
    extend: 'Ext.data.Store',

    alias: 'store.detailstore',
    fields : [
       'imageurl',
       'name',
       'appOwner',
       'activeusercount',
       'allowedusercount',
       'description',
       'userimage',
       'appUser',
       'activeUsersArray'
   ],
    storeId: 'detailstore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: '/accessapp',
        method : 'GET',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    listeners: {
      load: function ( store , records , successful , operation , eOpts ) {
        var activeUserStore = Ext.getStore('activeuserstore');
        if(activeUserStore && records && records.length){
          activeUserStore.loadData(records[0].data.activeUsersArray);
        }
      }
    }

});