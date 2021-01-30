
/**
 * This view is responsible for displaying todo details view.
 * @class 'DDO.view.widget.todo.tododetailview.TodoDetailView'
 * @extends 'Ext.window.Window'
 * @alias 'widget.tododetailview'
 * @ViewModel 'DDO.view.widget.todo.tododetailview.TodoDetailViewModel'
 * @Controller 'DDO.view.widget.todo.tododetailview.TodoDetailViewController'
 */
Ext.define('DDO.view.widget.todo.tododetailview.TodoDetailView', {
    extend: 'Ext.window.Window',
    alias: 'widget.tododetailview',

    requires: [
        'DDO.view.widget.todo.tododetailview.TodoListDetail',
        'DDO.view.widget.todo.tododetailview.TodoDetailViewModel',
        'DDO.view.widget.todo.tododetailview.TodoDetailViewController'
    ],

    autoShow: false,

    title: LabelsTitles.HOME.TODO.TODOLIST,

    modal: true,

    width: Constants.ViewportWidth * 0.512,
    height: Constants.ViewportHeight * 0.93,
    constrain:true,
    controller: 'tododetailviewcontroller',

    viewModel: {
        type: 'tododetailviewmodel'
    },

    items: [{
        xtype: 'todolistdetail'
    }]
});
