Ext.define('DDO.view.setup.projectroles.ProjectRolesController',{
    extend:'Ext.app.ViewController',

    alias :'controller.projectrolescontroller',

    onAddNewClick:function(btn,event){
        var view = this.getView();
        var projectRolesWin = Ext.ComponentQuery.query('projectroleswindow')[0] ||
            Ext.create('DDO.view.setup.projectroles.ProjectRolesWindow',{
                parentViewRef : view
            }),
            form = projectRolesWin.down('form');
    
        // this.onMakeFormLoadTrue(form);
        form.reset();
        projectRolesWin.show();
        projectRolesWin.edit = false;
    },
    onGridRowClick: function(row, record, tr, rowIndex, e, eOpts){
        var view = this.getView();
        var projectRolesWin = Ext.ComponentQuery.query('projectroleswindow')[0] ||
        Ext.create('DDO.view.setup.projectroles.ProjectRolesWindow',{
            parentViewRef : view
        }),
        form = projectRolesWin.down('form');
        form.reset();
        form.loadRecord(record);
        projectRolesWin.show();
        projectRolesWin.edit = true;
    },

    onSearchProjectRoll: function (textfield, e, eOpts) {
         var store =this.getView().down('projectrolesgrid').getStore('ProjectRole'),
                // grpView = this.getView().parentViewRef,
                searchString = textfield.getValue();
                if (!store.isLoaded()) {
                    store.load();
                }
               if (store) {
                store.filter({
                    property: 'name',
                    value: searchString,
                    anyMatch: true,
                    caseSensitive: false
                });
           }
            else if (searchString.length == 0) {
                store.clearFilter(true);
                store.load();
                this.getView().down('projectrolesgrid').refresh();
            }
      
    }
   
});