Ext.define('DDO.view.widget.todo.CreateOrEditListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.createoreditlistcontroller',

    showByToDoList: function() {
        var createOrEditView = this.getView(),
            todolistView = Ext.ComponentQuery.query('todocontainer')[0].down('dataview');

        if (createOrEditView.operation === 'edittodoform') {
            createOrEditView.destroy();
        } else {
            createOrEditView.setHidden(true);
        }

        Ext.defer(function() {
            if (todolistView) {
                todolistView.refresh();
                createOrEditView.updateLayout();
            }
        }, 500);
    },

    ajaxTodolistApiRequest: function(scope, url, task, date, todoStore, formPanel, operation, todo_id) {
        var paramsObj = {
            "todo_task": task,
            "todo_enddate": date,
            "todo_completed": false,
            "todo_deleted": false
        };

        if (operation === 'update') {
            paramsObj.todo_id = todo_id;
        }

        Ext.Ajax.request({
            url: url,
            method: 'POST',
            scope: scope,
            params: paramsObj,
            success: function(conn, response, options, eOpts) {
                formPanel.destroy();
                Ext.Viewport.setActiveItem(0);
                todoStore.load();
            },
            failure: function(conn, response, options, eOpts) {
                Ext.Viewport.setActiveItem(0);
            }
        });
    },

    onTodoCreate: function(btn) {
        var formPanel = btn.up('formpanel'),
            task = formPanel.down('textareafield').getValue(),
            date = formPanel.down('datepickerfield').getValue(),
            todo_date = Ext.Date.format(date, ('M', 'F j, Y')),
            todolistView = Ext.ComponentQuery.query('todocontainer')[0],
            todoStore = todolistView.down('dataview').getStore(),
            todo_id = formPanel.getValues().todo_id,
            currentDate = Ext.Date.format(new Date(), ('M', 'F j, Y')),
            todoRec;

        Ext.Viewport.setActiveItem(1);

        if (Ext.isEmpty(task)) {
            Ext.Viewport.setActiveItem(0);

            Ext.Msg.alert("Error", "Task should not be empty");
        } else {
            Ext.Viewport.setActiveItem(0);

            if (new Date(todo_date) < new Date(currentDate)) {
                Ext.Msg.alert("Error", "Date should be greater than current date")
            } else if (formPanel.operation == "addtodoform") {
                this.ajaxTodolistApiRequest(this, Api.URL.todo.CREATE, task, date, todoStore, formPanel, 'create');
            } else {
                this.ajaxTodolistApiRequest(this, Api.URL.todo.UPDATE, task, date, todoStore, formPanel, 'update', todo_id);
            }
        }
    }
});