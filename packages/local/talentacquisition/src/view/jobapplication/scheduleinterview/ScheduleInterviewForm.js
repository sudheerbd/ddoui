Ext.define('TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterviewForm', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.field.ComboBox',
        'TalentAcquisition.store.jobopenings.JobOpeningsStore',
        'TalentAcquisition.store.jobeducation.JobEducationStore',
        'TalentAcquisition.store.ReportingsStore'
    ],
    alias: 'widget.scheduleinterviewform',
    defaults: {
        width: '100%'
    },
    cls: 'ta-header',
    scrollable: true,
    bigForm: true,
    //padding: 20,
    bbar: {
        layout: {
            type: 'hbox'
        },
        cls:'appwindow-cls',
        padding: '25 0 21 0',
        items: [{
            xtype: 'button',
            text: 'Cancel',
            cls: 'app-window-cancel-btn',
            handler: 'eastContainerCollapse',
            listeners: {
                click: function(){
                    this.up('form').getForm().reset();
                }
            }
        }, {
            xtype: 'button',
            text: 'Save',
            cls: 'app-window-save-btn',
            formBind: true,
            handler: 'eastContainerCollapse',
            listeners: {
                click: 'onFormSaveClick'
            }
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
            beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
            width: '50%',
            //padding: 10,
            msgTarget:'side'
        },

        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [ {
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
            xtype:'combobox',
            fieldLabel: 'Job Opening',
            store: 'jobopeningsstores',
            displayField: 'name',
            readOnly:true,
            valueField: 'ddo_jobopenings_id',
            name:'ddo_jobopenings_id',
            hideTrigger :true,
            bind:{
                value:'{ddo_jobopenings_id}'
            },
            listeners:{
                change:function(me,newvalue,oldvalue){
                    if(Ext.isEmpty(me.getValue())){
                        me.setValue(oldvalue);
                    }
                }
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
                    beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                    cls: 'ta-search-field',
                    width: '50%',
                    padding: 10,
                    msgTarget:'side'
                },
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch',
                    float:'left'
                },
                items: [{
                    xtype: 'combobox',
                    //editable :false,
                    store:{
                        type:'reportingsstore'
                    },
                    displayField: 'empname',
                    valueField: 'empid',
                    fieldLabel: 'Interviewer Name',
                    allowBlank: false,
                    queryMode: 'local',
                    forceSelection:true,
                    name: 'intervieweremployeeid',
                    typeAhead:true,
                    typeAheadDelay:50,
                    listeners: {
                        beforequery: function(qe){
                            delete qe.combo.lastQuery;
                        }           
                    }
                },{
                        xtype:'combobox',
                        fieldLabel: 'Interview Type',
                        //editable :false,
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
                        allowBlank: false,
                        name:'interviewtype',
                        editable: false
                }]
            },{
                xtype: 'container',
                defaults: {
                    //labelSeparator: '',
                    labelWidth: '25%',
                    cls: 'ta-search-field',
                    beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                    width: '50%',
                    padding: 10,
                    msgTarget:'side'
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
                name: 'interviewdate',
                editable :false,
                allowBlank: false,
                minValue: new Date()
            },{
                xtype: 'combobox',
                fieldLabel: 'Time',
                editable :false,
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
                    ],[
                        '09:30 pm'
                    ],[
                        '010:00 pm'
                    ],[
                        '10:30 pm'
                    ],[
                        '11:00 pm'
                    ],[
                        '11:30 pm'
                    ],[
                        '12:00 am'
                    ],[
                        '12:30 am'
                    ]]
                }),
                displayField: 'time',
                valueField: 'time',
                name: 'time',
                allowBlank: false
            }]}
        ]
    }]
});