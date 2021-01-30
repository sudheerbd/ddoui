Ext.define("DDO.view.dashboardview.KarmaScoreDashboardReject", {
  extend: "Ext.grid.Panel",
  xtype: "karmascoredashboardreject",
  cls: "karmadashboard-cls",
  plugins: [
    "gridfilters",
    {
      ptype: "gridexporter",
      pluginId: "exporter",
    },
  ],
  listeners:{
    beforeRender: 'onBeforeRejectRenderer'
  },
  // listeners: {
  //   onPanelSelect: 'storeDashboardGridRejected'
  // },
  viewConfig: {
    loadMask: true,
  },
  bind: {
    store: "{karmaDashboardreject}",
  },
  height: Constants.ViewportHeight * 0.78,
  
  columns: [
    {
      text: LabelsTitles.KARMADASHBOARDSCORE.KARMACATEGORY,
      dataIndex: "karmacategory_name",
      flex: 0.3,
      align: 'center',
    },
    {
      text: LabelsTitles.KARMADASHBOARDSCORE.KARMANAME,
      dataIndex: "karma_name",
      flex: 0.3,
      align: 'center',
    },
    {
      // xtype: "checkcolumn",
      text: LabelsTitles.KARMADASHBOARDSCORE.MONTH,
      flex: 0.3,
      dataIndex: "nominate_month",
      align: "center",
    },
    {
      text: 'Karma Units',
      flex: 0.3,
      dataIndex: "actual_karma",
      align: "center",
    },{
      text: 'Derived Points',
      flex: 0.3,
      dataIndex: "actualderivedpoints",
      align: "center",
    },{
      text: 'Altered Derived Points',
      flex: 0.3,
      dataIndex: "altereddeviredpoints",
      align: "center",
    },
    {
      text: 'Alterd karma Units',
      flex: 0.3,
      dataIndex: "alteredpoints",
      align: 'center',
    },
    {
      text: LabelsTitles.KARMADASHBOARDSCORE.REASON,
      flex: 0.3,
      dataIndex: "reject_message",
  
    },
    {
      xtype: "actioncolumn",
      flex: 0.3,
      header: LabelsTitles.KARMADASHBOARDSCORE.ACTIONS,
      reference: "Action",
      align: "center",
      items: [
        {
         
          iconCls: "x-fa fa-check",
          handler: "onRejectAcceptClick",
          header: "hidden",
          cls: 'btn-icon-cls'
        },
        {
          xtype: 'tbspacer'
        },
        {
   
          iconCls: "x-fa fa-arrow-right",
          handler: "OnIconActionClick",
          header: "hidden",
          cls: 'btn-icon-clss'
        },
      ],
    },
  ],
});
