Ext.define('ACCTRL.view.allapps.DetailViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.accessappsdetailviewcontroller',

    onBackButtonClick: function () {
        var mainView = this.getView().up('allappsmain'),
            mainViewLayout = mainView.getLayout(),
            allAppStore = Ext.getStore('allappsstore');

        allAppStore.load();
        mainViewLayout.setActiveItem(0);
    },
    onRevokeBtnClick : function(btn, e, eOpts) {
        var mainView = this.getView().up('allappsmain'),
            mainViewLayout = mainView.getLayout(),revokeWindow,form,userView;

        revokeWindow = Ext.ComponentQuery.query('revokewindow')[0] || Ext.create('ACCTRL.view.window.RevokeWindow'),
        form = revokeWindow.down('form');
        form.reset();
        userView = mainViewLayout.getActiveItem().down('dataview[name=userView]');
        revokeWindow.userRecord = userView.getSelection();
        revokeWindow.gridMode = false;
        revokeWindow.show();
    },

    onHistoryBtnClick: function(btn, e, eOpts) {
        var mainView = this.getView().up('allappsmain'),
            mainViewLayout = mainView.getLayout(),
            historyStatusCombo = mainView.down('combo[name=historyStatusCombo]'),
            historyStore;

        historyStore = Ext.getStore('accessapphistorystore');
        if(historyStatusCombo){
            historyStatusCombo.setValue('All');
        }
        historyStore.clearFilter();
        historyStore.getProxy().setExtraParams({
            limit: 10,
            appId: mainView.record.get('appid')
        });
        historyStore.load();
        mainViewLayout.setActiveItem(2);
    },
    onEditBtnCLick: function(view, record, item, index, e, eOpts) {
        if (e.getTarget() && e.getTarget().className == "edit-app-btn") {
            var editDetails = Ext.ComponentQuery.query('appwindow')[0] || Ext.create('ACCTRL.view.window.AppWindow'),
                form = editDetails.down('form');

            form.reset();
            editDetails.editMode = true;
            editDetails.setTitle("Edit");
            editDetails.appRecord = record;
            editDetails.show();
        }
    },
    onUserSelectionChange: function( view , selected , eOpts ) {
        var mainView = this.getView().up('allappsmain'),
            resetBtn = mainView.down('button[name=revoke]');
        if(selected && selected.length){
            resetBtn.setDisabled(false);
        } else {
            resetBtn.setDisabled(true);
        }
    }
    
});