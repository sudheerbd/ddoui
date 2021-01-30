Ext.define('TalentAcquisition.view.referemployee.ReferEmployeeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.referemployeeform',
    defaults: {
        width: '100%'
    },
     cls: 'ta-header',
    title: 'Employee Referral Form',
    padding: 20,
    scrollable: true,
    bigForm: true,
    hideButton: true,
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'stretch'
    },
    tools:[{
        xtype: 'button',
        scale: 'medium',
        iconCls: 'goalsbackbtn-cls',
        cls: 'back-btn-cls',
        style: {
            'border':0
        },
        handler: 'onBackButtonClick'
    }],

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
            handler: 'onCancelBtnClick'
        }, {
            xtype: 'button',
            text: 'Refer',
            cls: 'app-window-save-btn',
            formBind: true,
            //handler: 'eastContainerCollapse',
            listeners: {
                 click: 'onFormSaveClick'
            }
        }]
    },
    items: [{
        xtype: 'container',
        defaults: {
            //labelSeparator: '',
            padding: 10,
            xtype:'textfield',
            cls: 'rule-name-cls',
            beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
            msgTarget:'side'
        },
        layout: {
            type: 'column'
        },
        items: [{
            xtype: 'hiddenfield',
            name: 'ddo_jobopenings_id'
        }, {
            hidden: false,
            submitValue:false,
            name: 'name',
            //allowBlank: false,
            columnWidth:0.5,
            fieldLabel: 'Job Opening'
        }, {
            fieldLabel: 'Main skill',
            name: 'primaryskills',
            allowBlank: false,
            columnWidth:0.5,
            emptyText: 'Enter user skills here'
        }]
    }, {
        xtype:'fieldset',
         title: 'Candidate Details',
         items:[{
            xtype: 'container',
            defaults: {
                //labelSeparator: '',
                labelWidth: '25%',
                cls: 'ta-search-field',
                beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                padding: 10,
                xtype:'textfield',
                msgTarget: 'side',
            },
            layout: {
                type: 'column'
            },
            items: [{
                fieldLabel: 'Name',
                name: 'candidatename',
                allowBlank: false,
               // vtype: 'alphanum',
                columnWidth:0.5,
                emptyText: 'Please enter user name'
            }, {
                fieldLabel: 'Email',
                name: 'email',
                vtype: 'email',
                allowBlank: false,
                columnWidth:0.5,
                emptyText: 'user@example.com'
        }, {
                fieldLabel: 'Phone',
                name: 'phone',
                xtype:'numberfield',
                columnWidth:0.5,
                allowBlank: false,
                minValue: 0, //prevents negative numbers
                // Remove spinner buttons, and arrow key and mouse wheel listeners
                hideTrigger: true,
                keyNavEnabled: false,
                maxLength:12,
                minLength: 10,
                regex:/^[0-9]*$/i,
                invalidText:"Please enter valid data",
                mouseWheelEnabled: false,
                emptyText: 'Please enter mobile number'
            }, {
                fieldLabel: 'Location',
                name: 'location',
                allowBlank: false,
                columnWidth:0.5,
                emptyText: 'Please enter location'
        }, {
                    xtype: 'form',
                    columnWidth:0.49,
                    margin:'0 0 0 10',
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
                        bind:{
                            readOnly:'{joiend}'
                        },
                        listeners: {
                            change: 'onCVupload'
                        },
                        fieldLabel: "Upload CV :",
                    }]
        }, {
                xtype:'hiddenfield',
                name: 'curriculumvitae'
        }, {
                fieldLabel: 'How do you know this person ?',
                name: 'relation',
                beforeLabelTextTpl: '',
                columnWidth:1,
                xtype: "textarea"
        },{
                fieldLabel: 'Recommendation',
                name: 'recommendation',
                beforeLabelTextTpl: '',
                columnWidth:1,
                xtype: "textarea"
            }]
        }]  
    }]
});