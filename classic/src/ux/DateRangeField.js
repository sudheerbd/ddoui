/**
 *   This file  is responsible for DateRangePanel.
 *   @extends {Ext.panel.Panel}
 *   @alias widget.daterangepanel.
 *   ViewController :'DDO.view.karmascore.KarmaScoreViewController'.
 */       
       /**
         Copyrights © 2016: Walking Tree
         Date Range field will allow you to select from & to date from date picker fields & populate.
         Assumption - Value of this field will return in following format & later you need to split it to perform
         any business specific actions
         Example - 25/10/2015 - 25/10/2016
      */
 Ext.define('DDO.ux.DateRangePanel', {
     extend: 'Ext.panel.Panel',
     alias: 'widget.daterangepanel',
     modal: true,
     cls: 'daterangepanel',

     viewModel: {
         data: {
             fromDate: '',
             fromDateValue: '',
             toDateValue: '',
             toDate: '',
             minDate: '',
             maxDate: '',
             btnBind: true,
             disableBtn: false
         }

         /* formulas: {
             disableBtn: function(get) {
                 var fromDate = get('fromDateValue');
                 var toDate = get('toDateValue');

                 if (fromDate && toDate) {
                     return false;
                 }
                 return true;
             }
         }*/
     },
     floating: true,
     layout: 'vbox',
     items: [{
         xtype: 'form',
         cls: 'daterangepanel-form-cls',
         width: Constants.ViewportWidth * 0.147,
         padding: '0 0 0 5',
         buttonAlign: 'left',
         layout: 'hbox',
         defaultType: 'displayfield',
         items: [{
             fieldLabel: LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.FORM,
             bind: {
                 value: '{fromDate}'
             },
             name: 'From',
             width: Constants.ViewportWidth * 0.066,
             labelAlign: 'top',
             componentCls: 'datedisplayfield'
         }, {
             fieldLabel: LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.TO,
             width: Constants.ViewportWidth * 0.066,
             padding: '0 0 0 5',
             name: 'To',
             labelAlign: 'top',
             bind: {
                 value: '{toDate}'
             }
         }],
         buttons: [{
             text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.APPLY,
             bind: {
                 disabled: '{disableBtn}'
             },
             handler: function() {
                 var fD = this.up('daterangepanel').getViewModel().get('fromDate');
                 var tD = this.up('daterangepanel').getViewModel().get('toDate');
                 var noteToolbar = Ext.ComponentQuery.query('notestoolbar')[0];
                 var fromDate = this.up('daterangepanel').getViewModel().get('fromDateValue'),
                     toDate = this.up('daterangepanel').getViewModel().get('toDateValue');
                 if (noteToolbar) {
                     var noteStore = Ext.getStore('projects.NotesStore'),
                         noteTypeValue = noteToolbar.down('combo[reference="NotesType"]').getValue(),
                         statusValue = noteToolbar.down('combo[reference="status"]').getValue();
                     noteStore.clearFilter(true);
                     noteStore.filterBy(function(rec) {
                         var createdDate = Ext.Date.clearTime(new Date(rec.data.created_date));

                         if (statusValue && noteTypeValue) {
                             if (Ext.Date.between(createdDate, fromDate, toDate) && rec.data.note_status == statusValue && rec.data.note_type == noteTypeValue) {
                                 return true;
                             } else if (Ext.Date.between(createdDate, fromDate, toDate) && statusValue === "1" && rec.data.note_type == noteTypeValue) {
                                 return true;
                             } else if (Ext.Date.isEqual(fromDate, toDate) && Ext.Date.isEqual(createdDate, toDate) && rec.data.note_status == statusValue && rec.data.note_type == noteTypeValue) {
                                 return true;
                             } else if (Ext.Date.isEqual(fromDate, toDate) && Ext.Date.isEqual(createdDate, toDate) && statusValue === "1" && rec.data.note_type == noteTypeValue) {
                                 return true;
                             } else if (Ext.Date.between(createdDate, fromDate, toDate) && rec.data.note_status == statusValue && noteTypeValue === "1") {
                                 return true;
                             } else if (Ext.Date.between(createdDate, fromDate, toDate) && statusValue === "1" && noteTypeValue === "1") {
                                 return true;
                             } else if (Ext.Date.isEqual(fromDate, toDate) && Ext.Date.isEqual(createdDate, toDate) && rec.data.note_status == statusValue && noteTypeValue === "1") {
                                 return true;
                             } else if (Ext.Date.isEqual(fromDate, toDate) && Ext.Date.isEqual(createdDate, toDate) && statusValue === "1" && noteTypeValue === "1") {
                                 return true;
                             } else {
                                 return false;
                             }
                         }

                         if (statusValue) {
                             if (Ext.Date.between(createdDate, fromDate, toDate) && rec.data.note_status == statusValue) {
                                 return true;
                             } else if (Ext.Date.between(createdDate, fromDate, toDate) && statusValue === "1") {
                                 return true;
                             } else if (Ext.Date.isEqual(fromDate, toDate) && Ext.Date.isEqual(createdDate, toDate) && rec.data.note_status == statusValue) {
                                 return true;
                             } else if (Ext.Date.isEqual(fromDate, toDate) && Ext.Date.isEqual(createdDate, toDate) && statusValue === "1") {
                                 return true;
                             } else {
                                 return false;
                             }
                         }
                         if (noteTypeValue) {
                             if (Ext.Date.between(createdDate, fromDate, toDate) && rec.data.note_type == noteTypeValue) {
                                 return true;
                             } else if (Ext.Date.between(createdDate, fromDate, toDate) && noteTypeValue === "1") {
                                 return true;
                             } else if (Ext.Date.isEqual(fromDate, toDate) && Ext.Date.isEqual(createdDate, toDate) && rec.data.note_type == noteTypeValue) {
                                 return true;
                             } else if (Ext.Date.isEqual(fromDate, toDate) && Ext.Date.isEqual(createdDate, toDate) && noteTypeValue === "1") {
                                 return true;
                             } else {
                                 return false;
                             }
                         }

                         if (Ext.Date.between(createdDate, fromDate, toDate)) {
                             return true;
                         } else if (Ext.Date.isEqual(fromDate, toDate) && Ext.Date.isEqual(createdDate, toDate)) {
                             return true;
                         } else {
                             return false;
                         }
                     });
                 }

                 var rangeValue = fD + ' - ' + tD;
                 this.up('daterangepanel').dateRangeField.setValue(rangeValue);
                 this.up('daterangepanel').dateRangeField.getTriggers().foo.show();
                 this.up('daterangepanel').destroy();
             }
         }, {
             text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.CANCEL,
             handler: function() {
                 this.up('daterangepanel').dateRangeField.getTriggers().foo.show();
                 this.up('daterangepanel').destroy();
             }
         }]
     }, {
         xtype: 'container',
         layout: 'hbox',
         items: [{
             xtype: 'datepicker',
             width: '270px',
             padding: '0 5 0 10',
             margin: 2,
             cls: 'ddo-daterange-datepicker',
             reference: 'startdate',
             // minDate: new Date(),
             maxDate:new Date(),
             handler: function(picker, date) {
                 if (date) {
                     var notesview = Ext.ComponentQuery.query('notesview')[0];
                     if (notesview) {
                         notesview.getViewModel().set('fromDate', date);
                     }
                     var stringDateValue = Ext.Date.format(date, 'd-m-Y');
                     var rangePanel = this.up('panel'),
                         endDateValue = rangePanel.viewModel.get('toDateValue');
                     if (endDateValue) {
                         var startMonth = parseInt(Ext.Date.format(date, 'm')),
                             startYear = parseInt(Ext.Date.format(date, 'Y')),
                             startDate = parseInt(Ext.Date.format(date, 'd')),
                             endMonth = parseInt(Ext.Date.format(endDateValue, 'm')),
                             endYear = parseInt(Ext.Date.format(endDateValue, 'Y')),
                             endDate = parseInt(Ext.Date.format(endDateValue, 'd'));
                         if (startYear < endYear) {
                             if (!Ext.isEmpty(rangePanel)) {
                                 rangePanel.viewModel.set('fromDate', stringDateValue);
                                 rangePanel.viewModel.set('fromDateValue', date);
                                 rangePanel.viewModel.set('btnBind', false);
                             }
                         } else if (startYear === endYear) {
                             if (startMonth < endMonth) {
                                 if (!Ext.isEmpty(rangePanel)) {
                                     rangePanel.viewModel.set('fromDate', stringDateValue);
                                     rangePanel.viewModel.set('fromDateValue', date);
                                     rangePanel.viewModel.set('btnBind', false);
                                 }
                             } else if (startMonth === endMonth) {
                                 if (startDate <= endDate) {
                                     if (!Ext.isEmpty(rangePanel)) {
                                         rangePanel.viewModel.set('fromDate', stringDateValue);
                                         rangePanel.viewModel.set('fromDateValue', date);
                                         rangePanel.viewModel.set('btnBind', false);
                                     }
                                 } else {
                                     picker.setValue(rangePanel.viewModel.get('fromDateValue'));
                                     Ext.Msg.alert('ERROR', Messages.EMPLOYEEDASHBOARD.KARMASCORE.STARTDATE )
                                 }

                             } else {
                                 picker.setValue(rangePanel.viewModel.get('fromDateValue'));
                                 Ext.Msg.alert('ERROR',  Messages.EMPLOYEEDASHBOARD.KARMASCORE.STARTMONTH );
                             }

                         } else {
                             picker.setValue(rangePanel.viewModel.get('fromDateValue'));
                             Ext.Msg.alert('ERROR',  Messages.EMPLOYEEDASHBOARD.KARMASCORE.STARTYEAR );
                         }
                     } else {
                         if (!Ext.isEmpty(rangePanel)) {
                             rangePanel.viewModel.set('fromDate', stringDateValue);
                             rangePanel.viewModel.set('fromDateValue', date);

                         }
                     }
                 }
             }
         }, {
             xtype: 'datepicker',
             padding: '0 5 0 10',
             margin: 2,
             //cls: 'ddo-create-datepicker',
             width: '270px',
             cls: 'ddo-daterange-datepicker',
             reference: 'enddate',
             // minDate: new Date(),
             maxDate:new Date(),
             handler: function(picker, date) {
                 if (date) {
                     var notesview = Ext.ComponentQuery.query('notesview')[0];
                     if (notesview) {
                         notesview.getViewModel().set('toDate', date);
                     }
                     var stringDateValue = Ext.Date.format(date, 'd-m-Y');
                     var rangePanel = this.up('panel'),
                         startDateValue = rangePanel.viewModel.get('fromDateValue');

                     if (startDateValue) {
                         var endMonth = parseInt(Ext.Date.format(date, 'm')),
                             endYear = parseInt(Ext.Date.format(date, 'Y')),
                             endDate = parseInt(Ext.Date.format(date, 'd')),
                             startMonth = parseInt(Ext.Date.format(startDateValue, 'm')),
                             startYear = parseInt(Ext.Date.format(startDateValue, 'Y')),
                             startDate = parseInt(Ext.Date.format(startDateValue, 'd'));
                         if (startYear < endYear) {
                             if (!Ext.isEmpty(rangePanel)) {
                                 rangePanel.viewModel.set('toDate', stringDateValue);
                                 rangePanel.viewModel.set('toDateValue', date);
                                 rangePanel.viewModel.set('btnBind', false);
                             }
                         } else if (startYear === endYear) {
                             if (startMonth < endMonth) {
                                 if (!Ext.isEmpty(rangePanel)) {
                                     rangePanel.viewModel.set('toDate', stringDateValue);
                                     rangePanel.viewModel.set('toDateValue', date);
                                     rangePanel.viewModel.set('btnBind', false);
                                 }

                             } else if (startMonth === endMonth) {
                                 if (startDate <= endDate) {
                                     if (!Ext.isEmpty(rangePanel)) {
                                         rangePanel.viewModel.set('toDate', stringDateValue);
                                         rangePanel.viewModel.set('toDateValue', date);
                                         rangePanel.viewModel.set('btnBind', false);
                                     }

                                 } else {
                                     picker.setValue(rangePanel.viewModel.get('toDateValue'));
                                     Ext.Msg.alert('ERROR', Messages.EMPLOYEEDASHBOARD.KARMASCORE.ENDDATE);
                                 }
                             } else {
                                 picker.setValue(rangePanel.viewModel.get('toDateValue'));
                                 Ext.Msg.alert('ERROR', Messages.EMPLOYEEDASHBOARD.KARMASCORE.ENDMONTH);
                             }

                         } else {
                             picker.setValue(rangePanel.viewModel.get('toDateValue'));
                             Ext.Msg.alert('ERROR', Messages.EMPLOYEEDASHBOARD.KARMASCORE.ENDYEAR);
                         }
                     } else {
                         if (!Ext.isEmpty(rangePanel)) {
                             rangePanel.viewModel.set('toDate', stringDateValue);
                             rangePanel.viewModel.set('toDateValue', date);
                         }
                     }
                 }
             }
         }]
     }]
 });

 Ext.define('DDO.ux.DateRangeField', {
     extend: 'Ext.form.field.Text',
     alias: 'widget.daterangefield',
     //margin: 10,
      //  width: Constants.ViewportWidth * 0.231,
        //  height: Constants.ViewportHeight * 0.463,
     width: Constants.ViewportWidth * 0.231,
     editable: false,
     disable: true,
     labelSeparator: '',
     labelWidth:Constants.ViewportWidth * 0.06,
     name: 'daterangefield',
     fieldLabel: LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.DTRANGE,
     triggers: {
         foo: {
             cls: 'x-fa fa-calendar',
             name: 'datetrig',
             weight: -2, // negative to place before default triggers
             handler: function(daterangefield, trigger, target) {
                 if (!Ext.ComponentQuery.query('daterangepanel')[0]) {
                     // trigger.hide();
                     var test = Ext.create('DDO.ux.DateRangePanel', {
                         dateRangeField: this
                     });
                     if (this.up('karmascorefilterview')) {
                         target.getXY()[0] = target.getXY()[0] - 450;
                         target.getXY()[1] = target.getXY()[1] - 16;
                         test.showAt(target.getXY());
                         if (!test.hasCls("pointer-cls")) {

                             test.addCls("pointer-cls");
                         }

                     } else {
                         if (test.hasCls("pointer-cls")) {

                             test.removeCls("pointer-cls");
                         }
                         test.showBy(this.triggers.foo.field, 'tl-bl');
                     }

                     var dateValues = this.value.split(' - '),
                         convertFromDate, convertToDate,
                         convertFromDateString, convertToDateString,
                         pickerStartDate, pickerEndDate, initialStartDate, initialEndDate,
                         dateFormatFireFox, convertFromDateFireFox, endDateFrmtFireFox, convertToDateFireFox,
                         strtDateFormatFireFox, endDtFormatFireFox;
                     test.getViewModel().set('fromDate', dateValues[0]);
                     test.getViewModel().set('toDate', dateValues[1]);
                     pickerStartDate = test.down('datepicker[reference=startdate]');
                     pickerStartDtValue = pickerStartDate.value;
                     pickerEndDate = test.down('datepicker[reference=enddate]');
                     pickerEndDtValue = pickerEndDate.value;

                     if (dateValues[0] != "") {
                         convertFromDate = dateValues[0];
                         dateSpiltFormat = convertFromDate.split('-');
                         dateChangedFormat = [dateSpiltFormat[1], dateSpiltFormat[0], dateSpiltFormat[2]].join('-');
                         dateFormatFireFox = [dateSpiltFormat[2], dateSpiltFormat[1], dateSpiltFormat[0]].join('-');

                         convertFromDateFireFox = new Date(dateFormatFireFox);
                         convertFromDateString = new Date(dateChangedFormat);

                         convertToDate = dateValues[1];
                         endDateSpiltFormat = convertToDate.split('-');
                         endDateChangedFormat = [endDateSpiltFormat[1], endDateSpiltFormat[0], endDateSpiltFormat[2]].join('-');
                         endDateFrmtFireFox = [endDateSpiltFormat[2], endDateSpiltFormat[1], endDateSpiltFormat[0]].join('-');

                         convertToDateFireFox = new Date(endDateFrmtFireFox);
                         convertToDateString = new Date(endDateChangedFormat);

                         if (Ext.isFirefox) {
                             pickerStartDate.setValue(convertFromDateFireFox);
                             pickerEndDate.setValue(convertToDateFireFox);

                             test.getViewModel().set('fromDateValue', convertFromDateFireFox);
                             test.getViewModel().set('toDateValue', convertToDateFireFox);
                         } else {
                             pickerStartDate.setValue(convertFromDateString);
                             pickerEndDate.setValue(convertToDateString);

                             test.getViewModel().set('fromDateValue', convertFromDateString);
                             test.getViewModel().set('toDateValue', convertToDateString);
                         }
                     } else {
                         test.getViewModel().set('fromDate', Ext.Date.format(new Date(), 'd-m-Y'));
                         test.getViewModel().set('toDate', Ext.Date.format(new Date(), 'd-m-Y'));

                         initialStartDate = test.getViewModel().get('fromDate');
                         strtDateSpiltFormat = initialStartDate.split('-');
                         strtDateChangedFormat = [strtDateSpiltFormat[1], strtDateSpiltFormat[0], strtDateSpiltFormat[2]].join('-');
                         strtDateFormatFireFox = [strtDateSpiltFormat[2], strtDateSpiltFormat[1], strtDateSpiltFormat[0]].join('-');

                         initialEndDate = test.getViewModel().get('toDate');
                         endDtSpilt = initialStartDate.split('-');
                         endDtChangedFormat = [endDtSpilt[1], endDtSpilt[0], endDtSpilt[2]].join('-');
                         endDtFormatFireFox = [endDtSpilt[2], endDtSpilt[1], endDtSpilt[0]].join('-');

                         if (Ext.isFirefox) {
                             test.getViewModel().set('fromDateValue', new Date(strtDateFormatFireFox));
                             test.getViewModel().set('toDateValue', new Date(endDtFormatFireFox));
                         } else {
                             test.getViewModel().set('fromDateValue', new Date(strtDateChangedFormat));
                             test.getViewModel().set('toDateValue', new Date(endDtChangedFormat));
                         }

                         test.getViewModel().set('btnBind', false);
                     }

                     if (dateValues.length === 2) {
                         test.getViewModel().set('btnBind', false);

                     }
                 }
             }
         }
     },
     initValue: function() {
         var me = this;

         if (me.fromDate && me.toDate) {

             me.value = me.fromDate + ' - ' + me.toDate;
         }
         if ('value' in me) {
             me.suspendCheckChange++;
             me.setValue(me.value);
             me.suspendCheckChange--;
         }

         me.initialValue = me.originalValue = me.lastValue = me.getValue();
     },

     initComponent: function() {
         this.callParent(arguments);
         var me = this;
         Ext.getDoc().on('click', Ext.bind(function(event, target) {

             var target = target || event.target,
                 cls = target.getAttribute('class'),
                 dateRangePanel = Ext.ComponentQuery.query('daterangepanel')[0],
                 window;

             if (dateRangePanel && cls && (cls.indexOf('x-mask') !== -1)) {
                 me.getTriggers().foo.show();
                 dateRangePanel.destroy();
             }
         }, me));
     },
     destroy: function() {
         var me = this;
         Ext.getDoc().un('click', Ext.bind(function(event, target) {
             var target = target || event.target,
                 cls = target.getAttribute('class'),
                 dateRangePanel = Ext.ComponentQuery.query('daterangepanel')[0],
                 window;
             if (dateRangePanel && cls && (cls.indexOf('x-mask') !== -1)) {
                 me.getTriggers().foo.show();
                 dateRangePanel.destroy();
             }
         }, me));
     }
 });