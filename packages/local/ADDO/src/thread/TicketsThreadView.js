Ext.define('ADDO.thread.TicketsThreadView',{
	extend 	: 'Ext.container.Container',
	alias 	: 'widget.ticketsthreadview',
	requires: [
		'ADDO.thread.ThreadPanel',
		'ADDO.thread.EditorPanel',
		'ADDO.thread.CommentsGrid',
		'ADDO.thread.TicketsThreadViewModel',
		'ADDO.thread.TicketsThreadViewController'
	],
	width:'100%',
    controller : 'ticketsthread',
	viewModel  : {
    	type : 'ticketsthreadview'
    },
    
    cls:'noscrollbar',

    layout : {
    	type  : 'vbox',
    	pack:'right',
    	align:'right'
    },
	scrollable : 'y',
	height : 800,

	items : [{
		xtype 	: 'toolbar',
		width:'100%',
		cls:'ticket-toolbar-cls',
		items : [{
			xtype:'tbfill'
		},{
			xtype 	: 'button',
            cls:'ticket-btn',
            margin:'10px 0px 0px 0px',
            text 	: 'Back',
            handler : 'onBackBttonClick'
        }]
	},{
		xtype : 'container',
		width : '100%',
		layout: {
			type  : 'vbox',
			align : 'stretch'
		},
		items : [{
			xtype  : 'threadpanel',
			reference  : 'threadpanel',
			//height 	: 300,
			bind    : {
				store  : '{panelstore}'
			}
	    },{
	    	xtype     : 'editorpanel',
	    	reference : 'editorpanel',
	    	hidden    : true,
	    	height 	: 200
	    },{
	    	xtype     : 'commentsgrid',
	    	reference : 'commentsgrid',
	    	bind      : {
	    		store : '{threadstore}'
	    	}
	    }]
	}
	// ,{
	// 	xtype : 'ticketdetails',
	// 	margin : '20 20 0 20',
	// 	bodyStyle: {
	// 	    background: '#fff',
	// 	    padding: '10px'
	// 	},
	// 	width  : '25%'
	// }
	]
});