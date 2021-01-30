Ext.define('DDO.view.projects.MOMNewCreateWindow',{
    extend: 'Ext.window.Window',
    requires:['DDO.view.projects.MOMCreateGrid'],
    alias: 'widget.momcreatenewwindow',
    modal: true,
    resizable: false,
    title:'Minutes of Meeting',
    cls:'momnewcreate-win',
    scrollable: 'y',
    width:1286,
    height:534,
    bbar: {
         cls: 'momnew-bbar-cls',
        height:60,
        items: [{
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            text: 'Save as Draft',
            cls: 'momnew-drafts-cls',
            width: Constants.ViewportWidth*0.073,
            height: 31,
            margin: '10px 0px 0px 12px',
            
        }, {
            xtype: 'button',
            cls: 'momnew-submit-cls',
            width: Constants.ViewportWidth*0.073,
            height: 31,
            text : 'Create MOM',
            margin: '20px 12px 0px 12px',
           
        }]
    },
       items:[{
           xtype:'container',
           cls:'momnewcontainer-cls',
           layout:{
               type:'hbox'
           },
           items:[{
               xtype:'form',
               cls:'momnewform-cls',
                width:362,
                height:420,
        items:[
            {
                xtype: 'textfield',
                name: 'mom_agenda',
                padding: '0px',
                cls: 'formfield-cls',
                labelSeparator: '',
                fieldLabel: 'MoM Title',
                labelAlign: "top",
                labelStyle: "height:25px",
               
        },{
            xtype: 'tagfield',
            reference: 'comboTagview',
            matchFieldWidth: false,
        
        fieldLabel:'Participants()',
            cls: 'formtagfiled-cls',
            labelAlign: 'top',
            clearOnBackspace: false,
            hideTrigger: true,
            tagCustomiseMom : true,
            tagMomOwnerId : '123',
            forceSelection: false,
            scrollable:'y',
            grow: true,
            growMax:'150px',
            
            emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.PARTICIPANTSEMT,
            displayField: 'tagName',
            valueField: 'tagId',
            // disabledCls: 'mom-item-disabled',
            queryMode: 'local',
            // clearFilterOnBlur: true,
            filterPickList: true,
        },
        {
            xtype: 'tagfield',
            reference: 'comboTagviewAbse',
            matchFieldWidth: false,
            hideTrigger: true,
              fieldLabel: 'Absentees()',
          
            cls: 'formabsentees-cls',
            height:'20px',
            maxHeight: '20px',
            labelAlign: 'top',
            // flex: 0.5,
            allowBlank: false,
            clearOnBackspace: false,
            tagCustomiseMom : true,
            tagMomOwnerId : '123',
            clearFilterOnBlur: true,
            // cls: 'share-group-cls',
            scrollable: true,
            growMax:'150px',
            forceSelection: false,
            store: 'feeds.Groups',
            emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ABSENTEESEMT,
            displayField: 'tagName',
            valueField: 'tagId',
            // disabledCls: 'mom-item-disabled',
            queryMode: 'local',
            filterPickList: true,
        },
        {
            xtype: 'textfield',
            hidden: false,
         
            name: 'mom_desc',
            fieldLabel :'Topic/Discussion/Notes',
            labelAlign:'top',
            required: true,
            emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DESCRIPTION,
            submitEmptyText: false,
            cls: 'momnew-html-editor-cls',
            // disabledCls: 'mom-item-disabled',
            // width: Constants.ViewportWidth*0.595,
            // height: Constants.ViewportHeight*0.28,
            // bind: {
            //     value: '{mom_desc}'
            // },
            // listeners: {
            //     render: function(editor) {
            //         editor.getToolbar().hide();
            //     }
            // }
        },
       {
           xtype:'container',
           layout:{
               type:'hbox'
           },
           cls:'datefields-cls',
           items:[
            {  
                fieldLabel: 'Date',
                labelAlign: "top",
                xtype: 'datefield',
                // flex: 0.2,
                cls: 'momnew-form-date-cls',
                maskRe: /[0-9\-\/]/,                
                required: true,
                alwaysOnTop: true,
                name: 'start_date',
                // disabledCls: 'notestatus-item-disabled',
                reference: 'fromDate',
                // bind: {
                //     value: '{start_date}'
                // },
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
            },
            {
                xtype: 'tbspacer',
                width: 2
            },{
                xtype: 'timefield',
                name: 'start_time',
                reference: 'startTime',
                // disabledCls: 'mom-item-disabled',
                fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STARTTIME,
                required: true,
                labelAlign: 'top',
                // flex: 0.2,
                // bind: {
                //     value: '{start_time}'
                // },
                editable: false,
                // cls: 'employeecombo-cls',
                emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.TIMEEMPTY,
                minValue: '00:00',
                maxValue: '24:00',
                hideTrigger: false,
                format: 'H-i',
                increment: 30,
                // listConfig: {
                //     cls: 'mom-stime-cls'
                // },
                // listeners: {
                //     select: 'onStartTimeSelect'
                // }
            },
            {
                xtype: 'tbspacer',
                width: 2
            },
            {
                xtype: 'timefield',
                name: 'end_time',
                reference: 'endTime',
                // disabledCls: 'mom-item-disabled',
                fieldLabel:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ENDTIME,
                required: true,
                // flex: 0.2,
                // bind: {
                //     value: '{end_time}'
                // },
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
                // listeners: {
                //     select: 'onEndTimeSelect'
                // }
             } ,
             {
                xtype: 'tbspacer',
                width: 2
            },
             {
                fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DURATION,
                labelAlign: 'top',
                xtype: 'numberfield',
                name: 'duration',
                editable: false,
                reference: 'duration',
                required: true,
                // flex: 0.2,
                // width: Constants.ViewportWidth*0.048,
                emptyText:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.HRS,
                hideTrigger: true,
                // bind: {
                //     value: '{duration}'
                // },
                // cls: 'employeecombo-cls'
            },
           ]
       }
        ]
    },{
        xtype:'momcreatcontainer'
    }]
       }]
})