Ext.define('DDO.model.widget.todo.TodoModel', {
    extend: 'Ext.data.Model',
    idProperty: 'todo_id',
    fields: [{
        name: 'todo_id'
    }, {
        name: 'todo_task',
        type: 'string'
    }, {
        name: 'todo_enddate',
        convert: function(value) {
            return new Date(value);
        }
    }, {
        name: 'todo_completed',
        type: 'boolean'
    }, {
        name: 'todo_deleted',
        type: 'boolean'
    }]
});
