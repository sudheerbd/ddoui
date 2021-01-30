/**
 * The file EmployeesInNoticePeriodWindowAdd is the view file for the window view of the employees in notice period which contains update button.
 * @extends {Ext.window.Window}.
 * @alias 'widget.employeesinnoticeperiodwindowadd'.
 */
Ext.define('DDO.view.noticeperiod.EmployeesInNoticePeriodWindowAdd', {
  extend: 'Ext.window.Window',
  xtype: 'employeesinnoticeperiodwindowadd',
  closable: true,
  items: [{
    xtype: 'form',
    items: [{
      xtype: 'container',
      width: '400px',
      padding: '20 0 0 0',
      defaults: {
        width: '250px',
        margin: '0 0 0 60',
      },                                        
      items: [
        {
          xtype: 'textfield',
          fieldLabel: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.NAME,
          labelAlign: 'top',
          emptyText: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.NAME,
          disabled: true,
          cls: 'employeecombo-cls',
          reference: 'Name',
          allowBlank: false,
          name: 'empfullname'

        },
        {
          xtype: 'textfield',
          fieldLabel: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.PROJCT,
          labelAlign: 'top',
          disabled: true,
          emptyText: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.PROJCT,
          cls: 'employeecombo-cls',
          reference: 'Project',
          allowBlank: false,
          name: 'projectname'

        },
        {
          xtype: 'datefield',
          fieldLabel:LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.STARTDATE,
          labelAlign: 'top',
          emptyText: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.STARTDATE,
          reference: 'StartDate',
          submitFormat: 'Y-m-d',
          format: 'Y-m-d',
          maskRe: /[0-9\-\/]/,
          cls: 'startdate-cls',
          allowBlank: false,
          name: 'startdate',
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
          xtype: 'datefield',
          fieldLabel: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.ENDDATE,
          labelAlign: 'top',
          emptyText:LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.ENDDATE,
          maxValue: new Date(),
          reference: 'enddate',
          name: 'enddate',
          submitFormat: 'Y-m-d',
          format: 'Y-m-d',
          maskRe: /[0-9\-\/]/,
          cls: 'startdate-cls',
          allowBlank: false,
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
          },

        }]
    }],
    buttons: [
      {
        text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.UPDATE,
        formBind: true,
        handler: 'onUpdateNoticeButtonClick',
      }]
  }],
  listeners: {
    close: 'onClickClosebtn'
  }
});