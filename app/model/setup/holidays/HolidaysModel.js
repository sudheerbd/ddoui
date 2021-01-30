Ext.define('DDO.model.holidays.HolidaysModel', {
	extend: 'Ext.data.Model',
	fields: [{
        name: 'date',
        convert:function(date,rec){
          //debugger;
          value = Ext.Date.format(new Date(date), 'Y-m-d') ;
          return value;
        }
	}, {
		//name: 'skillTotalCount'
    }],
})