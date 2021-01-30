Ext.define('Redeem.order.product.SetAttributesTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.setattributes',
    title: 'Attributes',

    initComponent: function() {
        this.callParent(arguments);
        var comboStore = Ext.getStore('Redeem.store.AttributeStore'),
            attributeValueComboStore = Ext.getStore('Redeem.store.AttributeValueStore');

        if (comboStore && !comboStore.isLoaded()) {
            comboStore.load();
            attributeValueComboStore.load();
        }

    },
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
            text: 'Save and Continue',
            cls: 'karmaform-save-btn',
            formBind: true,
            listeners: {
                click: 'onFormSaveClick'
            }
        }]
    },

    items: [{

        xtype: 'form',
        layout: 'column',
        width: 600
    }, {
        xtype: 'grid',
        bind: {
            title: '{product_name} Attributes'
        },
        maxHeight: 200,
        margin: 5,
        columnLines: true,
        rowLines: false,
        store: 'Redeem.store.SetAttributeStore',
        cls: 'redeemhistoryitems-grid-view',
        columns: [{
            text: 'Attribute Code',
            dataIndex: 'attribute_code',
            flex: 1
        }, {
            text: 'Qty',
            dataIndex: 'quantity',
            flex: 0.5
        }, {
            xtype: 'actioncolumn',
            //width: 50,
            align: 'center',
            items: [{
                iconCls: 'delete-plus',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    var gridStore = grid.getStore(),
                        rec = gridStore.getAt(rowIndex);
                    gridStore.remove(rec);

                }
            }]
        }],
        listeners: {

            rowdblclick: 'onSetAttributesGridRowClick',
            afterrender:function(me,e,eOpts){
                var attributeValueComboStore = Ext.getStore('Redeem.store.AttributeValueStore');
                 Utility.addAttributes(attributeValueComboStore);
            }
        }

    }]
});