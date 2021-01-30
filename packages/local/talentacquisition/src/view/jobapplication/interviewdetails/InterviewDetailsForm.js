Ext.define('TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetailsForm', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.field.ComboBox',
        'TalentAcquisition.store.jobopenings.JobOpeningsStore',
        'TalentAcquisition.store.jobeducation.JobEducationStore',
        'TalentAcquisition.store.jobapplicationstatus.JobApplicationStatusStore',
        'TalentAcquisition.store.jobsource.JobSourceStore',
        //'DDO.store.resources.Resources'
    ],
    alias: 'widget.interviewdetailsform',
    bigForm: true,
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
        xtype:'fieldset',
        title: 'Candidate Details',
        items:[
            {
                xtype: 'container',
                defaults: {
                    labelSeparator: '',
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
                    xtype: 'textfield',
                    fieldLabel: 'Candidate Name',
                    name: 'firstname',
                    bind:{
                        readOnly:'{customReadOnly}'
                    }
                }, {
                    fieldLabel: 'Application No',
                    xtype: 'numberfield',
                    name: 'ddo_jobapplications_id',
                    hideTrigger:true,
                    bind:{
                        readOnly:'{customReadOnly}'
                    }
                }]
            }, {
                xtype: 'container',
                defaults: {
                    labelSeparator: '',
                    width: '50%',
                    padding: 10,
                    msgTarget: 'side'
                },

                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [{
                    fieldLabel: 'Phone Number',
                    xtype: 'textfield',
                    name: 'mobilenumber',
                    bind:{
                        readOnly:'{customReadOnly}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: "Skill Type",
                    name: 'skilltype',
                    bind:{
                        readOnly:'{customReadOnly}'
                    }
                }]
            }, {
                xtype: 'container',
                defaults: {
                    labelSeparator: '',
                    width: '50%',
                    padding: 10,
                    msgTarget: 'side'
                },

                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    name:'email',
                    bind:{
                        readOnly:'{customReadOnly}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Status',
                    name: 'ddo_jobapplicationstatus_name',
                    bind:{
                        readOnly:'{customReadOnly}'
                    }

                }]
            }
        ]
    }]
});