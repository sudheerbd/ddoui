/**
 * This view is responsible for displaying todo list grid view.
 * @class 'DDO.view.widget.todo.tododetailview.TodoGridDetail'
 * @extends 'Ext.grid.Panel'
 * @alias 'todogriddetail'
 * @ViewModel 'DDO.view.widget.todo.tododetailview.TodoDetailViewModel'
 * @Controller 'DDO.view.widget.todo.tododetailview.TodoDetailViewController'
 */
Ext.define('DDO.view.widget.todo.tododetailview.TodoGridDetail', {
    extend: 'Ext.grid.Panel',
    xtype: 'todogriddetail',
    scrollable: true,
    height: Constants.ViewportHeight * 0.762,
    width: Constants.ViewportWidth * 0.44,
    header: false,
    rowLines: false,
    hideHeaders: true,
    columnLines: false,
    cls: 'listGrid noscrollbar',
    
    initComponent: function () {
        Ext.getStore('widget.todo.TodoDetailStore').load();
        this.callParent(arguments);
    },
    
    viewConfig: {
        markDirty: false,
        stripeRows: false
    },
    
    layout: 'fit',
    store: 'widget.todo.TodoDetailStore',
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'todo_task',
        text: LabelsTitles.HOME.TODO.TASK,
        tdCls: 'ddo-todo-taskname-text',
        flex: 0.8,
        editor: {
            xtype: 'textfield',
            cls: 'ddo-taskname-editor-textfield',
            allowBlank: false
        }
    }, {
        xtype: 'actioncolumn',
        width: 50,
        iconCls: 'x-fa fa-undo',
        tooltip: LabelsTitles.HOME.TODO.UNDOTASK,
        handler: 'undoTodoTaskOperation'
    },{
        xtype: 'actioncolumn',
        width: 30,
        iconCls:'x-fa fa-trash-o',
        tooltip: LabelsTitles.HOME.TODO.DELETE,
        handler: 'todoTaskDelete'
    }],
    listeners: {
        viewready: 'onTaskNameTooltipRender'
    }
});