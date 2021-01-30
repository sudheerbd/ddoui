Ext.define('Redeem.order.category.CategoryValueWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Redeem.order.category.CategoryValueWindowController',
        'Redeem.order.category.CategoryValueWindowViewModel'
    ],

    alias: 'widget.categoryvaluewindow',

    title: 'Category',

    controller: 'categoryvaluewindowcontroller',
    viewModel: {
        type: 'categoryvaluewindowviewmodel'
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
    closable:false,
    cls:'attributevalue-win-cls',
    modal:true,
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
        height: 230,
        //cls: 'rule-winform-cls',
        items: [{
            xtype: 'hiddenfield',
            name: 'ddo_productcategory_id'
        },{
            xtype: 'textfield',
            allowBlank: false,
            name: 'productcategoryname',
            emptyText: ' Category Name',
            required: true,
            cls: 'rule-name-cls'
        }, {
            xtype: 'textfield',
            name: 'code',
            maxLength: 10,
            enforceMaxLength: true,
            emptyText: 'Code',
            cls: 'rule-name-cls'
        }]
    }]
});