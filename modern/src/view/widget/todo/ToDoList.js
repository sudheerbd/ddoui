Ext.define('DDO.view.widget.todo.ToDoList', {
    extend: 'Ext.panel.Panel',
    xtype: 'todolist',
    width: '100%',
    cls: 'toDoListPanel',
    requires: [
        'DDO.view.widget.todo.ToDoListController',
        'DDO.view.widget.todo.ToDoContainerModel'
    ],
    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'dataview',
        cls: 'toDoList',
        height: '99%',
        listeners: {
            itemswipe: 'showButtonsOnSwipe'
        },
        reference: 'todoGrid',
        store: 'widget.todo.TodoStore',
        emptyText: '<div style="text-align:center;margin-top:50px;"></div><br/><div><img class="ddo-todo-emptyImage" style="position:relative;top:50%;left:36%;" src="resources/images/todo/Allcaughtup.png"></div><br/><div style="text-align:center;font-weight:600;color:gray;font-size:16px;">All caught up<br/>Champ!</div><br/><div style="position:fixed !important;left: 38% !important;top: 80%;">Add New Task</div>',


        itemTpl: [
            '<table style="width: 100%;">',
            '<tr>',
            '<td class="toDoListTaskDone" style="display: none;"></td>',
            '<td class="toDoListTask" style="width: 80%;">',
            '{todo_task:ellipsis(50)}',
            '</td>',
            '<td align="right" class="toDoListTime" style="width: 20%;">',
            '{[this.onTodoEnddateRenderer(values.todo_enddate)]}',
            '</td>',
            '<td class="toDoListTaskEdit" style="display: none;"></td>',
            '</tr>',
            '</table>', {
                onTodoEnddateRenderer: function(value, metaData) {
                    var currentDate = new Date(),
                        endDate = Ext.Date.add(new Date(value.setHours(0, 0, 0)), Ext.Date.DAY, 1),
                        timeDiff = endDate.getTime() - currentDate.getTime(),
                        minDiff = timeDiff / 60 / 1000,
                        hoursValue = Math.floor(timeDiff / 3600 / 1000),
                        minutesValue = Math.round(minDiff - 60 * hoursValue, 1),
                        daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)),
                        dateDiff;

                    if (hoursValue < 0) {
                        dateDiff = '<span class="ddo-todo-outdated-taskname">Pending</span>';
                    } else if (hoursValue === 0) {
                        dateDiff = minutesValue + 'min';
                    } else if (hoursValue > 24) {
                        dateDiff = daysDiff + 'day' + (daysDiff > 1 ? 's' : '');
                    } else {
                        dateDiff = hoursValue + 'hr' + (hoursValue > 1 ? 's' : '');
                    }
                    return '<span>' + dateDiff + ' </span>';
                }

            }
        ]
    }, {
        xtype: 'button',
        iconCls: 'x-fa fa-plus',
        cls: 'addButton',
        handler: 'addNewTask'
    }]
});
