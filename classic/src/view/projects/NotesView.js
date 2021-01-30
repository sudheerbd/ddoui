/**
 * The file NotesView is the view file for the Notes tab in the projects view.
 * @extends {Ext.container.Container}
 * @alias widget.notesview.
 * ViewModel : DDO.view.projects.NotesViewModel.
 * ViewController : DDO.view.projects.NotesViewController.
 */
Ext.define('DDO.view.projects.NotesView', {
    extend: 'Ext.container.Container',

    alias: 'widget.notesview',

    requires: [
        'DDO.view.projects.NotesViewController',
        'DDO.view.projects.NotesViewModel',
        'DDO.view.projects.NotesToolbar',
        'DDO.view.projects.NotesDataView'
    ],

    controller: 'notesviewcontroller',

    viewModel: {
        type: 'notesviewmodel'
    },

    padding: '0 21',

    items: [
        {
        xtype: 'notestoolbar'
    }, 
    {
        xtype: 'notesdataview'
    }]
});