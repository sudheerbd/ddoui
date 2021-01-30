Ext.define('ACCTRL.view.window.RequestAccessWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.requestaccesswindowcontroller',

    onWindowOutsideTap: function(event, target) {
        var view = this;
        Utility.onWindowOutterTap(event, target, view);
    },
    
    onFormCancelClick: function(btn, e, eOpts) {
        var reqAccessWindow, reqAccessForm;

        reqAccessWindow = btn.up('window');
        reqAccessForm = reqAccessWindow.down('form');
        reqAccessForm.reset();
        reqAccessWindow.close();
    },

    onFormSaveClick: function(btn, e, eOpts) {
        var reqAccessWindow, reqAccessForm, 
            params, reqAppRecord, reqAccessFormValues, allAppStore;

        reqAccessWindow = btn.up('window');
        reqAppRecord = reqAccessWindow.appRecord;
        reqAccessForm = reqAccessWindow.down('form');
        reqAccessFormValues = reqAccessForm.getValues();
        allAppStore = Ext.getStore('allappsstore');

        params = {
            appId: reqAppRecord.get('appid'),
            fromDate: reqAccessFormValues.fromdate,
            endDate: reqAccessFormValues.enddate,
            requestReason: reqAccessFormValues.requestreason
        };
        
        Ext.Ajax.request({
            url: '/appaccessrequest',
            method: "POST",
            params: params,
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);

                if (obj) {
                    success = obj.success;
                    if (success) {
                        reqAccessForm.reset();
                        reqAccessWindow.close();
                        allAppStore.reload();
                    } else {
                        //failure operation
                        Utility.toastReuseFn('t', 'Operation Failed');
                    }
                }
            },
            failure: function(response, opts) {
                //failure operation
                Utility.toastReuseFn('t', 'Operation Failed');
            }
        });
    },

    onKeyDownDate: function (dateField, e, eOpts) {
           Utility.onDateField (dateField, e, eOpts);
       }

});