/**
 * This is ViewModel for view 'DDO.view.progressbar.ProgressbarProfileView'.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.progressgridviewmodel'
 */
Ext.define('DDO.view.progressbar.ProgressGridViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.progressgridviewmodel',
  fields: ['name', 'actual', 'potential'],
  stores: {
    data: {
      model: 'Ext.data.Model',
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: 'resources/data/progressbar/ProgressGridView.json',
        reader: {
          rootProperty: 'data',
          type: 'json'
        }
      }
    }
  }
});
