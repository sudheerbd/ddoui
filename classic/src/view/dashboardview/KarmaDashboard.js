/**
 * This view is responsible for display karma score details for logged in user.
 * @class DDO.view.dashboardview.KarmaScoreDashboardView,
 * @extends Ext.tab.Panel
 * @alias karmadashboardview
 * @viewModel : 'DDO.view.dashboardview.KarmaScoreDashboardViewModel'
 * @controller : 'DDO.view.dashboardview.KarmaScoreDashboardController'
 */
Ext.define("DDO.view.dashboardview.KarmaDashboard", {
  extend: "Ext.tab.Panel",
  xtype: "karmadashboardview",
  requires: [
    "DDO.view.dashboardview.KarmaScoreDashboardViewModel",
    "DDO.view.dashboardview.KarmaScoreDashboardController",
    "DDO.view.dashboardview.KarmaScoreDashboardAccept",
    "DDO.view.dashboardview.KarmaScoreDashboardPending",
    "DDO.view.dashboardview.KarmaScoreDashboardReject"
  ],
  viewModel: {
    type: "karmascoredashboardviewmodel",
  },
  listeners: {
    tabchange: 'onTabChange'
  },
  controller: "karmascoredashboardcontroller",
  cls: 'tab-panel-karma-dash-cls',
  overItemCls: 'over',
  margin : '5px 5px 0px 10px',
  items: [
    {
      xtype: "karmascoredashboardaccept",
      title: LabelsTitles.KARMADASHBOARDSCORE.ACCEPTED,
      id: "accept"
    },
 
    {
      xtype: "karmascoredashboardpending",
      title: LabelsTitles.KARMADASHBOARDSCORE.PENDING,
      // id: "pending"
      // handler: {
      //   listeners :{
      //   click: function(){
      //     debugger;
      //     console.log("&&&&&&&&&&&&&&&7");
      //   }
      // }
      // }
    },
 
    {
      xtype: "karmascoredashboardreject",
      title: LabelsTitles.KARMADASHBOARDSCORE.REJECTED,
      id: "reject"
    },
  ],
});
