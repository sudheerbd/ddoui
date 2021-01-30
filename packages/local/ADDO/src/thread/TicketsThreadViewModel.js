Ext.define('ADDO.thread.TicketsThreadViewModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.ticketsthreadview',
	data: {},
	stores: {
		threadstore: {
			fields: [{
				name: 'tickethistoryid',
				type: 'number'
			}, {
				name: 'subject',
				type: 'string'
			}, {
				name: 'comment',
				type: 'string'
			},{
				name:'fromname',
				type:'string'
			},{
				name: 'date',
				type: 'date'
			},{
				name: 'comment_name',
				type: 'string'
			},{
				name:'comment_image',
				type:'string'
			},{
				name:'details',
				type:'string'
			}],
			filters: [{
				filterFn: function(item) {
					return item.data.comment_name.length > 0;
				}
			}],
			proxy: {
				type: 'ajax',
				url: '/tickethistory',
				reader: {
					type: 'json',
					rootProperty: 'data'
				}
			},
			sorters: [{
				property: 'tickethistoryid',
				direction: 'DESC'
			}],

			autoLoad: false
		},
		panelstore: {
			fields: [
				'addo_supportusers_id',
				'addo_ticket_category_id',
				'addo_ticket_priority_id',
				'addo_ticket_status_id',
				'addo_tickets_id',
				'attachments',
				'author_id',
				{ name: 'created', type: 'date', dateFormat: 'Y-m-d H:i:s' },
				'details',
				'fromemail',
				'fromname',
				'id',
				'subject',
				'tags',
				'ticket_category_name',
				'ticket_priority_name',
				'ticket_status_name'
			],
			data: []

		}

	}
});