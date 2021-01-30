 /**
 * This view is responsible for displaying progress view with the details of karma score.
 * @class 'DDO.view.progressbar.ProgressView'
 * @extends 'Ext.container.Container'
 * @alias 'progressview'
 * @ViewModel 'DDO.view.progressbar.ProgressViewModel'
 */
Ext.define('DDO.view.progressbar.ProgressView', {
  extend: 'Ext.container.Container',
  alias: 'widget.progressview',
  requires: ['DDO.view.progressbar.ProgressViewModel'],
  viewModel: {
    type: 'progressviewmodel'
  },
  items: [{
    layout: 'column',
    items: [{
      xtype: 'displayfield',
      bind: {
        value: '{name}'
      },
      columnWidth: 0.6
    }, {
      cls: 'karmapotentialwidget',
      xtype: 'displayfield',
      bind: {
        value: '{actual}/{potential}'
      },
      columnWidth: 0.4
    }]
  }, {
    xtype: 'progress',
    cls: 'karmaprogressbar',
    bind: {
      value: '{xy}'
    }
  }],
  updateData: function (record) {
    this.getViewModel().setData(record.getData());
  }
});