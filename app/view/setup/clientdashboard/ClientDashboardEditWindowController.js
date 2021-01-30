Ext.define('DDO.view.setup.clientdashboard.ClientDashboardEditWindowController',{
    extend:'Ext.app.ViewController',
    alias :'controller.clientDashboardeditwindowcontroller',
     /**
     * The function onFormSaveClickFunction is responsible to check whether which functionality of save buttton to perform.
     * @param {Ext.button,Button} 'btn' the save button. 
     * @param {Event} 'e' the click event. 
     * @param {object} 'eOpts' the events object passed. 
     */
    onFormSaveClick:function(btn,e,eOpts){
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
            description=formRec.description,
            ddo_projects_clients_id=formRec.ddo_projects_clients_id;
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
                var  params = {
                    name:clientName,
                    description:description,
                    ddo_projects_clients_id:ddo_projects_clients_id
                  };
                  Ext.Ajax.request({
                             url: Api.URL.projectclients.UPDATE,
                             method: 'PUT',
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
    /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param {btn} - The cancel button reference.
     * @param {e} - The click event.    
     * @param {eOpts} - Event object.    
     */
    onFormCancelClick:function(btn){
        try{
            var me = this,
            view = me.getView(),
            parentRef = view.parentViewRef,
            clientgrid = parentRef.down('clientdashboardgrid'),
            gridStore = clientgrid.getStore();
            var clientsWindow, form;
            clientsWindow = btn.up('window');
            form = clientsWindow.down('form');
            form.reset();
            clientsWindow.close();
            gridStore.reload();
        }catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.CLIENTS.TOAST.CANCELCLICK, err);
        }
     
    },
})