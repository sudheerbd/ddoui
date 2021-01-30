Ext.define('ACCTRL.view.window.RevokeWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.revokewindowcontroller',

    onWindowOutsideTap: function(event, target) {
        var view = this;
        Utility.onWindowOutterTap(event, target, view);
    },
    onFormConfirmClick: function(btn){
        var revokeWindow, form,userData,userRecord,appId;

        revokeWindow = btn.up('window');
        form = revokeWindow.down('form');
        revokeFormValues = form.getValues();
        userRecord = revokeWindow.userRecord;
        userData = [];

        if(revokeWindow.gridMode){
            appId : userRecord.get('ddo_accessapp_id');
            userData.push({
                statusId : userRecord.get('ddo_accessapp_status_id'),
                appId : userRecord.get('ddo_accessapp_id'),
                appRequestId : userRecord.get('ddo_accessapp_request_id'),
                status : 'Revoked',
                revokeReason: revokeFormValues.description
            });
        } else {
            for(var i=0; i<userRecord.length; i++){
                appId = userRecord[i].get('appid');
                userData.push({
                    statusId : userRecord[i].get('statusid'),
                    appId : userRecord[i].get('appid'),
                    appRequestId : userRecord[i].get('reqid'),
                    status : 'Revoked',
                    revokeReason: revokeFormValues.description
                });
            }
        }
        
        Ext.Ajax.request({
            url: 'accessappstatus/revokeaccess',
            method: "PUT",
            params: {
                status : 'Revoked',
                appId: appId,
                userData : Ext.encode(userData)
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj) {
                    success = obj.success;
                    if (success) {
                        revokeWindow.close();
                        if(revokeWindow.gridMode){
                            Ext.getStore('accesscontrolgridstore').load();
                        } else {
                            Ext.getStore('detailstore').load();
                        }
                    } else {
                        Utility.toastReuseFn('t', 'Failed access revoking');
                    }
                }
            },
            failure: function(response, opts) {
                Utility.toastReuseFn('t', 'Failed access revoking');
            }
        });
    }
});