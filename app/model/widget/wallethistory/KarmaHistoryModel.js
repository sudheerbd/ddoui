Ext.define('DDO.model.wallethistory.KarmaHistoryModel', {
	extend: 'Ext.data.Model',
	alias: 'model.karmahistory',
	fields: ['date', 'points',
	{
		name: 'plain_description',
		convert:function(val,rec){
			return Ext.util.Format.stripTags(rec.data.description);
		}
	}, 'byto','ddo_nomination_date',
		{
			name: 'karmaGivenDate',
			convert: function (val, rec) {
				var nomDate = rec.get('ddo_nomination_date');
				if (nomDate) {
					var valAr = nomDate.split(' '),
						nomArDate = valAr[0],
						nomArDateSplit = nomArDate.split('-');
					if (nomArDateSplit.length > 2) {
						var month = nomArDateSplit[1];
						var year = nomArDateSplit[0];
						return month + "-" + year;
					}

				}
				return nomDate;

			}
		}
]
});