Ext.define('DDO.view.karmaapproval.KarmaApprovalToolbarController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.karmaapprovaltoolbarcontroller',
    onMultipleApprove:function(btn,e,eOtps){
    //   debugger;
        var karmaapprovalController = this.getView().parentView;
        var Randomtoolbar = this.getView();
        var viewModel = this.getViewModel();
        var karmaVm = karmaapprovalController.getViewModel(),
        approvalStore = karmaVm.getStore('karmaapprovalstore');
        var dataItems = approvalStore.data.items;
        var submitrecords = [];
        var karmaApprovalView = this.getView().karmaapproval;
        Ext.each(dataItems,function(obj){
            if(obj.dirty){
                submitrecords.push(obj.data.ddo_nomination_id);
            }
        });
    //  console.log(submitrecords);
      
      params={
        submitrecords:submitrecords

      }
           Ext.Ajax.request({
          url:Api.URL.karmaapproval.BULKACCEPT,
          method :'POST',
          scope:this,
          params:params,
          success:function(response,opts){
            //   debugger;
           var createToolbar = Ext.create('DDO.view.karmaapproval.KarmaApprovalToolBar');
           viewModel.set('itemsSelected',0);
           karmaApprovalView.getViewModel().set('updateValue',0);
           approvalStore.reload();
           karmaApprovalView.getView().refresh();
           Randomtoolbar.destroy();
           karmaApprovalView.addDocked(createToolbar);
           Ext.Msg.alert('Success', 'Successfully nominated multiple nominations !!!');
          },
          failure:function(response,opts){
            Ext.Msg.alert('Failure', 'Sorry! unable to nominate');
          }
           });

    },

    onMultipleReject:function(btn,e,eopts){
        // debugger;
        var karmaapprovalController = this.getView().parentView;
        var karmaVm = karmaapprovalController.getViewModel(),
        approvalStore = karmaVm.getStore('karmaapprovalstore');
        var viewModel = this.getViewModel();
        var dataItems = approvalStore.data.items;
        var submitrecords = [];
        var Randomtoolbar = this.getView();
        var karmaApprovalView = this.getView().karmaapproval;
        Ext.each(dataItems,function(obj){
            if(obj.dirty){
                submitrecords.push(obj.data.ddo_nomination_id);
            }
        });
        params={
            submitrecords:submitrecords
    
          }
        //   debugger;
               Ext.Ajax.request({
              url:Api.URL.karmaapproval.BULKREJECT,
              method :'PUT',
              params:params,
              success:function(response,opts){
            var createToolbar = Ext.create('DDO.view.karmaapproval.KarmaApprovalToolBar');
            viewModel.set('itemsSelected',0);
            karmaApprovalView.getViewModel().set('updateValue',0);
              karmaApprovalView.getView().refresh();
              approvalStore.reload();
              Randomtoolbar.destroy();
              karmaApprovalView.addDocked(createToolbar);
              Ext.Msg.alert('Success', 'Successfully Rejected multiple nominations !!!');
              },
              failure:function(response,opts){
            //   debugger;
              Ext.Msg.alert('Failure', 'Sorry! unable to reject');
              }
               });
    }
});