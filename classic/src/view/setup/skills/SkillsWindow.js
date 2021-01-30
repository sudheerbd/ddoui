Ext.define('DDO.view.setup.skills.SkillsWindow',{

    extend:'DDO.ux.window.FormPanel',

    requires:['DDO.ux.window.FormPanel',
            'DDO.view.setup.skills.SkillsWindowController'],

    alias:'widget.skillswindow',

    controller:'skillswindowcontroller',

    title:'Skills',

    // initComponent: function() {
    //     this.callParent(arguments);
    //     var controller = this.getController();
    //     Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    // },

    // destroy: function() {
    //     var controller = this.getController();
    //     Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    // },
    listeners: {
        show: function(win, opts) {
            win.center();
        }
    },

    width:Constants.ViewportWidth*0.44,
    height: Constants.ViewportHeight*0.3,

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
            name: 'ddo_skills_id'
        },{
            xtype:'textfield',
            allowBlank:false,
            name:'name',
            emptyText:'skill name',
            required:true,
            cls: 'rule-name-cls'
        }]
    }]
});