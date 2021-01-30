Ext.define('DDO.view.vendoraccessapp.FindAppForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.findappform',
    cls: 'findappcnt-cls',
    reference: 'findappform',
    width: '100%',
    margin: '20 0',
    title: ' Job Application Details',
    items: [{
            xtype: 'form',
            // title: 'Application Details',
            cls: 'job-header',
            margin: '30 185',
            width: '80%',
            style: 'padding-top: 15px;',
            reference: 'appform',
            layout: {
                type: 'vbox',
                align: 'middle',
                pack: 'center'
            },
            border: false,
            defaults: {
                width: '37%',
                labelAlign: 'center',
                labelWidth: 180,
                margin: '0 0 0 30',
                padding: 5,
                labelStyle: 'font-size:16px;'
            },
            // buttonAlign: 'center',      
            items: [{
                    xtype: 'textfield',
                    name: 'mobile', // same as field name in the table
                    required: true,
                    cls:'mobiletextfield-cls',
                    maskRe: /^[0-9]*$/,
                    minLength: 10,
                    maxLength: 10,
                    enforceMaxLength: true,
                    reference: 'jobtitleref',
                    emptyText: 'Enter Mobile Number to search',
                    emptyCls: 'referrals-empty-text',
                    allowBlank: false, // requires a non-empty value
                    afterLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>'
                }, {
                    xtype: 'button',
                    width: 10,
                    height: 10,
                    formBind: true,
                    cls: 'app-search-icon'
                    // listeners: {
                    //     click: 'onAppSearch'
                    // }

                }, {
                    xtype:'button',
                    text: 'Search',
                    cls: 'searchverifybtn-cls',
                    margin: '0 0',
                    width: '120px',
                    formBind: true,
                    listeners: {
                        click: 'onAppSearch'
                    }
                },
                {
                    xtype: 'displayfield',
                    hidden: true,
                    reference: 'displayEnquiryName',
                    // beforeLabelTextTpl:'Already Applicant Details are Existing',
                    fieldLabel: 'Applicant Name',
                    // name: 'home_score',
                    //value: '10',

                    cls: 'msglabel-cls'
                },
                {
                    xtype: 'displayfield',
                    hidden: true,
                    reference: 'displayEnquiryEmail',
                    fieldLabel: 'Email ID',

                    // name: 'home_score',
                    //value: '10',
                    cls: 'msglabel-cls'
                },
                {
                    xtype: 'displayfield',
                    hidden: true,
                    reference: 'displayEnquiryMobileNo',
                    fieldLabel: 'Mobile Number',

                    // name: 'home_score',
                    //value: '10',
                    cls: 'msglabel-cls'
                }
            ]

        },{
            xtype:'container',
            cls:'labelcnt-cls',
            width:'90%',
            items:[{
                xtype: 'label',
                hidden: false,
                reference: 'enquiryDetailsResults',
                html: '<span style=color:#818181;>Results:</span>',
                cls: 'msglabelnodata-cls'
            },
            {
                xtype: 'label',
                hidden: true,
                reference: 'enquiryDetails',
                html: 'Application found for the given identification details',
                cls: 'textmsglabel-cls'
            },
            {
                xtype: 'label',
                hidden: true,
                reference: 'enquiryDetailsNotfound',
                html: '<span style=color:#818181;>Results: </span>No application available for the given Mobile Number!',
                cls: 'msglabelnodata-cls'
            }]
        },        
        {
            xtype: 'gridpanel',
            height: 100,
            width: 800,
            cls: 'karmalist-cls findappcnt-cls',
            style: 'margin-left: 23%;border:1px solid #efe8e8; background: black;',
            bind: {
                store: '{findappgridstore}'
            },
            columns: [{
                text: 'Name',
                dataIndex: 'name',
                flex: 0.3
            }, {
                text: 'Email ID',
                dataIndex: 'email',
                flex: 0.4
            }, {
                text: 'Mobile Number',
                dataIndex: 'mobile',
                flex: 0.4
            }]
        }
    ]
});