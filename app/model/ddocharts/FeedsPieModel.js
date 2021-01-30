Ext.define('DDO.model.ddocharts.FeedsPieModel', {
    extend: 'Ext.data.Model',
    alias: 'model.feedspiemodel',
    fields: [{
        name: 'post_type',
        convert:function(data,record){
        	if(data == 'standard'){
        		return 'Post';
        	}else{
        		return 'Ideate';
        	}
        }
    },{
    	name: 'count'
    }]
 });