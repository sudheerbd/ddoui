
/**
 * The file MomComponentCreateWindow is the window which comes by clicking on CreateMoM button in MoM page.
 * @extends {Ext.window.Window}
 * @alias 'widget.momcomponentcreatewindow'.
 * ViewModel: 'DDO.view.projects.MOMWindowViewModel'.
 * ViewController : 'DDO.view.projects.MOMWindowController'
 */
Ext.define('DDO.view.projects.MOMCreateWindow', {
    extend: 'Ext.window.Window',
 
    alias: 'widget.momcreatewindow',
    requires: [
        'DDO.view.projects.MOMWindowController',
        'DDO.view.projects.MOMWindowViewModel',
        'Ext.form.field.Time',
        'Ext.form.field.Date',
        'DDO.overrides.form.field.Tag',
        // 'DDO.ux.button.FabButton',
        // 'DDO.view.projects.MOMCreateGrid'
    ],
        controller: 'momwindowcontroller',
        viewModel: {
            type: 'momwindowviewmodel'
        },
        padding: '5px 20px',
        initComponent: function() {
            this.callParent(arguments);
            var controller = this.getController(),
            empStore = Ext.getStore('projects.EmpNamesStore');
            if (!empStore.isLoaded()) {
                empStore.load();
            }
        //   Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
        },
        destroy: function() {
            var controller = this.getController();
            Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
        },
        modal: true,
        resizable: false,
        title: 'Minutes Of Meeting',
        // bind: {
        //     title: '{title}'
        // }
        // ,
      cls: 'momwindow-clss momwindow-cls',
      // width: Constants.ViewportWidth*0.593,
       scrollable: 'y',
      // height:500,
      width: '1040px',
      height: '514px',
      // maxHeight:  Constants.ViewportHeight,
      bbar: {
        cls: 'mom-bbar-cls',
        height:50,
        items: [{
            xtype: 'tbfill'
        },{
            xtype: 'button',
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DRAFTS,
            cls: 'mom-drafts-cls',
            width: Constants.ViewportWidth*0.073,
            height: 31,
            // margin: '10px 0px 0px 12px',
            bind: {
                disabled: '{BtnVisible}'
            },
            listeners: {
                click: 'onDraftSubmitClick'
            }
        },
        {
            xtype: 'button',
            cls: 'mom-submit-cls',
            width: Constants.ViewportWidth*0.073,
            height: 31,
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.CREATE,
            // margin: '20px 12px 0px 12px',
            // bind: {
            //     text: '{BtnText}'
            // },
            listeners: {
                click: 'onMomSubmitClick'
            }
        }]
     },
     items:[{
        xtype: 'form',
        reference: 'agenda-ref',
        width: '100%',
        height: '60%',
        padding: '20px 5px 5px 5px',
       
        layout: {
            type: 'vbox'
        },
        items: [{
            xtype: 'container',
            width:'100%',
            cls: 'mom-cont-win-cls',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'button', 
                iconCls:'x-fa fa-paint-brush',
                cls: 'mom-btn-cls-icon',
                
                // html:'<div><i class="x-fa fa-pencil act-arrow arrow-cls"></i></div> </div>'
                },
                {
                xtype: 'textfield',
                name: 'mom_agenda',
                padding: '0px',
                cls: 'employeeexitcombo-clss',
                iconCls:'x-fa fa-pencil',
                flex: 0.7,
                labelSeparator: '',
                // fieldLabel: 'Title',
                labelAlign: "top",
                labelStyle: "height:25px",
                emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.TITLE,
                bind: {
                    value: '{agenda}'
                }
        },
        {
            xtype: 'tbspacer',
            width: '10px'
        },
        { 
        
            xtype: 'button', 
            iconCls:'x-fa fa-user-plus', 
            cls: 'mom-title-cls'
       },
        {
            xtype: 'tagfield',
            reference: 'comboTagview',
            matchFieldWidth: false,
        //     bind: {
        //       fieldLabel: 'Participants [{selectedEmpCount}]'
        //   },
            cls: ' part-cls',
            // iconCls:'x-fa fa-user-plus',
            labelAlign: 'top',
            flex: 0.4,
            clearOnBackspace: false,
            tagCustomiseMom : true,
            tagMomOwnerId : '123',
            cls: 'share-clss',
            forceSelection: false,
            scrollable:'y',
            grow: true,
            growMax:'150px',
            // grow: false,
            // editable : false,
            store: 'feeds.Groups',
            emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.PARTICIPANTSEMT,
            displayField: 'tagName',
            valueField: 'tagId',
            disabledCls: 'mom-item-disabled',
            queryMode: 'local',
            // clearFilterOnBlur: true,
            filterPickList: true,
            // listConfig: {
            //     cls: 'tag-view-list',
            //     width: Constants.ViewportWidth*0.222
            // },
            tpl: [
                '<ul class="x-list-plain"><tpl for=".">',
                '<li role="option" class="x-boundlist-item">',
                '<tpl if="values.isGroup">',
                '<span class="ddo-groupTag-round">{[this.getGroupTags(values)]}</span>',
                '{tagName}</tpl>',
                '<tpl else if="!values.isGroup">',
                '<div class="ddo-tag-round">{[this.getTags(values)]}</div>',
                '<div class="ddo-tag-Name">{tagName}</div></tpl></li></tpl>',
                '</ul>', {
                    getGroupTags: function(values) {
                      //   debugger;
                        if (typeof(values) === "object") {
                            if (values.isGroup) {   
                                return values.tagName[0];
                            }
                        }
                    },
                  
                    getTags: function(values) {
                      //   debugger;
                        if (typeof(values) === "object") {
                            if (!values.isGroup) {
                                var tagPic=Utility.imageCheck(values.tagPic)
                                if (tagPic) {
                                    return '<img class="tagUrl-img"  src="' + tagPic + '" onerror =' + Utility.defaultUserImg+'>';
                                }
                            } 
                        }
                    }
                }
            ],
          
            listeners: {
                select: function(combo, record, eOpts) {
                // debugger;
                  var viewModel = this.up().up().up().getViewModel();
                  viewModel.set('selectedEmpCount', record.length);
                  combo.inputEl.dom.value = '';
                  
                    combo.collapse();
                  //   this.getRec(record);
                    var view = Ext.ComponentQuery.query('momcreatewindow')[0];
                    // var absentbtn = view.getReferences().comboTagviewAbse.setHidden(false);
                    //  view.getReferences().comboTagviewAbse.addCls('cls-in-textfield-l');
                    //  view.getReferences().comboTagview.addCls('cls-in-textfield-r');
                    var vm = view.getViewModel();
                    // var babstn = vm.set('true');
                    var groupIds = [];
                    record.forEach((element) => {
                        console.log(element)
                        if(element.data.isGroup){
                            groupIds.push(element.data.tagId);
                        }
                        
                      })
                      if(groupIds.length > 0){
                          vm.set('isGroupSelected', true);
                          vm.set('groupIds', groupIds);
                      }
                },
                

            },
            // change:function(  this, newValue, oldValue, eOpts  ) {
            //     debugger;
            //     // var view = this.getView();
            //     var absentbtn = this.getReferences().comboTagviewAbse.setHidden("false");

            // }
          }, 
             {
            xtype: 'tbspacer',
            width: '2px'
         },
           { 
        
            xtype: 'button', 
            iconCls:'x-fa fa-user-times',  
            cls: 'mom-btn-icon',
            listeners:{
                click: function(btn,e, eOpts){
                    // debugger;
                    var view = Ext.ComponentQuery.query('momcreatewindow')[0];
                    // if()
                    var absentbtn = view.getReferences().comboTagviewAbse.setHidden(false);
                     view.getReferences().comboTagviewAbse.addCls('cls-in-textfield-l');
                     view.getReferences().comboTagview.addCls('cls-in-textfield-r');
                }
            }
       },
             {   
                    xtype: 'tagfield',
                    reference: 'comboTagviewAbse',
                    matchFieldWidth: false,
                    name: 'abs',
                    hidden :true,
                    // visible: false,
                //   bind: {
                //       fieldLabel: 'Absentees [{absentEmpCount}]'
                //   },
                    // cls: 'employeeexitcombo-mom-cls',
                    height:'20px',
                    maxHeight: '20px',
                    labelAlign: 'top',
                    flex: 0.4,
                    allowBlank: false,
                    clearOnBackspace: false,
                    tagCustomiseMom : true,
                    tagMomOwnerId : '123',
                    clearFilterOnBlur: true,
                    cls: '.share-clss',
                    scrollable: true,
                    growMax:'150px',
                    forceSelection: false,
                    store: 'feeds.Groups',
                    emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ABSENTEESEMT,
                    displayField: 'tagName',
                    valueField: 'tagId',
                    disabledCls: 'mom-item-disabled',
                    queryMode: 'local',
                    filterPickList: true,
                    // listConfig: {
                    //     cls: 'tag-view-list',
                    //     width: Constants.ViewportWidth*0.222
                    // },
                    tpl: [
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item">',
                        '<tpl if="values.isGroup">',
                        '<span class="ddo-groupTag-round">{[this.getGroupTags(values)]}</span>',
                        '{tagName}</tpl>',
                        '<tpl else if="!values.isGroup">',
                        '<div class="ddo-tag-round">{[this.getTags(values)]}</div>',
                        '<div class="ddo-tag-Name">{tagName}</div>',
                      //   '<div class="itemPic" id="boxPic{id}" onclick="onPic({id})">more</div>',
                        '</tpl></li></tpl>',
                        '</ul>', {
                            getGroupTags: function(values) {
                              //   debugger;
                                if (typeof(values) === "object") {
                                    if (values.isGroup) {   
                                        return values.tagName[0];
                                    }
                                }
                            },
                            getTags: function(values) {
                              //   debugger;
                                if (typeof(values) === "object") {
                                    if (!values.isGroup) {
                                        var tagPic=Utility.imageCheck(values.tagPic)
                                        if (tagPic) {
                                            return '<img class="tagUrl-img"  src="' + tagPic + '" onerror =' + Utility.defaultUserImg+'>';
                                        }
                                    } 
                                }
                            }
                        }
                    ],
                    listeners: {
          
                        select: function(combo, record, eOpts) {
                          //   debugger;
                            var viewModel = this.up().up().up().getViewModel();
                            viewModel.set('absentEmpCount', record.length);
                            combo.inputEl.dom.value = '';
                            combo.collapse();
                        
                            var view = Ext.ComponentQuery.query('momcreatewindow')[0];
                            var vm = view.getViewModel();
                            var groupIds = [];
                            record.forEach((element) => {
                                console.log(element)
                                if(element.data.isGroup){
                                    groupIds.push(element.data.tagId);
                                }
                                
                              })
                              if(groupIds.length > 0){
                                  vm.set('isGroupSelected', true);
                                  vm.set('groupIds', groupIds);
                              }
                        }
                    }
                
             },
           
             {
                xtype: 'tbspacer',
                width: '10px'
            },
         {  
                // fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STARTDATE,
                labelAlign: "top",
                xtype: 'datefield',
                flex: 0.2,
                // hidden: true,
                cls: 'employeeexitcombo-mom-date-cls',
                maskRe: /[0-9\-\/]/,                
                required: true,
                alwaysOnTop: true,
                name: 'start_date',
                disabledCls: 'notestatus-item-disabled',
                reference: 'fromDate',
                bind: {
                    value: '{start_date}'
                },
                emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DATEEMPTY,
                format: 'd-m-Y',
                listeners: {
                    focusleave:"onKeyDownDate"
                },
                minValue: new Date(),
            //     listeners:{
            //     select: function(){
            //         debugger;
            //         var view = Ext.ComponentQuery.query('momcreatewindow')[0];
            //         var absentbtn = view.getReferences().startTime.setHidden(false);
            //          view.getReferences().startTime.addCls('cls-in-textfield-l');
            //         //  view.getReferences().fromDate.removeCls('employeeexitcombo-mom-cls');
            //         //  view.getReferences().fromDate.addClsWithUI('cls-in-textfield-r');
            //     }
            // },
                createPicker: function() {
                    var me = this,
                        format = Ext.String.format;
                    return Ext.create('Ext.picker.Date', {
                        pickerField: me,
                        ownerCt: me.ownerCt,
                        renderTo: document.body,
                        floating: true,
                        hidden: true,
                        focusOnShow: true,
                        cls: 'ddo-create-datepicker',
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
                            select: me.onSelect,
                        },
                        keyNavConfig: {
                            esc: function() {
                                me.collapse();
                            }
                        }
                    });
                  }
            },     {
                xtype: 'tbspacer',
                width: '2px'
             }, { 
        
                xtype: 'button', 
                iconCls:'x-fa fa-clock-o',
                cls: 'time-btn-icon',
                listeners:{
                    click : function(btn,e, eOpts){
                        // debugger;
                        var view = Ext.ComponentQuery.query('momcreatewindow')[0];
                        var absentbtn = view.getReferences().startTime.setHidden(false);
                        view.getReferences().startTime.addCls('cls-in-textfield-l');
                        //  view.getReferences().fromDate.removeCls('employeeexitcombo-mom-cls');
                        //  view.getReferences().fromDate.addClsWithUI('cls-in-textfield-r');
                    }
                },  
           },{
                xtype: 'timefield',
                name: 'start_time',
                reference: 'startTime',
                disabledCls: 'mom-item-disabled',
                hidden: true,
                // fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STARTTIME,
                required: true,
                labelAlign: 'top',
                flex: 0.2,
                bind: {
                    value: '{start_time}'
                },
                editable: false,
                cls: 'employeeexitcombo-mom-cls',
                emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.TIMEEMPTY,
                minValue: '00:00',
                maxValue: '24:00',
                hideTrigger: false,
                format: 'H-i',
                // hidden: true,
                increment: 30,
                listConfig: {
                    cls: 'mom-stime-cls'
                },
                listeners: {
                    select: 'onStartTimeSelect'
                }
            }]
        },
        {
            xtype: 'container',
                    reference: 'dateValues',
                    width:'100%',
                    // height: '40%',
                    layout: {
                        type: 'hbox'
                    },
                    items:[
                        // {
                        //             xtype: 'timefield',
                        //             name: 'start_time',
                        //             reference: 'startTime',
                        //             disabledCls: 'mom-item-disabled',
                        //             fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STARTTIME,
                        //             required: true,
                        //             labelAlign: 'top',
                        //             flex: 0.2,
                        //             bind: {
                        //                 value: '{start_time}'
                        //             },
                        //             editable: false,
                        //             cls: 'employeecombo-cls',
                        //             emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.TIMEEMPTY,
                        //             minValue: '00:00',
                        //             maxValue: '24:00',
                        //             hideTrigger: false,
                        //             format: 'H-i',
                        //             hidden: true,
                        //             increment: 30,
                        //             listConfig: {
                        //                 cls: 'mom-stime-cls'
                        //             },
                        //             listeners: {
                        //                 select: 'onStartTimeSelect'
                        //             }
                        //         },
                                {
                                        xtype: 'tbspacer',
                                        width: 18
                                    },
                                {
                                    xtype: 'timefield',
                                    name: 'end_time',
                                    reference: 'endTime',
                                    disabledCls: 'mom-item-disabled',
                                    fieldLabel:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ENDTIME,
                                    required: true,
                                    hidden: true,
                                    flex: 0.2,
                                    bind: {
                                        value: '{end_time}'
                                    },
                                    editable: false,
                                    cls: 'employeecombo-cls',
                                    emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.TIMEEMPTY,
                                    labelAlign: 'top',
                                    minValue: '00:00',
                                    maxValue: '24:00',
                                    hideTrigger: false,
                                    format: 'H-i',
                                    increment: 30,
                                    // listConfig: {
                                    //     cls: 'mom-stime-cls'
                                    // },
                                    listeners: {
                                        select: 'onEndTimeSelect'
                                    }
                                
                        } ,
                        {
                            xtype: 'tbspacer',
                            width: 18
                        },
                        {
                                        fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DURATION,
                                        labelAlign: 'top',
                                        xtype: 'numberfield',
                                        name: 'duration',
                                        editable: false,
                                        reference: 'duration',
                                        required: true,
                                        hidden: true,
                                        flex: 0.2,
                                        // width: Constants.ViewportWidth*0.048,
                                        emptyText:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.HRS,
                                        hideTrigger: true,
                                        bind: {
                                            value: '{duration}'
                                        },
                                        cls: 'employeecombo-cls'
                                    },
                                    {
                                        xtype: 'tbspacer',
                                        width: '18px'
                                    },
                                    
                                    {  
                                    fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STARTDATE,
                                    labelAlign: "top",
                                    xtype: 'datefield',
                                    flex: 0.2,
                                    hidden: true,
                                    cls: 'employeecombo-cls',
                                    maskRe: /[0-9\-\/]/,                
                                    required: true,
                                    alwaysOnTop: true,
                                    name: 'start_date',
                                    disabledCls: 'notestatus-item-disabled',
                                    reference: 'fromDate',
                                    bind: {
                                        value: '{start_date}'
                                    },
                                    emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DATEEMPTY,
                                    format: 'd-m-Y',
                                    listeners: {
                                        focusleave:"onKeyDownDate"
                                    },
                                    minValue: new Date(),
                                    createPicker: function() {
                                        var me = this,
                                            format = Ext.String.format;
                                        return Ext.create('Ext.picker.Date', {
                                            pickerField: me,
                                            ownerCt: me.ownerCt,
                                            renderTo: document.body,
                                            floating: true,
                                            hidden: true,
                                            focusOnShow: true,
                                            cls: 'ddo-create-datepicker',
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
                                                esc: function() {
                                                    me.collapse();
                                                }
                                            }
                                        });
                                      }
                                }
                    ]
        }]
     },
  
     {
        xtype: 'ddohtmleditor',
        hidden: true,
        reference: 'editor-ref',
        name: 'mom_desc',
        required: true,
        emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DESCRIPTION,
        submitEmptyText: false,
        cls: 'mom-html-editor-cls',
        disabledCls: 'mom-item-disabled',
        width: Constants.ViewportWidth*0.595,
        height: Constants.ViewportHeight*0.28,
        bind: {
            value: '{mom_desc}'
        },
        listeners: {
            render: function(editor) {
                editor.getToolbar().hide();
            }
        }
        },
        {  xtype:'label',
        // dock:'top',
        html:'<h4>To Do</h4>',
        cls:'momnew-label-clss'
        },
    
        {
        xtype: 'grid',
        reference: 'gridValues',
        // margin: 'px 0px 0px 0px',
        // width: '100%',
        // padding: '20px 0px 0px 0px',
        height: '30px',
        // height: Constants.ViewportHeight*0.33,
        // layout: 'fit',
        columnLines: true,
        rowLines: false,
        cls: 'mom-grid-view-cls ',
        // cls: 'ddo-rating-grid',
        // cls: 'mom-grid-view',
        disabledCls: 'mom-item-disabled',
        bind: {
            disabled: '{nonEditablePermit}'
        },
        plugins: {
            ptype: 'cellediting',
            clicksToEdit: 1,
            clicksToMoveEditor: 2,
            autoCancel: false,
            listeners: {
                edit: function(editor, context, eOpts) {
                    var name, store, record;
                    if (arguments[1].record.data) {
                        name = arguments[1].record.data.assigned_to;
                    }
  
                    store = Ext.getStore('projects.EmpNamesStore');
  
                    if (store) {
                        record = store.findRecord("user_full_name", name, 0, true);
                    }
  
                    if (store && record) {
                        arguments[1].record.data.user_id = record.data.user_id;
                    }
                }
            }
        },
        store: 'projects.MOMGridStore',
        columns: [{
            xtype: 'rownumberer',
            align: 'center',
            // text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.SNO,
            text: '#',
            flex: 0.1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'action_item',
            flex: 1.2,
            cls: "removeLine grid-mom-css hidecolumn-cls",
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ACTIONITEM,
            editor: {
                xtype: 'textarea',
                emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ACTIONITEMEMPTY,
                disabledCls: 'mom-item-disabled',
                cls: 'action-item-cls',
                bind: {
                    disabled: '{nonEditablePermit}',
                    value: '{actionItem}'
                }
            }
        }, {
            xtype: 'gridcolumn',
            flex: 0.2,
            dataIndex: 'assigned_to',
            reference: 'assignedTo',
            cls: "removeLine",
            align: 'left',
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ASSIGNEDTO,
            editor: {
                xtype: 'combobox',
                emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ASSIGNEDTO,
                typeAhead: true,
                forceSelection: true,
                queryMode: 'local',
                lastQuery: '',
                minChars: 1,
                displayField: 'user_full_name',
                valueField: 'user_full_name',
                disabledCls: 'mom-item-disabled',
                bind: {
                    disabled: '{nonEditablePermit}',
                    value: '{assigned_to}'
                },
                store: 'projects.EmpNamesStore'
            },
            renderer: function(value, metaData) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                var empStore = Ext.getStore('projects.EmpNamesStore');
                    empStore.reload();
                return value;
            }
        },
         {
            xtype: 'gridcolumn',
            dataIndex: 'due_date',
            cls: "removeLine",
            flex: 0.2,
            align: 'left',
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DUEDATE,
            menuDisabled: true,
            autoSync: true,
            renderer: Ext.util.Format.dateRenderer('d-m-Y'),
            editor: {
                xtype: 'datefield',
                disabledCls: 'mom-item-disabled',
                bind: {
                    disabled: '{nonEditablePermit}',
                    value: '{due_date}'
                },
                emptyText:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DATEEMPTY,
                format: 'd-m-Y',
                minValue: new Date(),
                createPicker: function() {
                    var me = this,
                        format = Ext.String.format;
                    return Ext.create('Ext.picker.Date', {
                        pickerField: me,
                        ownerCt: me.ownerCt,
                        renderTo: document.body,
                        floating: true,
                        hidden: true,
                        focusOnShow: true,
                        cls: 'ddo-create-datepicker',
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
                            esc: function() {
                                me.collapse();
                            }
                        }
                    });
                }
            }
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'status',
            cls: "removeLine",
            align: 'right',
            flex: 0.2,
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STATUS,
            editor: {
                xtype: 'textfield',
                readOnly: true,
                emptyText:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STATUS,
                // disabledCls: 'mom-item-disabled',
                bind: {
                    value: '{status}'
                }
            }
        },
        {
          xtype: 'actioncolumn',
        //   text: 'Action Column',
          align: 'center',
          flex: 0.1,
          bind: {
              hidden: '{action}'
          },
          cls: "removeLine",
          items: [{
              iconCls: 'delete-plus',
              tooltip: 'Delete',
              handler: "deleteMomGridrow",
              // align: 'center',
          }]
      }
  ]
    },
    // {
    //     xtype: 'tbfill'
    // }
    ,{
        xtype:'container',
         cls: "mom-cont-win-cls-addbtn",
        items:[{
        // xtype: 'fabbutton',
        // fabUi: 'add',
        // position: 'br',
        xtype: 'button',
        text: 'Add Another Task',
        iconCls:'x-fa fa-plus-circle',
        cls: "add-btn-cls-mom",
        // cls: "mom-cont-win-cls",
        listeners: {
            
            click: function(btn, e, eOpts) {
                var me = this,
                    win = me.up().up(),
                    grid = win.down('grid');
                win.getController().addTask(grid);
            }
        }
     }
    ]
    },
    
  ],
 
    listeners: {
        beforeClose: function(winPanel) {
            var view = winPanel.down('gridview'),
                vm = winPanel.getViewModel();
            if (view && view.editingPlugin) {
                view.editingPlugin.cancelEdit();
            }
            vm.set('isExists', false);
  
        },
        afterrender: function(me, eOpts) {
            var tagView = me.down('tagfield[reference=comboTagview]'),
                particpantTagStore = tagView.getStore(),
                winVm = me.getViewModel(),
                loginStore, empId, loginParticipantData, loginEmpId;
            particpantTagStore.load({
                callback: function() {
                    loginStore = Ext.getStore('login'),
                        empId = loginStore.getData().items[0].data.ddo_employee_id,
                        loginParticipantData = particpantTagStore.findRecord("tagId", empId);
                    if (loginParticipantData && loginParticipantData.data) {
                        loginEmpId = loginParticipantData.data.tagId;
                        winVm.set('loginEmpId', loginEmpId);
                        tagView.setValue(loginParticipantData.data.tagId);
                        winVm.set('isExists', true);
                    }
  
                }
            })
        }
    }
  });