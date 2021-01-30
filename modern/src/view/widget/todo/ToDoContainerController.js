Ext.define('DDO.view.widget.todo.ToDoContainerController', {
    extend: 'DDO.view.widget.todo.ToDoListController',
    alias: 'controller.todocontainercontroller',

    requires: [
        'DDO.view.widget.todo.CreateOrEditList'
    ],

    addNewTask: function() {
        var form = Ext.create('DDO.view.widget.todo.CreateOrEditList');

        form.getViewModel().set('todoFormTitle', 'Create New');
        form.show();
    },

    showButtonsOnSwipe: function(dataview, index, target, record, event, options) {
        var me = this,
            taskDom = Ext.DomQuery.selectNode(".toDoListTask", target.dom),
            timeDom = Ext.DomQuery.selectNode(".toDoListTime", target.dom),
            todoVm = this.getViewModel(),
            btnDom, doneBtn;
        if (event.direction === "right" || event.direction === "left") {
            if (event.direction === "right") {
                btnDom = Ext.DomQuery.selectNode(".toDoListTaskDone", target.dom);
                doneBtn = Ext.create("Ext.Button", {
                    cls: 'doneBtn-cls',
                    text: 'Done',
                    hidden: true,
                    handler: function() {
                        var todoStore = dataview.getStore();

                        Ext.Viewport.setActiveItem(1);

                        record.set('todo_completed', true);
                        record.set('todo_deleted', true);
                        todoStore.sync();
                        todoStore.load({
                            scope: this,
                            callback: function() {
                                Ext.Viewport.setActiveItem(0);
                            }
                        });
                    }
                });
            } else if (event.direction === "left") {
                btnDom = Ext.DomQuery.selectNode(".toDoListTaskEdit", target.dom);
                doneBtn = Ext.create("Ext.Button", {
                    cls: 'doneBtn-cls',
                    text: 'Edit',
                    hidden: true,
                    handler: function(btn) {
                        todoVm.set("todo_id", record.data.todo_id);
                        todoVm.set("todo_edit", true);
                        me.showEditView(record, index);
                    }
                });
            }
            var removeButton = function() {
                Ext.Anim.run(doneBtn, 'fade', {
                    after: function() {
                        doneBtn.destroy();
                        btnDom.style.width = "0%";
                        btnDom.style.display = "none";
                        taskDom.style.width = "80%";
                        timeDom.style.width = "20%";
                        timeDom.style.display = "";
                    },
                    out: true
                });
            };
            doneBtn.renderTo(btnDom);
            btnDom.style.width = "20%";
            btnDom.style.display = "";
            taskDom.style.width = "60%";
            timeDom.style.width = "0%";
            timeDom.style.display = "none";
            doneBtn.show({
                type: 'slide',
                direction: event.direction,
                duration: 500
            });
            dataview.on({
                single: true,
                buffer: 250,
                itemtouchstart: removeButton
            });
            dataview.element.on({
                single: true,
                buffer: 250,
                touchstart: removeButton
            });
        }
    },

    showEditView: function(record, index) {
        var editTaskView = Ext.create('DDO.view.widget.todo.CreateOrEditList', {
            operation: 'edittodoform', // edit operation
            index: index
        });

        editTaskView.getViewModel().set('todoFormTitle', 'Edit');
        editTaskView.show();
        if (!Ext.isEmpty(record)) {
            this.getViewModel().set('taskNameValue', record.get('todo_task'));
            this.getViewModel().set('dateFieldValue', new Date(record.get('todo_enddate')));
            editTaskView.down('button[itemId=createBtn]').setText('Save');
            editTaskView.setRecord(record);
        }
    }
});