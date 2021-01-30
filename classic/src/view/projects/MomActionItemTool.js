Ext.define("DDO.view.projects.MomActionItemTool", {
  // extend: 'Ext.window.Window',
  extend: "Ext.container.Container",
  alias: "widget.momactionitemtool",
  requires: [
    "DDO.view.projects.MOMActionItemsController",
    "DDO.view.projects.MOMActionItemsViewModel",
    // 'DDO.store.projects.MOMActionItemsStore',
  ],
  // cls: 'notes-toolbar-cls',
  controller: "momActionItemsController",
  viewModel: {
    type: "momActionItemViewModel",
  },
  cls: 'action-toolbar-cls',
//   initComponent: function() {
//     this.callParent(arguments);

//     var  gridStore = this.getViewModel().getStore('momActionItemsStore');
//     if (!gridStore.isLoaded()) {
//         gridStore.load();
//     }
  
// },
//   bind: {
//     store: '{momActionItemsStore}'
// },
  // initComponent: function() {
  //     // debugger;
  //     this.callParent(arguments);

  //     var store = Ext.getStore('feeds.Groups');

  //     if (!store.isLoaded()) {
  //         store.load();
  //     }
  //     // var momCreateWindow = Ext.ComponentQuery.query('momActionItems')[0]
  //     var  gridStore = this.getViewModel().getStore('momActionItemsStore');
  //     if (!gridStore.isLoaded()) {
  //         gridStore.load();
  //     }
  //     var controller = this.getController();
  //     Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
  // },
  items: [
    {
      xtype: "container",
      layout: "hbox",
      cls: "mom-search-cls",
      items: [
        {
          xtype: "tbfill",
        },
        {
          xtype: "tbspacer",
          width: "4px",
        },
           {
        	xtype: 'button',
        	width: 15,
        	height: 15,
        	cls: 'search-icon-field'
           },
        {
          xtype: "textfield",
          emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.SEARCHBOX,
          cls: "ddo-search-text-cls",
          // cls: 'ddo-people-text',
          name: "momagenda",
          enableKeyEvents: true,
          // height:'30px',
          listeners: {
            change: "onMomSearchText",
          },
        },
        //    {
        // 	xtype: 'button',
        // 	width: 10,
        // 	height: 10,
        // 	cls: 'search-icon-field'
        //    },
        {
          xtype: "tbspacer",
          width: "4px",
        },
        {
          // text:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.COLUMNS,
          xtype: "button",
          arrowVisible: false,
          reference: "hidecolumns",
          cls: "hidecolumn-cls",
          iconCls: "x-fa fa-columns",
          tooltip: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.HIDEORUNHIDE,
          menu: {
            bodyPadding: "0 0 10 0",
            items: [
              {
                xtype: "checkboxgroup",
                defaults: {
                  fontSize: 14,
                  margin: "0 -18 0",
                  checked: true,
                },
                columns: 1,
                items: [
                 
                  
                  {
                    boxLabel: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.TASK,
                    inputValue: 2,
                    refrence: "task",
                  },
                  {
                    boxLabel:
                      LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ASSIGNEDTO,
                    inputValue: 3,
                    reference: "assignedto",
                  },
                  // {
                  //   boxLabel:
                  //     LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.MOMSTARTDATE,
                  //   inputValue: 5,
                  //   refrence: "startdate",
                  // },
                  {
                    boxLabel:
                      LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ENDDATE,
                    inputValue: 4,
                    refrence: "enddate",
                  },
                  {
                    boxLabel:
                      LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.AGENDA,
                    inputValue: 5,
                    refrence: "columnagenda",
                  },
                  {
                    boxLabel:
                      LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STATUS,
                    inputValue: 6,
                    refrence: "status",
                  },
                ],
              },
              {
                xtype: "button",
                text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.APPLY,
                reference: "applybutton",
                align: "center",
                // width: 40,
                height: 30,
                cls: "column-apply-click",
                listeners: {
                  click: "onColumnApplyClick",
                },
              },
            ],
          },
        },
        {
          xtype: "button",
          // html: '<img src =  "/resources/images/feeds/dwld.png" width="20" height="22" color="#50BC6C">',
          ui: "plain",
          // margin:'0 0 0 px',
          iconCls: "x-fa fa-file-excel-o",
          cls: "excel-btn-cls",
          tooltip: LabelsTitles.SHEETS.DOWNLOADEXCEL,
          listeners: {
            click: "onDownloadExcelBtnClick",
          },
        },
      ],
    },
  ],
 
});
