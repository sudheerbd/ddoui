/**
 * This is ViewModel for view 'DDO.view.progressbar.CircularProgressView'.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.circularviewmodel'
 */
Ext.define('DDO.view.progressbar.CircularViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.circularviewmodel',
  data: {
      name: 'Total karma',
      totaActualKarma : 1318,
      totalPotentialKarma : 2800,
      user_profile_pic_url :'/'+Utility.defaultImg
  },
    formulas: {
      xy: function(get) {
        return get('totaActualKarma') / get('totalPotentialKarma');
      },
      circularbar : function(get){
        return get('xy') * 100;
      }
   }
});