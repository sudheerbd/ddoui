/**
 * This view is responsible for creation of new wallet and audit of already exist wallets.
 * @class DDO.view.karmasetup.wallet.WalletWindowView,
 * @extends DDO.ux.window.FormPanel
 * @alias widget.ddowalletwindow
 * @viewModel : 'DDO.view.karmasetup.wallet.WalletWindowViewModel'
 * @controller : 'DDO.view.karmasetup.wallet.WalletWindowViewController'
 */
Ext.define('DDO.view.karmasetup.wallet.WalletWindowView', {
    extend: 'DDO.ux.window.FormPanel',

    alias: 'widget.ddowalletwindow',

    requires: [
        'DDO.view.karmasetup.wallet.WalletWindowViewModel',
        'DDO.view.karmasetup.wallet.WalletWindowViewController'
    ],

    controller: 'walletwindowview',
    viewModel: {
        type: 'walletwindowview'
    },

    cls: 'rule-window-cls formWindow-cls',
    title: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.ADDWALLET,
    reference: 'formviewPanel',
    bind: {
        height: '{walletWindowHeight}'
    },
    initComponent: function() {
        this.callParent(arguments);
        var controller = this.getController();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    
    listeners: {
        show: function(win, opts) {
            win.center();
        }
    },

    items: [{
        xtype: 'form',
        bbar: {
            layout: {
                type: 'hbox'
            },
            padding: 20,
            items: [{
                xtype: 'button',
                text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.CANCEL,
                cls: 'karmaform-cancel-btn',
                listeners: {
                    click: 'onFormCancelClick'
                }
            }, {
                xtype: 'button',
                text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.SAVE,
                cls: 'karmaform-save-btn',
                formBind: true,
                listeners: {
                    click: 'onFormSaveClick'
                }
            }]
        },
        reference: 'formFields',
        items: [
            {
                xtype: 'combobox',
                name: 'walletType',
                required: true,
                reference: 'walletType',
                displayField: 'wallettype',
                valueField: 'wallettype',
                typeAhead: true,
                forceSelection: true,
                minChars: 1,
                emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.SELECTWTYPE,
                cls: 'employeeCombo-cls',
                queryMode: 'local',
                lastQuery: '',
                allowBlank: false,
                bind: {
                    store: '{walletTypeStore}',
                    disabled: '{nonEditablePermit}',
                    value: '{walletTypeValue}'
                },
            },
            {
            xtype: 'combobox',
            name: 'empid',
            required: true,
            reference: 'selectEmployee',
            displayField: 'empname',
            valueField: 'empid',
            typeAhead: true,
            forceSelection: true,
            minChars: 1,
            emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.SELECTEMPLOYEE,
            cls: 'employeeCombo-cls',
            queryMode: 'local',
            lastQuery: '',
            allowBlank: false,
            bind: {
                disabled: '{hideEmpId}'||'{nonEditablePermit}',
                value: '{empid}',
                hidden: '{hideEmpId}'
            },
            store: 'karmasetup.wallet.EmployeeComboStore'
        }, {
            xtype: 'hiddenfield',
            name: 'ddo_wallet_id'
        }, {
            items: [{
                xtype: 'container',
                layout: 'hbox',
                pack: 'center',
                items: [{
                    xtype: 'numberfield',
                    name: 'points',
                    required: true,
                    emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.POINTS,
                    hideTrigger: true,
                    minLength: 1,
                    maxLength:8,
                    enforceMaxLength:true,
                    enforceMinLength: true,
                    enableKeyEvents: true,
                    reference: 'points',
                    bind: {
                        value: '{points}'
                    },
                    cls: 'employeePoints-cls',
                    allowBlank: false
                }, {
                    xtype: 'tbspacer',
                    width: 22
                }, {
                    xtype: 'combobox',
                    name: 'yearid',
                    reference: 'year',
                    required: true,
                    allowBlank: false,
                    emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.YEAR,
                    cls: 'employeeYear-cls',
                    bind: {
                        disabled: '{nonEditablePermit}',
                        value: '{yearid}'
                    },
                    displayField: 'yearname',
                    valueField: 'yearid',
                    editable: false,
                    bind: {
                        store: '{yearComboStore}'
                    }
                }]
            }]
        }, {
            xtype: 'textfield',
            cls: 'employeeDesc-cls',
            reference: 'description',
            allowBlank: false,
            emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.DESCRIPTION,
            name: 'description',
            bind: {
                value: '{description}'
            }
        }, {
            xtype: 'checkbox',
            boxLabel: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.SHARABLE,
            cls: 'karmasetup-checkbox-cls',
            name: 'sharable',
            reference: 'sharable',
            value: 'N',
            inputValue: 'Y'
        }]
    }]
});