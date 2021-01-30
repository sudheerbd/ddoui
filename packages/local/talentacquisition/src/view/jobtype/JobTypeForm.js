Ext.define('TalentAcquisition.view.jobtype.JobTypeForm', {
    extend: 'Ext.form.Panel',
    requires: [],
    alias: 'widget.jobtypeform',
    initComponent: function() {
        this.callParent(arguments);
        var controller = this.up('jobtypeview').getController();
    },

    items: [{
        xtype: 'form',
        bbar: {
            cls:'appwindow-cls',
            layout: {
                type: 'hbox'
            },
            padding: '25 0 21 0',
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
            name: 'ddo_jobtype_id'
        }, {
            xtype: 'textfield',
            allowBlank: false,
            name: 'name',
            emptyText: 'Name',
            required: true,
            msgTarget:'side',
            cls: 'rule-name-cls'
        }, {
            xtype: 'textfield',
            name: 'description',
            emptyText: 'Description',
            cls: 'rule-name-cls'
        }]
    }]
});