Ext.define('DDO.store.widget.todo.TodoDetailStore', {
	extend: 'Ext.data.Store',

	alias: 'store.tododetailstore',

	requires: [
		'DDO.model.widget.todo.TodoModel'
	],

	model: 'DDO.model.widget.todo.TodoModel',

	proxy: {
		type: 'ajax',

		api: {
			read: Api.URL.todo.TODODETAILREAD,
			update: Api.URL.todo.UPDATE
		},

		actionMethods: {
			read: 'GET',
			create: 'POST',
			update: 'PUT'
		},

		reader: {
			type: 'json',
			rootProperty: 'data'
		},

		writer: {
			writeAllFields: true
		}

	},

	sorters: [{
		property: 'todo_id',
		direction: 'DESC'
	}]
});