Ext.define('DDO.view.widget.todo.CreateOrEditList', {
    extend: 'Ext.form.Panel',
    alias: 'widget.createoreditlist',

    reference: 'createoreditlist',

    requires: [
        'DDO.view.widget.todo.CreateOrEditListController',
        'DDO.view.widget.todo.CreateOrEditListViewModel'
    ],

    cls: 'create0rEditList-cls',

    layout: {
        type: 'vbox',
        align: 'stretchmax'
    },

    modal: true,
    centered: false,
    hideOnMaskTap: true,
    fullscreen: true,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,

    controller: 'createoreditlistcontroller',

    viewModel: {
        type: 'createoreditlistviewmodel'
    },

    /**
     * @property {String} [operation="addtodoform"]
     * Used to recognize whether the form is used to add a new rec or
     * update an existing record.
     * Takes either of these values:
     *      - addtodoform
     *      - edittodoform
     */
    operation: 'addtodoform',

    scrollable: false,

    defaults: {
        width: '100%',
        msgTarget: 'side'
    },

    items: [{
        xtype: 'toolbar',
        cls: 'taskToolbar-cls',
        flex: 0.4,
        bind: {
            title: '{todoFormTitle}'
        },
        items: [{
            xtype: 'button',
            icon: 'resources/images/arrow_left.png',
            cls: 'ddo-addjobscontainer-backbtn',
            handler: 'showByToDoList'
        }]
    }, {
        xtype: 'container',
        align: 'center',
        cls: 'calenderContainer-cls',
        flex: 4.6,
        items: [{
            xtype: 'textareafield',
            reference: 'taskName',
            cls: 'taskName-cls',
            placeHolder: 'Task',
            clearIcon: false,
            name: 'todo_task'
        }, {
            xtype: 'hiddenfield',
            name: 'todo_id'
        }, {
            xtype: 'datepickerfield',
            reference: 'dateRef',
            value: new Date(),
            cls: 'datePicker-cls',
            name: 'todo_enddate',
            picker: {
                xtype: 'datepicker',
                slotOrder: ["day", "month", "year"],
                value: (new Date()), // use this if you DON'T want/have a value in the actual input
                yearFrom: (new Date()).getFullYear(),
                yearTo: ((new Date()).getFullYear()) + 1
            }
        }, {
            xtype: 'button',
            text: 'Create',
            cls: 'createBtn-cls',
            bind: {
                disabled: '{!value}'
            },
            itemId: 'createBtn',
            handler: 'onTodoCreate'
        }]
    }]
});