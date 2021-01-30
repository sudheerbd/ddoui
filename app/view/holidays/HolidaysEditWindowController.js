Ext.define('DDO.view.holidays.HolidaysEditWindowController',{
    extend:'Ext.app.ViewController',
    alias :'controller.holidayseditwindowcontroller',
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
            holidaysgrid = parentRef.down('holidaysgrid'),
            gridStore = holidaysgrid.getStore(),
            holidaysWindow = btn.up('window'),
            holidayForm = holidaysWindow.down('form'),
            formRec = holidayForm.getValues(),
            date = formRec.date,
            optional=formRec.optional,
            description=formRec.description,
            ddo_holiday_id=formRec.ddo_holiday_id;
            if(optional=="on"){
                optional='Y'
            }else{
                optional='N'
            }
                var  params = {
                    date:date,
                    description:description,
                    ddo_holiday_id:ddo_holiday_id,
                    optional: optional
                  };
                  Ext.Ajax.request({
                             url: Api.URL.holidays.UPDATE,
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
             // }
           
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
            holidaysgrid = parentRef.down('holidaysgrid'),
            gridStore = holidaysgrid.getStore(),
            holidaysWindow = btn.up('window'),
            holidayForm = holidaysWindow.down('form');
            holidayForm.reset();
            holidaysWindow.close();
            gridStore.reload();
        }catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.CLIENTS.TOAST.CANCELCLICK, err);
        }
     
    },
})