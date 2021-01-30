/**
 * This is ViewModel for view 'DDO.view.progressbar.ProgressView'.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.progressviewmodel'
 */
Ext.define('DDO.view.progressbar.ProgressViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.progressviewmodel',
    data: {
        name: '',
        progress: 0,
        actual: 0,
        potential: 0
      },
      formulas: {
        xy: function(get) {
          return get('actual') / get('potential');
        }
      }
});