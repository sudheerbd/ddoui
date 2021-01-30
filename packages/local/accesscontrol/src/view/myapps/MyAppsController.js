Ext.define('ACCTRL.view.myapps.MyAppsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.myappscontroller',

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
    onMyAppsComboSelect : function( combo , record , eOpts){
        var gridStore = this.getView().down('myappsgrid').getStore();
        var comboValue = combo.value;
        
        if(comboValue == "All"){
          gridStore.clearFilter();
        } else {
          gridStore.filter({
            property: 'status',
            value: comboValue,
            anyMatch: true,
            caseSensitive: false
          });
        }
    },
    onSearchPeopleTagSelect: function( combo , record , eOpts){
        var gridStore = this.getView().down('myappsgrid').getStore();
        var comboValue = combo.getValue();

        if(comboValue){
            gridStore.filter({
              property: 'ownerId',
              value: comboValue
            });
        } else {
            gridStore.clearFilter();
        }
    },
    onSearchApps: function (field) {
        var val = field.getValue(),
            store = this.getView().down('myappsgrid').getStore();                   
        
        if (val.length === 0) {
            store.clearFilter();
        } else {
            var filter = new Ext.util.Filter({
                property: 'appName',
                value   : val,
                anyMatch: true
            });
            store.filter(filter);
        }
    },
    onPeopleTagSearch: function (search) {
        search.query = new RegExp(search.query, 'i');
        search.forceAll = true;
    }

});