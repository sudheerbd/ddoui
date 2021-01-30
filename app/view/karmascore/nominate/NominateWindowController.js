// Ext.define('DDO.view.karmascore.nominate.NominateWindowController', {
//     extend: 'Ext.app.ViewController',

//     alias: 'controller.nominatewindow',

//     onWindowOutsideTap: function(event, target) {
//         if (Utility.nominatAlert) {
//             var view = this;
//              Utility.onSetUpWinOutterTap(event, target, view);
//             //this.onWindowOutterTap(event, target, view);
//         }
//     },

//     onWindowOutterTap: function(event, target, sourceController) {
//         var target = target || event.target,
//             cls = target.getAttribute('class'),
//             window;
//         if (cls && (cls.indexOf('x-mask') !== -1)) {
//             window = sourceController.getView();           
//                 window.close();
//         }
//     },
//     onResetValues : function(){
//         var me = this,
//             nominateView = me.getView(),catStore, karmaStore,
//             nomViewModel, nomWindowForm,employeeCombo;

//         Utility.nominateProjectId = null;
//         catStore = Ext.getStore('karmasetup.KarmaCategoriesStore');
//         karmaStore = Ext.getStore('karmasetup.KarmaStore');

//         if (!karmaStore.isLoaded()) {
//             karmaStore.load();
//         }

//         karmaStore.clearFilter(true);
//         karmaStore.filterBy(function(rec) {
//             return false;
//         });

//         catStore.clearFilter(true);
//         catStore.filterBy(function(rec) {
//             if (rec.get('name') == 'Project') {
//                 return false;
//             }
//             return true;
//         });
//         employeeCombo = nominateView.down('combo[reference=employee]');
//         nomWindowForm = nominateView.down('nominateviewform');
//         nomViewModel = nomWindowForm.getViewModel();

//         nomWindowForm.reset();
//         employeeCombo.clearValue();
//         nomViewModel.set('profileNominationType', false);
//         nomViewModel.set('iconSelection', null);
//         nomViewModel.set('points', null);
//         nomViewModel.set('ratingView', true);
//         nomViewModel.set('ruleView', true);

//         nomWindowForm.lookupReference('ratingcomment').setValue(null);
//     },
    
//     windowBeforeClose : function(){
//         var nominateWinodw = this.getView(),
//             nominateForm = this.getView().down("nominateviewform"),
//             categoryStore = Ext.getStore('karmasetup.KarmaCategoriesStore');
//         if (nominateForm && nominateForm.isDirty()) {
//             Ext.Msg.show({
//                 title: 'Confirmation',
//                 message: 'Are you sure, You want to close Nomination Form ?',
//                 buttons: Ext.Msg.YESNO,
//                 icon: Ext.Msg.QUESTION,
//                 fn: function (button) {
//                     if (button === 'yes') {
//                         empCombo = nominateForm.down('combo[reference=comboTagview]').setValue("");
//                         nominatekarmacombo = nominateForm.down('combo[reference=nominatekarmacombo]').setValue("");
//                         karmaunits = nominateForm.down('numberfield[reference=karmaunits]').setValue("");
//                         ratingcomment = nominateForm.down('htmleditor[reference=ratingcomment]').setValue("");
//                         karmaGivenDate= nominateForm.down ('[reference=karmaGivenDate]').setValue('');
//                         categoryStore.clearFilter();
//                         nominateWinodw.close();
//                     } else {

//                     }
//                 }
//             });
//         } else {
//         }
//         var messageBox = Ext.ComponentQuery.query('window')[0];
//         if (messageBox && messageBox.isVisible()) {
//             return false;
//         }
//     },
//     onNominateOtherClose: function(){
//         var submitBtn = this.down("form").down('button[reference=submit]');
//         if(submitBtn){
//          submitBtn.disable(true); 
//         }
//          var categoryStore = Ext.getStore('karmasetup.KarmaCategoriesStore');
//          var karmaList = Ext.ComponentQuery.query('karmalist')[1];
//          if(karmaList){
//          karmaList = karmaList.getView();
//          karmaList = karmaList.refresh();
//          }
//          categoryStore.clearFilter();
//      }
// });
