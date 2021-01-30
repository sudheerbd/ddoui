
Ext.define('DDO.view.setup.clientdashboard.ClientDashboardWindowController',{
    extend:'Ext.app.ViewController',

    alias :'controller.clientdashboardwindowcontroller',
  /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param {btn} - The cancel button reference.
     * @param {e} - The click event.    
     * @param {eOpts} - Event object.    
     */
    onFormCancelClick:function(btn,e,eOpts){
        try{
            var clientsWindow, form;
            clientsWindow = btn.up('window');
            form = clientsWindow.down('form');
            form.reset();
            clientsWindow.close();
        }catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.CLIENTS.TOAST.CANCELCLICK, err);
        }
    },
     /**
     * The function onFormSaveClickFunction is responsible to check whether which functionality of save buttton to perform.
     * @param {Ext.button,Button} 'btn' the save button. 
     * @param {Event} 'e' the click event. 
     * @param {object} 'eOpts' the events object passed. 
     */
    onFormSaveClick:function(btn,e ,eOpts){
        try{
            var me = this,
            view = me.getView(),
            parentRef = view.parentViewRef,
            clientgrid = parentRef.down('clientdashboardgrid'),
            gridStore = clientgrid.getStore(),
            clientsWindow = btn.up('window'),
            clientsForm = clientsWindow.down('form'),
            formRec = clientsForm.getValues(),
            clientName = formRec.name,
            description=formRec.description;
            var clientName_lowcase=clientName.toLowerCase();
            var len=gridStore.getData().length;
            for (var i = 0; i <= len - 1; i++) {
                if (clientName_lowcase == gridStore.getData().items[i].data.name.toLowerCase().trim()) {
                  Ext.Msg.alert('product', ' Client alraedy existed');
                  clientName = null;
                  view.close();
                }
              }
              if(clientName){
                let  params = {
                    name:clientName,
                      description:description
                  };
                  Ext.Ajax.request({
                             url: Api.URL.projectclients.CREATE,
                             method: 'POST',
                             params: params,
                             success: function(resp, b) {
                                  gridStore.reload();
                                 Ext.getBody().unmask();
                 
                             },
                             failure: function(resp, b) {
                                 Ext.getBody().unmask();
                 
                             }
                         });
                         view.close();
              }
         
        }catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.CLIENTS.TOAST.SAVECLICK, err);
        }
      
    },

});