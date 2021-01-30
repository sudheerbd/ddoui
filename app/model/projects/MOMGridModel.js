Ext.define('DDO.model.projects.MOMGridModel', {
	extend: 'Ext.data.Model',

	alias: 'model.momgridmodel',

	fields: [
	{
		name:'sr_no'
    },{
    	name: 'assigned_to'
    },{
    	name:'user_id'
    },{
    	name:'user_full_name'
    },{
         name:'action_item'
    },{ 
    	name:'due_date',
        type: 'date',
        dateFormat: 'd-m-Y'
    },{
    	name:'status'
}]
});