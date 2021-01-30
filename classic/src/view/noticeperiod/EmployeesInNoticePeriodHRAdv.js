/**
 * The file EmployeesInNoticePeriodHRAdv is the view file for final hr in progress bar.
 * @extends {Ext.form.Panel}.
 * @alias 'widget.employeesinnoticeperiodhradv'
 */
Ext.define('DDO.view.noticeperiod.EmployeesInNoticePeriodHRAdv', {
  extend: 'Ext.form.Panel',
  xtype: 'employeesinnoticeperiodhradv',
  reference : 'employeesinnoticeperiodhradv',
  alias: 'widget.employeesinnoticeperiodhradv',
  padding: '10 0 10 0',
  scrollable: true,
  width: '100%',
  height: Constants.ViewportHeight * 0.68,
  cls: 'noticeform-cls',
  defaults: {
    padding: '30 0 0 250'
  },
  items: [
//     {
//     xtype: 'combo',
//     name: 'empstatus',
//     emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.STATUS,
//     fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.STATUS,
//     afterLabelTextTpl: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MANDATORYFIELD,
//     allowBlank: false,
//     editable: false,
//     forceSelection: true,
//     store: 'setup.employeesetup.StatusStore',
//     width: '40%',
//     cls: 'noticestatusfield-cls',
//     valueField: 'name',
//     displayField: 'name',
//     listConfig: {
//         cls: 'ddo-theme-dropdown-combo'
//     },
    
// },
    {
      xtype: 'datefield',
      fieldLabel: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.ACTUALDATE,
      labelAlign: 'left',
      submitFormat: 'd-m-Y',
      format: 'd-m-Y',
      name: 'actual_date',
      maskRe: /[0-9\-\/]/,
      cls: 'noticedatefield-cls',
      allowBlank: false,
      //minValue: new Date(),
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
          keyNavConfig: {
            esc: function() {

              me.collapse();
            }
          }
        });
      }
    },
    {
      xtype: 'textarea',
      refernce: 'finalremarks',
      name: 'final_remarks',
      allowBlank:false,
      fieldLabel: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.FINALREMARKS,
      cls: 'noticetextfieldhr-cls',
      labelAlign: 'left',
      bind: {
        value: '{finalRemarkFieldValue}'
      }
    }
  ],
  listeners: {
    validitychange: 'onFormValid'
  }
});

