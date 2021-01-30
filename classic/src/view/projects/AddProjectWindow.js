/**
 * The file AddProjectWindow is the window view to add project in the Project view.
 * @extends {Ext.window.Window}.
 * @alias widget.addprojectwindow.
 * ViewModel : DDO.view.projects.AddProjectWindowModel.
 * ViewController : 'DDO.view.projects.AddProjectWindowController'.
 */
Ext.define('DDO.view.projects.AddProjectWindow', {
    extend: 'Ext.window.Window',

    xtype: 'addprojectwindow',

    requires: [
        'DDO.view.projects.AddProjectWindowController',
        'DDO.view.projects.AddProjectWindowModel'
    ],

    controller: 'addprojectwindowcontroller',
    viewModel: {
        type: 'addprojectwindowmodel'
    },

    initComponent: function() {
        this.callParent(arguments);
        var empStore = Ext.getStore('projects.EmpNamesStore');
        if (!empStore.isLoaded()) {
            empStore.load();
        }
    },

    title: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PROJECTWINDOW.PROJECTTITLE,

    cls: 'external-upload-form-window',

    resizable: false,
    modal: true,
    closable: true,
    layout: {
        type: 'fit'
    },

    cls: 'ddo-rating-window',

    autoHeight: true,
    width: Constants.ViewportWidth*0.44,

    listeners: {
        /* resize window to center while resizing */
        resize: function(win, width, height, eOpts) {
            win.center();
        }
    },
    padding: 20,

    items: [{
        xtype: 'form',

        layout: {
            type: 'hbox',
            pack: 'center',
            align: 'middle'
        },

        bbar: {
            layout: {
                type: 'hbox'
            },
            padding: '25 0 20 0',
            items: [{
                xtype: 'button',
                text:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PROJECTWINDOW.CANCEL ,
                cls: 'karmaform-cancel-btn',
                listeners: {
                    click: 'onFormCancelClick'
                }
            }, {
                xtype: 'button',
                text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PROJECTWINDOW.SAVE,
                cls: 'karmaform-save-btn',
                formBind: true,
                listeners: {
                    click: 'onFormSaveClick'
                }
            }]
        },

        items: [{
            xtype: 'container',
            width:Constants.ViewportWidth*0.26,
            items: [{
                xtype: 'textfield',
                margin: '0 0 15 0',
                width: '87%',
                ui: 'ddo-text-field',
                name: 'projectName',
                emptyText:  LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PROJECTWINDOW.EMPTYPROJECT,
                allowBlank: false
            }, {
                xtype: 'textfield',
                margin: '0 0 15 0',
                width: '87%',
                ui: 'ddo-text-field',
                name: 'searchKey',
                emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PROJECTWINDOW.EMPTYSEARCH,
                allowBlank: false
            }, {
                xtype: 'combobox',
                width: '87%',
                cls:'ddo-ext-combo',
                margin: '0 0 15 0',
                ui: 'ddo-text-field',
                emptyText:  LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PROJECTWINDOW.SALESEMPTY,
                name: 'salesRepresentativeId',
                reference: 'salesRepresentativeId',
                typeAhead: true,
                forceSelection: true,
                queryMode: 'local',
                lastQuery: '',
                minChars: 1,
                displayField: 'user_full_name',
                valueField: 'user_id',
                store: 'projects.EmpNamesStore'
            },{
                xtype: 'combobox',
                width: '87%',
                cls:'ddo-ext-combo',
                margin: '0 0 15 0',
                ui: 'ddo-text-field',
                emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PROJECTWINDOW.CLIENTNAME,
                name: 'ddo_projects_clients_id',
                reference: 'proclientId',
                typeAhead: true,
                forceSelection: true,
                queryMode: 'local',
                lastQuery: '',
                minChars: 1,
                displayField: 'name',
                valueField: 'ddo_projects_clients_id',
                bind: {
                    store: '{projectClientStore}'
                }
            }]
        }, {
            xtype: 'form',
            width:Constants.ViewportWidth*0.13,
            reference: 'imageUploadForm',
            items: [{
                xtype: 'image',
                height:Constants.ViewportHeight*0.2,
                width:Constants.ViewportWidth*0.092,
                alt: 'App View Logo',
                cls: 'project-img-cls',
                bind: {
                    src: '{projectLogoUrl}'
                }
            }, {
                xtype: 'filefield',
                opType: 'upload',
                name: 'projectImage',
                cls: 'project-url-path-cls',
                buttonOnly: true,
                buttonText: '',
                width: 50,
                listeners: {
                    change: 'onProjectImgChange'
                }
            },{
                xtype: 'label',
                cls: 'imgupload-label-cls',
                text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PROJECTWINDOW.UPLOADTEXT
            }]
        }]
    }]
});
