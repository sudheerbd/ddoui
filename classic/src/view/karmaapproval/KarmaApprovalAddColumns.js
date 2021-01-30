// Ext.define('DDO.view.karmaapproval.KarmaApprovalAddColumns', {
//     extend: 'Ext.menu.Menu',
//     cls: 'karma-approval-columns-cls',
//     alias:"widget.karmaapprovaladdcolumns",
//     requires: [
//         'DDO.view.karmaapproval.KarmaApprovalAddColumnController',
//         'DDO.view.karmaapproval.KarmaApprovalViewModel'
//     ],
//     controller: 'karmaapprovaladdcolumncontroller',
//     title: 'Choose Fields To Filter Results',
//    viewModel:{
//        type:'karmaapprovalviewmodel'
//    },
//     bodyPadding: "5 5 0",
//     width:240,
//     height:330,
    
//     modal:true,
//     items: [{
//         xtype : 'form',
//         reference:'checkBoxform',
//         items: [
//             {
//             xtype: 'checkboxgroup',
//             columns: 1,
//             defaults: {
//                     fontSize: 14,
//                     margin: '0 0 0',
//                     // checked: true,
//                     cls: 'addcolomns-each-item'
//                 },
//             items: [
//                 { boxLabel: 'Submitted Date', reference: 'submiteddate', inputValue: '3',
//                checked:true
//              },
//                 { boxLabel: 'Karma Category', reference: 'karmacategory', inputValue: '6',checked:false},
//                 { boxLabel: 'Karma Name', reference: 'karmaname', inputValue: '7',checked:true},
//                 { boxLabel: 'Hr Karma Units', reference: 'hrkarmaunits', inputValue: '10',checked:true },
//                 { boxLabel: 'Finance Karma Units',reference: 'financekarmaunits', inputValue: '11',checked:true },
//                 { boxLabel: 'Karma Units', reference: 'karmaunits', inputValue: '4',checked:true},
//                 { boxLabel: 'Derived Units', reference: 'derivedunits', inputValue: '5',checked:true },
//             ]
//         },
//         {
//             xtype: 'component',
//             autoEl: {tag: 'hr'}
//         }
//     ],
//         bbar:[
//             {
//                 xtype:'tbfill'
//             },{
//                 xtype:'button',
//                 text:'show columns',
//                 reference:'showColumn',
//                 cls:'showcolumnbtn-cls',
//                 iconCls:'showiconcolumn-cls',
//                 handler:'onColumnApply'
//             }
//         ]  
//     }]

// });