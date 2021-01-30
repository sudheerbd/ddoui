/**
 * This is controller for view 'DDO.view.widget.todo.tododetailview.TodoDetailView'.
 * @extends 'DDO.view.widget.todo.ToDoListController'
 * @alias 'controller.tododetailviewcontroller'
 */
Ext.define('DDO.view.widget.todo.tododetailview.TodoDetailViewController', {
    extend: 'DDO.view.widget.todo.ToDoListController',
    alias: 'controller.tododetailviewcontroller',

    /**
     * This handler will responsible for search operation for tasks
     * @param {Object} field, contains reference for search field
     * @param {Object} e, event object
     */
    onSearchAnyStatusTask: function(field, e, eOpts) {
        try {
            var todoStore,
                taskCompleted = this.getViewModel().get('todoWindowTaskCompleted');

            if (!taskCompleted) {
                todoStore = Ext.getStore('widget.todo.TodoStore');
            } else if (taskCompleted) {
                todoStore = Ext.getStore('widget.todo.TodoDetailStore');
            } else {}

            if (Ext.String.trim(field.getRawValue())) {
                todoStore.clearFilter(true);

                todoStore.filter({
                    property: 'todo_task',
                    value: field.getRawValue(),
                    anyMatch: true,
                    caseSensitive: false
                });
            } else {
                if (todoStore.getFilters().length > 0) {
                    todoStore.clearFilter(true);
                    todoStore.load();
                }
            }
        } catch (err) {
            Utility.showToast(Messages.HOME.SEARCHTASK, err);
        }
    },

    /**
     * This handler will responsible for todo toggle action between pending and completed for tasks
     * @param {Object} btn, contains reference for search field
     * @param {Object} e, event object
     */
    onTodoToggleBtnClick: function(btn, e) {
        try {
            btn.up('form').reset();
            btn.setPressed(true);
            var todoStore,
                viewModel = this.getViewModel();
            if (btn.value === 'pending') {
                viewModel.set('todoWindowTaskCompleted', false);
                viewModel.set('completedTaskStatus', false);
                todoStore = Ext.getStore('widget.todo.TodoStore');
                todoStore.clearFilter(true);
                todoStore.load();
            } else {
                viewModel.set('todoWindowTaskCompleted', true);
                viewModel.set('completedTaskStatus', true);
                todoStore = Ext.getStore('widget.todo.TodoDetailStore');
                todoStore.clearFilter(true);
                todoStore.load();
            }
            if (viewModel.get('selecChange')) {
                todoStore.load();
                viewModel.set('selecChange', false);
            }
        } catch (err) {
            Utility.showToast(Messages.HOME.TASKTOGGLE, err);
        }
    },

    /**
     * This handler will responsible for reversing recent status changes for tasks
     * @param {Object} grid, contains reference for todo grid
     * @param {Number} rowIndex, Index of row being selected.
     * @param {Number} colIndex, Index of column selected.
     */
    undoTodoTaskOperation: function(grid, rowIndex, colIndex) {
        try {
            var rec = grid.getStore().getAt(rowIndex),
                todoStore = Ext.getStore('widget.todo.TodoStore');

            rec.set("todo_completed", false);
            rec.set("todo_deleted", false);

            grid.getStore().sync({
                success: function() {
                    grid.getStore().load();
                }
            });
            todoStore.load();

            this.getViewModel().set('selecChange', true);
        } catch (err) {
            Utility.showToast(Messages.HOME.UNDOTASK, err);
        }
    }
});