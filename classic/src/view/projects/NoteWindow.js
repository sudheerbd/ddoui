/**
 * The file NoteWindow is the view file for window in the Notes tab.
 * @extends {Ext.window.Window}.
 * @alias 'widget.notewindow'.
 * ViewModel : 'DDO.view.projects.NotesWindowViewModel'.
 * ViewController : 'DDO.view.projects.NotesWindowController'.
 */
Ext.define('DDO.view.projects.NoteWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.notewindow',

    requires: [
        'DDO.store.projects.StatusComboStore',
        'DDO.store.projects.NoteComboStore',
        // 'setup.employeesetup.EmployeeStore',
        'DDO.view.projects.NotesWindowController',
        'DDO.view.projects.NotesWindowViewModel'
    ],

    controller: 'noteswindowcontroller',

    viewModel: {
        type: 'noteswindowviewmodel'
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

    modal: true,
    header: false,
    resizable: false,

    cls: 'notewindow-cls',

    width: Constants.ViewportWidth*0.51,
    height: Constants.ViewportHeight*0.9,

    items: [{
        xtype: 'form',
        cls: 'form-note-cls',
        reference: 'notesform',
        width: Constants.ViewportWidth*0.51,
        height: Constants.ViewportHeight*0.93,
        items: [{
            xtype: 'container',
            layout: 'hbox',
            cls: 'combo-container',
            items: [{  
                xtype: 'combobox',
                name: 'note_type',
                reference: 'noteType',
                displayField: 'note_name',
                valueField: 'note_type',
                emptyText:  LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.NOTES.EMPTYNOTETYPE,
                width: Constants.ViewportWidth*0.1,
                editable: false,
                allowBlank: false,
                queryMode: 'local',
                store: 'projects.NoteComboStore',
                bind: {
                    readOnly: '{nonEditablePermit}',
                    value: '{noteTypeValue}'
                },
                listConfig: {
                    cls: 'note-list-cls'
                }
            }, {
                xtype: 'combobox',
                name: 'note_status',
                reference: 'statusCombo',
                displayField: 'note_status_name',
                valueField: 'note_status',
                emptyText:  LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.NOTES.STATUSEMPTY,
                width: Constants.ViewportWidth*0.075,
                editable: false,
                allowBlank: false,
                queryMode: 'local',
                store: 'projects.StatusComboStore',
                bind: {
                    readOnly: '{nonEditablePermit}',
                    value: '{statusValue}'
                },
                listConfig: {
                    cls: 'notestatus-list-cls'
                }
            }, 
            {
                xtype: 'tagfield',
                emptyText: LabelsTitles.RESOURCEREQUEST.EMPLOYEE,
                // labelAlign:'left',
                width: Constants.ViewportWidth*0.3,
                // cls:'employeecombo-cls',
                name: 'employee_id',
                reference: 'employee',
                editable: true,
                allowBlank:false,	  
                msgTarget:'side',
                queryMode: 'local',
                forceSelection: true,
                bind:{
                  store:'{allResourcesStore}',
                },
                displayField: 'employee',
                valueField:'c_bpartner_id',
                listConfig: {
                    cls: 'note-list-cls'
                },
                listeners:{
                  beforequery: 'onEmployeeComboSearch',
                  select: 'onEmployeeSelect'
                }
              },
            {
                xtype: 'tbfill'
            }, {
                xtype: 'button',
                width: 33,
                bind: {
                    hidden: '{editBtnVisible}'
                },
                height: 33,
                iconCls: 'editNoteIcon-cls',
                cls: 'note-edit-btn-cls',
                handler: 'onNoteEditClick'
            }, {
                xtype: 'button',
                width: 33,
                bind: {
                    hidden: '{deleteBtnVisible}'
                },
                height: 33,
                iconCls: 'deleteNoteIcon-cls',
                cls: 'note-delete-btn-cls',
                handler: 'onNoteDeleteClick'
            }, {
                xtype: 'button',
                text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.NOTES.XTEXT,
                cls: 'note-window-close',
                listeners: {
                    click: 'onNoteCloseClick'
                }
            }]
        }, {
            xtype: 'textfield',
            name: 'note_title',
            emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.NOTES.EMPTYTITLE,
            enableKeyEvents: true,
            reference: 'noteTitle',
            bind: {
                readOnly: '{nonEditablePermit}',
                value: '{noteTitleValue}'
            },
            cls: 'note-title-cls',
            allowBlank: false,
            width: '100%',
            listeners: {
                keyup: 'onNoteTitleFieldKey'
            }
        }, {
            xtype: 'htmleditor',
            name: 'note_description',
            reference: 'noteDesc',
            cls: 'noteditor-cls',
            bind: {
                readOnly: '{nonEditablePermit}',
                value: '{noteDescValue}'
            },
            width: Constants.ViewportWidth*0.51,
            height: Constants.ViewportHeight*0.68

        }, {
            xtype: 'button',
            text:  LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.NOTES.SUBMIT,
            bind: {
                disabled: '{subBtnDisable}'
            },
            cls: 'window-submit-cls',
            listeners: {
                click: 'onNoteSubmitClick'
            }
        }]
    }],

    listeners: {
        close: 'onNoteWindowCloseAction'
    }
});