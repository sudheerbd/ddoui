// /**
//  * @class Resources
//  * This file holds the store for the Resource Grid. 
//  * @extends Ext.data.Store
//  * @alias store.rolesstore
//  */
// Ext.define('DDO.store.rolessecurity.RolesStore', {
//     extend: 'Ext.data.Store',
//     alias: 'store.rolesstore',
//     storeId: 'rolesstoreid',
//     requires: [
//         'Ext.data.proxy.JsonP'
//     ],
//     model:'DDO.model.rolessecurity.RolesModel',
//     autoLoad:true, 
//     //This proxy is used when we are loading data from local json file.
//     proxy: {
//         type: 'ajax',
//         url: Api.URL.rolesstore.READ,

//         reader: {
//             type: 'json',
//             rootProperty:'data'
//         }
//     }
// });