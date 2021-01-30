Ext.define('ADDO.ticketadmin.TicketAdminGridController',{
    extend : 'Ext.app.ViewController',
    alias : 'controller.ticketadmingrid',
    init : function(){
        //initializing reusable stores
    	Ext.create('ADDO.store.Category',{});
    	Ext.create('ADDO.store.Priority',{});
        Ext.create('ADDO.store.SupportUser',{});
    },
    onTicketClick : function(){
    	Ext.widget('newticketwindow', {});
    },
    onCellClick : function( grid , record , tr , rowIndex , e , eOpts )  {
            var adminPanel = grid.up('ticketadminpanel'),
            me = this,
                threadView = adminPanel.down('ticketsthreadview'),
                threadViewModel = threadView.getViewModel(),
                ticketDetails = threadView.down('ticketdetails'),
                params ={
                	addo_tickets_id:record.data.addo_tickets_id
                };
            var panelStore = threadViewModel.getData().panelstore;
                panelStore.setData([record.data]);
            threadViewModel.setData(record.data);
            threadViewModel.notify();
            threadView.fireEvent('cleardirty');

           var threadstore =threadViewModel.getData().threadstore;
           Ext.apply(threadstore.getProxy().extraParams, params);
           threadstore.load();
           adminPanel.setActiveItem(1);

	}
});