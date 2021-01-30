Ext.define('DDO.view.changepassword.ChangePasswordWindow', {
    extend: 'DDO.ux.window.FormPanel',

    requires: [
        'DDO.ux.window.FormPanel',
        'DDO.view.changepassword.ChangePasswordWindowViewController',
        'DDO.view.changepassword.ChangePasswordWindowViewModel'
    ],

    alias: 'widget.changepasswordwindow',

    controller: 'changepasswordwindowviewcontroller',
    viewModel: {
        type: 'changepasswordwindowviewmodel'
    },

    // initComponent: function() {
    //     this.callParent(arguments);
    //     var controller = this.getController();
    //     Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    // },

    // destroy: function() {
    //     var controller = this.getController();
    //     Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    // },

    reference: 'changepasswordwindow',
    title: 'Change Password',
    width: 550,
    height: 300,

    items: [{
        xtype: 'form',
        bodyPadding: '20px 30px',
        width: '100%',
        height: '100%',

        bbar: {
            layout: {
                type: 'hbox'
            },
            padding: 20,
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

        cls: 'createaccount-cls',

        defaults: {
            width: '90%',
            labelSeparator: '&nbsp;&nbsp;&nbsp;&nbsp;:'
        },

        items: [{
            xtype: 'textfield',
            allowBlank: false,
            inputType:'password',
            name: 'old_password',
            emptyText: 'Enter old password'
        }, {
            xtype: 'textfield',
            allowBlank: false,
            name: 'new_password',
            inputType:'password',
            emptyText: 'Enter new password'
        }, {
            xtype: 'textfield',
            allowBlank: false,
            name: 're_enter_password',
            inputType:'password',
            emptyText: 'Reenter new password'
        }]
    }]
});
