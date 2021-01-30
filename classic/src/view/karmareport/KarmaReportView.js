Ext.define('DDO.view.karmareport.KarmaReportView', {
    extend: 'Ext.container.Container',
    alias: 'widget.karmareportview',
    requires: [
        'DDO.view.karmareport.KarmaReportForm',
        'DDO.view.karmareport.KarmaReportController',
        'DDO.view.karmareport.KarmaReportWin',
        'DDO.view.karmareport.KarmaReportGrid',
        'DDO.view.karmareport.KarmaReportViewModel',
        
    ],
    cls: 'karmaReport-cls',
//scrollable:true,
controller:'karmareportcontroller',
viewModel:{
    type:'karmareportviewmodel'
},
//layout:'vbox',
items:[{
    xtype : 'karmareportform'
},{
    xtype:'karmareportgrid',
  //  height:520,
}

]



});