Ext.define('DDO.view.karmareport.KarmaReportWindowController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.karmareportwindowcontroller',


  // onDateOKClick: function(m) {

  //   try {

  //     var me = m.up('datefield'),
  //       date = new Date(),
  //       month = date.getMonth(),
  //       currentYear = date.getFullYear(),
  //       selectedYear,
  //       selectedMonth,
  //       selectMonth = me.selectMonth.getMonth(),
  //       selectYear = me.selectYear.getFullYear();
  //     if (selectMonth) {
  //       if (month <= selectMonth) {
  //         me.setValue(selectMonth);
  //         me.fireEvent('select', me, selectMonth);
  //       } else {
  //         console.log('error');
  //       };
  //       if (selectYear) {
  //         if (currentYear <= selectYear) {
  //           me.setValue(selectYear);
  //           me.fireEvent('select', me, selectYear);
  //         } else {
  //           console.log('error');
  //         }

  //       me.collapse();
  //     }}
  //   } catch (err) {
  //     Utility.showToast(Messages.KARMAREPORT.TOAST.DATESELECTIONCONFIRMATION, err);
  //   }
  // },

   onDateOKClick: function(m) 
    {

      try {
      var me = m.up('datefield'),
      date = new Date(),
      month = date.getMonth(),
      currentYear = date.getFullYear(),
      selectedYear,
      selectedMonth;
      
      if (me.selectMonth) {
      
      me.setValue(me.selectMonth);
      me.fireEvent('select', me, me.selectMonth);
      me.collapse();
      }
      } catch (err) {
      Utility.showToast(Messages.NOMINATION.TOAST.DATESELECTIONCONFIRMATION, err);
      }
      },


  onDateSelect: function(m, d) {
    try {
      var me = m.up('datefield');
      me.selectMonth = new Date((d[0] + 1) + '/1/' + d[1]);
    } catch (err) {
      Utility.showToast(Messages.KARMAREPORT.TOAST.DATESELECTPROCESS, err);
    }

  },

  onDateCancelClick: function(m, d) {

    try {
      var me = m.up('datefield');
      me.selectMonth = null;
      me.collapse();
    } catch (err) {
      Utility.showToast(Messages.KARMAREPORT.TOAST.DATESELECTCANCEL, err);
    }

  },
  onFormValid: function() {
    try{
      var empid = this.getView().down('[name=Employee]').getValue();
      var fromdate = this.getView().down('[name=fromdate]').getValue();
      var todate = this.getView().down('[name=todate]').getValue();
  
  
      if (!empid && todate && fromdate) {
        this.getViewModel().set('searchbtn', false)
      } else if (!todate && !fromdate && empid) {
        this.getViewModel().set('searchbtn', false)
      } else if (todate && empid && fromdate) {
        this.getViewModel().set('searchbtn', false)
      } else {
        //  this.getViewModel().set('searchbtn',true)
      }
  
    }
    catch (err) {
      Utility.showToast(Messages.KARMAREPORT.TOAST.FORMVALIDATION, err);
    }},
 

  // OnclickSubmit:function(btn) {
  //
  //     var empid = btn.up('form').down('[name=Employee]').getValue()
  //     var todate = btn.up('form').down('[name=todate]').getValue()
  //     var fromdate = btn.up('form').down('[name=fromdate]').getValue()
  //     var karmaReportView = this.getView().parentRef
  //     var karmareportgridstore = karmaReportView.down('karmareportgrid').getStore();
  //     var karmareportgrid = karmaReportView.down('karmareportgrid');
  //     params = {
  //       empid: empid,
  //       todate: todate,
  //       fromdate: fromdate
  //     },

  //     Ext.Ajax.request({
  //       url: Api.URL.karmareportdetails.READ,
  //       method: 'PUT',
  //       scope: this,
  //       params: params,
  //       success: function(response, data) {
  //          
  //         var obj = Ext.decode(response.responseText);
  //         console.dir(obj);
  //    //    karmareportgridstore.load();
  //        // karmareportgrid.update();
  //         
  //         karmareportgridstore.reload({
  //         callback:function(record,data){
  //          
  //                 karmareportgrid.update();
  //             }
  //         })

  //         Utility.showToast(Messages.EMPLOYEERESIGNATION.TOAST.SUCCESS);

  //       },
  //       failure: function(response, data) {
  //         console.log('server-side failure with status code ' + response.status);

  //       // var data = Ext.decode(response.responseText);
  //       // Utility.toastReuseFn('t', data.message);
  //       },

  //     })
  //   }





  OnclickSubmit: function(btn, searchField) {
    let formValues = btn.up('form').getForm().getValues(),
    karmaReportView = this.getView().parentRef,
    karmareportstore = karmaReportView.down('karmareportgrid').getStore(),
    employeeId = formValues.Employee,
    flag,checkEmp,empWithDate , withDate, withEmp,
    fromGivenMonth , toGivenMonth,
    fromGivenYear , toGivenYear,
    fromDate = formValues.fromdate,
    toDate = formValues.todate,
    fromYearFieldValue = new Date(fromDate),
    toYearFieldValue = new Date(toDate),
    me = this;
    // fromDate ? flag = false : flag = true;
    // if(!employeeId){
    //     checkEmp = true;
    // }
    if(employeeId && fromDate && toDate){
      empWithDate = true;
    }else if(fromDate && toDate){
      withDate = true;
    }else if(employeeId){
      withEmp = true;
    }
          fromGivenMonth = fromYearFieldValue.getMonth() + 1;
               toGivenMonth = toYearFieldValue.getMonth() +1;
               fromGivenYear = fromYearFieldValue.getFullYear();
               toGivenYear = toYearFieldValue.getFullYear();

              if (fromGivenMonth > 9) {
                  fromGivenMonth = fromGivenMonth;
              } else {
                  fromGivenMonth = "0" + fromGivenMonth;
              }
              if(toGivenMonth > 9){
                toGivenMonth  = toGivenMonth;
              }else{
                toGivenMonth = "0" + toGivenMonth;
              }
    // fromDate = fromGivenYear+"-"+fromGivenMonth;
    // toDate =  toGivenYear+"-"+toGivenMonth;
    // let fromFullDate = new Date(fromDate);
    // let toFullDate = new Date(toDate);
    fromDate = fromGivenMonth+"-"+fromGivenYear;
    toDate =  toGivenMonth+"-"+toGivenYear;
  let params = {
    employeeId: employeeId,
    fromDate: fromDate,
    toDate: toDate,
    flag: flag,
    checkEmp: checkEmp,
    empWithDate: empWithDate,
    withDate: withDate,
    withEmp: withEmp
    }
    karmareportstore.clearFilter();
    karmareportstore.load({
      params: params,
      callback: function(res , data) {
        let win  = Ext.ComponentQuery.query('karmareportwin')[0];
        win.getViewModel().set('isSearchClick' , true);
        win.close();
      }
  });
  
  },

  processSearchOperation: function(karmareportstore, params) {
    var employeeId = params.employeeId,
    fromDate = params.fromDate,
    toDate = params.toDate,
    checkEmp = params.checkEmp,
    empWithDate = params.empWithDate, 
    withDate = params.withDate, 
    withEmp = params.withEmp,
    flag = params.flag;
    
    // (employeeId && fromDate && toDate) ? empWithDate = true : empWithDate = false;
    // (fromDate && toDate) ? withDate = true : withDate = false;
    // (employeeId && !fromDate) ? withEmp = true : withEmp = false;
    karmareportstore.clearFilter(true);
    karmareportstore.filterBy(function(record) {
    let empId = record.data.ddo_employee_id;
    let monthYear = record.data.ddo_nomination_date;
        var date = monthYear.split('-')
        date = new Date(date[1]+"-"+date[0]);
        // if(!checkEmp){
        // (employeeId == empId)? checkEmp= true : checkEmp = false;
        // }
    // if ((empId == employeeId && date >= fromDate && date <= toDate) 
    //     || (date >= fromDate && date <= toDate && checkEmp)  
    //     || (empId == employeeId && flag)) {
    //     return true;
    // }
       if(empWithDate){
         if(empId == employeeId && date >= fromDate && date <= toDate){
           return true;
         }
       }
       if(withDate){
         if(date >= fromDate && date <= toDate){
           return true;
         }
       }
       if(withEmp){
        if(empId == employeeId){
          return true;
        }
       }
    });
  },
    onActiveDateField: function (view, e) {
        try {
            var date = new Date(),
                month = date.getMonth(),
                currentYear = date.getFullYear(),
                year = [],   
                allowPrevMonthCount = view.allowPrevMonthCount || 1,
             //   allowPrevYearCount = view.allowPrevYearCount || 1,
                match = -1,
                eligableMonth = [],
                monthName = Utility.MONTHNAME,
                prevYear = currentYear - allowPrevYearCount;                
                year.push(currentYear);
                if(month < 1){
                    year.push(prevYear);
                }
            eligableMonth.push(monthName[month]);
            if (allowPrevMonthCount > 1) {
                for (let i = allowPrevMonthCount; i > 0; i--) {
                    eligableMonth.push(monthName[month - i]);
                }
            } else {
                eligableMonth.push(monthName[month - allowPrevMonthCount]);
            }
            this.getEligibleDates(view);
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.DATEPICKERACTIVATION, err);
        }
    },
   /**
   * The function getEligibleDates is used to check for the eligible months on onActiveFieldDate.
   * @param {Ext.month.Picker} 'view' which takes the component of month picker.
   * @param {array} 'eligableMonth' which takes the array of months.
   * @param {array} 'year' which takes the array of years.
   */
    getEligibleDates: function (view) {
      
        //Months
        var eligableMonth = new Date();
        view.months.elements.forEach((ele) => {
            match = -1;
            match = eligableMonth.indexOf(ele.outerText);
            if (match > -1) {
                ele.classList.remove('disabled-month-year');
            } else {
                ele.classList.add('disabled-month-year');
            }
        });
        //Years
        year = new Date();
        years = JSON.stringify(year);
        view.years.elements.forEach((ele) => {
            match = -1;
            match = year.indexOf(ele.outerText);
            if (match > -1) {
                ele.classList.remove('disabled-month-year');
            } else {
                ele.classList.add('disabled-month-year');
            }
        });
    },
});
