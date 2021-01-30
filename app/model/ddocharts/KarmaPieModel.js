Ext.define('DDO.model.ddocharts.KarmaPieModel', {
    extend: 'Ext.data.Model',
    alias: 'model.karmapiemodel',
    fields: [{
    	name:'count'
    },{
    	name:'name',
    	convert:function(data,record){
        		return "TotalCount:"+record.data.count
        	}
    }]
 });