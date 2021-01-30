Ext.define('ADDO.newticket.NewTicketWindowController',{
    extend : 'Ext.app.ViewController',
    alias : 'controller.newticketwindow',
    onSubmitClick : function(){
    	var me = this,
    		refs = me.getReferences(),
    		newTicketView = this.getView(),
    		subject = refs.subject.getValue(),
        	description = refs.description.getValue(),
            category = refs.category.getValue(),
            priority = refs.priority.getValue(),
            adminGrid = Ext.ComponentQuery.query('ticketadmingrid')[0],
            adminPanel = Ext.ComponentQuery.query('ticketadminpanel')[0],
        	adminGridModel = adminGrid.getViewModel(),
        	ticketStore = adminGridModel.get('TicketAdminStore'),
        	data;

        data = {
            addo_supportusers_id : 0,
            addo_ticket_category_id : category,
            addo_ticket_priority_id : priority,
            addo_ticket_status_id : 1000001,
            tags : "tweeeeet",
            subject : subject,
            details : description,
            attachments : ""
        };
        Ext.Ajax.request({
            url : '/ticket',
            scope : me,
            method : 'POST',
            jsonData : data,
            success : function(response){
                var newTicketData = Ext.decode(response.responseText);
                ticketStore.add(newTicketData.data[0]);
                newTicketView.hide();
                adminPanel.setActiveItem(0);
            },
            failure : function(response){
                var data = Ext.decode(response.responseText);
                Ext.toast(data.message, 'Error', 't');
            }
        });
    }
});