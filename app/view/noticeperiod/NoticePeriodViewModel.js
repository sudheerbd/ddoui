/**
 * The file NoticePeriodViewModel is the view model for 'DDO.view.noticeperiod.EmployeeNoticePeriodProgressbar'.
 * @extends {Ext.app.ViewModel}.
 * @alias viewmodel.noticeperiodviewmodel.
 */
Ext.define('DDO.view.noticeperiod.NoticePeriodViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.noticeperiodviewmodel',
  requires: [
    'DDO.model.noticeperiod.NoticeperiodModel'
  ],

  data: {
    activeItemIndex: 'with_hr'
  },
  stores : {
    progressbarstore : {
      autoLoad: true,

      model: 'DDO.model.noticeperiod.NoticeperiodModel',
    
      proxy: {
        type: 'ajax',
        url: 'resources/data/noticeperiod/noticeperiodprogressbar.json',
        reader: {
          type: 'json',
          rootProperty: "data"
        }
      }
    }
  }
});
