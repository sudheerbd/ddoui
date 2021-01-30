/**
 * This view is responsible for displaying todo widget in home page.
 * @class 'DDO.view.widget.todo.ToDoList'
 * @extends 'Ext.container.Container'
 * @alias 'todolist'
 * @ViewModel 'DDO.view.widget.todo.ToDoListModel'
 * @Controller 'DDO.view.widget.todo.ToDoListController'
 */
Ext.define('DDO.view.widget.todo.ToDoList', {
    extend: 'Ext.container.Container',

    xtype: 'todolist',

    requires: [
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.Action',
        'Ext.tip.ToolTip',
        'Ext.grid.Panel',
        'Ext.form.field.Date',
        'Ext.tip.ToolTip',
        'DDO.model.widget.todo.TodoModel',
        'DDO.view.widget.todo.ToDoListController',
        'DDO.view.widget.todo.ToDoListModel',
        'DDO.view.widget.todo.ToDoMenu',
        'DDO.view.widget.todo.ToDoGrid',
        'DDO.view.widget.todo.tododetailview.TodoDetailView',
        'DDO.view.widget.todo.ToDoDetailWindow'

    ],

    controller: 'todolistcontroller',
    viewModel: {
        type: 'todolistmodel'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    height: Constants.ViewportHeight * 0.70,

    items: [{
        xtype: 'toolbar',
        cls: 'ddo-todo-toolbar',
        items: [
        {
            xtype: 'container',
            cls: 'ddo-todo-label',
            bind: {
                html: '{todoname}'
            }
        }, { /*Expand logo to open the Todo Detail Window -- Starts*/
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            cls: 'ddo-todo-detail-expand-logo',
            listeners: {
                render: function(c) {
                    c.getEl().on({
                        click: 'onDetailClick'
                    });
                },
                afterrender: function(c) {
                    Ext.create('Ext.tip.ToolTip', {
                        target: c.getEl(),
                        html: LabelsTitles.HOME.KARMASCORE.SHOWDETAILS
                    });
                }
            }
            /*Expand logo to open the Todo Detail Window -- Ends*/
        }]
    }, {
        xtype: 'form',
        cls: 'todo-form',
        margin: '-9 10 0 8',
        items: [{
            xtype: 'textfield',
            reference: 'taskname',
            emptyText: LabelsTitles.HOME.KARMASCORE.ADDTASK,
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
            cls: 'ddo-todo-add-button',
            bind: {
                disabled: '{!getTextFieldValue}'
            },
            handler: 'addTask'
        }]
    }, {
        xtype: 'todogrid',
        height: Constants.ViewportHeight * 0.512,
        width: '100%',
        margin: '0 10 0 13'
    }]
});