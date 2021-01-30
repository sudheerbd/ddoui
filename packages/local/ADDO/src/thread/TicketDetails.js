Ext.define('ADDO.thread.TicketDetails', {
    extend  : 'Ext.form.Panel',
    alias   : 'widget.ticketdetails',
    padding : 10,
    border  : false,
    defaults: {
        padding : '10 0 0 15'
    },       
    title   : 'DETAILS',
    dockedItems: [{
        xtype : 'toolbar',
        style: {
            background: '#fff'
        },
        dock  : 'bottom',
        items : ['->',{
            text:'SUBMIT' ,
            handler: 'onSubmitClick'
        }]
    }],
    items   : [
    // {
    //     items: [{
    //         layout: 'hbox',
    //         items: [{
    //             xtype: 'label',
    //             bind : {
    //                 html: '<b>#{addo_tickets_id}</b>'
    //             }
    //         }, {
    //             xtype: 'label',
    //             margin: '0 0 0 25',
    //             bind : {
    //                 html: '<b>{ticket_status_name}</b>'
    //             }
    //         }]
    //     }]
    // },
    // {
    //     xtype : 'fieldcontainer',
    //     layout: 'hbox',
    //     items: [{
    //         xtype: 'label',
    //         bind : {
    //             html: '<b>#{addo_tickets_id}</b>'
    //         }
    //     }, {
    //         xtype: 'label',
    //         margin: '0 0 0 25',
    //         bind : {
    //             html: '<b>{ticket_status_name}</b>'
    //         }
    //     }]
    // },
    {
        xtype: 'combo',
        fieldLabel: 'Priority',
        name: 'addo_ticket_priority_id',
        queryMode: 'local',
        displayField : 'name',
        valueField : 'addo_ticket_priority_id',
        store : 'priority',
        triggerAction: 'all',
        bind : {
            value : '{addo_ticket_priority_id}'
        },
        editable: false
    },{
        xtype: 'combo',
        fieldLabel: 'Category',
        name: 'addo_ticket_category_id',
        queryMode: 'local',
        displayField : 'name',
        valueField : 'addo_ticket_category_id',
        store : 'category',
        triggerAction: 'all',
        bind : {
            value : '{addo_ticket_category_id}'
        },
        editable: false
    },{
        xtype: 'textfield',
        fieldLabel: 'From',
        bind : {
            value : '{fromname}'
        },
        name: 'fromname'
    },{
        xtype: 'combo',
        fieldLabel: 'Assigned To',
        name: 'addo_supportusers_id',
        store: 'supportuser',
        queryMode: 'local',
        bind : {
            value : '{addo_supportusers_id}'
        },
        valueField: 'addo_supportusers_id',
        displayField: 'fullname',
        triggerAction: 'all',
        editable: false
    },{
        xtype: 'datefield',
        fieldLabel: 'Date',
        bind : {
            value : '{created}'
        },
        name: 'created'
    },{
        xtype: 'datefield',
        fieldLabel: 'Due',
        bind : {
            value : '{duedate}'
        },
        name: 'duedate'
    },{
        xtype: 'numberfield',
        fieldLabel: 'Time Spent',
        name: 'timeSpent'
    },{
        xtype: 'textfield',
        fieldLabel: 'Start Date',
        name: 'startdate',
        bind : {
            value : '{startdate}'
        },
        editable: false
    },{
        xtype: 'datefield',
        fieldLabel: 'Close Date',
        bind : {
            value : '{closedate}'
        },
        name: 'closedate'
    },{
        xtype: 'textfield',
        fieldLabel: 'Tags',
        bind : {
            value : '{tags}'
        },
        name: 'tags'
    }]
});