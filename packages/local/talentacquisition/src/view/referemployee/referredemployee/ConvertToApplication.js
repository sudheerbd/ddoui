Ext.define('TalentAcquisition.view.referemployee.referredemployee.ConvertToApplication', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.field.ComboBox',
        'TalentAcquisition.store.jobopenings.JobOpeningsStore',
        'TalentAcquisition.store.jobeducation.JobEducationStore',
        'TalentAcquisition.store.jobapplicationstatus.JobApplicationStatusStore',
        'TalentAcquisition.store.jobsource.JobSourceStore',
        'TalentAcquisition.store.jobsourcelines.JobSourceLinesStore',
        'TalentAcquisition.store.ReportingsStore',
        'TalentAcquisition.store.jobopenings.JobOpeningsStore',
        'TalentAcquisition.store.jobsourcelines.JobSourceLinesStore',
        'TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeViewModel',
        'TalentAcquisition.view.referemployee.referredemployee.ConvertToApplicationController'
    ],
    alias: 'widget.converttoapplication',
    bigForm: true,
    //padding: 20,
    title: 'Convert To Application',
    cls: 'ta-header',
    defaults: {
        width: '100%'
    },
    viewModel: {
        type: 'referemployeeviewmodel'
    },
    controller:'converttoapplicationcontroller',
    scrollable: true,
    bbar: {
        cls:'appwindow-cls',
        layout: {
            type: 'hbox'
        },
        padding: '25 0 21 0',
        items: [{
            xtype: 'button',
            text: 'Cancel',
            cls: 'app-window-cancel-btn',
            handler: 'onCancelClick'
        }, {
            xtype: 'button',
            text: 'Save',
            cls: 'app-window-save-btn',
            formBind: true,
            //handler: 'eastContainerCollapse',
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
            beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
            cls: 'rule-name-cls',
            padding: 10,
            msgTarget:'side'
        },
        layout:{
            type:'column'
        },
        items: [ {
            xtype: 'hiddenfield',
            name: 'ddo_jobapplications_id',
        },{
            xtype:'combobox',
            columnWidth:0.5,
            fieldLabel: 'Job Opening',
            allowBlank: false,
            store: 'jobopeningsstores',
            editable: false,
            forceSelection:true,
            displayField: 'name',
            valueField: 'ddo_jobopenings_id',
            name:'ddo_jobopenings_id',
            listeners: {
                    beforequery: function(qe){
                        delete qe.combo.lastQuery;
                }           
            }
        }]
    }, {
        xtype:'fieldset',
        title: 'Candidate Details',
        items:[{
            xtype: 'container',
            defaults: {
               // labelSeparator: '',
                labelWidth: '25%',
                cls: 'ta-search-field',
                beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                padding: 10,
                msgTarget:'side'
            },
            layout:{
                type:'column'
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: 'First Name',
                name: 'firstname',
                allowBlank: false,
                columnWidth:0.5
            }, {
                fieldLabel: 'Middle Name',
                xtype: 'textfield',
                name: 'middlename',
                beforeLabelTextTpl: '',
                columnWidth:0.5
            }, {
                fieldLabel: 'Last Name',
                xtype: 'textfield',
                name: 'lastname',
                allowBlank: false,
                columnWidth:0.5
            }, {
                xtype: 'textfield',
                fieldLabel: "Father's name",
                name: 'fathersname',
                beforeLabelTextTpl: '',
                columnWidth:0.5
            }, {
                xtype: 'combobox',
                fieldLabel: 'Highest Education',
                typeAhead:true,
                typeAheadDelay:50,
                queryMode: 'local',
                forceSelection:true,
                anyMatch: true,
                store:'jobeducationstore',
                displayField: 'name',
                valueField: 'ddo_jobeducation_id',
                name:'ddo_jobeducation_id',
                allowBlank: false,
                columnWidth:0.5,
                listeners: {
                    beforequery: function(qe){
                        delete qe.combo.lastQuery;
                    }           
                }
            }, {
                xtype: 'datefield',
                fieldLabel: 'Year of Passing',
                name: 'yearofpassing',
                allowBlank: false,
                columnWidth:0.5,
                maxValue: new Date()
            },{
                xtype: 'combobox',
                fieldLabel: 'Skill Type',
                editable: false,
                store:{
                    type:'jobopeningsstore'
                },
                displayField: 'primaryskills',
                valueField: 'primaryskills',
                name:'skilltype',
                columnWidth:0.5,
                allowBlank: false
            }]
        }]
    },{
        xtype:'fieldset',
        title: 'Communication Details',
        items:[
            {
            xtype: 'container',
            defaults: {
                //labelSeparator: '',
                labelWidth: '25%',
                cls: 'ta-search-field',
                beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                padding: 10,
                msgTarget:'side'
            },
            layout: {
                type: 'column'
            },
            items: [{
                xtype: 'numberfield',
                fieldLabel: 'Mobile Number',
                name: 'mobilenumber',
                columnWidth:0.5,
                allowBlank: false,
                minValue: 0, //prevents negative numbers
                // Remove spinner buttons, and arrow key and mouse wheel listeners
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                maxLength:12,
                minLength: 10,
                regex:/^[0-9]*$/i,
                invalidText:"Please enter valid data",
                enforceMaxLength:10,
                emptyText: 'Enter mobile number '
            }, {
                fieldLabel: 'Email',
                xtype: 'textfield',
                name: 'email',
                vtype:'email',
                columnWidth:0.5,
                allowBlank: false
        }, {
                fieldLabel: 'Address',
                xtype: 'textarea',
                name: 'address',
                columnWidth:0.5,
                allowBlank: false
            }]
        }
        ]
    },{
        xtype:'fieldset',
        title: 'Other Details',
        items:[
            {
            xtype: 'container',
            defaults: {
                //labelSeparator: '',
                labelWidth: '25%',
                cls: 'ta-search-field',
                padding: 10,
                msgTarget:'side'
            },
            layout:{
                type:'column'
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Current City',
                name: 'currentcity',
                columnWidth:0.5
            }, {
                xtype: 'combobox',
                fieldLabel: 'Current Employment Status',
                editable:false,
                name:'currentemploymentstatus',
                store: ["Employed","Not Employed"],
                displayField: 'name',
                valueField: 'name',
                columnWidth:0.5
            }, {
                fieldLabel: 'Previous Company',
                xtype: 'textfield',
                name: 'previouscompany',
                columnWidth:0.5
            }, {
                xtype: 'numberfield',
                hideTrigger:true,
                minValue:0,
                maxLength:4,
                fieldLabel: "Total Experience (Years)",
                name: 'totalexperience',
                columnWidth:0.5
            }, {
                
                fieldLabel: 'ID. Proof',
                xtype: 'textfield',
                name: 'idproof',
                //allowBlank: false,
                columnWidth:0.5
            }, {
                xtype: 'textfield',
                fieldLabel: 'ID. Proof Number',
                name: 'idproofnumber',
                columnWidth:0.5
            },{
                fieldLabel: 'Available From',
                xtype: 'datefield',
                name: 'availablefrom',
                columnWidth:0.5
            },{
                fieldLabel: 'Applied On',
                xtype: 'datefield',
                name: 'appliedon',
                columnWidth:0.5
            },
            {
                fieldLabel: 'Notice Period (Days)',
                xtype: 'numberfield',
                hideTrigger:true,
                columnWidth:0.5,
                minValue:0,
                maxLength:3,
                minLength:1,
                regex:/^[0-9]*$/i,
                invalidText:"Please enter valid data",
                name: 'noticeperiodindays'
            },{
                xtype: 'combobox',
                columnWidth:0.5,
                allowBlank: false,
                typeAhead:true,
                typeAheadDelay:50,
                queryMode: 'local',
                forceSelection:true,
                name: 'ddo_designation_id',
                fieldLabel: 'Requested Designation',
                beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                store: {
                    type: 'designationstore',
                    autoLoad:'true'
                },
                displayField: 'name',
                valueField: 'ddo_designation_id',
                listeners: {
                    beforequery: function(qe){
                        delete qe.combo.lastQuery;
                    }           
                }
            }]
        }]
    },{
        xtype:'fieldset',
        title: 'Hiring Details',
        items:[
            {
                xtype: 'container',
                defaults: {
                    //labelSeparator: '',
                    labelWidth: '25%',
                    cls: 'ta-search-field',
                    // width: '50%',
                    padding: 10,
                    msgTarget:'side'
                },
                layout: {
                    type: 'column'
                },
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Recruiter',
                    store:{
                        type:'reportingsstore'
                    },
                    columnWidth:0.5,
                    allowBlank: false,
                    name:'recruitedby',
                    displayField: 'empname',
                    beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                    valueField: 'empid',
                    typeAhead:true,
                    typeAheadDelay:50,
                    queryMode: 'local',
                    forceSelection:true,
                    listeners: {
                        beforequery: function(qe){
                            delete qe.combo.lastQuery;
                        }           
                    }
                },{
                    xtype: 'combobox',
                    columnWidth:0.5,
                    fieldLabel: 'Status',
                    store:'jobapplicationstatusstore',
                    displayField: 'name',
                    allowBlank: false,
                    beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                    valueField: 'ddo_jobapplicationstatus_id',
                    name:'ddo_jobapplicationstatus_id',
                    editable: false,
                    listeners: {
                        beforequery: function(qe){
                            delete qe.combo.lastQuery;
                    }        
                }
            }, {
                    xtype: 'combobox',
                    fieldLabel: 'Hiring Source',
                    store:'jobsourcestores',
                    name:'ddo_jobsource_id',
                    displayField: 'name',
                    valueField: 'ddo_jobsource_id',
                    editable: false,                    
                    columnWidth:0.5,
                    listeners:{
                        change:function(me,newdata,olddata){
                            var parentView = this.up('referredemployeeview'),
                                viewmodel;
                            if(!Ext.isEmpty(parentView)){
                                viewmodel = parentView.getViewModel();
                                if(me.getRawValue() == "Job Portal"){
                                    viewmodel.set('portal',false);
                                    viewmodel.set('consultency',true);
                                    viewmodel.set('reffredBy',true);
                                }else if(me.getRawValue() == "Consultancy"){
                                    viewmodel.set('portal',true);
                                    viewmodel.set('consultency',false);
                                    viewmodel.set('reffredBy',true);
                                }else if(me.getRawValue() == "Referred by employee"){
                                    viewmodel.set('portal',true);
                                    viewmodel.set('consultency',true);
                                    viewmodel.set('reffredBy',false);
                                }
                                viewmodel.notify();
                            }
                        }
                    }
                }/*, {
                    xtype: 'form',
                    columnWidth:0.5,
                    items:[{
                        anchor: '100%',
                        xtype: 'filefield',
                        opType: 'upload',
                        name: 'feedsImage',
                        buttonOnly: true,
                        buttonConfig: {
                             cls: 'request-access-btn',
                             width: "100%",
                             text: 'Browse doc, pdf extension files only'
                        },
                        listeners: {
                            change: 'onCVupload'
                        },
                        fieldLabel: "Upload CV :",
                    }]
                }*/]
            }, {
                xtype:'hiddenfield',
                name: 'curriculumvitae'
            }, {
                xtype: 'container',
                defaults: {
                    //labelSeparator: '',
                    labelWidth: '25%',
                    cls: 'ta-search-field',
                    padding: 10,
                    msgTarget:'side'
                },
                layout:{
                    type:'column'
                },
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Referred By',
                    store:{
                        type:'reportingsstore'
                    },
                    name:'referredby',
                    bind:{
                        hidden:'{reffredBy}'
                    },
                    displayField:'empname',
                    valueField: 'empid',
                    columnWidth:0.5,
                    typeAhead:true,
                    typeAheadDelay:50,
                    queryMode: 'local',
                    forceSelection:true,
                    listeners: {
                        beforequery: function(qe){
                            delete qe.combo.lastQuery;
                    }           
                }
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Consultancy Name',
                    name:'vendorname',
                    editable: false,
                    store:{
                        type:'vendor'
                    },
                    bind:{
                        hidden:'{consultency}'
                    },
                    displayField: 'name',
                    columnWidth:0.5,
                    valueField: 'ddo_jobsourcelines_id'
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Job Portal Name',
                    editable: false,
                    name:'jobportalname',
                    store:{
                        type:'portal'
                    },
                    bind:{
                        hidden:'{portal}'
                    },
                    displayField: 'name',
                    columnWidth:0.5,
                    valueField: 'ddo_jobsourcelines_id',
                },{
                    xtype:'textarea',
                    fieldLabel: 'Comments',
                    columnWidth:1,
                    name:'comments'
                }]
            }
        ]
    }]
});