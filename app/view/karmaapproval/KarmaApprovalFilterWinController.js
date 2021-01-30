Ext.define('DDO.view.karmaapproval.KarmaApprovalFilterWinController',{
  extend:'Ext.app.ViewController',
  alias:'controller.karmaapprovalfilterwincontroller',


  onFilterApplyClick:function(btn,e,eOtps){
    
      var filterWinView  = this.getView(),
           form = filterWinView.down('form'),
           formValues = form.getValues();
        var filtering = true;
        formValues.filtering = filtering;
       var endDateField =  new Date(formValues.end_date),
           endMonth = endDateField.getMonth()+1,
           endYear = endDateField.getFullYear();
           if(endMonth < 10){
             endMonth = "0"+endMonth
           }
      var startDateField = new Date(formValues.start_date),
           startMonth = startDateField.getMonth()+1,
           startYear = startDateField.getFullYear();
           if(startMonth < 10){
             startMonth = "0"+startMonth
           }
      var start_date = startMonth +"-"+startYear,
          end_date = endMonth+"-"+endYear;
          formValues.start_date = start_date;
          formValues.end_date = end_date;
          
      this.settingFormValues(formValues);
     var karmaApprovalView = filterWinView.parentRef,
         karmaApprovalVm = karmaApprovalView.getViewModel(),
         karmaapprovalStore = karmaApprovalVm.getStore('karmaapprovalstore');
         karmaapprovalStore.clearFilter();
         karmaapprovalStore.getProxy().setExtraParams(formValues);
         karmaapprovalStore.load({
            scope: this,
            callback: function (records, operation, success) {
             
              filterWinView.close();
              if (records.length == 0) {
                karmaapprovalStore.removeAll();
                Ext.Msg.alert('Error', "Records Not Found !!!");
              }
            }
          });
  },

  settingFormValues : function(formValues){
    var derivedKarmaStart = formValues.derivedkarma[0],
    derivedkarmaEnd = formValues.derivedkarma[1],
    hrKarmaStart = formValues.hrkarma[0],
    hrKarmaEnd = formValues.hrkarma[1],
    karmaUnitsStart = formValues.karmaunits[0],
    karmaUnitsEnd = formValues.karmaunits[1],
    financeKarmaStart = formValues.financekarma[0],
    financeKarmaEnd = formValues.financekarma[1];
    formValues.derivedKarmaStart = derivedKarmaStart;
    formValues.derivedkarmaEnd = derivedkarmaEnd;
    formValues.hrKarmaStart = hrKarmaStart;
    formValues.hrKarmaEnd = hrKarmaEnd;
    formValues.financeKarmaStart = financeKarmaStart;
    formValues.financeKarmaEnd = financeKarmaEnd;
    formValues.karmaUnitsStart = karmaUnitsStart;
    formValues.karmaUnitsEnd = karmaUnitsEnd;
    return formValues;
  },

  onDateOKClick: function (m) {
    try {
        var me = m.up('datefield'),
            date = new Date(),
            month = date.getMonth(),
            currentYear = date.getFullYear(),
            selectedYear,
            allowPrevMonthCount = m.allowPrevMonthCount || 1,
            selectedMonth;
        if (me.selectMonth) {
            selectedYear = me.selectMonth.getFullYear();
            selectedMonth = me.selectMonth.getMonth();
           
                me.setValue(me.selectMonth);
                me.fireEvent('select', me, me.selectMonth);
            
        } else {
            me.setValue(new Date());
            me.fireEvent('select', me, new Date());
        }
        me.collapse();
    } catch (err) {
         Utility.showToast(Messages.NOMINATION.TOAST.DATESELECTIONCONFIRMATION, err);
    }
},

onDateSelect: function (m, d) {
  try {
      var date = new Date();
      var currentYear = date.getFullYear();
      var me = m.up('datefield');         
      if(d[1] < currentYear){
          m.months.elements.forEach((ele) => {
          var match = -1;
          var eligableMonth = "Dec";
          match = eligableMonth.indexOf(ele.outerText);
          // if(match > -1){
          //     ele.classList.remove('disabled-month-year');
          // } else {
          //     ele.classList.add('disabled-month-year');
          // }
          });
          me.selectMonth = new Date((d[0] + 1) + '/1/' + d[1]);
      }
      else{
          me.selectMonth = new Date((d[0] + 1) + '/1/' + d[1]);
      }
   } catch (err) {
       Utility.showToast(Messages.NOMINATION.TOAST.DATESELECTPROCESS, err);
  }

},
onFilterResetClick:function(btn,e,eOpts){
 
  var win =btn.up('window');

     var form = win.down('form');
     form.reset();
},
});