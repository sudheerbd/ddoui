Ext.define('TalentAcquisition.view.jobsource.JobSourceForm', {
    extend: 'Ext.form.Panel',
    requires: [],
    alias: 'widget.jobsourceform',
    initComponent: function() {
        this.callParent(arguments);
        var controller = this.up('jobsourceview').getController();
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
            name: 'ddo_jobsource_id'
        }, {
            xtype: 'textfield',
            allowBlank: false,
            name: 'name',
            emptyText: 'Name',
            msgTarget:'side',
            required: true,
            editable: true,
            cls: 'rule-name-cls',
            listeners: {
                focus:function(rec){
                    if(rec.value!=null || ""){
                        if( rec.value == "Job Portal" || rec.value == "Consultancy"|| rec.value == "Referred by employee"){                       
                             this.setEditable(false);
                             Ext.toast('This value cannot be changed as it is being used in another screen', false, 't');
                             //this.up().down('textfield[name=description]').setEditable(false);
                        } else{
                            this.setEditable(true);
                             //this.up().down('textfield[name=description]').setEditable(true);
                        }
                    }   
                   // if ()                  
                }
            }
        }, {
            xtype: 'textfield',
            name: 'description',
            emptyText: 'Description',
            cls: 'rule-name-cls'
        }]
    }]
});