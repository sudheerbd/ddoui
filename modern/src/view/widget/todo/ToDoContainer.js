Ext.define('DDO.view.widget.todo.ToDoContainer', {
    extend: 'Ext.Container',
    xtype: 'todocontainer',

    reference: 'todocontainer',

    controller: 'todocontainercontroller',

    viewModel: {
        type: 'todocontainermodel'
    },

    requires: [
        'DDO.view.widget.todo.ToDoList',
        'DDO.view.widget.todo.ToDoContainerController',
        'DDO.view.widget.todo.ToDoContainerModel'
    ],

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'todolist',
        reference: 'todolist'
    }]
});
