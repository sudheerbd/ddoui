Ext.define('Goals.model.GoalsViewModel', {
	extend: 'Ext.data.Model',

	alias: 'model.goalviewmodel',

	fields: [{
		name: 'name'
	}, {
		name: 'title'
	}, {
		name: 'targetdate'
	}, {
		name: 'goalstatus'
	}, {
		name: 'goalType'
	}, {
		name: 'goalAllView',
		convert: function(value, record) {
			if (value) {
				return value;
			} else {
				if (Utility.goalsArray.indexOf(record.data.goalid) == -1) {
					Utility.goalsArray.push(record.data.goalid);
					return true;

				} else {
					return false;
				}
			}
		}
	}]
});