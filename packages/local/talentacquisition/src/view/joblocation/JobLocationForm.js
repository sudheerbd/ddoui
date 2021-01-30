Ext.define('TalentAcquisition.view.joblocation.JobLocationForm', {
    extend: 'Ext.form.Panel',
    requires: [],
    alias: 'widget.joblocationform',
    initComponent: function() {
        this.callParent(arguments);
        var controller = this.up('joblocationview').getController();
    },

    items: [{
        xtype: 'form',
        bbar: {
            layout: {
                type: 'hbox'
            },
            padding: '25 0 21 0',
            cls:'appwindow-cls',
            items: [{
                xtype: 'button',
                text: 'Cancel',
                cls: 'app-window-cancel-btn',
                handler: 'eastContainerCollapse'
            }, {
                xtype: 'button',
                text: 'Save',
                cls: 'app-window-save-btn',
                formBind: true,
                handler: 'eastContainerCollapse',
                listeners: {
                     click: 'onFormSaveClick'
                }
            }]
        },
        //cls: 'rule-winform-cls',
        items: [{
            xtype: 'hiddenfield',
            name: 'ddo_joblocation_id'
        }, {
            xtype: 'textfield',
            allowBlank: false,
            name: 'name',
            emptyText: 'Name',
            msgTarget:'side',
            required: true,
            cls: 'rule-name-cls'
        }, {
            xtype: 'textfield',
            name: 'description',
            emptyText: 'Description',
            cls: 'rule-name-cls'
        }]
    }]
});