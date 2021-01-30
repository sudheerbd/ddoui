
// /**
//  * This view is responsible for display karma score details for logged in user.
//  * @class DDO.view.dashboardview.KarmaScoreDashboardGrid,
//  * @extends Ext.panel.Panel
//  * @alias karmascoredashboardgrid
//  * @viewModel : 'DDO.view.dashboardview.KarmaScoreDashboardViewModel'
//  * @controller : 'DDO.view.dashboardview.KarmaScoreDashboardController'
//  */
// Ext.define('DDO.view.dashboardview.KarmaScoreDashboardGrid', {
//   extend: 'Ext.grid.Panel',
//   xtype: 'karmascoredashboardgrid',
//   cls: 'mainviewdashboard',
//   bind: {
//     store: '{karmaDashboard}'
//   },
//   overItemCls: 'over',
//   plugins: [
//     'gridfilters', {
//       ptype: 'gridexporter',
//       pluginId: 'exporter'
//     }
//   ],
//   listeners: {
//     render: 'scoreDashboardGridRender'
//   },
//   features: [{
//     ftype: 'grouping',
//     groupHeaderTpl: Ext.create('Ext.XTemplate',
//       '{name}',
//       '<div class="resource-count"><span>Score:   {[this.getPeriod(values)]}</span> </div>',
//       '<div class="resource-count"><span>{[this.getProgress(values)]}</span> </div>',
//       '<div class="resource-count"><span>{[this.getPotential(values)]}</span> </div>',
//       '<div class ="resource-count"> Count Record: ',
//       '<span>{[this.formatName(values)]}</span> </div>',
//       {
//         formatName: function(values) {
//           return values.children.length;
//         },
//         getPeriod: function(value) {
//           var actualSum = 0,
//               potentialSum = 0;
//           var totalkarma = value.children;
//           var viewmodel = Ext.ComponentQuery.query('karmadashboardview')[0].getViewModel();
//           viewmodel.set("karmaCategory", value.name);
//           var karmaCategory = viewmodel.data.karmaCategory;
//           if (value.name == karmaCategory) {
//             for (var i = 0; i < totalkarma.length; i++) {
//               actualSum = actualSum + parseInt(totalkarma[i].data.actual_per_month);
//               potentialSum = potentialSum + parseInt(totalkarma[i].data.expected_per_month)
//             }
//             if (value.name == 'Feedback') {
//               return actualSum + '/' + 0;
//             } else {
//               return actualSum + '/' + potentialSum;
//             }
//           }
//         },

//       }
//     ),
//     enableGroupingMenu: false
//   }],
//   defaults: {
//     margin: '5 10 10 0'
//   },
//   columns: [
//     {
//       text: LabelsTitles.KARMADASHBOARDSCORE.CATEGORY,
//       dataIndex: 'karma_name',
//       flex: 0.5,
//     },
//     {
//       text: LabelsTitles.KARMADASHBOARDSCORE.PERIOD,
//       tooltip: LabelsTitles.KARMADASHBOARDSCORE.PERIOD,
//       dataIndex: 'ddo_nomination_date',
//       flex: 0.5
//     },
//     {
//       text: LabelsTitles.KARMADASHBOARDSCORE.POTENTIALMONTH,
//       tooltip: LabelsTitles.KARMADASHBOARDSCORE.POTENTIALMONTH,
//       dataIndex: 'expected_per_month',
//       flex: 0.5
//     },
//     {
//       text: LabelsTitles.KARMADASHBOARDSCORE.ACTUALMONTH,
//       tooltip: LabelsTitles.KARMADASHBOARDSCORE.AMTOOLTIP,
//       dataIndex: 'actual_per_month',
//       flex: 0.5
//     },

//     {
//       text: LabelsTitles.KARMADASHBOARDSCORE.APPROVEDBY,
//       tooltip: LabelsTitles.KARMADASHBOARDSCORE.APPROVEDBY,
//       dataIndex: 'byto',
//       flex: 0.5
//     },

//   ]
// });
