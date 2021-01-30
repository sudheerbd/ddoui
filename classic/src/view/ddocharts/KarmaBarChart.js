Ext.define('DDO.view.ddocharts.KarmaBarChart', {
    extend: 'Ext.container.Container',

    alias: 'widget.karmabarchart',

    requires: [
        
        'Ext.chart.series.Series',
        'Ext.chart.series.Polar',
        'Ext.chart.series.Bar3D', 
        'Ext.chart.series.Cartesian',     
        'Ext.chart.interactions.Rotate',
        'Ext.chart.plugin.ItemEvents'
    ],
    items:[{
        xtype:'cartesian',
        width: 700,
        height: 500,
        padding:'20 10 20 20',
        innerPadding: '0 10 0 10',
        colors:['orange'],
        title:'Month Wise Karma Score',
        cls:'chart-title',
        store: {
          type:'karmabarstore'
     },
     
     axes: [{
         type: 'numeric',
         position: 'left',
         title: {
             text: 'KarmaScore',
             fontSize: 15
         },
         fields: 'count'
     }, {
         type: 'category',
         position: 'bottom',
         title: {
             text: 'Months',
             fontSize: 15
         },
         fields: 'month'
     }],
     series: {
         type: 'bar3d',
        
         xField: 'month',
         yField: 'count',
         tooltip: {
                    trackMouse: true,
                    renderer: 'onKarmaBarTooltipRender'
                },
                label: {
            display: 'outside',
            field: 'count',
            orientation:'horizontal',
            strokeStyle: 'green',
            fontFamily: 'sans-serif',
            fontSize:'15px'
        }
     },
      plugins: {
        ptype: 'chartitemevents',
        moveEvents: true
    },
    listeners: {
                itemclick: 'onBarItemClick'
            }
    }]
});