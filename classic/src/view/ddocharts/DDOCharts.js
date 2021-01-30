Ext.define('DDO.view.ddocharts.DDOCharts', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.ddocharts',
    //title:'Feeds and Karma Charts',

    requires: [
        
        'DDO.view.ddocharts.DDOChartsViewModel',
        'DDO.view.ddocharts.DDOChartsViewController',
        'DDO.view.ddocharts.FeedsPieChart',
        'DDO.view.ddocharts.KarmaPieChart'
    ],
   
    controller: 'ddochartsviewcontroller',
    viewModel: {
        type: 'ddochartsviewmodel'
    },
    width:'100%',
    height:'auto',
    layout:'vbox',
   
    items:[{
        xtype:'container',
        width:'100%',
        layout:'hbox',
        items:[{
            xtype:'feedspiechart'
        },{
            xtype:'karmapiechart'
        }]
    },{
        xtype:'karmabarchart'
    }]

});