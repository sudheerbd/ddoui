 /**
 * This is controller for view 'DDO.view.widget.todo.ToDoList'.
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.todolistcontroller'
 */
Ext.define('DDO.view.widget.todo.ToDoListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.todolistcontroller',
    checkedRows : [],

    //For Todo Detail View Window
    /**
     * This handler is responsible for Display of todo details View Window
     * @param {Object} btn, Button reference.
     * @param {Object} e , Event Object.
     */
    onDetailClick: function(btn, e) {
        try {
            var todoWindow = Ext.ComponentQuery.query('tododetailview')[0];
            todoWindow = todoWindow || Ext.widget({
                xtype: 'tododetailview'
            });
            if (todoWindow) {
                todoWindow.show();
            }
        } catch (err) {
            Utility.showToast(Messages.HOME.TODODETAILSCLICK, err);
        }
    },

    //commonly initialized variables
    commonVariables: function() {
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            viewModel = me.getViewModel(),
            reusableVars;

        reusableVars = {
            me: me,
            view: view,
            refs: refs,
            viewModel: viewModel
        };

        return reusableVars;
    },

    //Initialized variables for records and stores
    viewReferences: function(rowIndex) {
        var obj = {},
            initiatedVars = this.commonVariables(),
            viewModelToDoId = initiatedVars.viewModel.get('todo_id'),
            viewModelTaskNameValue = initiatedVars.viewModel.get('taskNameValue'),
            viewModelEndDateValue = initiatedVars.viewModel.get('dateFieldValue').toISOString(),
            record, store, sourceItems;

        store = Ext.getStore('widget.todo.TodoStore');

        if (!Ext.isEmpty(rowIndex)) {
            record = store.getAt(rowIndex);
        }

        obj = {
            store: store,
            record: record,
            viewModelToDoId: viewModelToDoId,
            viewModelTaskNameValue:viewModelTaskNameValue,
            viewModelEndDateValue: viewModelEndDateValue
        };

        return obj;
    },

    /**
     * This handler is responsible for post action of edit operation in todolist
     * @param {Object} grid, Contains grid reference of todo view
     * @param {Number} rowIndex , Selected record row index
     * @param {Number} colIndex , Selected record column number.
     */
    todoTaskEdit : function(grid, rowIndex, colIndex){
        try {
            var references = this.getReferences(),
                todoGrid = references.todoGrid,
                store = todoGrid.getStore(),
                record = store.getAt(rowIndex),
                cellEditing = todoGrid.getPlugins()[0];
            if(record.get('task_type') == '1'){
                var tododetailwindow = Ext.widget({
                    xtype: 'tododetailwindow',
                    record : record,
                    store : store
                });
            }else{
                return false;
            }  
        } catch (err) {
            Utility.showToast(Messages.HOME.TASKEDIT, err);
        } 
    },

    /**
     * This handler is responsible for action of delete operation in todolist
     * @param {Object} grid, Contains grid reference of todo view
     * @param {Number} rowIndex , Selected record row index
     * @param {Number} colIndex , Selected record column number.
     */
    todoTaskDelete : function(grid, rowIndex, colIndex){
        try {
            Utility.todoEdited = false;
            var initiatedVars = this.commonVariables(),
                store = grid.getStore(),
                record = store.getAt(rowIndex);

            if(record.get('task_type') == '1'){
                record.set("todo_deleted", true);
                var mask = new Ext.LoadMask({
                    msg: '',
                    target: grid.up('tododetailview')
                });
                mask.show();
            
                store.sync({
                    success: function(batch) {
                        store.load();
                        mask.hide();
                    },
                    failure: function(batch) {
                        mask.hide();
                    }   
                });
                
                this.resetToDoForm(initiatedVars.viewModel);
                
            } else {
                Ext.Msg.alert('Error', Messages.HOME.NONDELETE);
            }
        } catch (err) {
            Utility.showToast(Messages.HOME.TASKDELETE, err);
        }
    },

    /**
     * The handler is responsible for initiate add operation in todo list
     * @param {Object} field, Text field reference for name field in todo.
     * @param {Object} e , Event Object.
     */
    onTaskNameKeyPress: function(field, e) {
        try {
            if (e.getKey() === e.ENTER && Ext.String.trim(field.value) != "") {
                this.addTask(null, null);
            }
        } catch (err) {
            Utility.showToast(Messages.HOME.TASKNAMEKEYPRESS, err);
        }
    },

    /**
     * This handler is responsible for action need at time of rendering todo grid.
     * @param {Object} todoGrid 
     */
    onTodoGridRender : function(todoGrid){
        todoGrid.getColumns()[3].show();
        todoGrid.getColumns()[4].show();
    },

    //Data will be added or updated to the store
    addTask: function(btn, e) {
        var initiatedVars = this.commonVariables(),
            storeVars = this.viewReferences(),
            todoGrid,todoView = initiatedVars.me.getView(),
            data,todoTaskLoading;

        data = {
            title: initiatedVars.refs.taskname.value,
            date: storeVars.viewModelEndDateValue
        };

        storeVars.store.add({
            "todo_enddate": data.date,
            "todo_task": data.title,
            "todo_deleted": false
        });
        todoTaskLoading = new Ext.LoadMask({
            msg: '',
            target: todoView
        });
        todoTaskLoading.show();
        storeVars.store.sync({
            success: function(batch) {
                todoTaskLoading.hide();
                storeVars.store.load();
            },
            failure: function(batch) {
                todoTaskLoading.hide();
            }
        });

        this.resetToDoForm(initiatedVars.viewModel);
    },

    //To reset the form
    resetToDoForm: function(viewModel) {
        viewModel.set('todo_id', null);
        viewModel.set('taskNameValue', null);
        viewModel.set('dateFieldValue', new Date());
    },

    //If checkcolumn selected or deseleted, set todo_completed as true or false
    /**
     * @param {Object} button, Contains checkbox reference.
     * @param {Number} rowIndex, Contains number reference.
     * @param {Boolean} checked, Contains Boolen formatted value to represent status of checkbox
     * @param {Object} eOpts , Event object.
     */
    onSelectionChange: function(button, rowIndex, checked, eOpts) {
        try {    
            if (Utility.todoEdited) {
                checked = false;
            } else {
                var obj = this.viewReferences(rowIndex),
                    initiatedVars = this.commonVariables(),
                    detailView = Ext.ComponentQuery.query('tododetailview')[0],
                    todolistView = button.up('todolist') || button.up('todolistdetail'),
                    targetDom, targetEl, store, todoCompletedFn;

                todoCompletedFn = function(obj, initiatedVars, todolistView, checked) {
                    this.resetToDoForm(initiatedVars.viewModel);

                    if (checked === true) {

                        todolistView.mask('');
                        obj.record.set("todo_completed", true);
                        obj.record.set("todo_deleted", false);
                        obj.store.sync({
                            success: function() {
                                if (todolistView) {
                                    todolistView.unmask();
                                }
                                obj.store.load();
                            },
                            failure:function(){
                                todolistView.unmask();
                                obj.store.load();
                            }
                        });
                    
                    } else {
                        obj.record.set("todo_deleted", false);
                        obj.record.set("todo_completed", false);
                        obj.store.sync();
                    }

                    if (detailView) {
                        this.getViewModel().set('selecChange', true);
                    }
                }.bind(this);

                if (Ext.isGecko) {
                    todoCompletedFn(obj, initiatedVars, todolistView, checked);
                } else {
                    targetDom = event.target;
                    targetEl = Ext.get(targetDom);

                    if (targetEl.hasCls('x-grid-checkcolumn')) {
                        todoCompletedFn(obj, initiatedVars, todolistView, checked);
                    } else {
                        store = button.up('grid').getStore();

                        store.data.items[rowIndex].data.todo_completed = false;
                        checked = false;
                    }
                }
            }
        } catch (err) {
            Utility.showToast(Messages.HOME.TASKSTATUS, err);
        }
    },

    /**
     * To calculate between selected date and current or present date to produce either in hours or days
     * @param {String} value, value of the selected record
     * @param {Object} metaData , Meta description for the selected element,
     * @param {Object} record , selected record
     */
    onTodoEnddateRenderer: function(value, metaData, record) {
        try {
            var currentDate = new Date(),
                endDate = Ext.Date.add(new Date(value.setHours(0, 0, 0)), Ext.Date.DAY, 1),
                timeDiff = endDate.getTime() - currentDate.getTime(),
                minDiff = timeDiff / 60 / 1000,
                hoursValue = Math.floor(timeDiff / 3600 / 1000),
                minutesValue = Math.round(minDiff - 60 * hoursValue, 1),
                daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)),
                dateDiff;

            if (record.data.todo_completed === true) {
                dateDiff = Messages.HOME.GREAT;
            } else {
                if (hoursValue < 0) {
                    dateDiff = Messages.HOME.PENDING;
                } else if (hoursValue === 0) {
                    dateDiff = minutesValue + 'min';
                } else if (hoursValue > 24) {
                    dateDiff = daysDiff + 'day' + ((daysDiff > 1 || daysDiff < 1) ? 's' : '');
                } else {
                    dateDiff = hoursValue + 'hr' + ((hoursValue > 1 || hoursValue != -1) ? 's' : '');
                }
            }
            return '<span class="ddo-todo-date-click">' + dateDiff + ' </span><img style="display:none;" class="ddo-todo-edit-btn-img" src="resources/images/todo/Done.png">';
        } catch (err) {
            Utility.showToast(Messages.HOME.TODOENDDATE, err);
        }
    },

    /**
     * This handler is responsible for add operation on task for date details.
     * @param {Object} picker, The Scope reference  for date picker.  
     * @param {String} date, The value of date picker
     * @param {Object} eOpts, Event Object
     */
    addDateTask: function(picker, date, eOpts) {
        try {
            var initiatedVars = this.commonVariables(),
                storeVars = this.viewReferences(),
                date = picker.value.toISOString(),
                todo_id = initiatedVars.view.record.data.todo_id,
                todoGrid;

            todo_idRecordData = storeVars.store.findRecord('todo_id', todo_id);
            todo_idRecordData.set("todo_enddate", date);

            storeVars.store.sync({
                success: function() {
                    storeVars.store.load({
                        scope: this,
                        callback: function(records, operation, success) {
                            initiatedVars.view.destroy();
                        }
                    });
                }
            });
        } catch (err) {
            Utility.showToast(Messages.HOME.ADDTASKDATE, err);
        }
    },

    /**
     * menu date picker renderer, to set the value in it 
     * @param {Object} picker 
     * @param {Object} events 
     */
    onMenuDatePickerRender: function(picker, events) {
        try {
            var menuView = picker.up('menu'),
            toDoEndDate = menuView.record.data.todo_enddate;
            picker.setValue(toDoEndDate);
        } catch (err) {
            Utility.showToast(Messages.HOME.DATEPICKERRENDER, err);
        }   
    },

    /**
     * when cell editor textfield, validates then automatically updates the taskname.
     * @param {Object} editor, Reference of cell editor. 
     * @param {String} context, value of cell editor.
     * @param {Object} eOpts , event object
     */
    onValidateEdit: function(editor, context, eOpts) {
        try {
            Utility.todoEdited = false;
            var initiatedVars = this.commonVariables();
            context.record.set("todo_task",context.value);
            context.store.sync();
            context.store.load();
            this.resetToDoForm(initiatedVars.viewModel);
        } catch (err) {
            Utility.showToast(Messages.HOME.VALIDATEEDIT, err);
        }
    },

    /**
     * To show or hide the edit/button and calculated column
     * @param {Object} plugin, Plugin information.
     * @param {Object} cell, cell reference
     * @param {Object} events , event object
     */
    onBeforeEditTodoTaskName: function(plugin, cell, events) {
        try {
            if(cell.record.data.task_type == "1"){
                Utility.todoEdited = true;
                var lastChildEle = cell.row.lastChild,
                    dateChildNodeEl;
                if(lastChildEle.getElementsByClassName('ddo-todo-edit-btn-img')[0]){
                    lastChildEle.getElementsByClassName('ddo-todo-edit-btn-img')[0].style.display = "inline-block";
                    lastChildEle.getElementsByClassName('ddo-todo-date-click')[0].style.display = "none";
                } else {
                    dateChildNodeEl = cell.row.childNodes[2];
                    dateChildNodeEl.getElementsByClassName('ddo-todo-edit-btn-img')[0].style.display = "inline-block";
                    dateChildNodeEl.getElementsByClassName('ddo-todo-date-click')[0].style.display = "none";
                }
            }else{
                return false;
            }
        } catch (err) {
            Utility.showToast(Messages.HOME.BEFOREEDITNAME, err);
        }
    },

    /**
     * Cancelling edit or delete operation
     * @param {Object} editor, Reference of cell editor. 
     * @param {String} context, value of cell editor.
     * @param {Object} eOpts , event object
     */
    onCancelEdittoDel: function(editor, context, eOpts) {
        try {
            Utility.todoEdited = false;
            var initiatedVars = this.commonVariables();

            context.record.set("todo_task", '');
            context.record.set("todo_deleted", true);

            context.store.sync();
            context.store.load();

            this.resetToDoForm(initiatedVars.viewModel);
        } catch (err) {
            Utility.showToast(Messages.HOME.CANCELOPERATION, err);
        }
    },

    /**
     * To Shows menu date picker appearance.
     * @param {Object} tableview, Contains reference of table view in grid.
     * @param {Object} td, Contains reference of table Column in grid.
     * @param {Number} cellIndex, Contains column index.
     * @param {Object} record, Contains reference of selected record in grid.
     * @param {Object} tr, Contains reference of table row in grid.
     * @param {Number} rowIndex, Contains row index.
     * @param {Object} eOpts, Contains reference of table view in grid.
     */
    onCellSingleClickforDatePicker: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        try {
            var targetDom = e.getTarget(),
                targetEl = Ext.get(targetDom),
                detailView = Ext.ComponentQuery.query('tododetailview')[0];
            if(record.data.task_type == '1'){
                if (targetEl.hasCls('ddo-todo-completed-task') || targetEl.hasCls('ddo-todo-outdated-taskname') || targetEl.hasCls('ddo-todo-date-click')) {
                    if (cellIndex === 2) {
                        var menu = Ext.ComponentQuery.query('todomenu')[0],
                            height,
                            heightDiff,
                            viewportHeight;

                        if (menu) {
                            menu.lookupReference('menuPicker').setValue(record.data.todo_enddate);
                        }

                        menu = menu || Ext.create('DDO.view.widget.todo.ToDoMenu', {});
                        menu.record = record;
                        menu.showBy(e.target);

                        height = menu.getHeight();
                        viewportHeight = Ext.getBody().getViewSize().height;
                        heightDiff = viewportHeight - height;

                        if (!detailView) {
                            if (tableview.getY() > heightDiff) {
                                menu.removeCls('ddo-todo-menu-upper-datepicker');
                                menu.addCls('ddo-todo-menu-lower-datepicker');
                            } else {
                                menu.removeCls('ddo-todo-menu-lower-datepicker');
                                menu.addCls('ddo-todo-menu-upper-datepicker');
                            }
                        }
                    }
                }
            }
        } catch (err) {
            Utility.showToast(Messages.HOME.CELLDATEPICKER, err);
        }    
    },
    /**
     * Displays tooltip rendering on task name in grid.
     * @param {Object} grid, Contain reference of grid.
     */
    onTaskNameTooltipRender: function(grid) {
        try {
            var view = grid.view;
            grid.tip = Ext.create('Ext.tip.ToolTip', {
                target: view.el,
                delegate: '.ddo-todo-taskname-text',
                trackMouse: true,
                renderTo: Ext.getBody(),
                listeners: {
                    beforeshow: function updateTipBody(tip, event) {
                        var tipStyle = tip.getEl().dom.style,
                            detailView = Ext.ComponentQuery.query('tododetailview')[0];

                        if (detailView &&
                            tip.triggerElement.getElementsByClassName('ddo-taskname-editor-textfield').length === 0 &&
                            tip.triggerElement.textContent.length > 147) {

                            tipStyle.color = "#747474";
                            tipStyle.backgroundColor = "#747474";
                            tipStyle.borderColor = "#747474";
                            tip.update(tip.triggerElement.textContent);

                        } else if (!detailView &&
                            tip.triggerElement.getElementsByClassName('ddo-taskname-editor-textfield').length === 0) {

                            tipStyle.color = "#747474";
                            tipStyle.backgroundColor = "#747474";
                            tipStyle.borderColor = "#747474";
                            tip.update(tip.triggerElement.textContent);
                        } else {
                            tip.update('');
                            tipStyle.backgroundColor = "transparent";
                            tipStyle.borderColor = "transparent";
                        }
                    }
                }
            });
        } catch (err) {
            Utility.showToast(Messages.HOME.TASKTOOLTIP, err);
        }
    }
});
