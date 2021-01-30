Ext.define('TalentAcquisition.view.jobsourcelines.JobSourceLinesForm', {
    extend: 'Ext.form.Panel',
    requires: ['TalentAcquisition.store.jobsourcelines.JobSourceLinesStore'],
    alias: 'widget.jobsourcelinesform',
    initComponent: function() {
        this.callParent(arguments);
        var controller = this.up('jobsourcelinesview').getController();
    },

    items: [{
        xtype: 'form',
        bbar: {
            layout: {
                type: 'hbox'
            },
            cls:'appwindow-cls',
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
            name: 'ddo_jobsourcelines_id'
        }, {
			xtype: 'combobox',
			allowBlank: false,
            msgTarget:'side',
			name: 'ddo_jobsource_id',
			emptyText: 'Job Source',
            cls: 'rule-name-cls',
            reference: 'jobSourceCombo',
            editable: false,
            store: {
                    type: 'jobsourcestore'
                },
            displayField: 'name',
            valueField: 'ddo_jobsource_id'
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