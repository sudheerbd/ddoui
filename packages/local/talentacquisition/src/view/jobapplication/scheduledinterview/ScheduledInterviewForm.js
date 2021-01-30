Ext.define('TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewForm', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.field.ComboBox',
        'TalentAcquisition.store.jobopenings.JobOpeningsStore',
        'TalentAcquisition.store.jobeducation.JobEducationStore',
        'TalentAcquisition.store.ReportingsStore'
    ],
    alias: 'widget.scheduledinterviewform',
    //height:1000,
    defaults: {
        width: '100%'
    },
    //scrollable: true,
    bbar: {
        layout: {
            type: 'hbox'
        },
        padding: '25 0 21 0',
        cls:'appwindow-cls',
        items: [{
            xtype: 'button',
            text: 'Cancel',
            cls: 'app-window-cancel-btn',
            listeners:{
                click:'eastContainerCollapse'
            }
        },{
            xtype: 'button',
            bind:{
                text: '{buttontext}',
            },
            cls: 'app-window-save-btn',
            handler: "onFeedbackSubmitClick"
        }]
    },
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'stretch'
    },

    items: [{
        xtype: 'container',
        defaults: {
            //labelSeparator: '',
            cls: 'rule-name-cls',
            width: '50%',
            padding: 10
        },

        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [{
            xtype: 'hiddenfield',
            name: 'ddo_scheduleinterview_id',
        },{
            xtype: 'hiddenfield',
            name: 'ddo_jobapplications_id',
        },{
            xtype: 'hiddenfield',
            name: 'ddo_designation_id',
        },{
            xtype: 'hiddenfield',
            name: 'isdone',
        },{
            xtype: 'hiddenfield',
            name: 'isconfirmed',

        }, {
            xtype:'hiddenfield',
            reference:'cvpath',
            name:'curriculumvitae'
        },{
            xtype: 'hiddenfield',
            name: 'intervieweremployeeid'
        },{
            xtype:'combobox',
            fieldLabel: 'Job Opening',
            store: 'jobopeningsstores',
            readOnly:true,
            displayField: 'name',
            valueField: 'ddo_jobopenings_id',
            name:'ddo_jobopenings_id',
        }, {
            xtype:'button',
            text:'Download CV',
            //iconCls: 'ta-download-icon',
            width: 150,
            rigth:0,
            cls: 'request-access-btn view-cv-btn-cls',
            listeners:{
                click:'onViewCVBtnClick'
            }
        }]
    }, {
        xtype:'fieldset',
        title: 'Interview Details',
        items:[
            {
                xtype: 'container',
                defaults: {
                    //labelSeparator: '',
                    labelWidth: '25%',
                    cls: 'ta-search-field',
                    width: '50%',
                    padding: 10
                },
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch',
                    float:'left'
                },
                items: [{
                    xtype: 'textfield',
                    editable:false,
                    fieldLabel: 'Interviewee Name',
                    name:'intervieweename',
                    reference: 'intervieweename'

                },/*{
                    xtype: 'combobox',
                    readOnly:true,
                    store:{
                        type:'reportingsstore'
                    },
                    name:'intervieweename',
                    fieldLabel: 'Interviewee Name',
                    displayField:'empname',
                    valueField: 'empid',
                }*/,{
                    xtype:'combobox',
                    fieldLabel: 'Interview Type',
                    readOnly:true,
                    store: new Ext.data.SimpleStore({
                        fields:['interviewtype'],
                        data:[[
                            'Telephonic'
                        ],[
                            'Skype'
                        ],[
                            'Face to face'
                        ]],
                    }),
                    displayField: 'interviewtype',
                    valueField: 'interviewtype',
                    name:'interviewtype'
                }]
            },{
                xtype: 'container',
                defaults: {
                    //labelSeparator: '',
                    labelWidth: '25%',
                    cls: 'ta-search-field',
                    width: '50%',
                    padding: 10
                },
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch',
                    float:'left'
                },
                items: [
                    {
                        fieldLabel: 'Date',
                        xtype: 'datefield',
                        readOnly:true,
                        name: 'interviewdate',
                    },{
                        xtype: 'combobox',
                        fieldLabel: 'Time',
                        readOnly:true,
                        store: new Ext.data.SimpleStore({
                            fields:['time'],
                            data:[[
                                '09:00 am'
                            ],[
                                '09:30 am'
                            ],[
                                '10:00 am'
                            ],[
                                '10:30 am'
                            ],[
                                '11:00 am'
                            ],[
                                '11:30 am'
                            ],[
                                '12:00 am'
                            ],[
                                '12:30 pm'
                            ],[
                                '01:00 pm'
                            ],[
                                '01:30 pm'
                            ],[
                                '02:00 pm'
                            ],[
                                '02:30 pm'
                            ],[
                                '03:00 pm'
                            ],[
                                '03:30 pm'
                            ],[
                                '04:00 pm'
                            ],[
                                '04:30 pm'
                            ],[
                                '05:00 pm'
                            ],[
                                '05:30 pm'
                            ],[
                                '06:00 pm'
                            ],[
                                '06:30 pm'
                            ],[
                                '07:00 pm'
                            ],[
                                '07:30 pm'
                            ],[
                                '08:00 pm'
                            ],[
                                '08:30 pm'
                            ],[
                                '09:00 pm'
                            ]]
                        }),
                        displayField: 'time',
                        valueField: 'time',
                        name: 'time',
                    }]},{
                xtype: 'container',
                defaults: {
                   // labelSeparator: '',
                   labelWidth: '25%',
                   cls: 'ta-search-field',
                    width: '50%',
                    padding: 10
                },
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch',
                    float:'left'
                },
                items:[{
                    xtype:'textfield',
                    fieldLabel:'Profile',
                    readOnly:true,
                    name:'ddo_jobopenings_name'
                },{
                    xtype:'textfield',
                    fieldLabel:'Designation',
                    readOnly:true,
                    name:'ddo_designation_name'
                }]
            }// },{
            //     xtype: 'container',
            //     defaults: {
            //         labelSeparator: '',
            //         width: '50%',
            //         padding: 10
            //     },
            //     layout: {
            //         type: 'hbox',
            //         pack: 'start',
            //         align: 'stretch',
            //         float:'left'
            //     },
            //     items:[{
            //         xtype:'button',
            //         text:'View CV',
            //         width: 150,
            //         cls: 'viewcv-btn-cls',
            //         listeners:{
            //             click:'onViewCVBtnClick'
            //         }
            //     }]
            // },
        ]
    }],
});