Ext.define('DDO.model.profile.SentBackNominationModel', {
    extend: 'Ext.data.Model',
    fields: [{
        mapping: 'karmacategoryname',
        name: 'categoryName',
        type: 'string'
    },{
        name: 'frequencyName',
        mapping:'frequency',
        convert:function(val){
            if(val == 12){
                return 'Monthly'
            }else if (val == 4){
                return 'Quarterly'
            }else{
                return 'Yearly'
            }
        }
    },{
        name: 'hours',
        mapping: 'karmaunits',
        type: 'string'
    },{
        name: 'karmaGivenDate',
        mapping: 'ddo_nomination_date',
        type: 'string'
    },{
        name: 'description',
        mapping: 'rejectmsg',
        type: 'string'
    }
   
]
});