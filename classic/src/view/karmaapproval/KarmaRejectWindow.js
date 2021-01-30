Ext.define('DDO.view.karmaapproval.KarmaRejectWindow',{
extend:'Ext.window.Window',
alias:'widget.karmarejectwindow',

requires:['DDO.view.karmaapproval.KarmaRejectForm'],
title:'Type a reason for rejection or change the karma score',
width: Constants.ViewportWidth * 0.4,
height: Constants.ViewportHeight * 0.8,
constrain: true,
resizable: true,
modal: true,
cls:'karmarejectwin-cls',
layout: 'fit',


 items:[{
     xtype:'karmarejectform',
     reference :'karmareject'
 }]
// items:[{
//     xtype: 'fieldcontainer',
//     layout: 'vbox',
//     // items:[{
//     //     xtype: 'fieldcontainer',
//     //     layout: 'hbox',
//     //     margin : 10,
//     //     items:[{
//     //         xtype:'displayfield',
//     //         fieldLabel:'From',
//     //         reference:'employeename',
//     //         width:30
//     //     },
//     // {
//     //     xtype:'datefield',
//     //     fieldLabel:'Month',
//     //     reference: 'karmaRejectDate',
//     //     format: 'F,Y',
//     //     // labelAlign: 'top',
//     // }]
//     // }]
// }]
});