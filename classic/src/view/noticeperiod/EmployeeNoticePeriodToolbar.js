/**
 * The file EmployeeNoticePeriodToolbar is the view which contains the back button which jumps directly 
 * to the home page of the notice period.
 * @extends {Ext.container.Container}.
 * @alias widget.employeenoticeperiodtoolbar.
 */
Ext.define('DDO.view.noticeperiod.EmployeeNoticePeriodToolbar', {
  extend: 'Ext.container.Container',
  xtype: 'employeenoticeperiodtoolbar',
  padding: '0 0 0 12',
  width: '100%',
  items: [{
    xtype: 'button',
    scale: 'large',
    iconCls: 'goalsbackbtn-cls',
    cls: 'back-btn-cls',
    tooltip: LabelsTitles.EMPLOYEEDASHBOARD.NOTICE.BACK,
    reference: 'noticebackbtncls',
    handler: 'onBackButtonClickView'
  }]

});