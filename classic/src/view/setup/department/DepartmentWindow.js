/**
 * The file DepartmentWindow is responsible for the window which comes in the 'DDO.view.setup.department.Department'.
 * @extends {DDO.ux.window.FormPanel}.
 * @alias widget.departmentwindow.
 * ViewController : 'DDO.view.setup.department.DepartmentWindowController'.
 */
Ext.define('DDO.view.setup.department.DepartmentWindow', {
    extend: 'DDO.ux.window.FormPanel',
    requires: [
        'DDO.view.setup.department.DepartmentWindowController',
    ],
    alias: 'widget.departmentwindow',
    title: LabelsTitles.EMPSETUP.DEPARTMENT.WINDOWTITLE,
    controller: 'departmentwindowcontroller',
    initComponent: function() {
        this.callParent(arguments);
        var comboStore = Ext.getStore('setup.SetupSupervisorComboStore');
        if(comboStore && !comboStore.isLoaded()) {
            comboStore.load();
        }
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
    height: Constants.ViewportHeight*0.4,
    items: [{
        xtype: 'form',
        bbar: {
            layout: {
                type: 'hbox'
            },
            padding: '25 0 21 0',
            items: [{
                xtype: 'button',
                text: LabelsTitles.EMPSETUP.DEPARTMENT.CANCEL,
                cls: 'karmaform-cancel-btn',
                listeners: {
                    click: 'onFormCancelClick'
                }
            }, {
                xtype: 'button',
                text: LabelsTitles.EMPSETUP.DEPARTMENT.SAVE,
                cls: 'karmaform-save-btn',
                formBind: true,
                listeners: {
                    click: 'onFormSaveClick'
                }
            }]
        },
        items: [{
            xtype: 'hiddenfield',
            name: 'ddo_department_id'
        }, {
            xtype: 'textfield',
            allowBlank: false,
            name: 'name',
            emptyText: LabelsTitles.EMPSETUP.DEPARTMENT.NAME,
            required: true,
            cls: 'rule-name-cls'
        },{
            xtype: 'textfield',
            name: 'description',
            emptyText: LabelsTitles.EMPSETUP.DEPARTMENT.DESCRIPTION,
            cls: 'rule-name-cls'
        }]
    }]
});