/**
 * The file EmployeeNoticePeriodProgressbar is the progress view of the notice period.
 * @extends {Ext.view.View}.
 * @alias widget.employeenoticeperiodprogressbar.
 */
Ext.define('DDO.view.noticeperiod.EmployeeNoticePeriodProgressbar', {
  extend: 'Ext.view.View',
  xtype: 'employeenoticeperiodprogressbar',
  requires: [
    'DDO.view.noticeperiod.NoticePeriodViewModel'
  ],
  loadMask: false,
  padding: '20 0 20 250',
  viewModel: {
    type: 'noticeperiodviewmodel'
  },
  padding: '10 0 0 250',
  width: '100%',
  bind : {
   store : '{progressbarstore}'
  },
  initComponent: function() {
    this.callParent(arguments);
    var vm = this.getViewModel();
    var store = vm.getStore('progressbarstore');
    if (!store.isLoaded()) {
      Utility.onStoreLoading(store);
    }
  },

  tpl: [
    '<tpl for=".">',
    '<div class="karmasetup-progressbar-cls {[this.getClsName(values)]}">',
    '<div class="progressbar-cls">',
    '<div class="progressbar-outer">',
    '<div class="progressbar-view-title active-view-title {view_title_cls}">{view_title}</div>',
    '<div class="progressbar-inner"></div></div>',
    '</div>',
    '</div>',
    '</tpl>',
    {
      getClsName: function(values) {
        var value_array = ['with_hr', 'with_project', 'with_asset', 'final_hr'];
        var noticeperiodbar = Ext.ComponentQuery.query('employeenoticeperiodprogressbar')[0],
          activeItemIndex = noticeperiodbar.getViewModel().getData().activeItemIndex;
        if (activeItemIndex == value_array[0]) {
          var activeCls = (values.view_value == activeItemIndex) ? "active-cls" : "not-completed-cls";
          return activeCls;
        }
        if (activeItemIndex == value_array[1]) {
          if (values.view_value == activeItemIndex) {
            return "active-cls";
          } else if (values.view_value == value_array[0]) {
            return "completed-cls"
          } else {
            return "not-completed-cls"
          }
        }
        if (activeItemIndex == value_array[2]) {
          if (values.view_value == activeItemIndex) {
            return "active-cls";
          } else if (values.view_value == value_array[3]) {
            return "not-completed-cls"
          } else {
            return "completed-cls"
          }
        }
        if (activeItemIndex == value_array[3]) {
          var activeCls = (values.view_value == activeItemIndex) ? "active-cls" : "completed-cls";
          return activeCls;
        }
      }
    }
  ],
  itemSelector: 'div.karmasetup-progressbar-cls',
});