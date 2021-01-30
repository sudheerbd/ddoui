/**
 *   This file  is responsible for ProgressGridView.
 *   @extends {Ext.container.Container}
 *   @alias widget.progressgridview
 */
Ext.define('DDO.view.progressbar.ProgressGridView', {
  extend: 'Ext.container.Container',
  alias: 'widget.progressgridview',
  requires: [ 'DDO.view.progressbar.ProgressbarProfileView',
              'DDO.view.progressbar.CircularProgressView'
            ],
  width: '100%',
  margin: '20 0 20 0',
  items: [{
    items: [{
      xtype: 'toolbar',
      items: [
        {
          xtype: 'container',
          cls: 'karmascore-title',
          html: LabelsTitles.EMPLOYEEDASHBOARD.GROUPS.YOURSCORE,
        }, {
          xtype: 'tbfill'
        }
      ],
      cls: 'score-title score-process-grid'
    }]
  }, {
    xtype: 'circularprogressview'
  }, {
    xtype: 'container',
    cls: 'label-hr label-hr-your-score',
    items: [{
      xtype: 'label',
      html: '<hr>'
    }]
  }, {
    xtype: 'progressbarprofileview'
  }]
});