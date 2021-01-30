Ext.define('DDO.view.finance.FinanceViewModel',{
   extend:'Ext.app.ViewModel',
   alias:'viewmodel.financeviewmodel',
   requires: ['DDO.model.finance.FinanceApproval'],
   data: {
      derivedKarma: null
  },
  stores:{
   //This store is used for karma approval grid.
   financereviewstore: {
       model:'DDO.model.finance.FinanceApproval',
       autoLoad:true, 
       proxy: {
           type: 'ajax',
           url: Api.URL.financeapproval.READ,
           reader: {
               type: 'json',
               rootProperty: 'data'
           }
       },
       sorters: [{
           property: "ddo_nomination_id",
           direction: "ASC"
       }]
   }
}
});