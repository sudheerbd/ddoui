Ext.define('ADDO.newticket.NewTicketWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.newticketwindow',
    requires : [
        'ADDO.newticket.NewTicketWindowController'
    ],
    controller : 'newticketwindow',
    viewModel : {
        type : 'newticketwindow'
    },
    autoShow : true,
    height: '74%',
    width: '90%',
    padding: 20,
    layout: 'fit',
    title: 'New Ticket',
    border: false,
    closable: true,
    draggable: false,
    bodyBorder: false,
    resizable: false,
    cls: 'panelbody',
    message: '',
    info: false,
    modal: true,
    items: [{
        width: '100%',
        height: '100%',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Subject',
            reference : 'subject',
            labelAlign: 'top',
            width: '100%',
            name: 'subject',
            labelSeparator: ' ',
            cls:'newticket-textfield-cls',
            emptyText: 'Subject'
        },{
            xtype: 'htmleditor',
            reference : 'description',
            cls:'ticket-htmleditor-cls',
            width: '100%',
            height: '60%',
            name: 'textBody'
        },{
            layout: 'hbox',
            cls: 'panelbody',
            defaults: {
                cls: 'rounded'
            },
            items: [{
                xtype: 'combo',
                reference : 'category',
                queryMode: 'local',
                displayField : 'name',
                valueField : 'addo_ticket_category_id',
                store : 'category',
                emptyText: '(select category)',
                padding: '0 18 0 0',
                cls: 'rounded'
            },{
                xtype: 'combo',
                reference : 'priority',
                queryMode: 'local',
                displayField : 'name',
                valueField : 'addo_ticket_priority_id',
                store : 'priority',
                emptyText: '(select priority)'
            },{
                xtype: 'button',
                cls: 'transparent-button',
                iconCls: 'x-fa fa-paperclip',
                text: 'attach a file',
                margin: '0 0 0 700'

            }]
        },{
            xtype: 'button',
            text: 'Submit',
            cls: 'rounded',
            margin: '10 0 0 0',
            handler: 'onSubmitClick'
        }]
    }]
});