/**
 * The file DesignationWindow is the window view of DDO.view.setup.designation.Designation.
 * @extends {DDO.ux.window.FormPanel}
 * @alias widget.designationwindow.
 * ViewController : 'DDO.view.setup.designation.DesignationWindowViewController'.
 */
Ext.define('DDO.view.setup.designation.DesignationWindow', {
    extend: 'DDO.ux.window.FormPanel',

    requires: [
        'DDO.ux.window.FormPanel',
        'DDO.view.setup.designation.DesignationWindowViewController',
    ],

    alias: 'widget.designationwindow',

    title:  LabelsTitles.EMPSETUP.DESIGNATION.WINDOWTITLE,

    controller: 'designationwindowviewcontroller',
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
    width:Constants.ViewportWidth*0.44,
    height:Constants.ViewportHeight*0.59,
    items: [{
        xtype: 'form',
        items: [{
            xtype: 'hiddenfield',
            name: 'ddo_designation_id'
        }, {
            xtype: 'textfield',
            allowBlank: false,
            name: 'name',
            emptyText:  LabelsTitles.EMPSETUP.DESIGNATION.NAME,
            required: true,
            cls: 'rule-name-cls'
        }, {

            xtype: 'textfield',
            name: 'description',
            emptyText: LabelsTitles.EMPSETUP.DESIGNATION.DESCRIPTION,
            cls: 'rule-desc-cls'
        },{
            xtype: 'textfield',
            name: 'acronym',
            emptyText: LabelsTitles.EMPSETUP.DESIGNATION.ACRONYM,
            required: true,
            allowBlank: false,
            cls: 'rule-name-cls',
            enableKeyEvents : true,
            listeners : {
                keyup : 'OnAcronym'
            }
        }, {
            xtype: 'htmleditor',
            name: 'role_and_responsibility',
            enableKeyEvents: true,
            emptyText: LabelsTitles.EMPSETUP.DESIGNATION.ROLESANDRESPONSIBILITIES,
            reference: 'role_and_responsibility',
            cls: 'rule-name-cls responsiblity-cls',
            height : Constants.ViewportHeight*0.15,
            width:'85%',
            listeners: {
                render: function (editor) {
                    editor.getToolbar().hide();
                }
            }
        },{
            xtype: 'toolbar',

            docked: 'bottom',
            layout: {
                type: 'hbox'
            },
            padding: '25 0 21 0',
            items: [{
                xtype: 'button',
                text: LabelsTitles.EMPSETUP.DESIGNATION.CANCEL,
                cls: 'karmaform-cancel-btn',
                listeners: {
                    click: 'onFormCancelClick'
                }
            }, {
                xtype: 'button',
                text: LabelsTitles.EMPSETUP.DESIGNATION.SAVE,
                cls: 'karmaform-save-btn',
                formBind: true,
                listeners: {
                    click: 'onFormSaveClick'
                }
            }]
        }]
    }]
});
