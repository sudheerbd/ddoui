Ext.define('DDO.view.karmaapproval.KarmaApprovalWinViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.karmaapprovalwindowviewmodel',
    // formulas:{
    //     getKarmaCartesianScores:function(data){
    //         debugger;
    //         Ext.Ajax.request({
    //             url: Api.URL.karmaapproval.CARTESIAN,
    //             method:'GET',
    //             callback:function(resp){
    //                 debugger;
    //             }
    //         })
    //     }
    // },
    stores:{
        //This store is used for karma approval grid.
        karmascorescartesianstore: {
            // model:'DDO.model.karmaapproval.KarmaApproval',

            autoLoad:true, 
          fields:['name','value'],
     
            // data:[{name:'karma', score:'120'}],
            proxy: {
                type: 'ajax',
                url: Api.URL.karmaapproval.CARTESIAN,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    transform: {
                        fn: function(response) {
                            // debugger;
                           var responsedata = response.data[0],
                               keys = Object.keys(responsedata),
                               values = Object.values(responsedata);
                               var resultArray =[];
                               for(i=0;i<keys.length;i++){
                                   var obj = {};
                                   obj.name = keys[i];
                                   obj.value =values[i];
                                   resultArray.push(obj);
                               }
                               console.log(resultArray);
                            //    debugger;
                            return resultArray;
                        },
                        scope: this
                    }
                }
            },
            // sorters: [{
            //     property: "ddo_nomination_id",
            //     direction: "ASC"
            // }]
        }
    }
});