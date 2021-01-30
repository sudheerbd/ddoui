/**
 * The file EmployeesInNoticePeriodProject is the view file for projects view in the progress bar.
 * @extends {Ext.grid.Panel}.
 * @alias widget.employeesinnoticeperiodproject.
 */
Ext.define('DDO.view.noticeperiod.EmployeesInNoticePeriodProject', {
  extend: 'Ext.grid.Panel',
  xtype: 'employeesinnoticeperiodproject',
  padding: '10 0 10 0',
  scrollable: true,
  width: '100%',
  height: Constants.ViewportHeight * 0.68,
  cls: 'noticeprojectgrid-cls',
  bind: {
    store: '{employeesinnoticeperiodprojectstore}'
  },
  columns: [                                        
    {
      text:LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.EMPLOYEE,
      flex: 1,
      height: 40,
      dataIndex: 'empfullname'
    },
    {
      text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.PROJECT,
      flex: 1,
      height: 40,
      dataIndex: 'projectname'
    },
    {
      text:  LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.STARTDATE,
      flex: 1,
      height: 40,
      dataIndex: 'startdate',
      menuDisabled: true,
      field: {
        xtype: 'datefield',
        autoSync: true,
        allowBlank: false,
        submitFormat: 'Y-m-d',
        format: 'Y-m-d',
        cls: 'ddo-create-datepicker',
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
        }
      }
    },
    {
      text:  LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.ENDDATE,
      flex: 1,
      height: 40,
      dataIndex: 'enddate',
      menuDisabled: true,
      field: {
        xtype: 'datefield',
        autoSync: true,
        reference:'enddatefield',
        allowBlank: false,
        submitFormat: 'Y-m-d',
        format: 'Y-m-d',
        cls: 'ddo-create-datepicker',
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
        }
      }
    },{

      text:'Proposed Relieving Date',
      flex: 1,
      height: 40,
      dataIndex: 'proposeddate'
  },
    {
      xtype: 'actioncolumn',
      flex: 1,
      text:  LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.ACTION,
      items: [{
        iconCls: 'x-fa fa-edit',
        text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.EDIT,
        align: 'center',
        handler: 'onActionWindowView',
      }],
    }
  ],
});
