Ext.define('TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetailsForm', {
    extend: 'Ext.form.Panel',
    requires: [
    ],
    padding:20,
    alias: 'widget.applicationdetailsform',
    defaults: {
        width: '100%'
    },
    scrollable: true,

    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'stretch'
    },

    items: [{
        xtype: 'container',
        defaults: {
            width: '50%',
            padding: 10,
            editable: false,
            msgTarget:'side',
            labelWidth: '25%',
            cls: 'rule-name-cls'
        },

        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [ {
            xtype:'textfield',
            fieldLabel: 'Job Opening',
            name:'ddo_jobopenings_name'
        }, {
            xtype:'hiddenfield',
            reference:'cvpath',
            name:'curriculumvitae'
        }, {
            xtype: 'button',
            scale: 'small',
            width: 120,
            text: 'Download CV',
            cls:'request-access-btn view-cv-btn-cls',
            margin: '0 0 0 50',
            listeners:{
                click:'onViewCVBtnClick'
            }                
        }]
    }, {
        xtype:'fieldset',
        title: 'Candidate Details',
        items:[
            {
                xtype: 'container',
                defaults: {
                    width: '50%',
                    labelWidth: '25%',
                    padding: 10,
                    editable: false,
                    cls: 'ta-search-field',
                    msgTarget:'side'
                },
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch',
                    float:'left'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'First Name',
                    name: 'firstname'
                }, {
                    fieldLabel: 'Middle Name',
                    xtype: 'textfield',
                    name: 'middlename',
                }]
            }, {
                xtype: 'container',
                defaults: {
                    width: '50%',
                    padding: 10,
                    editable: false,
                    labelWidth: '25%',
                    cls: 'ta-search-field',
                    msgTarget:'side'
                },

                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [{
                    fieldLabel: 'Last Name',
                    xtype: 'textfield',
                    name: 'lastname',
                }, {
                    xtype: 'textfield',
                    fieldLabel: "Father's name",
                    name: 'fathersname'
                }]
            }, {
                xtype: 'container',
                defaults: {
                    width: '50%',
                    padding: 10,
                    editable: false,
                    labelWidth: '25%',
                    cls: 'ta-search-field',
                    msgTarget:'side'
                },

                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Highest Education',                    
                    name:'ddo_jobeducation_name'
                }, {
                    xtype: 'datefield',
                    fieldLabel: 'Year of Passing',
                    name: 'yearofpassing',
                     readOnly: true,
                    hideTrigger:true

                }]
            },{
                xtype: 'container',
                defaults: {
                    width: '49%',
                    padding: 10,
                    editable: false,
                    labelWidth: '25%',
                    cls: 'ta-search-field',
                    msgTarget:'side'
                },

                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Skill Type',
                        name:'skilltype'
                    }]
            }
        ]
    },{
        xtype:'fieldset',
        title: 'Communication Details',
        items:[
            {
                xtype: 'container',
                defaults: {
                    width: '50%',
                    labelWidth: '25%',
                    padding: 10,
                    editable: false,
                    cls: 'ta-search-field',
                    msgTarget:'side'
                },
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch',
                    float:'left'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: ' Mobile Number',
                    name: 'mobilenumber',
                    hideTrigger:true
                }, {
                    fieldLabel: 'Email',
                    xtype: 'textfield',
                    name: 'email',
                    vtype:'email'
                }]
            }, {
                xtype: 'container',
                defaults: {
                    width: '100%',
                    padding: 10,
                    labelWidth: '25%',
                    editable: false,
                    cls: 'ta-search-field',
                    msgTarget:'side'
                },

                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [{
                    fieldLabel: 'Address :',
                    xtype: 'textarea',
                    name: 'address',
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
                    width: '50%',
                    padding: 10,
                    labelWidth: '25%',
                    editable: false,
                    cls: 'ta-search-field',
                    msgTarget:'side'
                },
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch',
                    float:'left'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Current City',
                    name: 'currentcity'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Current Employment Status',
                    name:'currentemploymentstatus'
                }]
            }, {
                xtype: 'container',
                defaults: {
                    width: '50%',
                    padding: 10,
                    labelWidth: '25%',
                    editable: false,
                    cls: 'ta-search-field',
                    msgTarget:'side'
                },

                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [{
                    fieldLabel: 'Previous Company',
                    xtype: 'textfield',
                    name: 'previouscompany',
                }, {
                    xtype: 'textfield',
                    fieldLabel: "Total Experience (Years)",
                    name: 'totalexperience',
                    hideTrigger:true
                }]
            }, {
                xtype: 'container',
                defaults: {
                    width: '50%',
                    padding: 10,
                    labelWidth: '25%',
                    editable: false,
                    cls: 'ta-search-field',
                    msgTarget:'side'
                },

                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [{
                    fieldLabel: 'ID. Proof',
                    xtype: 'textfield',
                    name: 'idproof',
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'ID. Proff Number',
                    name: 'idproofnumber',
                    hideTrigger:true
                }]
            },{
                xtype: 'container',
                defaults: {
                    width: '50%',
                    padding: 10,
                    labelWidth: '25%',
                    editable: false,
                    cls: 'ta-search-field',
                    msgTarget:'side'
                },

                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [{
                    fieldLabel: 'Availabel From',
                    xtype: 'datefield',
                    name: 'availablefrom',
                    readOnly: true,
                    hideTrigger:true
                },{
                    fieldLabel: 'Applied On',
                    xtype: 'datefield',
                    name: 'appliedon',
                    readOnly: true,
                    hideTrigger:true
                }]
            },
            {
                xtype: 'container',
                defaults: {
                    width: '49%',
                    padding: 10,
                    labelWidth: '25%',
                    editable: false,
                    cls: 'ta-search-field',
                    msgTarget:'side'
                },

                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [{
                    fieldLabel: 'Notice Period (Days)',
                    xtype: 'textfield',
                    name: 'noticeperiodindays',
                    hideTrigger:true
                }]
            }
        ]
    },{
        xtype:'fieldset',
        title: 'Hiring Details',
        items:[
            {
                xtype: 'container',
                defaults: {
                    width: '50%',
                    padding: 10,
                    editable: false,
                    labelWidth: '25%',
                    cls: 'ta-search-field',
                    msgTarget:'side'
                },
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch',
                    float:'left'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Recruiter',
                    name:'recruitedby',
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Status',
                    name:'ddo_jobapplicationstatus_name'
                }]
            }, {
                xtype: 'container',
                defaults: {
                    width: '49%',
                    padding: 10,
                    editable: false,
                    labelWidth: '25%',
                    cls: 'ta-search-field',
                    msgTarget:'side'
                },

                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Hiring Source',
                    name:'ddo_jobsource_name'
                }]
            }, {
                xtype: 'container',
                defaults: {
                    width: '50%',
                    padding: 10,
                    editable: false,
                    labelWidth: '25%',
                    cls: 'ta-search-field',
                    msgTarget:'side'
                },

                layout: {
                    type: 'vbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Referred By',
                    name:'referredby',
                    hidden:true,
                    displayField: 'referredby',
                    valueField: 'referredby'
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Vendor Name :',
                    name:'vendorname',
                    hidden:true,
                    displayField: 'vendorname',
                    valueField: 'vendorname'
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Job Portal Name :',
                    name:'jobportalname',
                    hidden:true,
                    displayField: 'jobportalname',
                    valueField: 'jobportalname'
                },{
                    xtype:'textarea',
                    fieldLabel: 'Comments:',
                    name:'comments'
                }]
            }
        ]
    }]
});