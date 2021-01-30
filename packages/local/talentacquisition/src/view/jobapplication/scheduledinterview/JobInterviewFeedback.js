Ext.define('TalentAcquisition.view.jobapplication.scheduledinterview.JobInterviewFeedback', {
    extend: 'Ext.window.Window',
    modal: true,
    resizable: false,
    cls: 'rule-window-cls',
    closable: false,
    closeAction: 'hide',
    requires: [
        'TalentAcquisition.store.jobinterviewrating.JobInterviewRatingStore',
        //'TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewController'
    ],

    alias: 'widget.jobinterviewfeedback',

    title: 'Job Interview Feedback',

  controller: 'scheduledinterviewcontroller',
    listeners: {
        show: function(win, opts) {
            win.center();
        }
    },

    //cls:'department-winform-cls',

    width: 700,
    height: 350,
    items: [{
        xtype: 'form',
        defaults: {
            padding: '30 0 0 30'
        },

        bbar: {
            layout: {
                type: 'hbox'
            },
            padding: '15 0 21 0',
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
        //cls: 'rule-winform-cls',
        items: [{
            xtype: 'hiddenfield',
            name: 'ddo_jobapplications_id'
        }, {
            xtype: 'combobox',
            allowBlank: false,
            name: 'ddo_jobinterviewrating_id',
            fieldLabel: 'Rating',
            cls: 'ta-search-field',
            editable: false,
            store: {
                    type: 'jobinterviewratingstore'
                },
            displayField: 'name',
            valueField: 'ddo_jobinterviewrating_id'
        },{
            xtype: 'textarea',
            fieldLabel: 'Feedback',
            cls: 'ta-search-field',
            width: '90%',
            allowBlank: false
            //emptyText: 'Feedback',
        }]
    }]
});