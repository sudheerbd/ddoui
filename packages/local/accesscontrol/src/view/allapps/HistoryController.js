Ext.define('ACCTRL.view.allapps.HistoryController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.accessapphistorycontroller',
    onBackButtonClick: function () {
      var mainView = this.getView().up('allappsmain'),
          mainViewLayout = mainView.getLayout();

        mainViewLayout.setActiveItem(1);
    },
    onAppsHistoryComboSelect : function( combo , record , eOpts){
        var gridStore = this.getView().down('accessapphistorygrid').getStore(),
            comboValue = combo.value;

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
    }

});