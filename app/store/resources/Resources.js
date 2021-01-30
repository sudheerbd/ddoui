// /**
//  * @class Resources
//  * This file holds the store for the Resource Grid. 
//  * @extends Ext.data.Store
//  * @alias store.resources
//  */
// Ext.define('DDO.store.resources.Resources', {
//     extend: 'Ext.data.Store',
//     alias: 'store.resources',
//     storeId: 'resourcestoreid',
//     requires: [
//         'Ext.data.proxy.JsonP'
//     ],
//     model:'DDO.model.resources.Resources',
//     //autoLoad:true, //Required when using APIs 
//     pageSize: Constants.PAGESIZE,    
//     /**
//       * True when on load the grid should not be grouped
//       */
//     groupField: false, 
//     //groupField: 'skills',//this should be used if on load the grid should already be grouped
//     //remoteSort: true, Should be false for the sorters defined in store to work

//     //This proxy is used when we are loading data from local json file.
//     proxy: {
//         type: 'ajax',
//         url: Api.URL.resources.READ,

//        //url: 'resources/data/resourceDataNew.json',
//         reader: {
//             type: 'json',
//             rootProperty:'data'
//         }

//     },
//     //This proxy is used when we are loading data from remote APIs
//     /*proxy: {
//         type: 'jsonp', //type:ajax for local data
//         url : DDO.util.Api.BASEURL+'/resources', 
//        //url: DDO.util.Api.RESOURCEURL,
//         reader: {
//             type: 'json',
//             rootProperty: 'rows'
//         }
//     },*/
//     sorters: [{
//         property: 'daysonbench',
//         direction: 'DESC'
//     }]
    
// });