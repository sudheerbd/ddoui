/**
 * The file EmployeeReportController is the controller file for the EmployeeReportMainView.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.employeereportcontroller'.
 */

Ext.define('DDO.view.employeereportview.EmployeeReporFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employeereportformcontroller',

    onApplyBtn:function(btn,e,eOtps){
      var formCmp , rightFormValues,leftFormValues;
      formCmp= this.getView().down('form');
      rightFormValues = formCmp.getValues();
      formCmp.up('window').hide();
      leftFormValues = formCmp.up('window').getReferences().downfilterform.getValues();
      var sliderValues = formCmp.up('window').getReferences().experienceSlider.getValues();
      let params = {
        ...rightFormValues,
        ...leftFormValues
    };
    params.experience = sliderValues;
      var formCmpParent = this.getView().parentViewRef,
      formCmpParentVm = formCmpParent.getViewModel(),
      formCmpStore = formCmpParentVm.getStore('employestore');
      formCmpStore.clearFilter();
      formCmpStore.getProxy().setExtraParams(params);
      formCmpStore.load({
         scope: this,
         callback: function (records, operation, success) {
           if(success == true){
            if (records.length == 0) {
              formCmpStore.removeAll();
              Ext.toast('No Matching Records including search results');
             }
           }
          else{
            Ext.Msg.alert('Error', "Something went wrong");
           }
         }
       });
      
    },

//     onColumnApply:function(btn){
//       var a = []
//       var employeeReportGrid = this.getView().parentViewRef.down('grid');
//       var checkboxGroup=btn.up('form').down('checkboxgroup');
//       var formWindow = this.getView();
//       formWindow.hide();
//       checkboxGroup.items.items.map(function (item) {
//    if (item.value === false) {
//   employeeReportGrid.getColumns()[item.inputValue].setHidden(true);
//   var a = CheckBoxValues.columnValues
//   // for(var checboxitems in a){
//   //   if(item.name === checboxitems){
//   //     checboxitems = item.value
//   //   } 

//   // }
//   var c = item.name
//   CheckBoxValues.columnValues.c = item.value
//  } else {
//   employeeReportGrid.getColumns()[item.inputValue].setHidden(false);
//  }
// });
// },
    onResetFilters:function(){
      var rightFormCmp= this.getView().down('form'),
      leftFormCmp = rightFormCmp.up('window').getReferences().downfilterform;
      rightFormCmp.up('window').hide();
      rightFormCmp.reset();
      leftFormCmp.reset();
      var formCmpParent = this.getView().parentViewRef,
      formCmpParentVm = formCmpParent.getViewModel(),
      formCmpStore = formCmpParentVm.getStore('employestore');
      formCmpStore.getProxy().setExtraParams();
      formCmpStore.load();
    }
  });