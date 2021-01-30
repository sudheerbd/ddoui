Ext.define('DDO.view.support.SupportView', {
	extend: 'Ext.container.Container',

	alias: 'widget.supportview',

	cls:'supportview-cls',

	width: '100%',
	margin:5,
	requires: [
		'ADDO.ticketadmin.TicketAdminPanel'
	],
	defaults:{
		width: '100%'
	},
	items: [{
		xtype: 'ticketadminpanel'
	}]

});