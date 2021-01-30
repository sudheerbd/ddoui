Ext.define('DDO.view.karmaapproval.KarmaApprovalToolBar',{
    extend:'Ext.toolbar.Toolbar',
    alias:'karmaapprovaltoolbar',
    dock:'top',
    width:'105%',
    height:50,
    items:[ 
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
       }]

});