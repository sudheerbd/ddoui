Ext.define('ADDO.thread.CommentsGrid', {
	extend : 'Ext.grid.Panel',

	alias  : 'widget.commentsgrid',

    cls    : 'commentsgrid',

	hideHeaders: true,

    margin : 20,

    columns: [{
        dataIndex: 'comments',
        flex: 1,
        renderer: 'renderTitleColumn'
    }],

	titleTpl:[
        '<div class="text-wrapper">' +
            '<div class="comments-data">' +
                '<div class="comments-picture"><img src="{comment_image}"></div>' +
                '<div class="comments-content">' +
                    '<div class="anchor"></div>'+
                    '<div class="comments-author">{comment_name}</div>' +
                    '<div class="comments-text">{comment}</div>' +
                '</div>' +
                '<div class="comments-icon"><img src="resources/icons/clock-icon.png">{[this.getDateFormat(values,"Y-m-d H:i:s")]}</div>'+
            '</div>' +
        '<div>',{
            
              getDateFormat:function(values,format){
                return Ext.Date.format(values.date,format);
              }
        }
        ]

});