Ext.define('DDO.view.karmaapproval.KarmaApprovalToolbarViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.karmaapprovaltoolbarviewmodel',
    // requires: ['DDO.model.karmaapproval.KarmaApproval'],
    data: {
        // derivedKarma: null,
        itemsSelected:null,
       
    },
    // stores:{
    //     //This store is used for karma approval grid.
    //     karmaapprovalstore: {
    //         model:'DDO.model.karmaapproval.KarmaApproval',
    //         autoLoad:true, 
    //         pageSize:2,
    //         proxy: {
    //             type: 'ajax',
    //             url: Api.URL.karmaapproval.READ,
    //             reader: {
    //                 type: 'json',
    //                 rootProperty: 'data'
    //             }
    //         },
    //         sorters: [{
    //             property: "ddo_nomination_id",
    //             direction: "ASC"
    //         }]
    //     }
    // }
});