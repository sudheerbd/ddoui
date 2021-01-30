Ext.define("DDO.view.dashboardview.KarmaScoreDashboardAccept", {
  extend: "Ext.grid.Panel",
  xtype: "karmascoredashboardaccept",
  cls: "karmadashboard-cls",
  plugins: [
    "gridfilters",
    {
      ptype: "gridexporter",
      pluginId: "exporter",
    },
  ],
  listeners:{
    beforeRender: 'onBeforeAcceptRenderer'
  },
  bind: {
    store: "{karmaDashboardaccepted}",
  },
  viewConfig: {
    loadMask: false,
  },
  height: Constants.ViewportHeight * 0.78,
  width: "100%",
  features: [
    {
      ftype: "grouping",
      groupHeaderTpl: Ext.create(
        "Ext.XTemplate",
        "{name}",
        '<div class="resource-count"><span>Score:   {[this.getPeriod(values)]}</span> </div>',
        '<div class="resource-count"><span>{[this.getProgress(values)]}</span> </div>',
        '<div class="resource-count"><span>{[this.getPotential(values)]}</span> </div>',
        '<div class ="resource-count"> Count Record: ',
        "<span>{[this.formatName(values)]}</span> </div>",
        {
          formatName: function (values) {
            return values.children.length;
          },
          getPeriod: function (value) {
            var actualSum = 0,
              potentialSum = 0;
            var totalkarma = value.children;
            var viewmodel = Ext.ComponentQuery.query("karmadashboardview")[0].getViewModel();
            viewmodel.set("karmaCategory", value.name);
            var karmaCategory = viewmodel.data.karmaCategory;
            if (value.name == karmaCategory) {
              for (var i = 0; i < totalkarma.length; i++) {
                actualSum =  actualSum + parseInt(totalkarma[i].data.actual_karma);
                potentialSum = potentialSum +  parseInt(totalkarma[i].data.expected_per_month);
              }
            
              if (value.name == "Feedback") {
                return actualSum + "/" + 0;
              } else {
                return actualSum + "/" + potentialSum;
              }
            }
          },
        }
      ),
      enableGroupingMenu: false,
    },
  ],

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
      text: LabelsTitles.KARMADASHBOARDSCORE.MONTH,
      dataIndex: "nominate_month",
      flex: 0.3,
      align: 'center',
    },
    {
      text: 'Potential Points',
      flex: 0.3,
      dataIndex: "expected_per_month",
      align: 'center',
    },
    {
      text: LabelsTitles.KARMADASHBOARDSCORE.ACTUALPOINT,
      flex: 0.3,
      dataIndex: "actual_karma",
      align: 'center',
    },
  ],
});
