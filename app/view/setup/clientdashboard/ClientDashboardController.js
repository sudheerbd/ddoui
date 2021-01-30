
Ext.define('DDO.view.setup.clientdashboard.ClientDashboardController',{
    extend:'Ext.app.ViewController',
    alias :'controller.clientdashboardcontroller',
     /**
	 * The function onAddNewProductClick will perform when the 'handler' event of the 'button' is fired in the MainView.
	 * It is create the window by clicking on addnew button and after that it will call onAddNewClick function .
	 * @param {Ext.button.Button} 'btn' when button is being clicked.
	 * @param {Number} 'idx' The idx within the store of the selected record.
	 * @param {Ext.data.Model} 'rec' The selected record.
	 */
    onAddNewClick:function(btn,event){
        try{
            var view = this.getView();
            var clientwindow = Ext.ComponentQuery.query('clientdashboardwindow')[0] ||
                Ext.create('DDO.view.setup.clientdashboard.ClientdashboardWindow',{
                    parentViewRef : view
                }),
                form = clientwindow.down('form');
            form.reset();
            clientwindow.show();
            clientwindow.edit = false;
        }
        catch (err) {
			Utility.showToast(Messages.EMPLOYEESETUP.CLIENTS.TOAST.ADDBUTTON, err);
		}
    },
    onGridRowClick: function(row, record, tr, rowIndex, e, eOpts){
        try{
            var view = this.getView();
            var clienteditwindow = Ext.ComponentQuery.query('clientdashboardeditwindow')[0] ||
                Ext.create('DDO.view.setup.clientdashboard.ClientDashboardEditWindow',{
                    parentViewRef : view
                }),
                form = clienteditwindow.down('form');
                form.loadRecord(record);
            clienteditwindow.show();
        }
        catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.CLIENTS.TOAST.GRIDROW, err);  
        }
      
    },
     /**
	 * The function onEditButtonClick will perform when the 'handler' event of the 'button' is fired in the grid.
	 * @param {Ext.grid.pannel} 'grid' when button is being clicked.
	 * @param {Number} 'rowIndex' The rowIndex within the store of the selected record.
	 * @param {Number} 'colIndex' TThe colIndex within the store of the selected record.
	 */
    onEditButtonClick:function(grid,rowIndex){
        try{
            var gridStore=grid.getStore();
            var view = this.getView();
            var clienteditwindow = Ext.ComponentQuery.query('clientdashboardeditwindow')[0] ||
                Ext.create('DDO.view.setup.clientdashboard.ClientDashboardEditWindow',{
                    parentViewRef : view
                }),
                form = clienteditwindow.down('form');
                var grid_data=gridStore.getData().items[rowIndex];
                form.loadRecord(grid_data);
            clienteditwindow.show();
        }catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.CLIENTS.TOAST.EDIT, err);  
        }
     
    },
    


    onSearchProjectRoll: function (textfield, e, eOpts) {
    var store =this.getView().down('clientdashboardgrid').getStore('projectclientstore'),
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
 
},
     /**
	 * The function onDeleteButtonClick will perform when the 'handler' event of the 'button' is fired in the grid.
	 * @param {Ext.grid.pannel} 'grid' when button is being clicked.
	 * @param {Number} 'rowIndex' The rowIndex within the store of the selected record.
	 * @param {Number} 'colIndex' TThe colIndex within the store of the selected record.
   * @param {Number} 'rec' records in the store.
	 */
    onDeleteButtonClick:function(grid,rowIndex){
        try{
            let store = grid.getStore();
            let record = store.getAt(rowIndex);
            let ddo_projects_clients_id = record.data.ddo_projects_clients_id;
            var params={
                ddo_projects_clients_id:ddo_projects_clients_id
            }
            Ext.Msg.confirm(
              'Confirm',
              'Are You sure, you want to delete the record?',
              function(btnId) {
                if (btnId === 'yes') {
                  Ext.Ajax.request({
                    url: Api.URL.projectclients.DELETE ,
                    method: 'DELETE',
                    params: params,
                    success: function(response, eOpts) {
                      let grid = Ext.ComponentQuery.query('clientdashboardgrid')[0],
                        store = grid.getStore();
                      store.removeAt(rowIndex);
                      Ext.Msg.alert('Success', ' Successfully Deleted record');
                    },
                    failure: function(response, eOpts) {
                      var msg = Ext.decode(response.responseText).message;
                      Ext.Msg.alert('Error!', msg);
                    }
                  })
      
                } else {
                  // Ext.Msg.alert('Alert', 'Check Login Details.'); 
                }
      
              });
        store.reload();
        }catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.CLIENTS.TOAST.DELETE, err);
        }
        
    }
   
    });