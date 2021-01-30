/**
 * This view is responsible for displaying todo list details view.
 * @class 'DDO.view.widget.todo.tododetailview.TodoListDetail'
 * @extends 'Ext.container.Container'
 * @alias 'todolistdetail'
 * @ViewModel 'DDO.view.widget.todo.tododetailview.TodoDetailViewModel'
 * @Controller 'DDO.view.widget.todo.tododetailview.TodoDetailViewController'
 */
Ext.define('DDO.view.widget.todo.tododetailview.TodoListDetail', {
    extend: 'Ext.container.Container',

    xtype: 'todolistdetail',

    requires: [
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.Action',
        'Ext.tip.ToolTip',
        'Ext.grid.Panel',
        'Ext.form.field.Date',

        'DDO.model.widget.todo.TodoModel',
        'DDO.view.widget.todo.ToDoMenu',
        'DDO.view.widget.todo.tododetailview.TodoGridDetail',
        'Ext.tip.ToolTip'
    ],

    cls: 'add-detail-list-container',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'form',
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'textfield',
            reference: 'searchname',
            emptyText: LabelsTitles.HOME.TODO.SEARCHTODOTASK,
            cls: 'ddo-todo-detail-search-text',
            name: 'taskname',
            enforceMaxLength: true,
            height: 30,
            enableKeyEvents: true,
            width: Constants.ViewportWidth * 0.22,
            maxLength: 300,
            margin: 15,
            listeners: {
                keyup: 'onSearchAnyStatusTask'
            }
        }, {
            xtype: 'button',
            width: 10,
            height: 10,
            cls: 'search-icon-field'
        }, {
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            text: LabelsTitles.HOME.TODO.PENDING,
            name: 'pending',
            cls: 'ddo-toggle-button-pending',
            value: 'pending',
            margin: '15 0 15 15',
            toggleGroup: 'statusGroup',
            enableToggle: true,
            pressed: true,
            handler: 'onTodoToggleBtnClick'
        }, {
            xtype: 'button',
            text: LabelsTitles.HOME.TODO.COMPLETED,
            name: 'completed',
            margin: '15 15 15 0',
            cls: 'ddo-toggle-button-completed',
            value: 'completed',
            toggleGroup: 'statusGroup',
            enableToggle: true,
            handler: 'onTodoToggleBtnClick'
        }]
    }, {
        xtype: 'form',
        cls: 'todo-form',
        margin: '5 10 0 8',
        bind: {
            hidden: '{completedTaskStatus}'
        },
        items: [{
            xtype: 'textfield',
            reference: 'taskname',
            emptyText: LabelsTitles.HOME.TODO.ADDTASK,
            name: 'taskname',
            enforceMaxLength: true,
            cls: 'ddo-todo-textfield',
            height: 30,
            maxLength: 300,
            bind: {
                value: '{taskNameValue}'
            },
            listeners: {
                specialkey: 'onTaskNameKeyPress'
            }
        }],
        dockedItems: [{
            xtype: 'button',
            reference: 'addbutton',
            dock: 'right',
            height: 30,
            cls: 'ddo-todo-detail-add-button',
            bind: {
                disabled: '{!getTextFieldValue}'
            },
            handler: 'addTask'
        }]
    }, {
        xtype: 'todogrid',
        listeners : {
            afterrender : 'onTodoGridRender'
        },
        height: Constants.ViewportHeight * 0.64,
        bind: {
            hidden: '{todoWindowTaskCompleted}'
        },
        width: '100%',
        margin: '0 10 0 13'
    }, {
        xtype: 'todogriddetail',
        bind: {
            hidden: '{!todoWindowTaskCompleted}'
        },
        reference: 'todogrid',
        margin: '0 10 0 13'
    }]
});