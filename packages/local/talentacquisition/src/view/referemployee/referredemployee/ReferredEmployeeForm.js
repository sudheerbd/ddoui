Ext.define('TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeForm', {
    extend: 'Ext.form.Panel',
    required: ['TalentAcquisition.store.jobapplication.JobApplicationStore'],
    alias: 'widget.referredemployeeform',
    defaults: {
       // labelSeparator: '',
        width: '100%'
    },
    padding: 20,
    scrollable: true,
    hideButton: true,
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'stretch'//
    },
    bbar: {
        layout: {
            type: 'hbox'
        },
        cls:'appwindow-cls',
        padding: '25 0 21 0',
        items: [{
            xtype: 'button',
            text: 'Reject',
            cls: 'app-window-cancel-btn',
           // handler: 'onFormSaveClick',
            listeners: {
                click: 'onFormSaveClick'
            }
        }, {
            xtype:'button',
            text:'Convert',
            cls: 'app-window-save-btn',
            handler: 'onConvertToApplication'
        }]
    },
    items: [{
        xtype: 'container',
        defaults: {
            //labelSeparator: '',
            width: '50%',
            padding: 10,
            editable: false,
            xtype:'textfield',
            cls: 'rule-name-cls'
        },
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [{
            xtype: 'hiddenfield',
            name: 'ddo_jobopenings_id' //
        },{
            xtype: 'hiddenfield',
            name: 'ddo_jobapplicationstatus_id'
        }, {
            xtype: 'hiddenfield',
            name: 'referredby'
        },{
            xtype: 'hiddenfield',
            name: 'ddo_employeereferral_id'
        },{
            xtype:'hiddenfield',
            name: 'curriculumvitae'
        }, {
            name: 'ddo_jobopenings_name',
            fieldLabel: 'Job Opening',
            submitValue: false
        }, {
            fieldLabel: 'Main skill',
            name: 'primaryskills'
            }]
    }, {
        xtype:'fieldset',
         title: 'Candidate Details',
         items:[{
            xtype: 'container',
            defaults: {
                //labelSeparator: '',
                cls: 'ta-search-field',
                width: '50%',
                padding: 10,
                editable: false,
                xtype:'textfield'
            },
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                fieldLabel: 'Name',
                name: 'candidatename'                
            }, {
                fieldLabel: 'Location',
                name: 'location',
                emptyText: 'location'
            }]
        }, {
            xtype: 'container',
            defaults: {
                //labelSeparator: '',
                cls: 'ta-search-field',
                width: '50%',
                padding: 10,
                msgTarget: 'side',
                xtype:'textfield',
                editable: false
            },
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                fieldLabel: 'Email',
                name: 'email',

            }, {
                fieldLabel: 'Phone',
                name: 'phone',
                xtype:'numberfield',
                hideTrigger:true
            }]
        }, {
            xtype: 'container',
            defaults: {
                editable: false,
                width: '100%',
                padding: 10,
                cls: 'ta-search-field'
            },

            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                fieldLabel: 'How do you know this person',
                name: 'relation',
                xtype: "textarea"
            }]
        },{
            xtype: 'container',
            defaults: {
                width: '100%',
                padding: 10,
                cls: 'ta-search-field',
                editable: false,
                labelWidth: '20%'
            },

            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [ {
                fieldLabel: 'Recommendation',
                name: 'recommendation',                
                xtype: "textarea"

            }]
        }]
    }, /*{
            xtype: 'container',
            defaults: {
                width: '50%',
                padding: 10
            },

            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
            xtype: 'combobox',
            name: 'ddo_jobapplicationstatus_id',
            fieldLabel: 'Choose Status',
            cls: 'rule-name-cls',
            editable: false,
            store: {
                    type: 'jobapplicationstatusstore'
                },
                allowBlank: false,
            displayField: 'name',
            valueField: 'ddo_jobapplicationstatus_id'
        }{
           xtype: 'combobox',
           fieldLabel: 'Choose Status',
           store: new Ext.data.SimpleStore({
                   data: [
                       ["hold", 'On Hold'],
                       ["convert", 'Convert toApplication'],
                       ["refect", 'Reject']                 
                   ],
                   fields: ['value', 'text']
               }),
               valueField: 'value',
               name: 'ddo_jobapplicationstatus_id',
               displayField: 'text',
               triggerAction: 'all',
               editable: false
           }, {
                    xtype:'button',
                    text:'Convert to Application',
                    width: 300,
                    cls:'request-access-btn convert-to-app-btn',
                    //scale: 'medium',
                    margin: '0 0 0 50',
                    handler: 'onConvertToApplication'
                }]  
    }*/],
    listeners:{
        activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            //this.down('referredemployeegrid').getStore().load();
        }
}
});