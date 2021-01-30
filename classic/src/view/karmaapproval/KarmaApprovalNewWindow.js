Ext.define('DDO.view.karmaapproval.KarmaApprovalNewWindow',{
    extend: 'Ext.window.Window',
    alias: 'widget.karmaapprovalnewwindow',
    requires:['DDO.view.karmaapproval.KarmaApprovalWinViewModel'],
    width: 1059,
    height: 360,
    cls:'karma-approval-new-window',
    modal:true,
    layout:'fit',
    viewModel:{
        type : 'karmaapprovalwindowviewmodel'
    },
    initComponent:function(){
   this.callParent(arguments);
   var selectedNominationId = this.nominationId;
   paramsData = {
    nominationId: selectedNominationId
};
     var store = this.getViewModel().getStore('karmascorescartesianstore');
    //  store.getProxy().setExtraParams(selectedNominationId);
    Ext.apply(store.getProxy().extraParams, paramsData);
    if (!store.isLoaded()) {
        store.load();
    }
    },
    items:[{
        xtype:'container',
        // height:'100%',
        width:'100%',
        layout:{
            type:'hbox'
        },   
            items:[
                {
               xtype:'container',
               layout:'vbox',
               width:'40%',
               reference:'chartcontainer',
                 items:[
                    {
                        xtype:'textfield',
                        reference:'employeename',
                        width:250,
                      cls:'approval-name-cls',
                      style:'margin-left:60px',
                    }, 
                    {
                    xtype:'textfield',
                    fieldLabel:'Submitted Date',
                    labelAlign :'left',
                    // cls:'cartesian-date-cls',
                    style:'margin-left:70px',
                    name:'submiteddate',
                    reference:'submiteddate',
                    width:200
                 },{
                    xtype:'textfield',
                    fieldLabel:'Hr Karma Units',
                    labelAlign :'left',
                    // cls:'cartesian-date-cls',
                    style:'margin-left:70px',
                    name:'hrkarmaunits',
                    reference:'hrkarmaunits',
                    width:200
                 },{
                    xtype:'textfield',
                    fieldLabel:'Finance Karma Units',
                    labelAlign :'left',
                    // cls:'cartesian-date-cls',
                    style:'margin-left:70px',
                    name:'financekarmaunits',
                    reference:'financekarmaunits',
                    width:200
                 },{
                    xtype:'textfield',
                    fieldLabel:'Derived Karma',
                    labelAlign :'left',
                    // cls:'cartesian-date-cls',
                    style:'margin-left:70px',
                    name:'derivekarma',
                    reference:'derivekarma',
                    width:200
                 },{
                    xtype:'textfield',
                    fieldLabel:'Karma Units',
                    labelAlign :'left',
                    // cls:'cartesian-date-cls',
                    style:'margin-left:70px',
                    name:'karmaunits',
                    reference:'karmaunits',
                    width:200
                 },
                //  {
                //  xtype: 'chart',
                // reference: 'chart',
                // cls:'karma-cartesian-cls',
                // width:'80%',
                // height:200,
                // bind:{
                //  store:'{karmascorescartesianstore}'
                // },
                // animate: true,
                // shadow: false,
                // captions: {
                //     title: {
                //         text: 'Redwood City Climate Data',
                //         align: 'left'
                //     }
                // },
              
                // axes: [{
                //     type: 'numeric',
                //     position: 'left',
                //     minimum: 0,
                //     maximum:200,
                //     fields:'value',
                //     // grid:true,
                //     titleMargin: 20,
                //     // label: {
                //     //     renderer: function(v) { return v + '%'; }
                //     // },
              
                //     title: {
                //         text: 'Karma Score Chart'
                //     },
                //     // listeners: {
                //     //     rangechange: 'onAxisRangeChange'
                //     // }
                // }, {
                //     type: 'category',
                //     position: 'bottom',
                //     fields:'name',
                //     // grid:true,
                //     width:200,
                //     label: {
                //         rotate: {
                //             degrees: -40
                //         }
                //     }
                // }],
                // series: {
                //     type: 'bar',
                //     xField: 'name',
                //     yField: 'value',
                //     style: {
                //         minGapWidth: 20
                //     },
                //     highlight: {
                //         fill: '#000',
                //         // 'stroke-width': 20,
                //         // stroke: '#fff'
                //     },
                //     tips: {
                //         trackMouse: true,
                //         style: 'background: blue',
                //         height: 20,
                //     }
                // },
                //  },
                 {
                    xtype:'textfield',
                    fieldLabel:'Month',
                    labelAlign :'left',
                    name:'nominatemonth',
                    style:'margin-left:70px',
                    labelWidth :40,
                    cls:'cartesian-date-cls',
                    reference:'nominatemonth',
                    width:200
                   }]
                },
                
            {
                xtype:'form',
                width:'60%',
                cls:'karma-approval-window-form',
                items:[{
                    xtype:'fieldcontainer',
                    layout:'hbox',
                    items:[{
                        xtype: 'textfield',
                        fieldLabel: 'Karma Category',
                        name: 'karmacategory_name',
                        cls:'ddo-karmainfo-cls',
                        labelWidth:50,
                        reference: 'karmacategory_name',
                        labelSeparator:"",
                        // cls: 'ddo-rejectkarma-cls',
                        padding: '0 0 0 0',
                        editable: false,
                        labelAlign: 'left',
                        // flex: 0.3,
                        flex:1.5
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Karma Name',
                        name: 'karma_name',
                        labelAlign: 'left',
                        cls:'ddo-karmainfo-cls',
                        labelWidth:50,
                        labelSeparator:"",
                        reference: 'karma_name',
                        padding: '0 00 0 0',
                        editable: false,
                        flex:1.5
                    },{
                    xtype:'container',
                    layout:{
                        type:'hbox'
                    },
                    items:[{
                        xtype:'label',
                        text:'Karma Units',
                        padding:'5px 10px 0px 0px'
                    },{
                        xtype: 'textfield',
                        // fieldLabel: 'Karma Units',
                        name: 'karmaunits',
                        width:70,
                        // labelAlign: 'left',
                        reference: 'karmaunits',
                        padding: '0 10 0 0',
                        editable: false,
                        cls:'karma-approval-karmaunits',
                    }]
                    }]
                },{
                  xtype:'container',
                  layout:{
                      type:'hbox'
                  },
                  items:[{
                      xtype:'label',
                      text:'comment',
                      padding:'5px 10px 0px 0px'
                  },{
                    xtype:'textfield',
                    // width:300,
                    name:'comments',
                    padding:'0px 0px 10px 0px',
                    cls:'karma-approval-comments'
                  }]
                },
                 {
                     xtype:'container',
                     layout:{
                         type:'hbox'
                     },
                     items:[{
                            xtype:'textfield',
                            name:'hrcomments',
                            reference: 'hrcoments',
                            padding:'0px 0px 10px 0px',
                            cls:'karma-approval-hr-comments'  
                     },{
                         xtype:'label',
                         text:'Hr Comments',
                         padding:'5px 0px 0px 10px'
                     }]
                 },
                {
                xtype:'container',
                layout:{
                    type:'hbox'
                },
                items:[{
                    xtype:'label',
                    text:'Finance Comments',
                    padding:'5px 10px 0px 0px'
                },{
                    xtype:'textfield',
                    // width:300,
                    // fieldLabel:'Finance Comment',
                    name: 'financecomments',
                    reference: 'financecomments',
                    padding:'0px 0px 10px 0px',
                    labelAlign:'left',
                    cls:'karma-approval-finance-comments'
                }]
                },{
                    xtype:'container',
                    layout:{
                        type:'hbox'
                    },
                    items:[{
                        xtype:'textfield',
                        emptyText:'Type Your Approve or Reject Comment Here....',
                        grow: true,
                        name: 'message',
                        // editable: false,
                        anchor: '100%',
                         labelSeparator: '',
                         allowBlank: false,
                        width:500,
                        cls:'karma-approval-manager-comments'
                    },{
                        xtype:'container',
                        layout:{
                            type:'vbox'
                        },
                        defaults:{
                        padding :'10px 10px 10px 10px'
                        },
                        items:[
                            {
                            xtype:'button',
                            text:'Approve',
                            reference:'karmaapprovesubmitbutton',
                            iconCls:'karmanew-approve-icon',
                            cls:'karmanew-approve-cls',
                            margin:'0px 0 0 10px',
                            width:110,
                            height:30,
                            handler:function(btn){
                                var window = this.up('karmaapprovalnewwindow'),
                                   parentRefView = window.parentRef,
                                   rowIndex = window.index,
                                   approvalMsg = window.down('[name = message]').getValue();
                                   parentRefView.clearPendingNominations(btn, true, approvalMsg, null, null, null, rowIndex,window);
                          
                            }
                        },{
                            xtype:'button',
                            text:'Reject',
                            reference:'karmarejectbutton',
                            iconCls:'karmanew-reject-icon',
                            margin:'5px 0 0 10px',
                            width:110,
                            height:30,
                            cls:'karmaapprove-reject-cls',
                            handler:function(btn){
                                // debugger;
                                var window = this.up('karmaapprovalnewwindow'),
                                   parentRefView = window.parentRef,
                                   rowIndex = window.index,
                                   alteredPoints = window.record.getData().karmaunits,
                                   alteredDerivedPoints = window.record.getData().derived_karma_points,
                                   rejetctMsg = window.down('[name = message]').getValue();
                                   parentRefView.clearPendingNominations(btn, false, rejetctMsg, null, alteredPoints, alteredDerivedPoints, rowIndex,window);
                            }
                        }]
                    }]
                }]
            }]
        
    }]
});