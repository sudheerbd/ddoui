/**
 * The file KarmaAccessWindowView is the view file for window in 'DDO.view.karmasetup.karmaaccess.KarmaAccessView'.
 * @extends {Ext.window.Window}
 * @alias 'widget.karmaaccesswindowview'.
 */
Ext.define('DDO.view.karmasetup.karmaaccess.KarmaAccessWindowView', {
    extend: 'Ext.window.Window',
    alias: 'widget.karmaaccesswindowview',
    requires: [
        'DDO.view.karmasetup.karmaaccess.KarmaAccessWindowViewModel',
        'DDO.view.karmasetup.karmaaccess.KarmaAccessWindowViewController'
    ],
    controller: 'karmaaccesswindowview',
    viewModel: {
        type: 'karmaaccesswindowview'
    },
    cls: 'access-window-cls',
    modal: true,
    resizable: false,
    closable: false,
    closeAction: 'hide',
    title: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.WINDOWTITLE,
    reference: 'formviewPanel',
    height:Constants.ViewportHeight*0.54,
    width:Constants.ViewportWidth*0.44,
    initComponent: function() {
        this.callParent(arguments);
        var controller = this.getController(),
            karmaGridStore = Ext.getStore('karmasetup.KarmaStore');
            roleGridStore = Ext.getStore('setup.role.RoleStore');
            employeeStore = Ext.getStore('karmasetup.wallet.EmployeeComboStore');
        if (!karmaGridStore.isLoaded()) {
            karmaGridStore.load();
        }
        if (!roleGridStore.isLoaded()) {
            roleGridStore.load();
        }
        if (!employeeStore.isLoaded()) {
            employeeStore.load();
        }
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    listeners: {
        show:'windowShowCenter'
    },
    items: [{
        xtype: 'form',
        width:Constants.ViewportWidth*0.368,
        bbar: {
            layout: {
                type: 'hbox'
            },
            padding: 20,
            items: [{
                xtype: 'button',
                text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.CANCEL,
                cls: 'access-cancel-btn',
                listeners: {
                    click: 'onFormCancelClick'
                }
            }, {
                xtype: 'button',
                text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.SAVE,
                cls: 'access-save-btn',
                name:'savebtn',
                bind:{
                    disabled:'{saveBtnAccess}'
                },
                listeners: {
                    click: 'onFormSaveClick'
                }
            }]
        },
        reference: 'formFields',
        items: [{
            xtype: 'combobox',
            name: 'ddo_karma_id',
            required: true,
            fieldLabel: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.KARMALABEL,
            reference: 'selectEmployee',
            displayField: 'name',
            valueField: 'ddo_karma_id',
            typeAhead: true,
            forceSelection: true,
            minChars: 1,
            emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.SELECTKARMA,
            cls: 'access-form-cls',
            queryMode: 'local',
            lastQuery: '',
            allowBlank: false,
            labelSeparator: '',
            bind: {
                disabled: '{nonEditablePermit}',
                value: '{empid}',
                 store:'{karmaAccessStore}'
            },
            listeners: {
                change: 'onKarmaSelect'
            },
        }, {
            xtype: 'hiddenfield',
            name: 'ddo_karmaaccess_id'
        }, {
            xtype: 'tagfield',
            name: 'role',
            emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.ROLE,
            forceSelection:true,
            fieldLabel: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.ROLE,
            clearOnBackspace: false,
            editable: true,
            store: 'setup.role.RoleStore',
            width: '100%',
            cls: 'access-form-cls tagfield-scroll',
            valueField: 'ddo_role_id',
            displayField: 'name',
            labelSeparator: '',
            queryMode: 'local',
            filterPickList: true,
            hideTrigger:true,
            listConfig: {
                cls: 'tag-view-list'
            },
            listeners: {
                change: 'onAccessDetailsSelect'
            }
        }, {
            xtype: 'tagfield',
            name: 'employee',
            emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.EMPLOYEE,
            fieldLabel: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.EMPLOYEE,
            clearOnBackspace: false,
            editable: true,
            store: 'karmasetup.wallet.EmployeeComboStore',
            width: '100%',
            cls: 'access-form-cls tagfield-scroll',
            forceSelection:true,
            valueField: 'empid',
            displayField: 'empname',
            labelSeparator: '',
            queryMode: 'local',
            filterPickList: true,
            hideTrigger:true,
            listConfig: {
                cls: 'tag-view-list'
            },
            listeners: {
               change: 'onAccessDetailsSelect'
            }
        }]
    }]
});
