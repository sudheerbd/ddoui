/**
 * The file EmployeesInNoticePeriodHR is the view file for HR card in the progress bar.
 * @extends {Ext.form.Panel}.
 * @alias widget.employeesinnoticeperiodhr.
 */
Ext.define('DDO.view.noticeperiod.EmployeesInNoticePeriodHR', {
  extend: 'Ext.form.Panel',
  xtype: 'employeesinnoticeperiodhr',
  padding: '10 0 10 0',
  scrollable: true,
  width: '100%',
  height: Constants.ViewportHeight * 0.68,
  cls: 'noticeform-cls',
  defaults: {
    padding: '30 0 0 250'
  },                                                              
  items: [{
    xtype: 'datefield',
    fieldLabel:  LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.PROPOSEDDATE,
    labelAlign: 'left',
    submitFormat: 'd-m-Y',
    reference: 'startdate',
    format: 'd-m-Y',
    maskRe: /[0-9\-\/]/,
    cls: 'noticedatefield-cls',
    allowBlank: false,
    name: 'proposeddate',
    createPicker: function() {
      var me = this,
        format = Ext.String.format;
      return Ext.create('Ext.picker.Date', {
        pickerField: me,
        ownerCt: me.ownerCt,
        renderTo: document.body,
        floating: true,
        hidden: true,
        focusOnShow: true,
        cls: 'ddo-create-datepicker',
        minDate: me.minValue,
        maxDate: me.maxValue,
        disabledDatesRE: me.disabledDatesRE,
        disabledDatesText: me.disabledDatesText,
        disabledDays: me.disabledDays,
        disabledDaysText: me.disabledDaysText,
        format: me.format,
        showToday: me.showToday,
        startDay: me.startDay,
        minText: format(me.minText, me.formatDate(me.minValue)),
        maxText: format(me.maxText, me.formatDate(me.maxValue)),
        listeners: {
          scope: me,
          select: me.onSelect
        },
      });
    },
    listeners: {
      select: 'onKeyDownDate'
    }
  },
    {
      xtype: 'textarea',
      fieldLabel: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.REMARKS,
      name: 'remarks',
      refernce: 'myremarks',
      allowBlank:false,
      bind: {
        value: '{remarkFieldValue}'
      },
      grow: true,
      cls: 'noticetextfield-cls',
      labelAlign: 'left',
    }
  ],
  listeners: {
    validitychange: 'onFormValid'
  }

});
