Ext.define('Redeem.order.attributevalue.AttributeValueWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Redeem.order.attributevalue.AttributeValueWindowController',
        'Redeem.order.attributevalue.AttributeValueWindowViewModel'
    ],

    alias: 'widget.attributevaluewindow',

    title: 'Attribute Value',

    controller: 'attributevaluewindowcontroller',
    viewModel: {
        type: 'attributevaluewindowviewmodel'
    },

    initComponent: function() {
        this.callParent(arguments);
        var comboStore = Ext.getStore('Redeem.store.AttributeStore');

        if (comboStore && !comboStore.isLoaded()) {
            comboStore.load();
        }

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

    closable: false,

    cls: 'attributevalue-win-cls',
    modal: true,
    width: 600,
    height: 280,
    items: [{
        xtype: 'form',

        bbar: {
            layout: {
                type: 'hbox'
            },
            padding: '25 0 20 0',
            items: [{
                xtype: 'button',
                text: 'Cancel',
                cls: 'karmaform-cancel-btn',
                listeners: {
                    click: 'onFormCancelClick'
                }
            }, {
                xtype: 'button',
                text: 'Save',
                cls: 'karmaform-save-btn',
                formBind: true,
                listeners: {
                    click: 'onFormSaveClick'
                }
            }]
        },
        height: 250,
        items: [{
            xtype: 'hiddenfield',
            name: 'ddo_productattribute_value_id'
        }, {
            xtype: 'combobox',
            allowBlank: false,
            name: 'ddo_productattribute_id',
            reference: 'selectEmployee',
            displayField: 'name',
            valueField: 'ddo_productattribute_id',
            typeAhead: true,
            forceSelection: true,
            minChars: 1,
            emptyText: 'Attribute',
            cls: 'rule-name-cls',
            queryMode: 'local',
            lastQuery: '',
            store: 'Redeem.store.AttributeStore'
        }, {
            xtype: 'textfield',
            allowBlank: false,
            name: 'productattributevalue',
            emptyText: 'Attribute Value',
            required: true,
            cls: 'rule-name-cls'
        }, {
            xtype: 'textfield',
            name: 'code',
            allowBlank: false,
            emptyText: 'Code',
            cls: 'rule-name-cls'
        }]
    }]
});