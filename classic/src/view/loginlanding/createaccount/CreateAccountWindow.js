Ext.define('DDO.view.loginlanding.createaccount.CreateAccountWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'DDO.ux.window.FormPanel',
        'DDO.view.loginlanding.createaccount.CreateAccountWindowViewController',
        'DDO.view.loginlanding.createaccount.CreateAccountWindowViewModel',
        'DDO.store.setup.employeesetup.CountryComboStore'
    ],

    alias: 'widget.createaccountwindow',

    controller: 'createaccountviewcontroller',
    viewModel: {
        type: 'createaccountviewmodel'
    },

    initComponent: function() {
        var controller;

        this.callParent(arguments);

        controller = this.getController();

        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    width: 550,

    modal: true,
    resizable: false,
    cls: 'rule-window-cls',
    closable: false,

    title: 'Registration',

    items: [{
        xtype: 'form',
        width: '100%',
        height: '100%',
        bodyPadding: '20 20',
        layout: {
            type: 'vbox',
            align: 'middle',
            pack: 'center'
        },

        bbar: {
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'button',
                text: 'Cancel',
                cls: 'karmaform-cancel-btn',
                listeners: {
                    click: 'onFormCancelClick'
                }
            }, {
                xtype: 'button',
                text: 'Create Account',
                cls: 'karmaform-save-btn',
                formBind: true,
                listeners: {
                    click: 'onFormSaveClick'
                }
            }]
        },

        cls: 'createaccount-cls',

        defaults: {
            width: '90%',
            msgTarget: 'side',
            labelSeparator: '&nbsp;&nbsp;&nbsp;&nbsp;:'
        },

        items: [{
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            defaults: {
                msgTarget: 'side'
            },
            items: [{
                xtype: 'textfield',
                allowBlank: false,
                name: 'company',
                width: 455,
                emptyText: 'Company',
                enableKeyEvents: true,
                listeners: {
                    focusleave: 'onCompanyMouseOut',
                    keyup: 'onCompanyMouseIn'
                }
            }, {
                xtype: 'image',
                reference: 'tickIcon',
                hidden: true,
                width: 18,
                height: 17,
                src: 'resources/images/correct_icon.png',
                alt: 'icon.png',
                cls: 'validTick-icon-field',
                listeners: {
                    afterrender: 'regImageToolTip'
                }
            }]
        }, {
            xtype: 'component',
            html: AlertMessages.companyExists,
            hidden: true,
            reference: 'errcontent',
            padding: '4 10'
        }, {
            xtype: 'container',
            padding: '8 0 0 0',
            layout: {
                type: 'hbox'
            },
            defaults: {
                msgTarget: 'side',
                width: '50%'
            },
            items: [{
                xtype: 'textfield',
                allowBlank: false,
                name: 'firstname',
                padding: '0 0 10 0',
                emptyText: 'First Name'
            }, {
                xtype: 'textfield',
                allowBlank: false,
                padding: '0 5 10 21',
                name: 'lastname',
                emptyText: 'Last Name'
            }]
        }, {
            xtype: 'container',
            padding: '0 0 8 0',
            layout: {
                type: 'hbox'
            },
            defaults: {
                msgTarget: 'side'
            },
            items: [{
                xtype: 'textfield',
                allowBlank: false,
                name: 'email',
                emptyText: 'Email',
                vtype: 'email',
                width: 455,
                enableKeyEvents: true,
                listeners: {
                    focusleave: 'onOrgEmailMouseOut',
                    keyup: 'onOrgEmailMouseIn'
                }
            }, {
                xtype: 'image',
                reference: 'emailTickIcon',
                hidden: true,
                width: 18,
                height: 17,
                src: 'resources/images/correct_icon.png',
                alt: 'icon.png',
                cls: 'validTick-icon-field',
                listeners: {
                    afterrender: 'regImageToolTip'
                }
            }]
        }, {
            xtype: 'component',
            html: AlertMessages.orgEmailExists,
            hidden: true,
            reference: 'existEmail',
            padding: '4 10'
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            defaults: {
                msgTarget: 'side'
            },
            items: [{
                xtype: 'numberfield',
                allowBlank: false,
                name: 'phnum',
                width: 455,
                enforceMaxLength: true,
                maxLength: 10,
                regex: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                regexText: 'Enter Valid phone number ex: 9848012345',
                hideTrigger: true,
                emptyText: 'Phone Number',
                enableKeyEvents: true,
                listeners: {
                    focusleave: 'onPhNumMouseOut',
                    keyup: 'onPhNumMouseIn'
                }
            }, {
                xtype: 'image',
                reference: 'phTickIcon',
                hidden: true,
                width: 18,
                height: 17,
                src: 'resources/images/correct_icon.png',
                alt: 'icon.png',
                cls: 'validTick-icon-field',
                listeners: {
                    afterrender: 'regImageToolTip'
                }
            }]
        }, {
            xtype: 'component',
            html: AlertMessages.phNumExists,
            hidden: true,
            reference: 'existNumber',
            padding: '4 10'
        }, {
            xtype: 'container',
            padding: '8 0 0 0',
            layout: {
                type: 'hbox'
            },
            defaults: {
                msgTarget: 'side'
            },
            items: [{
                // xtype: 'combobox',
                xtype: 'textfield',
                // forceSelection: true,
                width: '100%',
                allowBlank: false,
                // hidden: true,
                reference: 'designationComboRef',
                padding: '0 0 10 0',
                name: 'designation',
                emptyText: 'Designation',
                // queryMode: 'local',
                // store: 'registration.DesignationComboStore',
                // displayField: 'name',
                // valueField: 'value',
                // listeners: {
                //     select: 'onDesignationSelect'
                // }
            }, {
                xtype: 'textfield',
                reference: 'otherDesignationRef',
                maxLength: 24,
                width: '50%',
                allowBlank: true,
                enforceMaxLength: true,
                padding: '0 5 10 21',
                hidden: true,
                name: 'otherdesignation',
                emptyText: 'Designation'
            }]
        }]
    }]
});