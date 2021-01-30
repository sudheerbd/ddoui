Ext.define('DDO.model.reporting.ReportingModel', {
    extend: 'Ext.data.Model',
	alias: 'model.reportingmodel',
    
	fields: [{
		name: 'from_date',
		type: 'date'
	},{
		name: 'to_date',
		type: 'date'
	}]
});


