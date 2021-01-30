Ext.define('DDO.view.ddocharts.FeedsPieChart', {
    extend: 'Ext.container.Container',

    alias: 'widget.feedspiechart',

    requires: [
        
        'Ext.chart.series.Series',
        'Ext.chart.series.Polar',
        'Ext.chart.series.Pie',        
        'Ext.chart.interactions.Rotate',
        'Ext.tip.ToolTip',
        'Ext.chart.interactions.ItemInfo'
    ],
    items:[{
        xtype:'polar',
                width: 500,
               height: 500,
               padding:'20 10 20 20',
               innerPadding: 20,
               title:'Posts vs. Ideate ',
               cls:'chart-title',
               colors:['orange','green'],
               
                store: {
                    type: 'feedspiestore'
                }, 
                legend: {
                    docked: 'bottom'
                },            
               series: {
                   type: 'pie',
                   highlight: true,
                   highlight: {
                    margin: 40
                },
                   angleField: 'count',
                   label: {
                       field: 'post_type',
                       font:'22px Arial',
                       color:'white',
                       display: 'rotate',
                      renderer: function (text,sprite,config,rendererData,index) {
                        var rec = rendererData.store.findRecord('post_type', text);
                        return rec.get('count'); 
                    }
                   },
                   donut: 30,
                   tooltip: {
                    trackMouse: true,
                    renderer: 'onSeriesTooltipRender'
                }
               }
               
    }]
});