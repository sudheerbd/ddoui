Ext.define('DDO.view.holidays.HolidaysWindowController',{
    extend:'Ext.app.ViewController',
    alias :'controller.holidayswindowcontroller',
      /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param {btn} - The cancel button reference.
     * @param {e} - The click event.    
     * @param {eOpts} - Event object.    
     */
    onFormCancelClick:function(btn,e,eOpts){
        try{
            var holidaysWindow, form;
            holidaysWindow = btn.up('window');
            form = holidaysWindow.down('form');
            form.reset();
            holidaysWindow.close();
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
            holidaysgrid = parentRef.down('holidaysgrid'),
            gridStore = holidaysgrid.getStore(),
            holidaysWindow = btn.up('window'),
            holidayForm = holidaysWindow.down('form'),
            formRec = holidayForm.getValues(),
            date = formRec.name,
            optional=formRec.optional,
            description=formRec.description;
            var raw_date = date.split("/").reverse().join("-"),
             arr=raw_date.split("-"),
             new_date=arr[0]+"-"+arr[2]+"-"+arr[1];
            if(optional=="on"){
                optional='Y'
            }else{
                optional='N'
            }
            //var clientName_lowcase=clientName.toLowerCase();
            var len=gridStore.getData().length;
            for (var i = 0; i <= len - 1; i++) {
                if (new_date == gridStore.getData().items[i].data.date) {
                  Ext.Msg.alert('product', ' holiday alraedy existed');
                  new_date = null;
                  view.close();
                }
              }
              if(new_date){
                let  params = {
                    date:date,
                    description:description,
                    optional:optional
                  };
                  Ext.Ajax.request({
                             url: Api.URL.holidays.CREATE,
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