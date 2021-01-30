/**
 * The file NotesViewModel is the ViewModel for DDO.view.projects.NotesView.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.notesviewmodel'
 */
Ext.define('DDO.view.projects.NotesViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.notesviewmodel',

    data: {
    	fromDate: null,
    	toDate: null
    }
});