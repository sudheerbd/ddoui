/**
 * The file NotesToolbar is the view file for toolbar in the notes view.
 * @extends {Ext.form.Panel}.
 * @alias 'widget.notestoolbar'.
 * ViewModel : DDO.view.projects.NotesViewModel.
 * ViewController : DDO.view.projects.NotesViewController.
 */
Ext.define('DDO.view.projects.NotesToolbar', {
    extend: 'Ext.form.Panel',

    alias: 'widget.notestoolbar',

    layout: {
        type: 'hbox',
        align: 'center'
    },

    requires: [
        'DDO.store.projects.StatusComboStore',
        'DDO.store.projects.NoteComboStore',
        'DDO.ux.DateRangeField',
        'DDO.view.projects.NoteWindow'
    ],

    cls: 'notes-toolbar-cls',

    margin: '0 20 0 10',

    defaults: {
        margin: 5
    },

    items: [{
        xtype: 'combobox',
        emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.NOTES.STATUSEMPTY,
        reference: 'status',
        width: Constants.ViewportWidth*0.08,
        listConfig: {
            cls: 'status-list-cls'
        },
        displayField: 'note_status_name',
        valueField: 'note_status',
        editable: false,
        cls: 'notes-combo-cls',
        store: 'projects.StatusComboStore',
        listeners: {
            select: 'onStatusItemSelect'
        }
    }, {
        xtype: 'combobox',
        emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.NOTES.NOTEEMPTY,
        reference: 'NotesType',
        width: Constants.ViewportWidth*0.103,
        listConfig: {
            cls: 'notetype-list-cls'
        },
        displayField: 'note_name',
        valueField: 'note_type',
        editable: false,
        cls: 'notes-combo-cls',
        store: 'projects.NoteComboStore',
        listeners: {
            select: 'onNoteTypeItemSelect'
        }
    }, {
        xtype: 'daterangefield',
        triggers: {
            cancel: {
                cls: 'cancel-cls',
                weight: -2,
                hidden: true,
                handler: 'onTriggerItemClick'
            }
        },
        listeners: {
            change: 'onDateRangeChange'
        }
    }, {
        xtype: 'tbfill'
    }, {
        xtype: 'button',
        cls: 'notes-create-btn-cls',
        width: Constants.ViewportWidth*0.1,
        height: Constants.ViewportHeight*0.06,
        text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.NOTES.CREATE,
        listeners: {
            click: 'onNoteCreateClick'
        }
    }]
});