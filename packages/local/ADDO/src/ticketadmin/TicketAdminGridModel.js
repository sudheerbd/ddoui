Ext.define('ADDO.ticketadmin.TicketAdminGridModel',{
	extend : 'Ext.app.ViewModel',
	alias  : 'viewmodel.ticketadmingrid',
	stores : {
		TicketAdminStore : {
			autoLoad : true,
			fields : [
				'addo_supportusers_id',
				'addo_ticket_category_id',
				'addo_ticket_priority_id',
				'addo_ticket_status_id',
				'addo_tickets_id',
				'attachments',
				'author_id',
				'details',
				'fromemail',
				'fromname',
				'subject',
				'tags',
				'ticket_category_name',
				'ticket_priority_name',
				'ticket_status_name',
				{name : 'created', type: 'date'} 
			],
			proxy: {
		         type: 'ajax',
		         url : '/ticket',
		         reader: {
		             type: 'json',
		             rootProperty: 'data'
		         }
		    }
		}
	}
});