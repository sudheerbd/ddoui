Ext.define('ACCTRL.store.accesscontrol.AccessControlGridStore', {
   extend: 'Ext.data.Store',

   alias: 'store.accesscontrolgridstore',
   requires:[
          'ACCTRL.model.accesscontrol.AccessControlGridModel'
   ],
   model: 'ACCTRL.model.accesscontrol.AccessControlGridModel',
   storeId:'accesscontrolgridstore',
   autoLoad: false,
   proxy: {
       type: 'ajax',
       url: '/appaccessrequest/useraccesscontrol',
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