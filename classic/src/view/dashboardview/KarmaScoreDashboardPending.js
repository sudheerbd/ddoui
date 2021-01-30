Ext.define("DDO.view.dashboardview.KarmaScoreDashboardPending", {
  extend: "Ext.grid.Panel",
  xtype: "karmascoredashboardpending",
  cls: "karmadashboard-cls",
  overItemCls: "over",
  bind: {
    store: "{karmaDashboardpending}",
  },
  plugins: [
    "gridfilters",
    {
      ptype: "gridexporter",
      pluginId: "exporter",
    },
  ],
  listeners:{
    beforeRender: 'onBeforePendingRenderer'
  },
  viewConfig: {
    loadMask: false,
  },
  height: Constants.ViewportHeight * 0.78,

  columns: [
    {
      text: LabelsTitles.KARMADASHBOARDSCORE.KARMACATEGORY,
      dataIndex: "karmacategory_name",
      flex: 1,
      align: 'center',
    },
    {
      text: LabelsTitles.KARMADASHBOARDSCORE.KARMANAME,
      dataIndex: "karma_name",
      flex: 1,
      align: 'center',
    },
    {
     
      text: LabelsTitles.KARMADASHBOARDSCORE.MONTH,
      flex: 1,
      dataIndex: "nominate_month",
      align: 'center',
    },
    // {
    //   text: LabelsTitles.KARMADASHBOARDSCORE.POINT,
    //   flex: 1,
    //   dataIndex: "expected_per_month",
    //   align: 'center',
    // },
    {
      text: 'Karma Units',
      flex: 1,
      dataIndex: "actual_karma",
      align: 'center',
    },{
      text: 'Derived Karma Points',
      flex: 1,
      dataIndex: "actualderivedpoints",
      align: 'center',
    },{
      text:'Hr Review',
      flex:1,
      align:'center',
      dataIndex:'hr_approved',
      renderer:function(value){
        if(value == 'Y'){
          return 'Done'
        }else{
          return 'Pending'
        }
      }
    },{
      text:'Finance Review',
      flex:1,
      align:'center',
      dataIndex:'finance_approved',
      renderer:function(value){
        if(value == 'Y'){
          return 'Done'
        }else{
          return 'Pending'
        }
      }
    }
  ],
});
