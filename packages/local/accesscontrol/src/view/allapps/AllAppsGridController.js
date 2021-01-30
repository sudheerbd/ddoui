Ext.define('ACCTRL.view.allapps.AllAppsGridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.allappsgridcontroller',

    onRequestAccessBtnClick: function(btn, e, eOpts) {
        var rec = btn.getWidgetRecord(),activeUserCount,allowedUserCount,
            reqAccessWindow,reqAccessForm;

        activeUserCount = rec.get('activeusers');
        allowedUserCount = rec.get('accessallowedusers');
        if(activeUserCount < allowedUserCount){
            reqAccessWindow = Ext.ComponentQuery.query('requestaccesswindow')[0];
            if(!reqAccessWindow){
                reqAccessWindow = Ext.create('ACCTRL.view.window.RequestAccessWindow');
            }
            reqAccessForm = reqAccessWindow.down('form');
            reqAccessForm.reset();
            reqAccessWindow.appRecord = rec;
            reqAccessWindow.show();
        } else {
            Utility.toastReuseFn('t', 'User Access Limit Exceeded');
        }
    },

    widgetAttach: function(column, widget, record) {
        var loginStore = Ext.getStore("login"),
            userRecord = loginStore.getAt(0),
            employee_id = userRecord.get('ddo_employee_id');

        widget.setDisabled(false);
        if (!record.get('status') || record.get('status') == 'Rejected' ||
            record.get('status') == 'Revoked') {

            //widget.setDisabled(false);
            widget.setText('Request Access');
            widget.removeCls(['active-btn','pending-btn']);
            widget.addCls('request-access-btn');

        } else if (record.get('status') == 'Active') {

            widget.removeCls(['request-access-btn','pending-btn']);
            widget.addCls('active-btn');
            widget.setDisabled(true);

            // if(record.get('ownerid') == employee_id){
            //     widget.removeCls(['request-access-btn','active-btn','pending-btn']);
            //     widget.addCls('owned-btn');
            //     widget.setText('Owned');
            //     widget.setDisabled(true);
            // } else {
            //     widget.removeCls(['request-access-btn','owned-btn','pending-btn']);
            //     widget.addCls('active-btn');
            //     widget.setDisabled(true);
            // }

        } else {
            widget.removeCls(['request-access-btn','active-btn']);
            widget.addCls('pending-btn');
            widget.setDisabled(true);

        }
    },
    onRecordClick: function( grid , td , cellIndex , record , tr , rowIndex , e , eOpts ) {
        var loginStore = Ext.getStore("login"),
            userRecord = loginStore.getAt(0),
            employee_id = userRecord.get('ddo_employee_id');

        if(employee_id == record.get('ownerid')){
            var mainView = this.getView().up('allappsmain'),
                mainViewLayout = mainView.getLayout(),
                detailStore = Ext.getStore('detailstore');

            mainView.record = record;
            detailStore.getProxy().setExtraParams({
                appId: record.get('appid')
            });
            detailStore.load();
            Ext.defer(function(){
                mainViewLayout.setActiveItem(1);
            }, 100);
        }
        
    }
});