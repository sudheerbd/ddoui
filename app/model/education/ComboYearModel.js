Ext.define('DDO.model.education.ComboYearModel', {
	extend: 'Ext.data.Model',

	fields: [{
		name: 'name'
	}, {
		name: 'value'
	},{
		name:'currentyear',
		convert: function(value,record){
			var yrValue = record.get('value');
			var currntYr = new Date().getFullYear();
			if( yrValue > currntYr){
				return false;
			}else{
				return true;
			}
		}
	}]
});