Ext.define('DDO.store.widget.todo.TodoStore', {
	extend: 'Ext.data.Store',

	alias: 'store.todostore',

	requires: [
		'DDO.model.widget.todo.TodoModel'
	],

	model: 'DDO.model.widget.todo.TodoModel',

	proxy: {
		type: 'ajax',

		api: {
			read: Api.URL.todo.READ,
			create: Api.URL.todo.CREATE,
			update: Api.URL.todo.UPDATE,
			destroy: Api.URL.todo.DESTROY
		},

		actionMethods: {
			read: 'GET',
			create: 'POST',
			update: 'PUT',
			destroy: 'DELETE'
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