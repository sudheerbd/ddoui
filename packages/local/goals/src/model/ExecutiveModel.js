Ext.define('Goals.model.ExecutiveModel', {
	extend: 'Ext.data.Model',
	fields: ['description', {
			name: 'targetdate',
			convert: function(value) {
				if (value) {
					return new Date(value);

				} else {
					return "";
				}
			}
		},
		'taskcompleted',
		'taskid',
		'timerequired'
	]
});