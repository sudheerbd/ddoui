/**
* This page contains Self Nominate button view
* View : 'DDO.view.nominate.selfnomination.SelfNominateWindow' is the parent file
* ViewModel :  DDO.view.profile.nominateview.NominateViewFormModel
* ViewController : DDO.view.karmascore.nominate.SelfNominateWindowController
*/

Ext.define('DDO.view.nominate.selfnomination.SelfNominationPage', {
  extend: 'Ext.panel.Panel',
  xtype: 'selfnominationpage',
  requires: [
    'DDO.view.nominate.selfnomination.SelfNominateViewForm',
    'DDO.view.nominate.selfnomination.SelfNominateViewGrid'
  ],
  maxHeight: Constants.ViewportHeight * 0.83,
  height : 400,
  // scrollable: true,
  items: [{
    xtype: 'selfnominateviewform'
  }, {
    xtype: 'selfnominateviewgrid',
    bind: {
      store: '{SelfNominateGridStore}',
    }
  }]
});