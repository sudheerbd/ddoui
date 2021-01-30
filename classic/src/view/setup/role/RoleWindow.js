
  
/**
*   This file is responsible for creation of new roles.
*   @extends {DDO.ux.window.FormPanel} - containing form fields.
*   @alias rolewindow
*   ViewController : 'DDO.view.setup.role.RoleWindowViewController'.
*/
Ext.define('DDO.view.setup.role.RoleWindow', {
    extend: 'DDO.ux.window.FormPanel',

    requires: [
        'DDO.ux.window.FormPanel',
        'DDO.view.setup.role.RoleWindowViewModel',
        'DDO.view.setup.role.RoleWindowViewController',
        'DDO.view.setup.role.RoleWindowGrid'
    ],

    alias: 'widget.rolewindow',
  
    title: LabelsTitles.EMPSETUP.ROLE.ROLES,
    viewModel: {
        type: 'rolewindowviewmodel'
    },
    controller: 'rolewindowviewcontroller',

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
    width: Constants.ViewportWidth * 0.44,
    height: 550,
    items: [{
        xtype: 'form',
        trackResetOnLoad: true,
        items: [{
            xtype: 'hiddenfield',
            name: 'ddo_role_id'
        },
        {
            xtype:'toolbar',
            docked:'top',
            layout: {
                type: 'hbox'
            },
            items : [
                {
                    xtype: 'checkbox',
                    boxLabel: 'Copy From Role',
                    name: 'checkbox_select',
                    padding : '10 0 0 30',
                    //header: 'Enabled',
                    //checked:true,
                    reference : 'rolecheckbox',
                     cls : 'rule-check-cls',
                    listeners: {
                        change: 'OnCheckChange'
                    } 
            },{
                xtype:'tbspacer',
                width:140
            },{
                xtype:'combo',
                emptyText : 'Role',
                queryMode : 'local',
                bind: {
                    store: '{rolesstore}'
                },
                displayField: 'role_name',
                valueField: "role_id",
                hidden:true,
                reference : 'hiddencombo',
                listeners: {
                    change: 'onRoleComboChange'
                }
            },
            // {
            //     xtype:'button',
            //     text : 'Apply',
            //     margin: '10 10 0 10',
            //     hidden:true,
            //     bind: {
            //         disabled: '{applyEnable}'
            //     },
            //     cls:'x-btn-default-small-apply',
            //     reference : 'applybutton',
            //     handler: 'onApplyClick'
            // }
            ]
        }, {
            xtype: 'textfield',
            allowBlank: false,
            name: 'name',
            emptyText: LabelsTitles.EMPSETUP.ROLE.NAME,
            reference : 'hiddentextfield',
            required: true,
            cls: 'rule-name-cls'
        }, {
            xtype: 'textfield',
            name: 'description',
            emptyText: LabelsTitles.EMPSETUP.ROLE.DESCRIPTION,
            reference : 'hiddendescriptionfield',
            cls: 'rule-desc-cls'
        },{
            xtype :'rolewindowgrid',
            height:210,
            hidden : true,
            reference : 'gridhiddenview'
        }, {
            xtype: 'toolbar',
            docked: 'bottom',
            layout: {
                type: 'hbox'
            },
            reference:'actionButtons',
            padding: '25 0 21 0',
            items: [{
                xtype: 'button',
                text: LabelsTitles.EMPSETUP.ROLE.BTNCANCEL,
                cls: 'karmaform-cancel-btn',
                listeners: {
                    click: 'onFormCancelClick'
                }
            }, {
                xtype: 'button',
                text: LabelsTitles.EMPSETUP.ROLE.SAVE,
                cls: 'karmaform-save-btn',
                formBind: true,
                listeners: {
                    click: 'onFormSaveClickFunction',
                   // click : 'onApplyClick'
                }
            }]
        }]
    }]
});