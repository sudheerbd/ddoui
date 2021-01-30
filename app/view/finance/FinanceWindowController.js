Ext.define('DDO.view.finance.FinanceWindowController',{
extend:'Ext.app.ViewController',
alias:'controller.financewindowcontroller',

onAcceptBtnClick:function(btn,click,eOtps){
  var view =this;
  var grid_store=view.getView().getStore(),
  record=grid_store.getData().items[click];
  var win =  Ext.create('DDO.view.finance.FinanceKarmaWindow',{
    parentRefView : view,
    acceptBtn : btn,
    rowIndex : click
  });
  win.show();
  var form=win.down('form');
  form.loadRecord(record);
},

clearPendingNominations:function(financeWindow,btn, formValues,rowIndexRecord){
  financeWindow.mask('loading...');
    var view = this.getView(),
       store = view.getStore(),
       rec;
var nominationId = store.getAt(rowIndexRecord).data.ddo_nomination_id;
recIdx = store.findExact('ddo_nomination_id', nominationId);
if (recIdx != -1) {
  rec = store.getAt(recIdx);
};
params = {
  financeReviewKarma : formValues.financeprojectedkarma,
  financeReviewComments : formValues.finance_accept_description,
  nominationId : nominationId
},
this.postAjaxRequest(store,params,financeWindow,rowIndexRecord,view);
},
postAjaxRequest:function(store,params,financeWindow,rowIndexRecord,view){
  // debugger;
  Ext.Ajax.request({
    url:Api.URL.financeapproval.CREATE,
    method:'POST',
    params:params,
    success:function(resp,b){
    //  debugger;
      // store.removeAt(rowIndexRecord);
      view.getView().refresh();
      store.reload();
      financeWindow.unmask();
      
    },
    failure:function(resp,b){
      financeWindow.unmask();
    }
  });
}
});