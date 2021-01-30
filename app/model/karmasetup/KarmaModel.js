Ext.define('DDO.model.karmasetup.KarmaModel', {
	extend: 'Ext.data.Model',
	alias: 'model.karmamodel',
	idProperty: 'ddo_karma_id',
	fields: ['ddo_karma_id', 'description', 'isratingbased', 'isrulebased', 'karmacategoryid', 'karmacategoryname', 'name', {
		name: 'walletemployeename',
		convert: function(value, record) {
			if (record.get('walletid') == 0) {
				return 'Self';
			} else if(!value){
				return record.data.walletdescname;
            } else {
                return value;
            }
		}
	}, 'walletid', 'showontimeline', 'autoapproval']
});