Ext.define('DDO.model.finance.FinanceApproval', {
    extend: 'Ext.data.Model',
    alias: 'model.financeapproval',
    fields: ['fromname',
    {
        name:'submiteddate',
    convert:function(value){
        value = Ext.Date.format(new Date(value), 'Y-m-d') ;
          return value;
    }
},
     'to', 
    { 
        name: 'comments',
      convert:function(value){
      var val=value.replace( /(<([^>]+)>)/ig, '');
     var new_val=val.replace(/&nbsp;/g, '');
      return new_val;
      } },
           'karmaunits','derived_karma_points','karmacategory_name','karma_name','nominate_month']
});