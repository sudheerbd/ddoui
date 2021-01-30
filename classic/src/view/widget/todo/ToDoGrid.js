/**
 * This view is responsible for displaying todo grid.
 * @class 'DDO.view.widget.todo.ToDoGrid'
 * @extends 'Ext.grid.Panel'
 * @alias 'todogrid'
 * @ViewModel 'DDO.view.profile.UserProfileModel'
 * @Controller 'DDO.view.profile.UserProfileController'
 */
Ext.define('DDO.view.widget.todo.ToDoGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'todogrid',

    reference: 'todoGrid',

    emptyText: LabelsTitles.HOME.TODO.ENJOYDAY,

    width: '100%',

    scrollable: true,

    header: false,
    rowLines: false,
    hideHeaders: true,
    columnLines: false,

    cls: 'listGrid noscrollbar',

    initComponent: function() {
        Ext.getStore('widget.todo.TodoStore').load();
        this.callParent(arguments);
    },

    viewConfig: {
        markDirty: false,
        stripeRows: false,
        getRowClass: function(record) {
            if (Utility.todoEdited) {
                if (record.data.todo_completed) {
                    record.data.todo_completed = false;
                } else {
                    record.data.todo_completed = true;
                }
            } else {
                var targetDom, targetEl, rowCls;
                if (!Ext.isGecko && event) {
                    targetDom = event.target;
                    targetEl = Ext.get(targetDom);
                    if (targetEl) {
                        if (targetEl.hasCls('x-grid-cell-inner-checkcolumn') 
                                || targetEl.hasCls('x-grid-checkcolumn-checked') 
                                    || targetEl.hasCls('ddo-todo-checkcolumn')) {
                            if (record.data.todo_completed) {
                                record.data.todo_completed = false;
                            } else {
                                record.data.todo_completed = true;
                            }
                        }
                    }
                }
            }

            /* if todo_completed is true or false, based on it, applies 
             cls(to strike or unstrike the taskname) to a grid row. */
            record.get('todo_completed') ? rowCls = 'strike-through-row' :
                rowCls = 'non-strike-through-row';
            if (record.get('task_type') == 2) {
                rowCls = rowCls + " project-icon-visible";
            } else if (record.get('task_type') == 3) {
                rowCls = rowCls + " goals-icon-visible";
            } else if(record.get('task_type') == 4) {
                rowCls = rowCls + " mom-icon-visible";
            } else {
                // do nothing
            }
            return rowCls;
        }
    },
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 2,
        listeners: {
            validateedit: 'onValidateEdit',
            beforeedit: 'onBeforeEditTodoTaskName',
            canceledit: 'onCancelEdittoDel'
        }
    },

    layout: 'fit',

    store: 'widget.todo.TodoStore',

    columns: [{
        xtype: 'checkcolumn',
        tdCls: 'ddo-todo-checkcolumn',
        dataIndex: 'todo_completed',
        align: 'left',
        width: 28,
        listeners: {
            checkchange: 'onSelectionChange'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'todo_task',
        text: LabelsTitles.HOME.TODO.TASK,
        tdCls: 'ddo-todo-taskname-text projects-todo-cls',
        flex: 0.8,
        editor: {
            xtype: 'textfield',
            cls: 'ddo-taskname-editor-textfield',
            allowBlank: false
        }
    }, {
        xtype: 'gridcolumn',
        itemId: 'todoenddate',
        reference: 'todoenddate',
        dataIndex: 'todo_enddate',
        flex: 0.2,
        tdCls: 'ddo-todo-enddate-text',
        align: 'right',
        renderer: 'onTodoEnddateRenderer'
    }, {
        xtype: 'actioncolumn',
        width: 30,
        iconCls: 'x-fa fa-pencil-square-o',
        tooltip: LabelsTitles.HOME.TODO.EDIT,
        handler: 'todoTaskEdit',
        hidden: true,
        renderer: function(value, meta) {
            meta.tdCls = 'edit-task';
        }
    }, {
        xtype: 'actioncolumn',
        width: 30,
        iconCls: 'x-fa fa-trash-o',
        tooltip: LabelsTitles.HOME.TODO.DELETE,
        handler: 'todoTaskDelete',
        hidden: true,
        renderer: function(value, meta) {
            meta.tdCls = 'delete-task';
        }
    }],

    listeners: {
        cellclick: 'onCellSingleClickforDatePicker',
        viewready: 'onTaskNameTooltipRender'
    }
});