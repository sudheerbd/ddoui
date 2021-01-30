Ext.define('DDO.model.profile.ProvitionToCnfmModel', {
	extend: 'Ext.data.Model',
    fields: [{
        name:'month',
        type:'string'
    },{
        name:'sprint',
        type:'int'
    },{
        name:'duedate',
        type:'string'
    },{
        name:'status',
        type:'string'
    },{
        name:'duration',
        type:'int'
    }]
});