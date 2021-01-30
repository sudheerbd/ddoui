Ext.define('DDO.model.karmasetup.SelfNominateKarmaModel', {
	extend: 'Ext.data.Model',
	alias: 'model.selfnominatekarmamodel',
	fields: ['ddo_karma_id', 'description', 'isratingbased', 'isrulebased', 'karmacategoryid', 'karmacategoryname', 
	'name', {
		name: 'walletemployeename',
		convert: function(value, record) {
			if (record.get('walletid') == 0) {
                return 'Self';
            } else {
                return value;
            }
		}
	}, 'walletid', 'showontimeline', 'autoapproval']
	
});