Ext.define('TalentAcquisition.view.jobopenings.openings.JobOpeningsForm', {
    extend: 'Ext.form.Panel',
    requires: [
        //'DDO.store.setup.department.DepartmentStore',
        'TalentAcquisition.store.joblocation.JobLocationStore',
        //'DDO.store.setup.designation.DesignationStore',
        'TalentAcquisition.store.jobeducation.JobEducationStore'
    ],
    alias: 'widget.jobopeningsform',
    defaults: {
        width: '100%'
    },
    padding: 20,
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'stretch'
    },

    items: [{
        xtype: 'container',
        defaults: {
            //labelSeparator: '',
            padding: 10,
            cls: 'rule-name-cls',
            labelWidth: '25%',
            msgTarget:'side',
            beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>'
        },
        layout: {
            type: 'column'
        },
        items: [{
            xtype: 'hiddenfield',
            name: 'ddo_jobopenings_id'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Job Code',

            allowBlank: false,
            columnWidth: 0.5,
            name: 'jobcode'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Job Name',
            allowBlank: false,
            columnWidth: 0.5,
            name: 'name'
        }]
    }, {
        xtype: 'fieldset',
        title: 'Job Description',
        items: [{
            xtype: 'container',
            defaults: {
                msgTarget:'side',
                //labelSeparator: '',
                beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                labelWidth: '25%',
                padding: 10,
                cls: 'ta-search-field',
                columnWidth: 0.5
            },
            layout: {
                type: 'column'
            },
            items: [{
                xtype: 'combobox',
                allowBlank: false,
                name: 'ddo_department_id',
                fieldLabel: 'Department',             
                store: {
                    type: 'departmentstore',
                    autoLoad: 'true'
                },
                displayField: 'name',
                valueField: 'ddo_department_id',
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
                allowBlank: false,
                name: 'ddo_joblocation_id',
                fieldLabel: 'Location',
                store: {
                    type: 'joblocationstore',
                    autoLoad: 'true'
                },
                displayField: 'name',
                valueField: 'ddo_joblocation_id',
                typeAhead:true,
                typeAheadDelay:50,
                //queryMode: 'local',
                forceSelection:true,
                listeners: {
                    beforequery: function(qe){
                        delete qe.combo.lastQuery;
                    }           
                }
            }, {
                xtype: 'combobox',
                allowBlank: false,
                name: 'ddo_designation_id',
                fieldLabel: 'Designation',
                store: {
                    type: 'designationstore',
                    autoLoad: 'true'
                },
                displayField: 'name',
                valueField: 'ddo_designation_id',
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
                allowBlank: false,
                name: 'ddo_jobeducation_id',
                fieldLabel: 'Qualification',
                store: {
                    type: 'jobeducationstore',
                    autoLoad: 'true'
                },
                displayField: 'name',
                valueField: 'ddo_jobeducation_id',
                typeAhead:true,
                typeAheadDelay:50,
                //queryMode: 'local',
                forceSelection:true,
                listeners: {
                    beforequery: function(qe){
                        delete qe.combo.lastQuery;
                    }           
                }
            }, {
                xtype: 'numberfield',
                hideTrigger: true,
                minValue: 0,
                fieldLabel: 'Total Experience',
                maxValue: 50,
                name: 'totalexperience',
                allowBlank: false
            }, {
                xtype: 'numberfield',
                hideTrigger: true,
                maxValue: 200,
                minValue: 0,
                allowDecimals:false,
                //regex:/^[0-9_]+$/,
                invalidText:"Please enter valid data",
                allowBlank: false,
                fieldLabel: 'Open Position',
                name: 'openpositions'
            }, {
                xtype: 'datefield',
                fieldLabel: 'Effective Date',
                name: 'validfrom',
                beforeLabelTextTpl: '',
                allowBlank: false,
                value: new Date(),
                minValue: new Date()
            }, {
                xtype: 'datefield',
                fieldLabel: 'Expiration Date',
                beforeLabelTextTpl: '',
                name: 'validto',
                listeners: {
                    expand: function() {
                        var fromDate = this.up().down('datefield[name=validfrom]').value;
                        if (!Ext.isEmpty(fromDate)) {
                            this.setMinValue(fromDate);
                        }
                    }
                }
            }, {
                columnWidth: 0.5,
                xtype: 'combo',
                fieldLabel: 'Status',
                beforeLabelTextTpl: '',
                store: new Ext.data.SimpleStore({
                    data: [
                        [1, 'Vacant'],
                        [2, 'Filled']
                    ],
                    id: 0,
                    fields: ['value', 'text']
                }),
                valueField: 'text',
                name: 'jobstatus',
                displayField: 'text',
                triggerAction: 'all',
                editable: false
            }, {
                columnWidth: 0.5,
                xtype: 'combo',
                fieldLabel: 'Billable',
                beforeLabelTextTpl: '',
                store: new Ext.data.SimpleStore({
                    data: [
                        ["Y", 'YES'],
                        ["N", 'NO']
                    ],
                    fields: ['value', 'text']
                }),
                valueField: 'value',
                name: 'isbillable',
                displayField: 'text',
                triggerAction: 'all',
                editable: false
            }]
        }]
    }, {
        xtype: 'textarea',
        fieldLabel: 'Responsibilities',
        cls: 'rule-name-cls',
        beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
        //labelSeparator: '',
        allowBlank: false,
        msgTarget: 'side',
        labelWidth: '25%',
        columnWidth: 0.5,
        name: 'responsibilities'
    }, {
        xtype: 'textarea',
        fieldLabel: 'Primary Skills',
        msgTarget: 'side',
        beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
        cls: 'rule-name-cls',
        //labelSeparator: '',
        labelWidth: '25%',
        columnWidth: 1,
        allowBlank: false,
        name: 'primaryskills'
    }, {
        xtype: 'textarea',
        fieldLabel: 'Secondary Skills',
        name: 'secondaryskills',
        labelWidth: '25%',
        //labelSeparator: '',
        columnWidth: 1,
        cls: 'rule-name-cls'
    }],
    bbar: {
        padding: '25 0 21 0',
        cls: 'appwindow-cls',
        items: [{
            xtype: 'button',
            text: 'Cancel',
            cls: 'app-window-cancel-btn',
            handler: 'eastContainerCollapse'
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
    }
});
