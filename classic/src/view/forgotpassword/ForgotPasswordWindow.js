Ext.define('DDO.view.forgotpassword.ForgotPasswordWindow', {
    extend: 'DDO.ux.window.FormPanel',

    requires: [
        'DDO.ux.window.FormPanel',
        'DDO.view.forgotpassword.ForgotPasswordWindowViewController',
        'DDO.view.forgotpassword.ForgotPasswordWindowViewModel'
    ],

    alias: 'widget.forgotpasswordwindow',

    controller: 'forgotpasswordwindowviewcontroller',
    viewModel: {
        type: 'forgotpasswordwindowviewmodel'
    },

    initComponent: function() {
        this.callParent(arguments);
        var controller = this.getController();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    reference: 'forgotpasswordwindow',

    title: 'Forgot Password',

    width: 550,
    height: 200,
        
    items: [{
       xtype: 'form',
       width: '100%',
       cls: 'createaccount-cls',
       bodyPadding: '20 40',
       items: [{
           xtype: 'textfield',
           width: '100%',
           reference: 'forgotmailid',
           allowBlank: false,
           name: 'forgotmailid',
           emptyText: 'Please provide registered EmailID',
           vtype: 'email'
       }, {
           xtype: 'container',
           reference: 'btnscont',
           layout: {
               type: 'hbox',
               align: 'center',
               pack: 'center'
           },
           items: [{
               xtype: 'button',
               margin: '0 0 30 0',
               text: 'Cancel',
               cls: 'karmaform-cancel-btn',
               handler: 'onFormCancelClick'
           }, {
               xtype: 'button',
               text: 'Submit',
               cls: 'karmaform-save-btn',
               formBind: true,
               margin: '0 0 30 0',
               handler: 'onFormSaveClick'
           }]
       }]
   }]
});
