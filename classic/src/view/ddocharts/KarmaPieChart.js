Ext.define('DDO.view.ddocharts.KarmaPieChart', {
    extend: 'Ext.container.Container',

    alias: 'widget.karmapiechart',

    requires: [
        
        'Ext.panel.Panel'
    ],
   
   
    items:[{
      xtype:'panel',
      title:'Total Nominations',
      cls:'chart-title',
      width: 500,
        height: 450,
        innerPadding: 20,
        padding:'20 0 20 20',

      items:[{
        xtype:'dataview',      
      store: {
          type:'karmapiestore'  
        },
        itemTpl:[
        '<div class="first-div">',
          '<div class="second-div">',           
            '<p>{count}</p>',
          '</div>',
        '</div>'
        ]
      }]
    }
   ]
});