 /**
 * This view is responsible for displaying progress bar with the details of karma  score.
 * @class 'DDO.view.progressbar.ProgressbarProfileView'
 * @extends 'Ext.grid.Panel'
 * @alias 'progressbarprofileview'
 * @ViewModel 'DDO.view.progressbar.ProgressGridViewModel'
 */
Ext.define('DDO.view.progressbar.ProgressbarProfileView', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.progressbarprofileview',
  requires: ['DDO.view.progressbar.ProgressView',
    'DDO.view.progressbar.ProgressGridViewModel',
    'DDO.store.progressbar.ProgressbarStore'],
  
  initComponent: function () {
    this.callParent(arguments);
    var progressbarStore = Ext.getStore('progressbar.ProgressbarStore');
    Utility.addProgressbar(progressbarStore, this);    
  },
  hideHeaders: true,
  cls: 'progress-gridview scoreView-cls',
  rowLines: false,
  height: Constants.ViewportHeight * 0.39,
  store : 'progressbar.ProgressbarStore',
  columns: [{
      xtype: 'widgetcolumn',
      flex: 1,
      widget: {
        xtype: 'progressview',
        listeners: {
          afterrender: function (value) {
            var theElem = value.getEl(),
            categories = this.getViewModel().data.name;
            var theTip = Ext.create('Ext.tip.Tip', {
              html : categories,
              margin: '50 0 0 20',
              shadow : false
            });
            value.getEl().on('mouseover', function () {
              if(categories.length > 19){
              theTip.showAt(theElem.getX(), theElem.getY());
              }
            });
  
            value.getEl().on('mouseleave', function () {
              theTip.hide();
            });
          }
        }
      },
      onWidgetAttach: function(column, widget, record) {
        widget.updateData(record);
      }
    }
  ]
});