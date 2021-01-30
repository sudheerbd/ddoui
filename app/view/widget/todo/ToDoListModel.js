/**
 * This is ViewModel for view 'DDO.view.widget.todo.ToDoList'.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.todolistmodel'
 */
Ext.define('DDO.view.widget.todo.ToDoListModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.todolistmodel',

	requires: [
		'DDO.model.widget.todo.TodoModel'
	],

	data: {
		todoname: LabelsTitles.TODONAME,
		taskNameValue: null,
		dateFieldValue: new Date(),
		selecChange: false
	},

	formulas: {
		getTextFieldValue: function(get) {
			var text = get('taskNameValue');
			if (text) {
				text = Ext.String.trim(text);
			}
			return text ? true : false;
		}
	}
});