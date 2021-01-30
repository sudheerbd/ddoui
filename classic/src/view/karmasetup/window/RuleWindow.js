/**
 * The file DDO.view.karmasetup.window.Rule is the window view which comes by clicking on Add New button or grid row.
 * @extends {DDO.ux.window.FormPanel}.
 * @alias 'widget.rule'.
 */
Ext.define('DDO.view.karmasetup.window.RuleWindow', {
    extend: 'DDO.ux.window.FormPanel',

    requires: [
        'DDO.view.karmasetup.RuleViewController',
        'DDO.view.karmasetup.RuleViewModel'
    ],
    height:Constants.ViewportHeight*0.44,
    alias: 'widget.rule',
    controller: 'ruleviewcontroller',
    viewModel: {
        type: 'ruleviewmodel'
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
            padding: '25 0 21 0',
            items: [{
                xtype: 'button',
                text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.CANCEL,
                cls: 'karmaform-cancel-btn',
                listeners: {
                    click: 'onFormCancelClick'
                }
            }, {
                xtype: 'button',
                text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.SAVE,
                cls: 'karmaform-save-btn',
                bind: {
                    disabled: '{karmarulesavebutton}'
                },
                listeners: {
                    click: 'onFormSaveClick'
                }
            }]
        },
        items: [{
            xtype: 'hiddenfield',
            name: 'ddo_karmarule_id'
        }, {
            xtype: 'hiddenfield',
            name: 'ddo_karmacategory_id'
        }, {
            xtype: 'textfield',
            allowBlank: false,
            name: 'name',
            emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.NAME,
            required: true,
            cls: 'rule-name-cls',
        
            listeners: {
                blur : 'enterTrimValue',
                change:'onRuleNameChange'
            }
        }, {

            xtype: 'textfield',
            name: 'description',
            emptyText:LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.DESCRIPTION,
            cls: 'rule-desc-cls',
            listeners: {
                change:'onRuleNameChange'
            }
        },{
            xtype: 'checkboxfield',
            name : 'self_nominate',
            boxLabel:LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.SELFNOMINATE,
            labelAlign: 'right',
            bind:{
                hidden: '{checkBoxHidden}'
            },
            margin: '0 0 0 50',
            inputValue: true,
            uncheckedValue: false,
            listeners: {
                focusenter:'onRuleNameChange'
            }
        },{
            xtype: 'combobox',
            name: 'ruletype',
            emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.RULETYPE,
            displayField :'ruletype',
            valueField : 'ruletype',
            cls: 'rule-desc-cls',
            editable : false,
            store : Constants.karmarulestore,
            listeners : {
                change : 'onRuleNameChange'
            }, bind:{
                hidden: '{ruletypeHidden}'
            }
        }]
    }]
});