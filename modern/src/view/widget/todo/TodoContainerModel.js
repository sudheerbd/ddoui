Ext.define('DDO.view.widget.todo.ToDoContainerModel', {
    extend: 'DDO.view.widget.todo.ToDoListModel',
    alias: 'viewmodel.todocontainermodel',

    requires: [
        'DDO.model.widget.todo.TodoModel'
    ],

    data: {
        todoname: LabelsTitles.TODONAME,
        taskNameValue: null,
        dateFieldValue: new Date(),
        todo_edit: false,
        todo_id: null
    },

    formulas: {
        value: function(get) {
            var text = get('taskNameValue'),
                date = get('dateFieldValue');
            return (text && date) ? true : false;
        }
    }
});
