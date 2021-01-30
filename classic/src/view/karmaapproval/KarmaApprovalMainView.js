Ext.define('DDO.view.karmaapproval.KarmaApprovalMainView', {
    extend: 'Ext.container.Container',
    alias: 'widget.karmaapprovalmainview',
    requires: [
        'DDO.view.karmaapproval.KarmaApproval'
    ],
    //scrollable:true,
    //layout:'fit',
   // width:200,
   style:"top: 30px;",
   height:580,
  // cls:'karma-approval-main-cls',
   layout: {
    type: 'vbox',
    align: 'middle',
    pack: 'center'
},
    items:[
      // {
      //   xtype:'toolbar',
      //   width:'100%',
      //   dock:'top',
      //   height:50,
      //   style:'margin-left:50px',
      //   items:[{
      //     xtype: 'pagingtoolbar',
      //     // bind:{
      //     //     store: '{StudentListPagingStore}'
      //     // },
      //     displayInfo: true,
      //     displayMsg: 'Displaying {0} to {1} of {2} &nbsp;records ',
      //     emptyMsg: "No records to display&nbsp;"
      //      }],
      //   cls:'karmaapproval-top-pagination'
      //     },
    {
      xtype:'karmaapproval',
       height:560,
       style:'margin-left:50px'
    },  
    // {
    //   xtype:'toolbar',
    //   width:'100%',
    //   height:50,
      
    //   dock:'bottom',
    //   cls:'karmaapproval-top-pagination',
    //   style:'margin-left:50px',
    //   items:[{
    //     xtype: 'pagingtoolbar',
    //     // bind:{
    //     //     store: '{StudentListPagingStore}'
    //     // },
    //     displayInfo: true,
    //     displayMsg: 'Displaying {0} to {1} of {2} &nbsp;records ',
    //     emptyMsg: "No records to display&nbsp;"
    //   }]
    //     }
      ]
})