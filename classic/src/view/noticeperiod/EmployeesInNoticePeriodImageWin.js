/**
 * The file EmployeesInNoticePeriodImageWin is the view file for the image window by clicking on the eye icon.
 */
Ext.define('DDO.view.noticeperiod.EmployeesInNoticePeriodImageWin', {
  extend: 'Ext.window.Window',
  alias: 'widget.employeesinnoticeperiodimagewin',
  width: Constants.ViewportWidth * 0.438,
  height: Constants.ViewportHeight * 0.93,
  scrollable: true,
  title: 'Document',
  modal: true,
  items: [{
    xtype: 'employeesinnoticeperiodimage'
  }],
  listeners: {
    focusleave: function(cmp) {
      cmp.close();
    }
  },

});