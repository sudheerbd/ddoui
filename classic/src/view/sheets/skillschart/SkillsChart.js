// /**
//  * This class is specified in Main.js from classic toolkit
//  * 
//  * @class Ext.chart.CartesianChart
//  * Represents a chart that uses cartesian coordinates.
//  *
//  * @class Ext.chart.series.Bar3D
//  * Creates a 3D Bar or 3D Column Chart
//  *
//  * @class Ext.chart.interactions.ItemHighlight
//  * The 'itemhighlight' interaction allows the user to highlight series items in the chart.
//  *
//  * @class Ext.chart.axis.Category
//  * A type of axis that displays items in categories.
//  *
//  * @class Ext.chart.axis.Numeric
//  * An axis to handle numeric values. 
//  *
//  * This class uses bar 3D chart and data on xField and yField are Skill names and Total Count of individual skills
//  * On position left indicates Numeric axes and position bottom indicates Category axes
//  */
// Ext.define('DDO.view.dashboard.skillchart.SkillsChart', {
//   extend: 'Ext.chart.CartesianChart',
//   xtype: 'skillschart',

//   requires: [
//     'Ext.chart.series.Line',
//     'Ext.chart.axis.*',
//     'DDO.view.skills.SkillsChartViewController',
//     'DDO.view.skills.SkillsChartViewModel',
//     'DDO.view.dashboard.skillchart.Skillstip',
//     'Ext.chart.interactions.ItemHighlight'
//   ],
//   controller: 'skillschartviewcontroller',
//   viewModel: {
//       type: 'skillschartviewmodel'
//   },
//   /*layout:{
//     type:'fit',
//   },*/
//   height:400,
//   innerPadding:20,
//   axes: [{
//     type: 'numeric',
//     title: {
//       text:'Resource Count',
//       color:'#939393'
//     },
//     position: 'left',
//     fields: 'skillTotalCount',
//     minimum: 0//,
//     //maximum: 18,
//   }, {
//     type: 'category',
//     position: 'bottom',
//     label: {
//       rotate: {
//         degrees: -45
//       },
//       textAlign: 'center',
//       fontSize: 14,
//       fontFamily: 'Arial',
//       color:'#939393'
//     }
//   }],

//   series: [{
//     type: 'line',
//     axis: 'left',
//     bind: {
//         store: '{skillsChartStore}'
//     },
//     xField: 'skillName',
//     yField: 'skillTotalCount',
//     style: {
//       stroke: '#000'
//     },
//     marker: {
//       radius: 4,
//       fill:'#000'
//     },
//     highlight: {
//         fillStyle: '#000',
//         radius: 6,
//         strokeStyle: '#000'
//     },
//     tooltip: {
//       xtype: 'skillstip',
//       cls: 'skillstip-cls',
//       renderer: 'onSkillsTooltipRender'
//     }

//   }]
// });