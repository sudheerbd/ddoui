Ext.define('DDO.view.holidays.HolidaysViewController',{
    extend:'Ext.app.ViewController',
    alias :'controller.holidaysviewcontroller',
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
            var holidayswindow = Ext.ComponentQuery.query('holidayswindow')[0] ||
                Ext.create('DDO.view.holidays.HolidaysWindow',{
                    parentViewRef : view
                }),
                form = holidayswindow.down('form');
            form.reset();
            holidayswindow.show();
            holidayswindow.edit = false;
        }
        catch (err) {
			Utility.showToast(Messages.EMPLOYEESETUP.CLIENTS.TOAST.ADDBUTTON, err);
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
            // debugger;
            var gridStore=grid.getStore();
            var view = this.getView();
            var holidayeditwindow = Ext.ComponentQuery.query('holidayseditwindow')[0] ||
                Ext.create('DDO.view.holidays.HolidaysEditWindow',{
                    parentViewRef : view
                }),
                form = holidayeditwindow.down('form');
                var grid_data=gridStore.getData().items[rowIndex];
                // if(grid_data.data.optional=="Y"){
                //     form.down('[name=optional]').setRawValue('false');
                //     form.down('[name=optional]').setValue('false');
                // }
                form.loadRecord(grid_data);
                holidayeditwindow.show();
        }catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.CLIENTS.TOAST.EDIT, err);  
        }
     
    },
    onGridRowClick: function(row, record, tr, rowIndex, e, eOpts){
        try{
            var view = this.getView();
            var holidayeditwindow = Ext.ComponentQuery.query('holidayseditwindow')[0] ||
                Ext.create('DDO.view.holidays.HolidaysEditWindow',{
                    parentViewRef : view
                }),
                form = holidayeditwindow.down('form');
                //var grid_data=gridStore.getData().items[rowIndex];
                // if(grid_data.data.optional=="Y"){
                //     form.down('[name=optional]').setRawValue('false');
                //     form.down('[name=optional]').setValue('false');
                // }
                form.loadRecord(record);
                holidayeditwindow.show();
        }catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.CLIENTS.TOAST.EDIT, err);  
        }
      
    },
          /**
	 * The function onAddNewProductClick will perform when the 'handler' event of the 'button' is fired in the MainView.
	 * It is create the window by clicking on addnew button and after that it will call onAddNewClick function .
	 * @param {Ext.button.Button} 'btn' when button is being clicked.
	 * @param {Number} 'idx' The idx within the store of the selected record.
	 * @param {Ext.data.Model} 'rec' The selected record.
	 */
    onUpcomingHolidays:function(btn){
       // debugger;
        if(btn.text=='Upcoming Holidays'){
            Ext.getBody().mask('wait');
            btn.text='RevertBack'
            var me =this
            Ext.Ajax.request({
                url: Api.URL.upcomingholidays.READ,
                method: 'GET',
                scope: me,
                success: function(resp, b) {
                    var dta = Ext.decode(resp.responseText).data;
                    var gridStore=this.getView().getViewModel().getStore('holidaysstore');
                    gridStore.clearData();
                    gridStore.setData(dta);
                    Ext.getBody().unmask();
                },
                failure: function(resp, b) {
                    Ext.getBody().unmask();
    
                }
            });
        }else{
            btn.text='Upcoming Holidays';
            var gridStore=this.getView().getViewModel().getStore('holidaysstore');
            gridStore.load();
        }
       
    },
    onViewrender:function(){
    var roles_array=Utility.holidaysroleaccess;
    var vm = this.getViewModel();
    var login_data=Ext.getStore('login').getData().items[0].data,
       login_roles_len=login_data.roles.length;
       for(var i=0;i<=login_roles_len-1;i++){
        var boolean_val = roles_array.includes(login_data.roles[i].rolename);
        if(boolean_val){
            // this.getView().down('toolbar').down('[xtype=button]').setHidden(false);
            vm.set('isHRManager', true);
            break;
        }else{
            vm.set('isHRManager', false);
            // this.getView().down('toolbar').down('[xtype=button]').setHidden(true);
        }
       }  
    }
});