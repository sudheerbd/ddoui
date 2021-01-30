/**
 *   This file  is responsible for CircularProgressView.
 *   @extends {Ext.container.Container}
 *   @alias widget.circularprogressview
 *   ViewModel: 'DDO.view.progressbar.CircularViewModel'.
 */
Ext.define('DDO.view.progressbar.CircularProgressView', {
  extend: 'Ext.container.Container',
  alias: 'widget.circularprogressview',
  requires: ['DDO.view.progressbar.CircularViewModel',
              'DDO.ux.progressbar.CircularProgressBar'],
  viewModel: {
    type: 'circularviewmodel'
  },
  cls: 'circularprgressview',
  initComponent: function () {
    this.callParent(arguments);
    var progressbarStore = Ext.getStore('progressbar.ProgressbarStore');
    Utility.addCircularbar(progressbarStore, this);    
  },
  items: [ {
    layout: 'hbox',
    items: [{
      xtype: 'circularprogressbar',
      bind: {
        value: '{circularbar}',
        profileImg: '{user_profile_pic_url}'
      },
      spacing: 20,
      color: 'green',
      borderWidth: 9,
      animationTime: 10,
      textColor: '#F86B60',
      pendingColor: 'lightgray',
      margin: '0px 10px'

    }, {
      xtype: 'displayfield',
      cls: 'actualpotentialsize',
      bind: {
        value: '<span > Total Score: </span>&nbsp<b>{totaActualKarma}/{totalPotentialKarma}</b>'
      }
    }]
  }]
});