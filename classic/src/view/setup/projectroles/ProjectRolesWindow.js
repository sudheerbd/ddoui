Ext.define('DDO.view.setup.projectroles.ProjectRolesWindow',{

    extend:'DDO.ux.window.FormPanel',

    requires:['DDO.ux.window.FormPanel',
    'DDO.view.setup.projectroles.ProjectRolesWindowController'
        ],

    alias:'widget.projectroleswindow',

     controller:'projectroleswindowcontroller',

    title:'Project Roles',

    
    listeners: {
        show: function(win, opts) {
            win.center();
        }
    },

    width:Constants.ViewportWidth*0.44,
    height: Constants.ViewportHeight*0.4,

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
            xtype: 'hiddenfield',
            name: 'ad_role_id'
        },{
            xtype:'textfield',
            allowBlank:false,
            name:'name',
            emptyText:'Role name',
            required:true,
            cls: 'rule-name-cls'
        },{
                xtype:'textfield',
                // allowBlank:false,
                name:'description',
                emptyText:'Description',
                required:true,
                cls: 'rule-name-cls'
        }]
    }]
});