Ext.define('ADDO.thread.ThreadPanel',{
	extend : 'Ext.grid.Panel',

	alias  : 'widget.threadpanel',

	requires: [
        'Ext.grid.plugin.RowExpander'
    ],

	cls    : 'threadpanel',

	hideHeaders: true,
	scrollable : 'y',
	margin      : 20, 
	// tbar : [{
 //            xtype   : 'button',
 //            text    : 'Takeover'
 //        },'->',{
	// 		text : 'Close Ticket',
	// 		iconCls: 'x-fa fa-check'
	// 	}],
	bbar : [{
			xtype       : 'component',
			reference   : 'reply',
			width       : '100%',
			padding     : 10,
			componentCls: 'ticket-reply',
	        html        : '\uF0E5 Reply',
	        listeners   : {
				afterrender : 'onReplyCmpRender'
			}
		}],
	
	columns: [{
        dataIndex : 'subject',
        flex      : 1,
        renderer  : 'renderThreadDescription'
    }],

    viewConfig: {
        listeners: {
            itemclick: 'onThreadClick',
            expandbody: 'onExpandBody',
            collapsebody: 'onCollapseBody'
        }
    },

    plugins: [{
        ptype: 'uxadmin-rowexpander',
        pluginId: 'rowexpander'
    }],

    titleTpl:[
        '<div class="text-wrapper">' +
            '<div class="thread-data">' +
                '<div class="thread-picture"><img src="{[this.getProfileImg(values)]}"></div>' +
                '<div class="thread-content">' +
                    '<div class="thread-title">{subject}</div>' +
                    '<div class="thread-small">by <span class="thread-author">{[this.getAuthor(values)]}</span>' +
                    '<img src="resources/icons/cal-icon.png"/>{[this.getDateFormat(values,"d-m-Y")]}' +
                    '<img src="resources/icons/clock-icon.png"/>{[this.getDateFormat(values,"H:i:s")]}</div>' +
                    '<div class="thread-paragraph thread-paragraph-simple" {expanded}>{details:ellipsis(600, true)}</div>' +
                    '<div class="thread-toggle expand" {expanded}><span>EXPAND</span>' +
                    '<img src="resources/icons/expand-thread.png"></div>' +
                '</div>' +
            '</div>' +
        '<div>',{
              getProfileImg:function(values){
                return Utility.profileImg();
              },
              getAuthor:function(values){
                var loginStore = Ext.getStore('login'),
                    userRecord = loginStore.getAt(0),
                    userData = userRecord.data;
                    return userData.fullname;
              },
              getDateFormat:function(values,format){
                return Ext.Date.format(values.created,format );
              }
        }]
});