Ext.define('Redeem.order.attribute.AttributeWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Redeem.order.attribute.AttributeWindowController',
        'Redeem.order.attribute.AttributeWindowViewModel'
    ],

    alias: 'widget.attributewindow',

    title: 'Attribute',

    controller: 'attributewindowcontroller',
    viewModel: {
        type: 'attributewindowviewmodel'
    },

    initComponent: function() {
        this.callParent(arguments);
        var comboStore = Ext.getStore('Redeem.store.AttributeJsonStore');

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

    cls: 'attributevalue-win-cls',
    modal: true,
    width: 600,
    height: 280,
    closable: false,
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
                name:'savebtn',
                cls: 'karmaform-save-btn',
                // //formBind: true,
                listeners: {
                    click: 'onFormSaveClick'
                }
            }]
        },
        height: 230,
        items: [{
                xtype: 'hiddenfield',
                name: 'ddo_productattribute_id'
            }, {
                xtype: 'combobox',
                name: 'name',
                allowBlank: false,
                reference: 'selectEmployee',
                displayField: 'name',
                valueField: 'value',
                typeAhead: true,
                forceSelection: true,
                minChars: 1,
                emptyText: 'Attribute',
                cls: 'rule-name-cls',
                queryMode: 'local',
                lastQuery: '',
                store: 'Redeem.store.AttributeJsonStore',
                listeners:{
                    change:'onEmployeeClick'
                }
            },
            /*{
                       xtype: 'textfield',
                       allowBlank: false,
                       name: 'name',
                       emptyText: 'Name',
                       required: true,
                       cls: 'rule-name-cls'
                   }, */
            {
                xtype: 'textfield',
                name: 'code',
                emptyText: 'Code',
                allowBlank: false,
                cls: 'rule-name-cls',
                listeners:{
                    change:'onCodeChange'
                }
            }
        ]
    }]
});