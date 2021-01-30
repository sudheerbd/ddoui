Ext.define('DDO.view.karmareport.KarmaReportGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.karmareportgrid',
    requires:['DDO.view.karmareport.KarmaReportViewModel',
               'Ext.grid.filters.Filters',
               'Ext.grid.plugin.Exporter'
            ],
   
    loadMask: true,
    height:520,
    plugins: [
       {
            ptype: 'gridexporter',
            pluginId: 'exporter'
        }
    ],
    // cls: 'karmareportgrid-cls',
    scrollable : true,
    resizable:true,
    trackMouseOver: false,
    
    bind: {
        store:'{karmareportstore}'
      },

      features: [{
        ftype: 'grouping',
        groupHeaderTpl:Ext.create('Ext.XTemplate',
        '<div  style="text-align:left" >',
        '{name}',
        '<div class="resource-count"><span>Score:{[this.getPeriod(values)]}</span> </div>','</div>',
        {
            getPeriod: function(values) {
              
                var totalkarma = values.children;
                var actualSum = 0,
                potentialSum = 0;
                var length= values.children.length;
                for (var i = 0; i < totalkarma.length; i++) {
                    actualSum = actualSum + parseInt(totalkarma[i].data.actual_karma);
                    potentialSum = potentialSum + parseInt(totalkarma[i].data.potential_per_month)
                  }
                  return actualSum + '/' + potentialSum
            }
        }
        ) ,
       hideGroupedHeader: true, 
        startCollapsed: true,
     //   showSummaryRow : true,
      }],

    columns: [
        {
            text:LabelsTitles.KARMAREPORT.NOMINATIONMONTH,
            flex:1,
            dataIndex:'ddo_nomination_date',
            sortable: true,
            align: 'center'
       }
       ,
        {
             text:LabelsTitles.KARMAREPORT.CATEGORY,
             flex:1,
             dataIndex:'karma_type',
             sortable: true,
             align: 'center'
        },
        {
            text:LabelsTitles.KARMAREPORT.KARMA,
            flex:1,
            dataIndex:'karma_name',
            sortable: true,
            align: 'center'
        },
        {
            text:LabelsTitles.KARMAREPORT.SUPERVISOR,
            flex:1,
            dataIndex:'supervisor_name',
            sortable: true,
            align: 'center'
       },
        {
            text:LabelsTitles.KARMAREPORT.EMPLOYEENAME,
            flex:0.8,
            dataIndex:'employeename',
            sortable: true,
            align: 'center'
        },
        {
            text:LabelsTitles.KARMAREPORT.DESIGNATION,
            flex:0.8,
            dataIndex:'designation_name',
            sortable: true,
            align: 'center'
       },
      {
            text:LabelsTitles.KARMAREPORT.POTENTIALKARMA,
            flex:1,
            dataIndex:'potential_per_month',
            sortable: true,
            align: 'center'
       },
        {
            text:LabelsTitles.KARMAREPORT.ACTUALKARMA,
            flex:1,
            dataIndex:'actual_karma',
            sortable: true,
            // align: 'center'
          
      },
      
       
        
    ]
});