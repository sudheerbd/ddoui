Ext.define('DDO.view.karmasetup.karma.KarmaForm', {
    extend: 'Ext.form.Panel',

    alias: 'widget.karmaform',

    margin: '10 5 15 45',
    cls: 'karma-winform-cls',

    items: [{
        xtype: 'textfield',
        allowBlank: false,
        name: 'name',
        emptyText: 'Name',
        cls: 'karma-name-cls',
        listeners: {
            blur: function() {
                var val = this.getValue().trim(),
                    valTrim = val.replace(/[ ]{2,}/gi, " ");
                this.setValue(valTrim);
            }
        }
    }, {
        xtype: 'hiddenfield',
        name: 'ddo_karma_id'
    }, {

        xtype: 'textfield',
        name: 'description',
        emptyText: 'Description',
        allowBlank: false,
        cls: 'karma-desc-cls'
    }, {
        xtype: 'combobox',
        name: 'karmacategoryid',
        reference: 'karmaCategory',
        displayField: 'name',
        valueField: 'ddo_karmacategory_id',
        emptyText: 'Karma Category',
        cls: 'employeeCombo-cls',
        editable: false,
        allowBlank: false,
        store: 'karmasetup.KarmaCategoriesStore'
    }, {
        xtype: 'combobox',
        name: 'walletid',
        reference: 'walletRef',
        displayField: 'employeename',
        valueField: 'ddo_wallet_id',
        emptyText: 'Select wallet',
        cls: 'employeeCombo-cls',
        editable: false,
        allowBlank: false,
        store: 'karmasetup.wallet.WalletComboStore',
        listeners: {
            beforequery: function (queryPlan, eOpts) {
                var walletstore = queryPlan.combo.store;
                walletstore.load();
            }
        }
    }, {
        xtype: 'container',
        layout: 'hbox',
        pack: 'center',
        items: [{
            xtype: 'checkbox',
            boxLabel: 'Show on Timeline',
            cls: 'karmasetup-checkbox-cls sharable-cls',
            name: 'showontimeline',
            reference: 'timelineref',
            inputValue: 'Y'
        }, {
            xtype: 'checkbox',
            boxLabel: 'Auto Approval',
            bind:{
                disabled:'{autoapprovalState}',
                value:'{autoapproval}'
            },
            cls: 'karmasetup-checkbox-cls approval-check-cls',
            name: 'autoapproval',
            reference: 'autoapprovalref',
            inputValue: 'Y'
        }]
    }, {
        xtype: 'container',
        // height:100,
        layout: 'hbox',
        pack: 'center',
        items: [{
            xtype: 'checkbox',
            boxLabel: 'Rule Based',
            cls: 'karmasetup-checkbox-cls',
            name: 'isrulebased',
            reference: 'rulebasedref',
            inputValue: 'Y',
            bind: '{isRuleBased}',
            listeners: {
                change: 'onRuleCheckChange'
            }
        }, {
            xtype: 'checkbox',
            boxLabel: 'Rating Based',
            cls: 'karmasetup-checkbox-cls rating-check-cls',
            name: 'isratingbased',
            reference: 'ratingeref',
            bind: '{isRatingBased}',
            inputValue: 'Y',
            listeners: {
                change: 'onRatingCheckChange'
            }
        }]
    }, {
        xtype: 'combobox',
        name: 'ddo_karmarule_id',
        reference: 'checkComboRef',
        displayField: 'name',
        valueField: 'ddo_karmarule_id',
        emptyText: 'Select Rule',
        cls: 'employeeCombo-cls',
        editable: false,
        bind: {
            hidden: '{checkComboDisplay}'
            // store : '{karmarulestore}'
        },
       store: 'karmasetup.KarmaRuleStore',
        listeners: {
            select: 'onRuleSelect'
        }
    }, {
        xtype: 'textfield',
        allowBlank: false,
        name: 'checkChangeText',
        hidden: true
    }],
    bbar: {
        layout: {
            type: 'hbox'
        },
        padding: 20,
        items: [{
            xtype: 'button',
            text: 'Cancel',
            cls: 'karmaform-cancel-btn',
            listeners: {
                click: 'onFormCancelClick'
            }
        }, {
            xtype: 'button',
            text: 'Save & Continue',
            cls: 'karmaform-save-btn',
            formBind: true,
            listeners: {
                click: 'onFormSaveClick'
            }
        }]
    }
});