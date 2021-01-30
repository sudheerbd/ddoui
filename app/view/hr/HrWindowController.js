Ext.define('DDO.view.hr.HrWindowController',{
    extend:'Ext.app.ViewController',
    alias:'controller.hrwindowcontroller',
    
    onAcceptBtnClick:function(btn,click,eOtps){
        var view = this;
        var grid_store=view.getView().getStore(),
          record=grid_store.getData().items[click];

      var win =  Ext.create('DDO.view.hr.HrKarmaWindow',{
        parentRefView : view,
        acceptBtn : btn,
        rowIndex : click
      });
      win.show();
      var form=win.down('form');
      form.loadRecord(record);
    },
    clearPendingNominations:function(hrWindow,btn, formValues,rowIndexRecord){
      hrWindow.mask('loading...');
        var view = this.getView(),
           store = view.getStore(),
           rec;
    var nominationId = store.getAt(rowIndexRecord).data.ddo_nomination_id;
    recIdx = store.findExact('ddo_nomination_id', nominationId);
    if (recIdx != -1) {
      rec = store.getAt(recIdx);
    };
      params = {
        hrReviewKarma : formValues.hrprojectedkarma,
        hrReviewComments : formValues.hr_accept_description,
        nominationId : nominationId
      },
      this.postAjaxRequest(store,params,hrWindow,view);
      // debugger;
      // store.reload();
      view.getView().refresh();
    },
    postAjaxRequest:function(store,params,hrWindow,view){
      Ext.Ajax.request({
        url:Api.URL.hrapproval.CREATE,
        method:'POST',
        params:params,
        success:function(resp,b){
          
          store.reload();
          // view.getView().refresh();
          hrWindow.unmask();
        },
        failure:function(resp,b){
          hrWindow.unmask();
        }
      });
    }
    });