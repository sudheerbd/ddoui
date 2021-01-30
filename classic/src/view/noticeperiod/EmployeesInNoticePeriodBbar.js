/**
 * The file EmployeesInNoticePeriodBbar is the view file which holds the buttons in the notice period view.
 * @extends {Ext.container.Container}.
 * @alias 'widget.employeesinnoticeperiodbbar'.
 */
Ext.define('DDO.view.noticeperiod.EmployeesInNoticePeriodBbar', {
  extend: 'Ext.container.Container',
  xtype: 'employeesinnoticeperiodbbar',
  items: [
    {
      xtype: 'button',
      text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.BACK,
      formBind: true,
      reference: 'buttonback',
      bind: {
        hidden: '{backButtonUniqueEnable}',
      },
      cls: 'bottombarnxt-cls',
      handler: 'OnBackButtonclick'
    },
    {
      xtype: 'button',
      text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.NEXT,
      formBind: true,
      bind: {
        hidden: '{nextbuttonUniqueEnable}',
        disabled: '{nextbuttonUniqueEnablee}'
      },
      cls: 'bottombarback-cls',
      reference: 'buttonnext',
      handler: 'OnNextButtonclick'
    },
    {
      xtype: 'button',
      text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.REQUEST,
      formBind: true,
      cls: 'bottombarnxt-cls',
      disabled: true,
      reference: 'buttonrequest',
      bind: {
        hidden: '{requestbuttonUniqueEnable}',
        disabled: '{requestbuttonUniqueEnablee}'
      },
      handler: 'onRequestupdateClick'
    },
    {
      xtype: 'button',
      text: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.SUBMIT,
      formBind: true,
      cls: 'bottombarnxt-cls',
      bind: {
        hidden: '{submitButtonUniqueEnable}',
        disabled: '{submitButtonUniqueEnablee}'
      },
      reference: 'buttonsubmit',
      handler: 'onSubmitButtonupdateClick'
    }],
});






