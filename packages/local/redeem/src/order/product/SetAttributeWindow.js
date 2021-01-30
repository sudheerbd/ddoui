Ext.define('Redeem.order.product.SetAttributeWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Redeem.order.product.SetAttributeWindowController',
        'Redeem.order.product.SetAttributeWindowViewModel',
        'Redeem.order.product.SetAttributesTab',
        'Redeem.order.product.SetProductImagesTab',
        'Redeem.order.product.ProductValueForm'
    ],
    header: false,

    alias: 'widget.setattributewindow',

    controller: 'setattributewindowcontroller',
    viewModel: {
        type: 'setattributewindowviewmodel'
    },

    initComponent: function() {
        this.callParent(arguments);
        var comboStore = Ext.getStore('Redeem.store.AttributeStore'),
            attributeValueComboStore = Ext.getStore('Redeem.store.AttributeValueStore');

        if (comboStore && !comboStore.isLoaded()) {
            comboStore.load();
            attributeValueComboStore.load();
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
    constrain: true,
    layout: 'fit',
    resizable: false,
    items: [{
        xtype: 'tabpanel',
        padding: '20 0 0 0',
        cls: 'wallethistorytab-cls',
        tabBar: {
            layout: {
                pack: 'center'
            },
            height: 70
        },
        items: [{
            xtype: 'productvalueform'
        }, {
            xtype: 'setattributes'
        }, {
            xtype: 'setproductimagestab'
        }],
        listeners:{
            beforetabchange:'onBeforeTabChange'
        }
    }]
});