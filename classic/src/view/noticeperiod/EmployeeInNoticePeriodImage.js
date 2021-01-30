Ext.define('DDO.view.noticeperiod.EmployeesInNoticePeriodImage', {
  extend: 'Ext.container.Container',
  alias: 'widget.employeesinnoticeperiodimage',
  height: 500,
  width: 500,
  initComponent: function() {
   
    var me = this,
      win = me.up('employeesinnoticeperiodimagewin'),
      picPath = win.picturePath;
      me.setViewModel({
        data: {
            picPath: picPath
        }
      });
      me.callParent(arguments);
  },
  cls: 'Empnoticeimage-cls',
  layout: 'fit',
  items: [{
    xtype: 'image',
    reference: 'imageCmp',
    bind: {
      src: '{picPath}'
    }
  }]
});