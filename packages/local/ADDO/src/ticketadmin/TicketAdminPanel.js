Ext.define('ADDO.ticketadmin.TicketAdminPanel',{
	extend  : 'Ext.panel.Panel',
	xtype 	: 'ticketadminpanel',
	requires: [
		'ADDO.ticketadmin.TicketAdminGrid',
		'ADDO.thread.TicketsThreadView'
	],
	layout 	: 'card',
	items 	: [{
		xtype  : 'ticketadmingrid'
	},{
		xtype  : 'ticketsthreadview'
	}]
});