

Ext.define('DDO.view.setup.clientdashboard.ClientdashboardWindow',{
    extend:'DDO.ux.window.FormPanel',
    requires:['DDO.ux.window.FormPanel',
            'DDO.view.setup.clientdashboard.ClientDashboardWindowController'
        ],
    alias:'widget.clientdashboardwindow',
    controller:'clientdashboardwindowcontroller',
    title:'Clients',
    listeners: {
        show: function(win, opts) {
            win.center();
        }
    },

    width:Constants.ViewportWidth*0.44,
    height: Constants.ViewportHeight*0.5,

    items:[{
        xtype:'form',
        bbar: {
            layout: {
                type: 'hbox'
            },
            padding: '25 0 21 0',
            items: [{
                xtype: 'button',
                text: 'CANCEL',
                cls: 'karmaform-cancel-btn',
                listeners: {
                    click: 'onFormCancelClick'
                }
            }, {
                xtype: 'button',
                text: 'SAVE',
                cls: 'karmaform-save-btn',
                formBind: true,
                listeners: {
                    click: 'onFormSaveClick'
                }
            }]
        },
        items:[{
            // xtype: 'hiddenfield',
            // name: 'ddo_skills_id'
        },{
            xtype:'textfield',
            allowBlank:false,
            name:'name',
            emptyText:'client name',
            required:true,
            cls: 'rule-name-cls'
        },{
            xtype:'textfield',
            allowBlank:false,
            name:'description',
            emptyText:'Description',
            required:true,
            cls: 'rule-name-cls'
        }]
    }]
});