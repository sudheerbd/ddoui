Ext.define('ACCTRL.store.allapps.ActiveUserStore', {
    extend: 'Ext.data.Store',

    alias: 'store.activeuserstore',
    fields : [
       'appid',
       'statusid',
       'userid',
       'from',
       'to',
       'status',
       'appUser',
       'emp_designation'
   ],
    storeId: 'activeuserstore',
    autoLoad: false
});