Ext.define("DDO.view.projects.MomActionBottomPanel", {
  extend: "Ext.panel.Panel",
  alias: "widget.momactionbottompanel",
  requires: [
    'DDO.view.projects.MOMActionItemsController',
    'DDO.view.projects.MOMActionItemsViewModel',
],
controller: 'momActionItemsController',
viewModel: {
    type: 'momActionItemViewModel'
}, 


  items: [
    {
      xtype: "container",
      layout: "hbox",
    //   cls: "mom-search-cls",
       cls: 'mom-button-cls-panel',
      margin: '10px 5px ',
      height: '40px',
      items: [
        {
          xtype: "textfield",
          emptyText: "Add a comment",
          cls: "text-area-cls",
          margin: ' 0px 0px 0px 10px',
          width: '50px', 
          reference: 'taskcomment'
        },
        {
          xtype: "button",
          text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.FOLLOWUP,
          cls: "mom-folloup-cls",
          width: Constants.ViewportWidth * 0.073,
          height: "34px",
          margin: "0px 0px 0px 12px",
          enableKeyEvents: true,
        //   handler: "onFollowUp",
        listeners: {
            click: 'onFollowUp'
        }
        },
        {
          xtype: "tbfill",
        },
        {
          xtype: "button",
          text: "Completed",
          iconCls: "x-fa fa-check-square",
          cls: 'btn-border-cls-csss'
        //   cls: 'mom-button-cls-panel',
        },
        {
          xtype: "button",
          text: "In Progress",
          iconCls: "x-fa fa-hourglass-half",
          cls: 'btn-border-cls-css'
        //   cls: 'mom-button-cls-panel',
        },
      ],
    },
  ],

});
