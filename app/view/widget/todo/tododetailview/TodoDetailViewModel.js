/**
 * This is ViewModel for view 'DDO.view.widget.todo.tododetailview.TodoDetailView'.
 * @extends 'DDO.view.widget.todo.ToDoListModel'
 * @alias 'viewmodel.tododetailviewmodel'
 */
Ext.define('DDO.view.widget.todo.tododetailview.TodoDetailViewModel', {
	extend: 'DDO.view.widget.todo.ToDoListModel',
	alias: 'viewmodel.tododetailviewmodel',

	data: {
		completedTaskStatus: false,
		todoWindowTaskCompleted: false
	}
});