/**
 * The file NotesDataView is the view file for the Data View in the Notes Tab.
 * @extends {Ext.view.View}
 * @alias widget.notesdataview.
 * ViewModel : DDO.view.projects.NotesViewModel.
 * ViewController : DDO.view.projects.NotesViewController.
 */
Ext.define('DDO.view.projects.NotesDataView', {
    extend: 'Ext.view.View',

    xtype: 'notesdataview',

    store: 'projects.NotesStore',

    margin: '4 0 0 0',
    cls:'notesdata-view-css',
    initComponent: function() {
        this.callParent(arguments);
        var noteComboStore = Ext.getStore('projects.NoteComboStore');
        var statusComboStore = Ext.getStore('projects.StatusComboStore');
        if (!noteComboStore.isLoaded()) {
            noteComboStore.load();
        }
        if (!statusComboStore.isLoaded()) {
            statusComboStore.load();
        }
    },

    emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.NOTES.EMPTYDATAFOUND,

    loadMask: false,

    tpl: [
        '<tpl for=".">',
            '<div class="note-cls" style ="height:240px;">',
                '<div class="note-heading-cls" {[this.validEllipsesQtip(values.note_title, 35)]}>{[this.getEllipseText(values.note_title, 35)]}</div>',
                '<div class="note-body-cls">{[this.getEllipseText(values.note_description_normal, 200)]}</div>',
                '<div class = "create-note-cls"> Created By&nbsp:&nbsp<b>{[values.note_createdBy]}</b>&nbsp on &nbsp<b>{[this.reFormatDate(values.created_date.substring(0,10))]}</b> </div>',
                '<table class="note-table-cls"><tr><td class="note-td-cls"><div class="edit-note-cls"><span class="edit-cls"></span></div>',
                '</td><td class="note-td-next-cls"><div class="delete-note-cls"><span class="delete-cls"></span></div></td></tr></table>',
            '</div>',
        '</tpl>', {
            getEllipseText: function(string, limit) {
                if (string && limit) {
                    return Ext.String.ellipsis(string, limit);
                }
            },
            validEllipsesQtip: function(value, limit) {
                if (value) {
                    var qtip = " data-qtip='" + value + "'";
                    return (value.length > limit) ? qtip : '';
                }
            },
            reFormatDate:function(date){
                    var splitDate = date.split("-");
                    return splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0];
            }
        }
    ],

    itemSelector: '.note-cls',

    listeners: {
        itemclick: 'onNoteItemClick'
    }
});