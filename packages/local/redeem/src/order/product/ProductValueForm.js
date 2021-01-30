Ext.define('Redeem.order.product.ProductValueForm', {
    extend: 'Ext.form.Panel',

    requires: [
        'Redeem.order.product.ProductValueFormController',
        'Redeem.order.product.ProductValueFormViewModel'
    ],

    alias: 'widget.productvalueform',

    title: 'Product',

    controller: 'productvalueformcontroller',
    viewModel: {
        type: 'productvalueformviewmodel'
    },
    initComponent: function() {
        this.callParent(arguments);
        var comboStore = Ext.getStore('Redeem.store.CategoryValueStore');

        if (comboStore && !comboStore.isLoaded()) {
            comboStore.load();
        }

        var controller = this.getController();
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
        xtype: 'hiddenfield',
        name: 'ddo_product_id'
    }, {
        xtype: 'textfield',
        allowBlank: false,
        name: 'productname',
        emptyText: 'Product Name',
        required: true,
        cls: 'rule-name-cls'
    }, {
        xtype: 'combobox',
        name: 'ddo_productcategory_id',
        reference: 'selectEmployee',
        displayField: 'productcategoryname',
        valueField: 'ddo_productcategory_id',
        typeAhead: true,
        forceSelection: true,
        minChars: 1,
        emptyText: 'Category',
        cls: 'rule-name-cls',
        queryMode: 'local',
        allowBlank: false,
        lastQuery: '',
        store: 'Redeem.store.CategoryValueStore'
    }, {
        xtype: 'textfield',
        maskRe: /[0-9]/,    
        allowBlank: false,
        name: 'price',
        emptyText: 'Price',
        required: true,
        cls: 'rule-name-cls'
    }, {
        xtype: 'textfield',
        maskRe: /[0-9]/,    
        allowBlank: false,
        name: 'quantity',
        emptyText: 'Quantity',
        required: true,
        cls: 'rule-name-cls'
    }, 
    {
        xtype: 'textfield',
        name: 'code',
        emptyText: 'Code',
        enforceMaxLength:true,
        maxLength:10,
        allowBlank: false,
        cls: 'rule-name-cls'
    }
    ]

});