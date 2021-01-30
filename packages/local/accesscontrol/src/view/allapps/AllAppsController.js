Ext.define('ACCTRL.view.allapps.AllAppsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.allappscontroller',

    onAddNewAppClick: function(btn, e, eOpts) {
    	var addAppWindow = Ext.ComponentQuery.query('appwindow')[0] || Ext.create('ACCTRL.view.window.AppWindow'),
            form = addAppWindow.down('form');

        addAppWindow.editMode = false;
        addAppWindow.appRecord = null;
        form.reset(); 
        addAppWindow.show();
    },
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
    onSearchPeopleTagSelect: function( combo , record , eOpts){
        var gridStore = this.getView().down('allappsgrid').getStore();
        var comboValue = combo.getValue();
        
        if(comboValue){
            gridStore.filter({
              property: 'ownerid',
              value: comboValue
            });
        } else {
            gridStore.clearFilter();
        }
    },
    onSearchApps: function (field) {
        var val = field.getValue(),
            store = this.getView().down('allappsgrid').getStore();                   
        
        if (val.length == 0) {
            store.clearFilter();
        } else {
            var filter = new Ext.util.Filter({
                property: 'appname',
                value   : val,
                anyMatch: true
            });
            store.filter(filter);
        }
    },

    onPeopleTagSearch: function(search){
        search.query = new RegExp(search.query, 'i');
		search.forceAll = true;
    }
});