Ext.define('ACCTRL.view.window.AppWindow', {
    extend: 'Ext.window.Window',

    xtype : 'appwindow',
    requires: [
        'ACCTRL.view.window.AppWindowController'
    ],
    cls: 'appwindow-cls',
    bodyPadding: 20,
    appRecord: null,
    editMode: false,
    modal: true,
    width: 700,
    height: 430,
    title: 'Add New',  
    titleAlign: 'center',
    controller: 'appwindowcontroller',
    defaultImgPath: 'resources/images/user-profile/12.png',
    viewModel: {
        data: {
            appImg : 'resources/images/user-profile/12.png'
        }
    },

    initComponent: function() {
        this.callParent(arguments);
        var store = Ext.getStore('feeds.Groups'),
            controller = this.getController();

        if (!store.isLoaded()) {
            store.load();
        }
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    listeners: {
        show: function(appWindow, opts) {
            appWindow.center();

            var appRecord = appWindow.appRecord;

            if(appWindow.editMode){
                var clientName = appRecord.get('clientname'),
                    ownerName = appRecord.get('ownerid'),
                    desc = appRecord.get('description'),
                    appName = appRecord.get('name'),
                    accessAllowed = appRecord.get('allowedusercount'),
                    imageUrl = appRecord.get('imageurl');

                appWindow.down('textfield[name=clientName]').setValue(clientName);
                appWindow.down('textfield[name=appName]').setValue(appName);
                appWindow.down('numberfield[name=accessAllowedUsers]').setValue(accessAllowed);
                appWindow.down('combobox[name=ownerId]').setValue(ownerName);
                appWindow.down('textarea[name=description]').setValue(desc);
                if(imageUrl){
                    appWindow.getViewModel().set('appImg', imageUrl);
                    Utility.appImage = imageUrl;
                } else {
                    appWindow.getViewModel().set('appImg', appWindow.defaultImgPath);
                    Utility.appImage = '';
                }
            } else {
                var loginStore = Ext.getStore("login"),
                    userRecord = loginStore.getAt(0),
                    employee_id = userRecord.get('ddo_employee_id');

                appWindow.down('combobox').setValue(employee_id);
                appWindow.getViewModel().set('appImg', appWindow.defaultImgPath);
                Utility.appImage = '';
            }
            
        }
    },
    items: [{
        xtype: 'form',
        name: 'appwindowform',
        layout: 'hbox',
        bbar: {
            items: [{
                xtype: 'button',
                text: 'Cancel',
                cls: 'app-window-cancel-btn',
                handler: 'onFormCancelClick'
            }, {
                xtype: 'button',
                text: 'Save',
                formBind: true,
                cls: 'app-window-save-btn',
                listeners: {
                    click: 'onFormSaveClick'
                }
            }]
        },
        items: [{
            xtype: 'container',
            width: '40%',
            padding: '40 40 10 40',
            items: [{
                xtype: 'component',
                cls: 'appIcon',
                height: 62,
                width: 73,
                bind: {
                    style: {
                        background: 'url("{appImg}")'
                    }
                }
            },{
                xtype : 'form',
                items: [{
                    xtype: 'filefield',
                    margin: 0,
                    opType: 'upload',
                    name: 'appImage',
                    buttonOnly: true,
                    cls: 'appImageUpload',
                    buttonText: 'Change',
                    listeners: {
                        change: 'onAppImageChange'
                    }
                }]
            }, {
                xtype: 'textfield',
                beforeSubTpl : '<span class="mandatory-astric-cls">*</span>',
                name: 'appName',
                margin: 10,
                width: 160,
                allowBlank: false,
                cls: 'app-window-fields',
                emptyText: 'App Name'
            }, {
                xtype: 'menuseparator' 
            }, {
                xtype: 'label',
                margin: 10,
                html: 'Active Access Allowed'
            }, {
                xtype: 'numberfield',
                name: 'accessAllowedUsers',
                hideTrigger: true,
                cls: 'activeaccess-display',
                width: 70
            }]
        }, {
            width: '60%',
            defaults: {
                labelAlign: 'top',
                labelSeparator: '',
                width: '50%',
                cls: 'app-window-fields'
            },
            items: [{
                xtype: 'combobox',
                beforeLabelTextTpl: '<span class="mandatory-astric-cls">*</span>',
                fieldLabel: 'Owner Details',
                matchFieldWidth: false,
                name: 'ownerId',
                allowBlank: false,
                hideTrigger: true,
                //cls: 'app-window-tagfields',
                forceSelection: true,
                store: 'karmasetup.wallet.EmployeeComboStore',
                emptyText: 'Search Name',
                displayField: 'empname',
                valueField: 'empid',
                queryMode: 'local'
                //filterPickList: true,
                // listeners: {
                //     select: function(combo, record, eOpts) {
                //         if(combo.getValue() && combo.getValue().length>1){
                //             combo.removeValue(combo.getValue()[0])
                //         }
                //         combo.inputEl.dom.value = '';
                //         combo.collapse();
                //     }
                // }
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Client Details',
                name: 'clientName',
                emptyText: 'Company Name'
            },
            {
                xtype: 'textarea',
                beforeLabelTextTpl: '<span class="mandatory-astric-cls">*</span>',
                width: '90%',
                allowBlank: false,
                fieldLabel: 'Description',
                name: 'description',
                emptyText: 'Write'
            }]
        }]
    }]
});