
Ext.define('DDO.view.projects.MOMActionItems', {
    // extend: 'Ext.window.Window',
      extend: 'Ext.container.Container',
    alias: 'widget.momActionItems',
    controller: 'momActionItemsController',
    viewModel: {
        type: 'momActionItemViewModel'
    },  
    requires: [
        'DDO.view.projects.MOMActionItemsController',
        'DDO.view.projects.MOMActionItemsViewModel',
        'DDO.store.projects.MOMActionItemsStore',
        'Ext.grid.plugin.Exporter',
        'Ext.grid.plugin.RowExpander',
        'Ext.grid.filters.Filters',
    //    'DDO.view.projects.ActionItemView'
    ],
 
    // initComponent: function() {
    //     debugger;
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
    itemId: 'action',
    // closable: true,
    // constrain: true,
    // header: true,
    padding: '0px 1px 2px 5px',
    // modal: true,
    // resizable: false,
    // layout: 'fit',
    scrollable: 'y',
    // title: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.MOMACTIONTITLE, 
    // items:[{
    //     xtype:'actionitemview',
    //     // height:'20%'
    // }],
    // dockedItems: [{
    //     xtype: 'toolbar',
    // cls:'mom-search-cls',
    //     dock: 'top',
    //     items: [
    //         { xtype: 'button', text: 'Button 1' }
    //     ]
    // }],
   bbar: {
       cls:'mom-search-cls',
    //    emptyText:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.SEARCHBOX,
    //    xtype: 'container',
    //    height: '40px',
    //    width: '100%',
    //    layout: 'hbox',
       items:['->', 
    // items:[{
    //     xtype:'tbfill'
    // },
    //    {
    //     xtype:'textfield',
    //     emptyText:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.SEARCHBOX,
    //     cls: 'ddo-search-text-cls',
    //     // cls: 'ddo-people-text',
    //     name:'momagenda',
    //     enableKeyEvents: true,
    //     // listeners: {
    //     //     change: 'onMomSearchText'
    //     // }
    //    }, 
    //    {
    //  xtype: 'button',
    //  width: 10,
    //  height: 10,
    //  cls: 'search-icon-field'
    //    },
    //    {
    //     // text:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.COLUMNS,
    //     arrowVisible: false,
    //     reference : 'hidecolumns',
    //     cls:'hidecolumn-cls',
    //     iconCls:'x-fa fa-columns',
    //     tooltip:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.HIDEORUNHIDE,
    //     menu:{
    //         bodyPadding:'0 0 10 0',
    //         items:[{
    //             xtype:'checkboxgroup',
    //             defaults: {
    //                 fontSize: 14,
    //                 margin: '0 -18 0',
    //                 checked: true,
    //             },
    //             columns:1,
    //             items:[{
    //                 boxLabel:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ASSIGNEDTO,
    //                 inputValue:2,
    //                 reference:'assignedto'
    //             },{
    //                 boxLabel:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.AGENDA,
    //                 inputValue:3,
    //                 refrence:'columnagenda'
    //             },
    //         {
    //             boxLabel:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.TASK,
    //             inputValue:4,
    //             refrence:'task'
    //         },{
    //             boxLabel:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.MOMSTARTDATE,
    //             inputValue:5,
    //             refrence:'startdate'
    //         },{
    //             boxLabel:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ENDDATE,
    //             inputValue:6,
    //             refrence:'enddate'
    //         },{
    //             boxLabel:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STATUS,
    //             inputValue:7,
    //             refrence:'status'
    //         }]
    //         },{
    //             xtype:'button',
    //             text:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.APPLY,
    //             reference:'applybutton',
    //             align:'center',
    //             // width: 40,
    //             height: 30,
    //             cls:'column-apply-click',
    //             listeners:{
    //                 click:'onColumnApplyClick'
    //             }
    //         }]
    //     }
    //    },
    {
        xtype: 'button',
        // html: '<img src =  "/resources/images/feeds/dwld.png" width="20" height="22" color="#50BC6C">',
        ui: 'plain',
        // margin:'0 0 0 px',
        iconCls:'x-fa fa-file-excel-o',
        cls:'hidecolumn-cls',
        tooltip: LabelsTitles.SHEETS.DOWNLOADEXCEL,
        listeners: {
            click: 'onDownloadExcelBtnClick'
        }
    }
    ],
   
   }
// ]
,
    cls: 'ddoRatingSelfwindow-css',
    width:Constants.ViewportWidth*0.62,
   
    height:Constants.ViewportHeight*0.8,
    maxHeight: Constants.ViewportHeight,
    bbar: {
        cls: 'mom-bbar-cls',
        // xtype: 'container',
        height:56,
        items: [ {
            xtype: 'textfield',
            // name: 'add a comment',
            emptyText:'add a comment',
            cls: 'text-area-cls',
            // width: '311px',
            // height: '30px',
        },
            {
            xtype: 'button',
            text:  LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.FOLLOWUP,
            cls: 'mom-folloup-cls',
            width: Constants.ViewportWidth*0.073,
            height: '34px',
            margin: '0px 0px 0px 12px',
            // handler: 'onFollowUp'
        }, {
            xtype: 'tbfill'
        },  {
            xtype: 'button',
            text: 'Completed',
            iconCls:'x-fa fa-check-square',
        },
        {
            xtype: 'button',
            text: 'In Progress',
            iconCls:'x-fa fa-hourglass-half',
            // html: '<img src =  "/resources/images/feeds/dwld.png" width="20" height="22" color="#50BC6C">',
            // ui: 'plain',
            // margin:'0 0 0 px',
            // iconCls:'x-fa fa-hourglass-half',
            // cls:'hidecolumn-cls',
            // tooltip: LabelsTitles.SHEETS.DOWNLOADEXCEL,
        }
    ]
    },
    items:[{
        xtype: 'grid',
        scrollable: 'y',
        // height: '100px',
        reference: 'actionItemsGridRef',
        cls: "check-btn-cls ",
        emptyText:'No Data Available',
        loadMask:true,
        features: [{
            ftype: 'grouping',
           
        }],
        bind: {
            store: '{momActionItemsStore}'
        },
        selModel: {
            selType: 'checkboxmodel'
        },
      
        columns: [{
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.TASK,
            dataIndex: 'task',
            cls: "removeLine gris-bck-cls",
            flex: 1,
        },
            {
                text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ASSIGNEDTO, 
                dataIndex: 'empname',
                name:'employeename',
                cls: "removeLine gris-bck-cls",
                flex: 0.5,
            },{
                text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ENDDATE,
                dataIndex: 'task_end_date',
                cls: "removeLine gris-bck-cls",
                flex: 0.5,
                renderer:function(value){
                    value = Ext.Date.format(new Date(value), 'd-m-Y') ;
                     return value;
                }
            },{
                text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.MOMTITLE,
                dataIndex: 'mom',
                name : 'momagenda',
                cls: "removeLine gris-bck-cls",
                flex: 0.5,
            },
            // {
            //     text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.MOMSTARTDATE,
            //     dataIndex: 'task_start_date',
            //     cls: "removeLine gris-bck-cls",
            //     flex: 0.5,
            //     renderer:function(value){
            //         value = Ext.Date.format(new Date(value), 'd-m-Y') ;
            //          return value;
            //     }

            // },
            // {
            //     text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STATUS, 
            //     dataIndex: 'iscompleted',
            //     cls: "removeLine gris-bck-cls",
            //     name: 'status',
            //     flex: 0.5,
            //     align: 'center',
               
            // },

            {
                header: 'Status',
                dataIndex: 'iscompleted',
                //  dataIndex: 'PreReq'
                // xtype:'actioncolumn',
                // text:'Status',
                // reference:'action',
                flex: 0.5,
                align: 'center',
                cls: "removeLine gris-bck-cls",
                // cls: "removeLine",
                name: 'status',
                // sortable:false,
                renderer: function(value,metadata,record){
                    // debugger;
                    var intime = value;
                   
                    if(intime == 'Completed')
                       { 
                        // metadata.tdCls = 'fa fa-check-square'
                        return '<span class="x-fa fa-check-square"></span>';
                    }
                    else if(intime =='In Progress'){
                        return '<span class="x-fa fa-hourglass-half"></span>'; 
                    }
                    else{
                        // metadata.tdCls = 'x-fa fa-hourglass-half'
                       
                    }
                }
                // menuDisabled:true,
                // layout:'hbox',
                // align:'center',
                // items:[
                //     {
                //     iconCls:'fa fa-hourglass-half',
                //     // handler:'onAcceptBtnClick',
                //     // cls:'accept-icon-cls'
        
                // }]
            },
            
        ],
        plugins: [
             {
                ptype: 'gridexporter',
                pluginId: 'exporter'
            },
            {
                ptype: 'rowexpander',
                align:'center',
                headerWidth:40,
                pluginId: 'expander',
                reference : 'tplexpander',
                selectRowOnExpand:true,
                cls: 'row-ex-cls',
                // bind: {
                //     store: '{feeds.Groups}'
                // },
                rowData:{
                   
                },
                rowBodyTpl: [
                    '<tpl class="row-ex-cls">',
                    "<table border='1'>",
                    '<table style="width:98%; border: 0px solid black">',
                    '<tr> <td><span class="gridcls" color="#448B9C">Update</span></br><input id="udpateText" type = "text" class="textarea-cls" placeholder ="Post a comment(70 character)"></td>',
                    '<td class="pad-cls"><label for="fname" class="label-cls-tpl left-cls">Changee Assignee</label></br>',
                    '<tpl>',
                    '<select id="comboSelect" class = "comboSelect">{[this.onEmployee(values)]}</select>',
                    '</tpl>',
                    '</td><br>',
                    '</tr>',
                    '<tr><td class="gridcss">System <br>{[this.momActionHistory(values.history)]}</td>',
                   '<br><br>',
                    '<td>',
                    '<div class="position-cls-css">',

                    '<div class="act-cls"><label for="fname" class="label-cls-tpl">Change duedate </label><br><input type="date" id="duedate" name="fname" class = "inp-fld-date-cls"></div>',
                
                    '<div class="act-cls"><label for="fname" class="label-cls-tpl">Update Status</label></br> <select name="status" id="status" class = "inp-fld-update-cls" ><option value="Completed">Completed</option><option value="In Progress">In Progress</option> </select></div>',
                    '</div>',
                    '</td>',
                    '</tr>',
                    '<tr><td></td>',
                    '<td><button class="update-btn-css-tpl" type="button" onclick="onUpdateButton"><i class="x-fa fa-check-circle act-arrow arrow-cls"></i>UPDATE</button></td></tr>',
                    '</table>',
                    '</tpl>',
                 {
                        momActionHistory: function(value) {
                         
                        if (!Ext.isEmpty(value))  {
                            return (value);
                        }
                        else{
                            return 'History not available' ;
                        }
                    },
                    
                        getActions: function (values) { /* to get actions*/
                  
                          var  actionsStore = Ext.getStore('jobopeningsactions');
                        },
                        // getMsg: function(value){
                        //     return this.getView().up('[name=textarea-cls]').getValue();

                        // },
                        sendAssignees:function(records){
                            // console.log('send assigness called');
                            var empTagName;
                                            var empId;
                                            var empDataOption;
                            records.forEach(function(rec){
                                empTagName = rec.get('tagName');
                                empId = rec.get('tagId')
                                    empDataOption +='<option value='+empId+'>'+empTagName+'</option>'
                               });
                              return empDataOption;
                        },
                        onEmployee: function(values) { 
                            // debugger;
                            var me = this;
                            var empStore = Ext.getStore('feeds.Groups');
                            var empTagName;
                                            var empId;
                                            var empDataOption;
                                            var isGroup;
                            if(!empStore.isLoaded()){
                                empStore.load({
                                    // params: {
                                    //     projectId: projectsView.selectedProjectId
                                    // },
                                    callback: function(records, operation, success) {
                                        if (success == true) {
                                            // var empTagName;
                                            // var empId;
                                            // var empDataOption;
                                           var dta =  me.sendAssignees(records);
                                        //    console.log("410"+dta);
                                           return dta;
                                        //    console.log("400" + empDataOption)
                                        }else{
                                            Ext.Msg.alert('Failed','Unable to load the mom store');
                                        }
                                    }
                                });
                                
                            }else{
                                
                                            empStore.each(function(rec){
                                            empTagName = rec.get('tagName');
                                            empId = rec.get('tagId');
                                            isGroup = rec.get('isGroup');
                                            // debugger;
                                            if(!isGroup){
                                            if(values.task_owner === empId){
                                                empDataOption +='<option value='+empId+' selected>'+empTagName+'</option>'
                                            } else {
                                                empDataOption +='<option value='+empId+'>'+empTagName+'</option>'
                                            }
                                        }
                                           });
                                        //    console.log("415" + empDataOption)
                                           return empDataOption;
                            }
                           
                                },    
                     },
                ]
            ,
            
            items:[{
                xtype: 'container',
                layout: 'hbox',
                
                items:[{
                xtype: 'checkbox',
                boxLabel: 'Change Assignee',

            }],
            items: [{
                xtype: 'container',
                layout: 'vbox',
                items:[ {
                    xtype: 'datefield',
                    fieldLabel: LabelsTitles.RESOURCEREQUEST.ENDDATE,
                    labelAlign: 'top',
                    reference: 'endDate',
                    name: 'enddate',
                    submitFormat: 'd-m-Y',
                    format: 'd-m-Y',
                    maskRe: /[0-9\-\/]/,
                    cls: 'enddate-cls',
                    allowBlank: false,
                      bind:{
                          value:'{employeeData.enddate}',
                          minValue:'{minValue}'
                  },
                    createPicker: function () {
                        var me = this,
                            format = Ext.String.format;
                        return Ext.create('Ext.picker.Date', {
                            pickerField: me,
                            ownerCt: me.ownerCt,
                            renderTo: document.body,
                            floating: true,
                            hidden: true,
                            focusOnShow: true,
                            cls: 'ddo-create-datepicker addpeopledate',
                            minDate: me.minValue,
                            maxDate: me.maxValue,
                            disabledDatesRE: me.disabledDatesRE,
                            disabledDatesText: me.disabledDatesText,
                            disabledDays: me.disabledDays,
                            disabledDaysText: me.disabledDaysText,
                            format: me.format,
                            showToday: me.showToday,
                            startDay: me.startDay,
                            minText: format(me.minText, me.formatDate(me.minValue)),
                            maxText: format(me.maxText, me.formatDate(me.maxValue)),
                            listeners: {
                                scope: me,
                                select: me.onSelect
          
                            },
                            keyNavConfig: {
                                esc: function () {
                                    me.collapse();
                                }
                            }
                        });
                    },
                    // listeners: {
                    //     select: 'onDateRange',
                    // }
                },
                    {
                    xtype: 'checkbox',
                    boxLabel: 'Update Status',
                }]
            }]
            }]
            }],
    viewConfig: {
        enableTextSelection: true
    },
    itemSelector:'tpl.row-ex-cls',
    listeners: {
        itemclick: 'onUpdateButton',
      }
 
    }]
    
});

