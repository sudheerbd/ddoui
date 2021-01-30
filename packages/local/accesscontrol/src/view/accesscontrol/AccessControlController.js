Ext.define('ACCTRL.view.accesscontrol.AccessControlController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.accesscontrolcontroller',

    onSearchAppsFliter: function(btn, e, eOpts){
        var searchPeople = this.getView().down('textfield[emptyText=Search People]');
        var searchApps = this.getView().down('textfield[emptyText=Search Apps]');

        btn.addCls('allapps-app-pressed-btn-cls');
        btn.prev().removeCls('allapps-app-pressed-btn-cls');
        btn.prev().addCls('allapps-app-search-btn-cls');
        searchPeople.clearValue();
        searchApps.setValue('');
        searchPeople.hide();
        searchApps.show();

    },
    onSearchPeopleFliter: function(btn, e, eOpts){
        var searchPeople = this.getView().down('textfield[emptyText=Search People]');
        var searchApps = this.getView().down('textfield[emptyText=Search Apps]');

        btn.addCls('allapps-app-pressed-btn-cls');
        btn.next().removeCls('allapps-app-pressed-btn-cls');
        btn.next().addCls('allapps-app-search-btn-cls');
        searchPeople.clearValue();
        searchApps.setValue('');
        searchPeople.show();
        searchApps.hide();
    },
    widgetAttach: function(column, widget, record) {
        widget.removeAll();
        if(record.get('status') == 'Pending'){
            widget.add([{
                text: 'Accept',
                record: record,
                cls: 'pending-accept-btn',
                handler: 'onAcceptClick'
            },{
                text: 'Reject',
                record: record,
                cls: 'pending-reject-btn',
                handler: 'onRejectClick'
            }]);
        } else if(record.get('status') == 'Active'){
            widget.add([{
                xtype: 'label',
                html: '<span style="color: #31A950;font-size:16px;font-weight: 600;">Active</span>'
            },{
                text: 'Revoke',
                record: record,
                cls: 'pending-reject-btn',
                handler: 'onRevokeClick'
            }]);
        } else if(record.get('status') == 'Rejected'){
            widget.add({
                xtype: 'label',
                html: '<span style="color: red;font-size:16px;font-weight: 600;">Rejected</span>'
            });
        } else if(record.get('status') == 'Revoked'){
            widget.add({
                xtype: 'label',
                html: '<span style="color:#AF1616;font-size:16px;font-weight: 600;">Revoked</span>'
            });
        }
    },
    onAcceptClick : function(btn){
        var record = btn.record,params,accessControlStore;

        accessControlStore = Ext.getStore('accesscontrolgridstore');
        params = {
            statusId : record.get('ddo_accessapp_status_id'),
            status : 'Active',
            appId : record.get('ddo_accessapp_id'),
            appRequestId : record.get('ddo_accessapp_request_id')
        };
        Ext.Ajax.request({
            url: 'accessappstatus/grantaccess',
            method: "PUT",
            params: params,
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj) {
                    success = obj.success;
                    if (success) {
                        accessControlStore.load();
                    } else {
                        Utility.toastReuseFn('t', 'operation Failed in granting access');
                    }
                }
            },
            failure: function(response, opts) {
                Utility.toastReuseFn('t', 'operation Failed in granting access');
            }
        });
    },
    onRejectClick: function(btn){
        var record = btn.record,params,accessControlStore;
        accessControlStore = Ext.getStore('accesscontrolgridstore');
        params = {
            statusId : record.get('ddo_accessapp_status_id'),
            appId : record.get('ddo_accessapp_id'),
            appRequestId : record.get('ddo_accessapp_request_id'),
            status : 'Rejected'
        };
        Ext.Ajax.request({
            url: 'accessappstatus/grantaccess',
            method: "PUT",
            params: params,
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj) {
                    success = obj.success;
                    if (success) {
                        accessControlStore.load();
                    } else {
                        Utility.toastReuseFn('t', 'operation Failed in Rejecting access');
                    }
                }
            },
            failure: function(response, opts) {
                Utility.toastReuseFn('t', 'operation Failed in Rejecting access');
            }
        });
    },
    onRevokeClick: function(btn){
        var revokeWindow,form,userView;

        revokeWindow = Ext.ComponentQuery.query('revokewindow')[0] || Ext.create('ACCTRL.view.window.RevokeWindow'),
        form = revokeWindow.down('form');
        form.reset();
        revokeWindow.userRecord = btn.record;
        revokeWindow.gridMode = true;
        revokeWindow.show();


        // var record = btn.record,params,accessControlStore;
        // accessControlStore = Ext.getStore('accesscontrolgridstore');
        // userData = [{
        //     statusId : record.get('ddo_accessapp_status_id'),
        //     appId : record.get('ddo_accessapp_id'),
        //     appRequestId : record.get('ddo_accessapp_request_id'),
        //     status : 'Revoked'
        // }];
        // Ext.Ajax.request({
        //     url: 'accessappstatus/revokeaccess',
        //     method: "PUT",
        //     params: {
        //         status : 'Revoked',
        //         appId: record.get('ddo_accessapp_id'),
        //         userData : Ext.encode(userData)
        //     },
        //     success: function(response, opts) {
        //         var obj = Ext.decode(response.responseText);
        //         if (obj) {
        //             success = obj.success;
        //             if (success) {
        //                 accessControlStore.reload();
        //                 //success operation
        //             } else {
        //                 //failure operation
        //             }
        //         }
        //     },
        //     failure: function(response, opts) {
        //         //failure operation
        //     }
        // });
    },
    onAccessControlComboSelect : function( combo , record , eOpts){
        var accessControlGrid = this.getView().down('accesscontrolgrid'),
            gridStore = accessControlGrid.getStore(),
            comboValue = combo.getValue();
        
        if (comboValue == "All"){
            gridStore.clearFilter();
        } else {
            gridStore.filter({
              property: 'status',
              value: comboValue,
              anyMatch: true,
              caseSensitive: false
            });
        }
        accessControlGrid.updateLayout();
    },
    onSearchPeopleTagSelect: function( combo , record , eOpts){
        var accessControlGrid = this.getView().down('accesscontrolgrid'),
            gridStore = accessControlGrid.getStore(),
            comboValue = combo.getValue();

        if(comboValue){
            gridStore.filter({
              property: 'userId',
              value: comboValue
            });
        } else {
            gridStore.clearFilter();
        }
        accessControlGrid.updateLayout();
    },
    onSearchApps: function (field) {
        var val = field.getValue(),
            accessControlGrid = this.getView().down('accesscontrolgrid'),
            store = accessControlGrid.getStore();                   
        
        if (val.length == 0) {
            store.clearFilter();
        } else {
            var filter = new Ext.util.Filter({
                property: 'appName',
                value   : val,
                anyMatch: true
            });
            store.filter(filter);
        }
        accessControlGrid.updateLayout();
    },
    onPeopleTagSearch: function (search) {
        search.query = new RegExp(search.query, 'i');
        search.forceAll = true;
    }

});