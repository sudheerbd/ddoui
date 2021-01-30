/**
 * The file MOMActionItemsController is the ViewController for DDO.view.projects.MOMActionItems.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.momActionItemsController'
 */
Ext.define('DDO.view.projects.MOMActionItemsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.momActionItemsController',

    onFollowUp: function(btn){
        // try{
            // debugger;
           var me = this;
           var grid = this.getView().up().down('momActionItems').getReferences().actionItemsGridRef;
           var selectedItems = grid.getSelection();
           var textmsg = this.getView().down('textfield').getValue();
           var followUpItems = [];
        //    var url = Api.URL.followUpItems.UPDATE;
            for(var index in selectedItems){
                var data = selectedItems[index].data;
                var obj = {};
                obj.empId = data.task_owner;
                obj.empName = data.empname;
                obj.momId = data.momid;
                obj.momAgenda = data.mom;
                obj.task = data.task;
                obj.taskId = data.ddo_task_id;
                obj.startDate = data.task_start_date;
                obj.endDate = data.task_end_date;
                obj.email = data.email;
                obj.projectName = data.projectname;
                obj.textmsg = textmsg;
                followUpItems.push(obj);
            }
            // console.log(followUpItems);
            me.getView().mask('loading...');
            Ext.Ajax.request({
                url: Api.URL.followUpActionItems.UPDATE,
                method: 'PUT',
                // params: Ext.JSON.encode(followUpItems),
                jsonData: Ext.JSON.encode(followUpItems),
                success:  function(){
                    me.getView().unmask();
                    Ext.Msg.alert("Success", "Followup Mail has been Sent Succcessfully!");
                    me.getView().getReferences().taskcomment.reset();
                    // console.log("Sucess!!")
                },
                failure: function(){
                    me.getView().unmask();
                    Ext.Msg.alert("Failure", "Something Went Wrong on sending Followup Mail!");
                    // console.log("Failure!!")
                }
            })
            // }catch(err){
            //     Utility.showToast(Messages.EXECUTIVEDASHBOARD.MOM.CREATEWINDOW, err);
            // }
    },
    onMomSearchText:function(field,e,eOpts){
        // debugger;
    // //  var actionItemsStore = this.getViewModel().getStore('momActionItemsStore');
     var gridView =  this.getView().up().down('momActionItems').down('grid'); 
        var actionItemsStore = gridView.getStore();
             var momAgenda,empName,status;
            searchString = Ext.String.trim(field.getRawValue());
              if(searchString){
                actionItemsStore.reload();
                actionItemsStore.clearFilter(true);
                actionItemsStore.filterBy(function (record) {                  
                    if(record.get('empname')){
                        empName = record.get('empname').toLowerCase();
                    }

                    if(record.get('mom')){
                        momAgenda = record.get('mom').toLowerCase();
                    }
                     if(record.get('iscompleted')){
                        status = record.get('iscompleted').toLowerCase();
                    }
                    searchValue = searchString.toLowerCase();
                    if (empName.indexOf(searchValue) > -1 || momAgenda.indexOf(searchValue) > -1 ||status.indexOf(searchValue) > -1 ) {
                        return record;
                    }
                    // gridView.refresh();
                });
                }
                else{
                    actionItemsStore.clearFilter(true);
                    actionItemsStore.reload();
                  }




//       var gridView = this.getView().up().down('momActionItems').down('grid') ;
//      var store = gridView.getStore();
//      searchString = field.getValue();
//      if (!store.isLoaded()) {
//          store.load();
//      }
//     if (store) {
//      store.filter({
//          property: 'empname',
//          value: searchString,
//          anyMatch: true,
//          caseSensitive: false
//      });
// }
//  else if (searchString.length == 0) {
//      store.clearFilter(true);
//      store.load();
//      gridView.refresh();
//  }
    },

    onDownloadExcelBtnClick:function(btn,event,eOtps){
      
        event.stopEvent();
        var grid =btn.up('momactionitemtool').up().down('momActionItems').down('grid');
        // var momActionItemswindow = btn.up('window');
        var sheetName = 'MOMActionItems';
            var xml = grid.getPlugin('exporter').getDocumentData({
                title: "MOMActionItems",
            })
        var blob = new Blob([xml], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        saveAs(blob, sheetName+'.xls');
    },
    onColumnApplyClick:function(btn,event,eOtps){
        var checkboxGroup=btn.up('momactionitemtool').down('checkboxgroup');
           var menu = btn.up('momactionitemtool').down('menu');
           menu.hide();
           checkboxGroup.items.items.map(function (item) {
			if (item.value === false) {
				btn.up('momactionitemtool').up().down('momActionItems').down('grid').getColumns()[item.inputValue].setHidden(true);
			} else {
				btn.up('momactionitemtool').up().down('momActionItems').down('grid').getColumns()[item.inputValue].setHidden(false);
			}
		});
    },
    onUpdateButton: function (btn, record, item, index, e, eOpts) {
        var me = this,
            gridView = me.getView().down(),
            gridStore = gridView.getStore();
        let ddo_task_id, momId, UpdateValue, AssingeeValue, dueDate, UpdateButtonClassName, status;

        UpdateButtonClassName = e.target.className
        if (UpdateButtonClassName === "update-btn-css-tpl" || UpdateButtonClassName === "x-fa fa-check-circle act-arrow arrow-cls") {
            Ext.getBody().mask('Updating');
            ddo_task_id = record.data.ddo_task_id,
                momId = record.data.momid,
                task = record.data.task,
                UpdateValue = document.getElementById('udpateText').value,
                AssingeeValue = document.getElementById('comboSelect').value,
                dueDate = document.getElementById('duedate').value,
                status = document.getElementById('status').value
            params = {
                ddo_task_id: ddo_task_id,
                status: status,
                task : task,
                dueDate: dueDate,
                AssingeeValue: AssingeeValue,
                UpdateValue: UpdateValue,
                momId: momId
            };
            // actionItem.push(params);
            // if(UpdateButtonClassName==="update-btn-css-tpl"){
            Ext.Ajax.request({
                url: Api.URL.updateActionItems.UPDATE,
                method: 'PUT',
                params: params,
                success: function (res) {
                    var dta = Ext.decode(res.responseText).data;
                    // debugger;
                    Ext.getStore('momActionItemsStore').reload();
                    gridView.getView().refresh();
                    Ext.Msg.alert('Success', "Successfully  Updated ");
                    Ext.getBody().unmask();
                },
                failure: function (resp, responseText) {
                    Ext.Msg.alert('Failed', "Failed to Update");
                    Ext.getBody().unmask();
                }
            });
        }
    },
    // updateActionGridrow: function(grid, rowIndex, colIndex) {
       
    //     var gridStore = grid.getStore(),
    //         rec = gridStore.getAt(rowIndex),
    //         params;
    //     params = {
    //         todo_id: rec.data.todo_id
    //     };
      
    //     Ext.Ajax.request({
    //         url: Api.URL.empnamestore.UPDATE,
    //         method: 'PUT',
    //         params: params,
    //         success: function(resp, b) {
    //             gridStore.removeAt(rowIndex);
    //             grid.refresh();
    //             // gridStore.load();
    //             Ext.Msg.alert('Success', "Successfully  Updated ");
    //             Ext.getBody().unmask();
    //         },
    //         failure: function(resp, b) {
    //             Ext.Msg.alert('Failed', "failed to Updated ");
    //             Ext.getBody().unmask();
    //         }
    //     });
    // },
    

});