Ext.define('DDO.view.profile.provitiontocnfm.ProvitionToCnfmViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.probationtocnfm',
    requires:['DDO.view.profile.provitiontocnfm.ProbationToCnfmForm'],
    
    onActionIconClick:function(grid, rowIndex, colIndex){
        var gridView=this.getView(),
        record = gridView.getStore().getAt(rowIndex),
            window = Ext.create('DDO.view.profile.provitiontocnfm.ProbationToCnfmForm',{
                parentReferenceView:gridView,
                clickedRowIndex:rowIndex,
                mailID : gridView.mailID
            });
            window.down('form').loadRecord(record);
            window.show(); 
                           
    },

    downloadExcelSheet:function(grid, rowIndex, colIndex){
        // debugger;
       var record =  this.getView().getStore().getAt(rowIndex),
        recordId = record.data.probationtocnfm_id;

        params = {
            recordId : recordId
        },
        Ext.Ajax.request({
            url: Api.URL.probationtocnfm.DOWNLOAD_EXCEL,
            method: 'POST',
            // scope: me,
            params: params,
            success: function(response){
               var sheetName = 'Probation Data';
                   var xml = Ext.decode(response.responseText).data;
                   for (var i = 0; i < xml.length; i++) {
                    var row = "";
                    for (var index in xml[i]) {
                        row += xml[i][index] +'\t';
                    }
                   }
                   var headerName = Object.keys(xml[0]);
                   var headers = "";
                   for (var j = 0;j<headerName.length; j++){
                       
                    //    for(var headindex in headerName[j]){
                        headers += headerName[j] +'\t';
                    //    }
                   }
                   var keyValues = headers + '\n' + row;
                   title = 'Probation to confirmation data';
               var blob = new Blob([keyValues], {
                   type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
               });
               saveAs(blob, sheetName+'.xls');
            },
            failure:function(data){

            }
        })
    }
});