// /**
//  * @class AvailableResources
//  * This file holds the class for the the panel where the grid for Available Resources will be displayed. 
//  * @extends Ext.grid.Panel
//  * @alias widget.availableresources
//  */
// Ext.define('DDO.view.main.resources.AvailableResources', {
//     extend: 'Ext.grid.Panel',
//    // alias: 'widget.availableresources',
//     requires: [
//         'Ext.ux.CheckColumn',
//         // 'DDO.store.resources.Resources',
//         'DDO.util.LabelsTitles'
//     ],
//     //Use data binding here
//     /*bind: {
//         store: '{resources}'
//     },*/
//     store: {
//         type: 'resources'
//     },

//     verticalScrollerType: 'paginggridscroller',
//     loadMask: true,
//     invalidateScrollerOnRefresh: false,        
//     plugins: 'gridfilters',
//     features: [{
//         ftype: 'grouping'
//     }],
//     headerBorders: false,
//     cls:'ddo-dashboard-grid',//cls not working
//     style: {
//                  'box-shadow': '0 0 10px rgba(0, 0, 0, 0.3)',
//                  'margin-left': '1%',
//                  'margin-right': '0%',
//                  'margin-top': '1%',
//                  'margin-bottom': '1%'
//              },
//     viewConfig: {
//          listeners: {
//             refresh: function(dataview) {
//                 Ext.each(dataview.panel.columns, function(column) {
//                     if (column.autoSizeColumn === true)
//                         column.autoSize();
//                 })
//             }
//         }
//     },
//     columns: [
//     {
//         text: DDO.util.LabelsTitles.NAME,
//         dataIndex: 'employee',
//         autoSizeColumn: true,
//         filter: {
//             type: 'string'
//         }
//     }, {
//         text: DDO.util.LabelsTitles.TECHNOLOGIES,
//         dataIndex: 'skills',
//         autoSizeColumn: true,
//         filter: {
//             type: 'string'
//         }
//          /*xtype:'templatecolumn',
//          tpl: [ '<ul style=" list-style-type: none;">', '<tpl for="skills">', '<li>{.}</li>', '</tpl>', '</ul>']*/

//     }, {
//         text: DDO.util.LabelsTitles.ROLES,
//         dataIndex: 'designation',
//         autoSizeColumn: true,
//         filter: {
//             type: 'string'
//         }
//     }, {
//         text: DDO.util.LabelsTitles.EXPERIENCELEVEL,
//         dataIndex: 'expyear',
//         //flex:1,
//         autoSizeColumn: true,
//         filter: {
//             type: 'string'
//         }
//     }, {
//         text: DDO.util.LabelsTitles.AVAILABLEFROM,
//         dataIndex: 'available',
//         autoSizeColumn: true,
//         renderer: Ext.util.Format.dateRenderer('m/d/Y')
//         //dateFormat: 'm-d-Y g:i A' //not working
//     }, {
//         text: DDO.util.LabelsTitles.JOININGDATE,
//         dataIndex: 'joiningdate',
//         autoSizeColumn: true,
//         renderer: Ext.util.Format.dateRenderer('m/d/Y')
//     }, {
//         text: DDO.util.LabelsTitles.DAYSONBENCH,
//         dataIndex: 'daysonbench',
//         //flex:1,
//         autoSizeColumn: true,
//         filter: {
//             type: 'number'
//         }
//     }, {
//         text: DDO.util.LabelsTitles.EMPLOYMENTSTATUS,
//         dataIndex: 'employmentstatus',
//         autoSizeColumn: true
//     }, {
//         text: DDO.util.LabelsTitles.CURRENTPROJECT,
//         dataIndex: 'project',
//         autoSizeColumn: true
//     }, {
//         text: DDO.util.LabelsTitles.POTENTIALPROJECT,
//         dataIndex: 'potentialproject',
//         autoSizeColumn: true
//     }, {
//         text: DDO.util.LabelsTitles.PREFERREDLOCATION,
//         dataIndex: 'preferredlocation',
//         autoSizeColumn: true
//     }]
// });
