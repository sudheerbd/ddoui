// Ext.define('DDO.view.karmaapproval.KarmaApprovalAddColumnController',{
//     extend: 'Ext.app.ViewController',
//     alias: 'controller.karmaapprovaladdcolumncontroller',
//     onColumnApply:function(btn,e,eOpts){
//         debugger;
//         var checkbox = btn.up('karmaapprovaladdcolumns').down('checkboxgroup'),
//         window = this.getView();
//         window.hide();
//     checkbox.items.items.map(function (item) {
//         if (item.value === false) {
//             window.parentRef.getColumns()[item.inputValue].setHidden(true);
//         } else {
//             window.parentRef.getColumns()[item.inputValue].setHidden(false);
//         }
//     });
//     }
// });