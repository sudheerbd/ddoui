/**
 * The file NotesWindowViewModel is the ViewModel for the 'DDO.view.projects.NoteWindow'.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.noteswindowviewmodel'.
 */
Ext.define('DDO.view.projects.NotesWindowViewModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.noteswindowviewmodel',

	data: {
		activeProId: null,
		editBtnVisible: true,
		deleteBtnVisible: true,
		rec: null,
		nonEditablePermit: false,
		statusValue: null,
		noteTypeValue: null,
		noteTitleValue: null,
		noteDescValue: null
	},
	stores: {
		allResourcesStore: {
		  type: 'scoredetails',
		  proxy: {
			extraParams: {
			  all: true
			}
		  },
		  autoLoad: true,
		},
	  },
	formulas: {
		subBtnDisable: function(get) {
			var nonEditablePermit = get('nonEditablePermit'),
				statusValue = get('statusValue'),
				noteTypeValue = get('noteTypeValue'),
				noteTitleValue = get('noteTitleValue'),
				noteDescValue = get('noteDescValue');
				
			if (nonEditablePermit) {
				return true;
			}

			if(!statusValue || !noteTypeValue || !noteTitleValue || !noteDescValue ) {
				return true;
			} 

			if(noteDescValue.length < 139) {
				return true;
			}
		}
	}
});