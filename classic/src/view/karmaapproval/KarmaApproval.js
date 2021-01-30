/**
 *   This file  is responsible for KarmaApproval.
 *   @extends {Ext.grid.Panel}
 *   @alias widget.karmaapproval
 *   ViewModel:'DDO.view.karmaapproval.KarmaApprovalViewModel'.
 *   ViewController :'DDO.view.karmaapproval.KarmaApprovalController'.
 */
Ext.define('DDO.view.karmaapproval.KarmaApproval', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.button.Button',
        'DDO.view.karmaapproval.KarmaApprovalViewModel',
        'DDO.view.karmaapproval.KarmaApprovalWindow',
        'DDO.view.karmaapproval.KarmaApprovalController',
        'DDO.view.karmaapproval.KarmaRejectWindow',
        'DDO.view.karmaapproval.ProjectedKarmaAcceptWindow',
        'DDO.view.karmaapproval.KarmaApprovalRandomToolbar',
        'DDO.view.karmaapproval.KarmaApprovalToolBar',
    ],
    initComponent: function() {
        this.callParent(arguments);
        var karmaApprovalVM = this.getViewModel();
        var karmaApprovalStore = karmaApprovalVM.getStore('karmaapprovalstore');
        if(!karmaApprovalStore.isLoaded()){
            karmaApprovalStore.load();
        }
    },

 
    columnLines: true,
    layout:'fit',
    enableLocking:true,
    // autoScroll:true,
   // rowLines: true,
    width: 1000,
    alias: 'widget.karmaapproval',
    controller: 'karmaapprovalcontroller',
    viewModel: {
        type: 'karmaapprovalviewmodel'
    },
    viewConfig: {
        autoScroll: true
    },
    bind:{
        store: '{karmaapprovalstore}'
    },
    // padding: '5 27 0 5',
    // margin: '37 0 0 0',
    // selModel:{
    // selType: 'checkboxmodel',
    // },
    cls: 'ddo-approvalgrid-cls',
    emptyText: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.EMPTYTEXT,
    
    tbar:[
    
     {
        xtype: 'button',
        text:'Filter Results',
        cls:'karmaapprovalfiltertext-cls',
        // cls: 'karmaapproval-filter-cls',
        // iconCls: 'x-fa fa-angle-down',
        iconCls:'filter-approval-cls',
        listeners: {
          click: 'onclickkarmafilterbutton'
        }
      },
        {
        xtype: 'textfield',
        emptyText: 'search for name/category/karmaname',
        cls:'karmaapprovalsearch-cls',
        width: '30%',
      
        enableKeyEvents: true,
        triggers: {
        search: {
          cls: Ext.baseCSSPrefix + 'fa fa-search'
        }
      },
        listeners: {
        change: "onSearchName",
        }
    },
    {
        arrowVisible: false,
        iconCls: 'columns-karma-cls',
        cls: 'addcolumns-button',
        reference: 'addcolumns',
        menu: {
            closable : true,
            cls:'addcokumns-items-check',
            items: [{
                 xtype:'label',
                 text: 'Choose Fields To Filter Results',
            },{
                xtype: 'checkboxgroup',
              
                defaults: {
                    fontSize: 14,
                    margin: '0 0 0 0',
                    checked: true,
                    cls: 'addcolomns-each-item'
                },
                columns: 1,
                items: [{
                    boxLabel: 'Submitted Date',
                    inputValue: '2',
                    reference: 'submiteddate'
                }, {
                    boxLabel:'Karma Units',
                    inputValue: '3',
                    reference: 'karmaunits'
                }, {
                    boxLabel: 'Derived Points',
                    inputValue: '4',
                    reference: 'derivedunits'
                }, {
                    boxLabel: 'Karma Category' ,
                    inputValue: '5',
                    reference: 'karmacategory'
                }, {
                    boxLabel: 'Karma Name',
                    inputValue: '6',
                    reference: 'karmaname'
                }, {
                    boxLabel: 'Hr Karmaunits',
                    inputValue: '9',
                    reference: 'hrkarmaunits'
                },
                {
                    boxLabel: 'Finance Karmaunits',
                    inputValue: '10',
                    reference: 'financekarmaunits'
                }],
            }, 
            {
                xtype: 'component',
                autoEl: {tag: 'hr'}
            }
        ],
        
        bbar:[
            {
                xtype:'tbfill'
            },{
                xtype:'button',
                text:'show columns',
                reference:'showColumn',
                cls:'showcolumnbtn-cls',
                iconCls:'showiconcolumn-cls',
                handler:'applyBtnOnAddColumns'
            }
        ]
        }
    },
    
    {
    xtype:'tbfill'
     },
        {
        xtype: 'pagingtoolbar',
       
        bind:{
            store: '{karmaapprovalstore}'
        },
        displayInfo: true,
        displayMsg: '{2} &nbsp;records ',
        emptyMsg: "No records to display&nbsp;"
    }],
    
    bbar: [{
        xtype:'tbfill'
    },{
        xtype: 'pagingtoolbar',
        height:50,
        bind:{
            store: '{karmaapprovalstore}'
        },
        displayInfo: true,
        displayMsg: 'Displaying {0} to {1} of {2} &nbsp;records ',
        emptyMsg: "No records to display&nbsp;"
    }],
    columns: [{
        xtype:'checkcolumn',
        // locked:true,
        // checked:true,
        cls:'karmaapproval-check-column',
        menuDisabled:true, 
        sortable:false,
        dataIndex: 'active',
        // cls:'ddo-dashboard-grid roles-checked-column',
        listeners:{
            checkchange:'onCheckBoxClick'
        }
    },{
            text: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.FORM,
            dataIndex: 'fromname',
            // flex:1,
           width:100,
            sortable: true,
            align: 'center',
            menuDisabled: false,
            // locked:true
        },
        {
            text: 'Submitted Date',
            dataIndex: 'submiteddate',
            width:200,
            sortable: true,
            align: 'center',
            // menuDisabled: true,
            // locked:false,
        },
         {
            text: 'Karma Units',
            dataIndex: 'karmaunits',
            align: 'center',
            width:100,
            // flex:2,
            sortable: true,
            // menuDisabled: true
        },
         {
            // text: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.KARMAPOINTS,
            text:'Derived Points',
            dataIndex: 'derived_karma_points',
            align: 'center',
            width:100,
            // flex:2,
            sortable: true,
            // menuDisabled: true,
            // renderer:function(value){
            //     debugger;
            // }
        }, {
            text: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.KARMACAT,
            dataIndex: 'karmacategory_name',
            // flex:2,
            width:100,
            align: 'center',
            sortable: true,
            // menuDisabled: true
        }, {
            text:'Karma Name',
            dataIndex: 'karma_name',
            width:150,
            // flex:2,
            sortable: true,
            // menuDisabled: true,
            align: 'center',
        }, {
            text: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.MONATH,
            dataIndex: 'nominate_month',
            width:150,
            // flex:2,
            sortable: true,
            align: 'center',
            // menuDisabled: true
        }, {
            text: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.COMMENTS,
            dataIndex: 'comments',
            align: 'center',
            width:300,
            // flex:2,
            sortable: true,
            // menuDisabled: true,
            renderer:function(data,record){
                var limitedChar=  data.substr(0, 7);
              var  elipsis="...";
                return limitedChar + elipsis;
             }
        },{
            text:'Hr Karmaunits',
            dataIndex:'hr_karma',
            align:'center',
            width:100,
            // flex:2,
            sortable:true,
            // menuDisabled:true,
            renderer:function(data){
                if(data){
                    return data;
                }else{
                    return ' '
                }
            }
        },
        {
            text:'Finance Karmaunits',
            dataIndex:'finance_karma',
            align:'center',
            width:150,
            // flex:2,
            // width:100,
            sortable:true,
            // menuDisabled:true,
            renderer:function(data){
                if(data){
                    return data;
                }else{
                    return ' '
                }
            }
        },
       
        {
            xtype:'actioncolumn',
            header:'Actions',
            // reference:'action',
            // width:200,
            // // align: 'center',
            // locked:true,
            // // regions:'right',
            // sortable:true,
            // menuDisabled:true,
            layout:'hbox',
            align:'center',
            // cls:'action-coloumn-cls',
            items:[{
                    xtype:'button',
                    text: 'Actions',
                    scale:'small',
                    iconCls: 'x-fa fa-eye',
                    tooltip:'Review',
                    width:50,
                    // align: 'end',
                    handler: 'OnEyeButtonActionClick'
                

            }]
        }
        // {
        //     text: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.SENDBACK,
        //     //flex: 0.9,
        //     xtype: 'widgetcolumn',
        //     cls: 'approve-header-cls',
        //     sortable: false,
        //     menuDisabled: true,
        //     widget: {
        //         xtype: 'button',
        //         text: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.SENDBACKBTN,
        //         name: 'sendback',
        //         cls: 'rejectbutton sendbackbutton',
        //         handler: 'onRejectBtnClick'
        //     },
        //     renderer: function (value, meta, record) {
        //         meta.tdCls += 'approve-cell-css';
        //         return value;
        //     }
        // }
    ],
    listeners: {
        // cellclick: '+++',
        afterrender: function () {
            this.getStore().load();
        }
    }
});