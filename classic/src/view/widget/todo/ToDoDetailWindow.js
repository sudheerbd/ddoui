/**
 * This view is responsible for displaying todo window for task related operation in home page.
 * @class 'DDO.view.widget.todo.ToDoDetailWindow'
 * @extends 'Ext.window.Window'
 * @alias 'widget.tododetailwindow'
 * @ViewModel 'DDO.view.widget.todo.ToDoListModel'
 * @Controller 'DDO.view.widget.todo.ToDoListController'
 */
Ext.define('DDO.view.widget.todo.ToDoDetailWindow', {
    extend: 'Ext.window.Window',
    title: LabelsTitles.HOME.TODO.TASKDETAILS,
    alias: 'widget.tododetailwindow',
    height: Constants.ViewportHeight * 0.31,
    width: Constants.ViewportWidth * 0.365,
    autoShow: true,
    modal: true,
    resizable: false,
    layout: 'fit',
    record: '',
    store: '',
    items: [{
        xtype: 'form',
        items: [{
            xtype: 'textarea',
            name: 'taskdetails',
            allowBlank: false,
            anchor: '100% 100%'
        }],
        buttons: [{
            text: LabelsTitles.HOME.TODO.OK,
            formBind: true,
            handler: function(btn) {
                var window = btn.up('window'),
                    record = window.record,
                    store = window.store,
                    taskDetails;

                if (record) {
                    taskDetails = window.down('textarea').getValue();
                    record.set('todo_task', taskDetails);
                    store.sync();
                    store.load();
                    window.close();
                }
            }
        }, {
            text: LabelsTitles.HOME.TODO.CANCEL,
            handler: function(btn) {
                var window = btn.up('window');
                window.close();
            }
        }]
    }],
    listeners: {
        afterrender: function(window) {
            var record = window.record,
                store = window.store,
                taskDetails = record.get('todo_task');

            window.down('textarea').setValue(taskDetails);
        }
    }
});