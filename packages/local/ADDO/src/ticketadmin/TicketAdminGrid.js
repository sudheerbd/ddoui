Ext.define('ADDO.ticketadmin.TicketAdminGrid',{
	extend  : 'Ext.grid.Panel',
	xtype 	: 'ticketadmingrid',
	cls 	: 'ticket-grid-cls',
	requires: [
		'ADDO.ticketadmin.TicketAdminGridModel',
		'ADDO.ticketadmin.TicketAdminGridController',
		'ADDO.newticket.NewTicketWindow'
	],
	controller : 'ticketadmingrid',
	viewModel : {
		type  : 'ticketadmingrid'
	},
	bind : {
		store : '{TicketAdminStore}'
	},
	dockedItems : [{
		xtype 	: 'toolbar',
		cls:'ticket-toolbar-cls',
		dock 	: 'top',
		items : [{
           xtype:'tbfill'
		},{
			xtype 	: 'button',
            cls:'ticket-btn',
            iconAlign: 'right',
            margin:'10px 0px 0px 0px',
            text 	: 'New Ticket',
            handler : 'onTicketClick'
        }]
	}],
	columns : [{
		xtype 	: 'templatecolumn',
		text 	: 'Subject',
		tpl 	: '<a class="ticketLink">{subject}</a>',
		flex    : 1.5
	},{
		text 	: 'Category',
		dataIndex : 'ticket_category_name',
		flex 	: 0.5
	},{
		text 	: 'Priority',
		dataIndex : 'ticket_priority_name',
		flex 	: 0.5
	},{
		text 	: 'Status',
		dataIndex : 'ticket_status_name',
		flex 	: 0.5
	},{
		xtype 	: 'datecolumn',
		format  :'d-m-Y',
		text 	: 'Created Date',
		dataIndex : 'created',
		flex 	: 0.5
	}],
	listeners: {
        rowdblclick: 'onCellClick'
    }
});